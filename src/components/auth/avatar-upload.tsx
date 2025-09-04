'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { User } from '@supabase/auth-js'

interface AvatarUploadProps {
  user: User
  currentAvatarUrl?: string | null
  onAvatarUpdate: (avatarUrl: string | null) => void
}

export default function AvatarUpload({ user, currentAvatarUrl, onAvatarUpdate }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  // Avatar URL'ini tam path olarak oluştur
  const getAvatarUrl = (path: string | null) => {
    if (!path) return null
    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    return data.publicUrl
  }

  // Dosya seçme
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Dosya validasyonu
    if (!file.type.startsWith('image/')) {
      alert('Lütfen bir resim dosyası seçin.')
      return
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      alert('Dosya boyutu 2MB dan küçük olmalıdır.')
      return
    }

    // Preview oluştur
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Avatar upload
  const uploadAvatar = async () => {
    if (!fileInputRef.current?.files?.[0]) return

    const file = fileInputRef.current.files[0]
    console.log('Starting avatar upload:', { fileName: file.name, fileSize: file.size, fileType: file.type })
    setUploading(true)

    try {
      // Eski avatar'ı sil (varsa)
      if (currentAvatarUrl) {
        console.log('Removing old avatar:', currentAvatarUrl)
        const oldPath = currentAvatarUrl.replace(`${user.id}/`, '')
        const { error: removeError } = await supabase.storage
          .from('avatars')
          .remove([`${user.id}/${oldPath}`])
        
        if (removeError) {
          console.warn('Error removing old avatar (continuing anyway):', removeError)
        }
      }

      // Yeni dosya adı oluştur
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/avatar-${Date.now()}.${fileExt}`
      console.log('Uploading new avatar to:', fileName)

      // Dosyayı upload et
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      console.log('Upload result:', { data: uploadData, error: uploadError })

      if (uploadError) {
        console.error('Upload error details:', uploadError)
        alert(`Avatar yüklenirken hata oluştu: ${uploadError.message}`)
        return
      }

      console.log('Upload successful, updating profile...')

      // Profile'ı güncelle
      const { data: updateData, error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: fileName })
        .eq('id', user.id)

      console.log('Profile update result:', { data: updateData, error: updateError })

      if (updateError) {
        console.error('Profile update error details:', updateError)
        alert(`Profil güncellenirken hata oluştu: ${updateError.message}`)
        return
      }

      console.log('Avatar upload completed successfully!')
      // Parent component'e bildir
      onAvatarUpdate(fileName)
      setPreviewUrl(null)
      
      alert('Avatar başarıyla güncellendi!')

    } catch (error) {
      console.error('Avatar upload exception:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      alert(`Beklenmeyen bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  // Avatar'ı kaldır
  const removeAvatar = async () => {
    if (!currentAvatarUrl) return
    
    if (!confirm('Avatar&apos;ı kaldırmak istediğinizden emin misiniz?')) {
      return
    }

    setUploading(true)

    try {
      // Storage'dan sil
      const { error: storageError } = await supabase.storage
        .from('avatars')
        .remove([currentAvatarUrl])

      if (storageError) {
        console.error('Storage delete error:', storageError)
      }

      // Profile'dan kaldır
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', user.id)

      if (updateError) {
        console.error('Profile update error:', updateError)
        alert('Profil güncellenirken hata oluştu.')
        return
      }

      onAvatarUpdate(null)
      alert('Avatar başarıyla kaldırıldı!')

    } catch (error) {
      console.error('Error:', error)
      alert('Beklenmeyen bir hata oluştu.')
    } finally {
      setUploading(false)
    }
  }

  const currentAvatar = getAvatarUrl(currentAvatarUrl || null)

  return (
    <div className="space-y-4">
      {/* Avatar Display */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            ) : currentAvatar ? (
              <img 
                src={currentAvatar} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-2xl">
                👤
              </div>
            )}
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">Profil Fotoğrafı</h3>
          <p className="text-sm text-gray-500">
            JPG, PNG dosyaları. Maksimum 2MB.
          </p>
        </div>
      </div>

      {/* File Input */}
      <div>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="mb-2"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {previewUrl && (
          <Button 
            onClick={uploadAvatar}
            disabled={uploading}
            className="flex-1"
          >
            {uploading ? 'Yükleniyor...' : 'Avatarı Güncelle'}
          </Button>
        )}
        
        {currentAvatarUrl && !previewUrl && (
          <Button 
            variant="outline"
            onClick={removeAvatar}
            disabled={uploading}
          >
            Avatarı Kaldır
          </Button>
        )}

        {previewUrl && (
          <Button 
            variant="outline"
            onClick={() => {
              setPreviewUrl(null)
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }}
            disabled={uploading}
          >
            İptal
          </Button>
        )}
      </div>
    </div>
  )
}
