-- Wrap in a transaction to ensure atomic execution
BEGIN;

-- 1. Drop Triggers and Functions first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Drop all tables (Order matters for foreign keys, but CASCADE helps)
DROP TABLE IF EXISTS public.review_images CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.wishlist_items CASCADE;
DROP TABLE IF EXISTS public.cart_items CASCADE;
DROP TABLE IF EXISTS public.product_images CASCADE;
DROP TABLE IF EXISTS public.product_variants CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.addresses CASCADE;
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.promo_codes CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 3. Create Tables

------- USERS TABLE (Extended Profile) -------
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

------- ADDRESSES TABLE -------
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  label TEXT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_addresses_user_id ON public.addresses(user_id);

------- PRODUCTS TABLE -------
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category TEXT NOT NULL,
  fabric TEXT,
  weight INTEGER,
  care_instructions TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  stock_quantity INTEGER DEFAULT 0,
  sold_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_featured ON public.products(is_featured);

------- PRODUCT VARIANTS TABLE -------
CREATE TABLE public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  color TEXT NOT NULL,
  color_hex TEXT,
  size TEXT NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  sku TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_variants_product_id ON public.product_variants(product_id);
CREATE INDEX idx_variants_sku ON public.product_variants(sku);

------- PRODUCT IMAGES TABLE -------
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_images_product_id ON public.product_images(product_id);

------- CART TABLE -------
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id, variant_id)
);
CREATE INDEX idx_cart_user_id ON public.cart_items(user_id);

------- WISHLIST TABLE -------
CREATE TABLE public.wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
CREATE INDEX idx_wishlist_user_id ON public.wishlist_items(user_id);

------- ORDERS TABLE -------
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  shipping_name TEXT NOT NULL,
  shipping_phone TEXT NOT NULL,
  shipping_address_line1 TEXT NOT NULL,
  shipping_address_line2 TEXT,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_pincode TEXT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  payment_id TEXT,
  tracking_number TEXT,
  estimated_delivery DATE,
  delivered_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_number ON public.orders(order_number);
CREATE INDEX idx_orders_status ON public.orders(status);

------- ORDER ITEMS TABLE -------
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_sku TEXT,
  color TEXT,
  size TEXT,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);

------- REVIEWS TABLE -------
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id, order_id)
);
CREATE INDEX idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);

------- REVIEW IMAGES TABLE -------
CREATE TABLE public.review_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES public.reviews(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

------- PROMO CODES TABLE -------
CREATE TABLE public.promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL,
  discount_value DECIMAL(10,2) NOT NULL,
  min_order_value DECIMAL(10,2) DEFAULT 0,
  max_discount DECIMAL(10,2),
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_promo_codes_code ON public.promo_codes(code);

------- NOTIFICATIONS TABLE -------
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(user_id, is_read);


-- 4. Enable RLS and Create Policies

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Variants" ON public.product_variants FOR SELECT USING (true);

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Images" ON public.product_images FOR SELECT USING (true);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Reviews" ON public.reviews FOR SELECT USING (true);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert into own cart" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete from own cart" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own wishlist" ON public.wishlist_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert into own wishlist" ON public.wishlist_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete from own wishlist" ON public.wishlist_items FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
  EXISTS ( SELECT 1 FROM public.orders WHERE id = order_items.order_id AND user_id = auth.uid() )
);


-- 5. Seed Initial Data

-- 1. Oversized Bomber Jacket
INSERT INTO public.products (id, sku, name, slug, description, price, original_price, category, fabric, rating, review_count, stock_quantity, is_featured)
VALUES (
  'a3d92000-8480-498c-b08e-5e608f10f001',
  'BOM-001',
  'Oversized Bomber Jacket',
  'oversized-bomber-jacket',
  'Meticulously engineered for the urban vanguard. This piece features our signature tech-fleece blend.',
  2999,
  4999,
  'jackets',
  'Tech-Fleece',
  4.8,
  124,
  50,
  true
);

