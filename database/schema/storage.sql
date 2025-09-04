-- Avatar Upload için Supabase Storage Setup
-- Bu SQL komutlarını Supabase Dashboard > SQL Editor'da çalıştırın

-- 1. Avatars bucket'ını oluştur
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- 2. Avatar upload policy - Kullanıcılar sadece kendi avatar'ını upload edebilir
CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 3. Avatar view policy - Herkes avatarları görebilir
CREATE POLICY "Anyone can view avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

-- 4. Avatar update policy - Kullanıcılar sadece kendi avatar'ını güncelleyebilir
CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 5. Avatar delete policy - Kullanıcılar sadece kendi avatar'ını silebilir
CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 6. Profiles tablosuna avatar_url kolonu ekle
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 7. Avatar URL update trigger'ı oluştur
CREATE OR REPLACE FUNCTION public.handle_avatar_upload()
RETURNS TRIGGER AS $$
BEGIN
  -- Eğer yeni bir avatar upload edildiyse, profiles tablosunu güncelle
  IF NEW.bucket_id = 'avatars' THEN
    UPDATE public.profiles 
    SET avatar_url = NEW.name
    WHERE id = (storage.foldername(NEW.name))[1]::uuid;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Storage objects trigger'ını oluştur
DROP TRIGGER IF EXISTS on_avatar_upload ON storage.objects;
CREATE TRIGGER on_avatar_upload
  AFTER INSERT ON storage.objects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_avatar_upload();
