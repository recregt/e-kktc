'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, type SignUpInput } from '@/lib/validations'

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Supabase bağlantısını test et
  useEffect(() => {
    console.log('Supabase client:', supabase)
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...')
  }, [supabase])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(data: SignUpInput) {
    setIsLoading(true)
    setError(null)

    try {
      // Kullanıcı kaydı
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      console.log('Auth response:', { authData, error })

      if (error) {
        console.error('Signup error:', error)
        setError(`Hata: ${error.message}`)
        return
      }

      // Profile bilgilerini güncelle
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: data.fullName,
            phone: data.phone,
            user_type: data.userType,
          })
          .eq('id', authData.user.id)

        if (profileError) {
          console.warn('Profile update error:', profileError)
          // Profile güncellemesi başarısız olsa bile signup başarılı sayalım
        }
      }

      console.log('Signup successful:', authData)
      setSuccess(true)
    } catch (err) {
      console.error('Signup catch error:', err)
      setError('Bir hata oluştu, lütfen tekrar deneyin')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-green-600">
            Kayıt Başarılı!
          </CardTitle>
          <CardDescription className="text-center">
            E-posta adresinize gönderilen doğrulama linkine tıklayarak hesabınızı aktifleştirin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => router.push('/login')}
            className="w-full"
          >
            Giriş Sayfasına Dön
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Kayıt Ol</CardTitle>
        <CardDescription className="text-center">
          Yeni hesap oluşturmak için bilgilerinizi girin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Ad Soyad
            </label>
            <Input
              id="fullName"
              type="text"
              placeholder="Ad Soyad"
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-posta
            </label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Telefon (Opsiyonel)
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="+90 555 123 45 67"
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="userType" className="text-sm font-medium">
              Hesap Türü
            </label>
            <select
              id="userType"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              {...register('userType')}
              defaultValue="customer"
            >
              <option value="customer">Müşteri</option>
              <option value="seller">Satıcı</option>
            </select>
            {errors.userType && (
              <p className="text-sm text-red-500">{errors.userType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Şifre
            </label>
            <Input
              id="password"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Şifre Tekrar
            </label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
