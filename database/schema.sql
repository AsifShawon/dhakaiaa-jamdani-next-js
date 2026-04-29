CREATE TABLE IF NOT EXISTS profiles (
  id BIGSERIAL PRIMARY KEY,
  uid UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  role VARCHAR(50) DEFAULT 'user',
  phone_number VARCHAR(20),
  image_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cart (
  id BIGSERIAL PRIMARY KEY,
  uid UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  products JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS favorites (
  id BIGSERIAL PRIMARY KEY,
  uid UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  product_ids INTEGER[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  uid UUID REFERENCES auth.users(id),
  status VARCHAR(50) DEFAULT 'processing',
  total DECIMAL(10,2) NOT NULL,
  products JSONB NOT NULL DEFAULT '[]',
  Order_info JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) DEFAULT 'system',
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) DEFAULT 'percentage',
  discount_value DECIMAL(10,2),
  category VARCHAR(100),
  min_order_amount DECIMAL(10,2),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  display_type VARCHAR(20) DEFAULT 'modal',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