INSERT INTO public.product_variants (product_id, color, color_hex, size, stock_quantity, sku)
VALUES
  ('a3d92000-8480-498c-b08e-5e608f10f001', 'Black', '#000000', 'S', 10, 'BOM-001-BLK-S'),
  ('a3d92000-8480-498c-b08e-5e608f10f001', 'Black', '#000000', 'M', 15, 'BOM-001-BLK-M'),
  ('a3d92000-8480-498c-b08e-5e608f10f001', 'Black', '#000000', 'L', 15, 'BOM-001-BLK-L'),
  ('a3d92000-8480-498c-b08e-5e608f10f001', 'Olive', '#556B2F', 'M', 10, 'BOM-001-OLV-M');

INSERT INTO public.product_images (product_id, image_url, display_order)
VALUES
  ('a3d92000-8480-498c-b08e-5e608f10f001', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2836&auto=format&fit=crop', 0),
  ('a3d92000-8480-498c-b08e-5e608f10f001', 'https://images.unsplash.com/photo-1551028919-ac66e624eca1?q=80&w=2836&auto=format&fit=crop', 1);


-- 2. Cyberpunk Cargo Pants
INSERT INTO public.products (id, sku, name, slug, description, price, category, fabric, rating, review_count, stock_quantity, is_featured)
VALUES (
  'b4e83000-9590-509d-c19f-6f719a21a002',
  'CRG-002',
  'Cyberpunk Cargo Pants',
  'cyberpunk-cargo-pants',
  'Tactical utility meets high-street fashion. Multiple pockets and adjustable straps.',
  3499,
  'pants',
  'Ripstop Cotton',
  4.5,
  89,
  30,
  true
);

INSERT INTO public.product_variants (product_id, color, color_hex, size, stock_quantity, sku)
VALUES
  ('b4e83000-9590-509d-c19f-6f719a21a002', 'Black', '#000000', '30', 5, 'CRG-002-BLK-30'),
  ('b4e83000-9590-509d-c19f-6f719a21a002', 'Black', '#000000', '32', 10, 'CRG-002-BLK-32'),
  ('b4e83000-9590-509d-c19f-6f719a21a002', 'Black', '#000000', '34', 10, 'CRG-002-BLK-34'),
  ('b4e83000-9590-509d-c19f-6f719a21a002', 'Charcoal', '#36454F', '32', 5, 'CRG-002-CHR-32');

INSERT INTO public.product_images (product_id, image_url, display_order)
VALUES
  ('b4e83000-9590-509d-c19f-6f719a21a002', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2836&auto=format&fit=crop', 0);


-- 3. Void Black Hoodie
INSERT INTO public.products (id, sku, name, slug, description, price, category, fabric, rating, review_count, stock_quantity)
VALUES (
  'c5f94000-06a1-61ae-d2a0-7a820b32c003',
  'HOD-003',
  'Void Black Hoodie',
  'void-black-hoodie',
  'Heavyweight cotton fleece with a structured hood. Minimalist branding.',
  2499,
  'hoodies',
  'Cotton Fleece',
  4.9,
  215,
  100
);

INSERT INTO public.product_variants (product_id, color, color_hex, size, stock_quantity, sku)
VALUES
  ('c5f94000-06a1-61ae-d2a0-7a820b32c003', 'Black', '#000000', 'S', 20, 'HOD-003-BLK-S'),
  ('c5f94000-06a1-61ae-d2a0-7a820b32c003', 'Black', '#000000', 'M', 30, 'HOD-003-BLK-M'),
  ('c5f94000-06a1-61ae-d2a0-7a820b32c003', 'Black', '#000000', 'L', 30, 'HOD-003-BLK-L'),
  ('c5f94000-06a1-61ae-d2a0-7a820b32c003', 'Black', '#000000', 'XL', 10, 'HOD-003-BLK-XL');

INSERT INTO public.product_images (product_id, image_url, display_order)
VALUES
  ('c5f94000-06a1-61ae-d2a0-7a820b32c003', 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=2836&auto=format&fit=crop', 0);

COMMIT;
