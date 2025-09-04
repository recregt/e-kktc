-- Address Management için Supabase Schema
-- Bu SQL komutlarını Supabase Dashboard > SQL Editor'da çalıştırın

-- 1. Addresses tablosunu oluştur
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL, -- 'Ev', 'İş', 'Annem' etc.
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  city VARCHAR(100) NOT NULL,
  district VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'KKTC',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. RLS policies
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar sadece kendi adreslerini görebilir
CREATE POLICY "Users can view their own addresses" ON public.addresses
FOR SELECT USING (auth.uid() = user_id);

-- Kullanıcılar kendi adreslerini oluşturabilir
CREATE POLICY "Users can create their own addresses" ON public.addresses
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar kendi adreslerini güncelleyebilir
CREATE POLICY "Users can update their own addresses" ON public.addresses
FOR UPDATE USING (auth.uid() = user_id);

-- Kullanıcılar kendi adreslerini silebilir
CREATE POLICY "Users can delete their own addresses" ON public.addresses
FOR DELETE USING (auth.uid() = user_id);

-- 3. Trigger: updated_at otomatik güncelleme
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_addresses_updated_at
  BEFORE UPDATE ON public.addresses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 4. Trigger: Sadece bir default address olabilir
CREATE OR REPLACE FUNCTION public.ensure_single_default_address()
RETURNS TRIGGER AS $$
BEGIN
  -- Eğer yeni adres default olarak işaretleniyorsa
  IF NEW.is_default = TRUE THEN
    -- Aynı kullanıcının diğer tüm adreslerini default olmaktan çıkar
    UPDATE public.addresses 
    SET is_default = FALSE 
    WHERE user_id = NEW.user_id 
    AND id != NEW.id 
    AND is_default = TRUE;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_single_default_address_trigger
  BEFORE INSERT OR UPDATE ON public.addresses
  FOR EACH ROW
  EXECUTE FUNCTION public.ensure_single_default_address();

-- 5. İlk adres otomatik default yap
CREATE OR REPLACE FUNCTION public.make_first_address_default()
RETURNS TRIGGER AS $$
DECLARE
  address_count INTEGER;
BEGIN
  -- Kullanıcının kaç adresi var kontrol et
  SELECT COUNT(*) INTO address_count
  FROM public.addresses
  WHERE user_id = NEW.user_id;
  
  -- Eğer bu ilk adres ise, otomatik default yap
  IF address_count = 1 THEN
    UPDATE public.addresses 
    SET is_default = TRUE 
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER make_first_address_default_trigger
  AFTER INSERT ON public.addresses
  FOR EACH ROW
  EXECUTE FUNCTION public.make_first_address_default();
