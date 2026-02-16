-- Clear existing data
TRUNCATE public.reviews, public.order_items, public.orders, public.cart_items, public.wishlist_items, public.product_images, public.product_variants, public.products, public.addresses, public.profiles CASCADE;

-- Users handled by Auth, we just insert Products here.

-- 1. Oversized Bomber Jacket
INSERT INTO public.products (id, sku, name, slug, description, price, original_price, category, fabric, rating, review_count, stock_quantity, is_featured, is_new)
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
  true,
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
