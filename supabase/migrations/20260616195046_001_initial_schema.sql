-- Bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  passengers INTEGER DEFAULT 1,
  vehicle_type TEXT DEFAULT 'camry',
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact inquiries table
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  text_en TEXT NOT NULL,
  text_ar TEXT,
  text_ur TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicles table
CREATE TABLE vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  name_ur TEXT,
  description TEXT,
  description_ar TEXT,
  description_ur TEXT,
  capacity INTEGER DEFAULT 4,
  luggage INTEGER DEFAULT 2,
  image_url TEXT,
  price_per_km DECIMAL(10,2),
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_ar TEXT,
  title_ur TEXT,
  description TEXT,
  description_ar TEXT,
  description_ur TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings table
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bookings (admin can do everything, public can insert)
CREATE POLICY "bookings_select" ON bookings FOR SELECT TO authenticated USING (true);
CREATE POLICY "bookings_insert" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "bookings_update" ON bookings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "bookings_delete" ON bookings FOR DELETE TO authenticated USING (true);

-- RLS Policies for inquiries
CREATE POLICY "inquiries_select" ON inquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "inquiries_insert" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "inquiries_update" ON inquiries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "inquiries_delete" ON inquiries FOR DELETE TO authenticated USING (true);

-- RLS Policies for testimonials (public can see approved, admin can manage all)
CREATE POLICY "testimonials_select" ON testimonials FOR SELECT USING (is_approved = true OR auth.role() = 'authenticated');
CREATE POLICY "testimonials_insert" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "testimonials_update" ON testimonials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "testimonials_delete" ON testimonials FOR DELETE TO authenticated USING (true);

-- RLS Policies for vehicles (public read, admin write)
CREATE POLICY "vehicles_select" ON vehicles FOR SELECT USING (is_available = true OR auth.role() = 'authenticated');
CREATE POLICY "vehicles_insert" ON vehicles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "vehicles_update" ON vehicles FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "vehicles_delete" ON vehicles FOR DELETE TO authenticated USING (true);

-- RLS Policies for services
CREATE POLICY "services_select" ON services FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "services_insert" ON services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "services_update" ON services FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "services_delete" ON services FOR DELETE TO authenticated USING (true);

-- RLS Policies for site_settings
CREATE POLICY "settings_select" ON site_settings FOR SELECT USING (true);
CREATE POLICY "settings_all" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert default vehicles
INSERT INTO vehicles (name, name_ar, name_ur, description, description_ar, description_ur, capacity, luggage, image_url, sort_order) VALUES
('Toyota Camry', 'تويوتا كامري', 'ٹویوٹا کیمری', 'Sedan perfect for small groups and couples', 'سيدان مثالية للمجموعات الصغيرة', 'چھوٹے گروپس اور جوڑوں کے لیے بہترین سیدان', 4, 2, 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600', 1),
('Hyundai Staria', 'هيونداي ستاريا', 'ہیونڈئے ستاریا', 'Modern MPV with spacious interior', 'MPV عصري بمساحة واسعة', 'وسیع اندرونی حصے والا جدید MPV', 7, 4, 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600', 2),
('Toyota Hiace', 'تويوتا هايس', 'ٹویوٹا ہائیس', 'Popular van for group transportation', 'حافلة شعبية للمجموعات', 'گروپ ٹرانسپورٹ کے لیے مقبول وین', 12, 8, 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600', 3),
('GMC Yukon', 'GMC يوكن', 'GMC یوکن', 'Premium SUV for luxury travel', 'SUV فاخرة للسفر المريح', 'لگژری سفر کے لیے پریمیم SUV', 7, 5, 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600', 4),
('Chevrolet Tahoe', 'شيفروليه تاهو', 'شیورلیٹ ٹاہو', 'Full-size SUV with maximum comfort', 'SUV بالحجم الكامل مع أقصى درجات الراحة', 'زیادہ سے زیادہ آرام والا فل سائز SUV', 8, 6, 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=600', 5),
('Mercedes V-Class', 'مرسيدس V-Class', 'مرسڈیز V-Class', 'Luxury van for VIP transport', 'حافلة فاخرة للنقل VIP', 'VIP ٹرانسپورٹ کے لیے لگژری وین', 7, 6, 'https://images.pexels.com/photos/2116995/pexels-photo-2116995.jpeg?auto=compress&cs=tinysrgb&w=600', 6);

-- Insert default services
INSERT INTO services (title, title_ar, title_ur, description, description_ar, description_ur, icon, sort_order) VALUES
('Hajj Transport', 'نقل الحجاج', 'حج ٹرانسپورٹ', 'Reliable transportation during Hajj season with expert guidance', 'نقل موثوق خلال موسم الحج مع إرشادات متخصصة', 'ماہر رہنمائی کے ساتھ حج کے سیزن میں قابل اعتماد ٹرانسپورٹ', 'Users', 1),
('Umrah Taxi', 'تاكسي العمرة', 'عمرہ ٹیکسی', 'Comfortable and convenient Umrah transportation services', 'خدمات نقل مريحة ومريحة للعمرة', 'عمرہ کے لیے آرام دہ اور آسان ٹرانسپورٹ سروسز', 'Car', 2),
('Airport Pickup', 'استقبال المطار', 'ایئر پورٹ پک اپ', 'Meet and greet service at Jeddah and Madinah airports', 'خدمة الاستقبال في مطار جدة والمدينة', 'جددہ اور مدینہ ایئر پورٹ پر ملنے اور استقبال کی سروس', 'Plane', 3),
('Airport Drop-off', 'توصيل المطار', 'ایئر پورٹ ڈراپ آف', 'Timely departure services to catch your flight', 'خدمات مغادرة في الوقت المحدد', 'اپنی پرواز پکڑنے کے لیے بروقت روانگی سروسز', 'Plane', 4),
('Makkah to Madinah', 'مكة إلى المدينة', 'مکہ سے مدینہ', 'Comfortable inter-city transportation between holy cities', 'نقل مريح بين المدن المقدسة', 'مقدس شہروں کے درمیان آرام دہ انٹر سٹی ٹرانسپورٹ', 'MapPin', 5),
('Madinah to Makkah', 'المدينة إلى مكة', 'مدینہ سے مکہ', 'Safe and reliable return journey to Makkah', 'عودة آمنة وموثوقة إلى مكة', 'مکہ کے لیے محفوظ اور قابل اعتماد واپسی کا سفر', 'MapPin', 6),
('Jeddah Airport Transfer', 'نقل مطار جدة', 'جددہ ایئر پورٹ ٹرانسفر', 'Direct transfers from Jeddah Airport to your destination', 'توصيل مباشر من مطار جدة', 'جددہ ایئر پورٹ سے آپ کی منزل تک براہ راست ٹرانسفر', 'Building', 7),
('Ziyarat Tours', 'جولات الزيارات', 'زیارات ٹورز', 'Guided tours to historical Islamic sites', 'جولات موجهة للمواقع الإسلامية التاريخية', 'تاریخی اسلامی مقامات کی گائیڈڈ ٹورز', 'Landmark', 8),
('Taif Tour', 'جولة الطائف', 'طائف ٹور', 'Scenic tours to the beautiful city of Taif', 'جولات ذات مناظر طبيعية إلى الطائف', 'طائف کے خوبصورت شہر کی سینک ٹورز', 'Mountain', 9),
('Badr Tour', 'جولة بدر', 'بدر ٹور', 'Historical tour of the Battle of Badr site', 'جولة تاريخية لموقع غزوة بدر', 'بدر کی جنگ کے تاریخی مقام کی ٹور', 'Star', 10),
('Private Family Taxi', 'تاكسي عائلي خاص', 'پرائیویٹ فیملی ٹیکسی', 'Exclusive transportation for your family', 'نقل حصري لعائلتك', 'آپ کی فیملی کے لیے خصوصی ٹرانسپورٹ', 'Heart', 11),
('VIP Transport', 'نقل VIP', 'VIP ٹرانسپورٹ', 'Luxury vehicles for distinguished pilgrims', 'مركبات فاخرة للحجاج المتميزين', 'ممتاز زائرین کے لیے لگژری گاڑیاں', 'Crown', 12);

-- Insert default testimonials
INSERT INTO testimonials (name, location, rating, text_en, text_ar, text_ur, is_approved) VALUES
('Ahmed Hassan', 'Egypt', 5, 'Excellent service! The driver was professional and the car was very comfortable. Highly recommend for Umrah transportation.', 'خدمة ممتازة! السائق كان محترفاً والسيارة مريحة جداً. أنصح بشدة لخدمات نقل العمرة.', 'بہترین سروس! ڈرائیور پیشہ ور تھا اور گاڑی بہت آرام دہ تھی۔ عمرہ ٹرانسپورٹ کے لیے زورسے تجویز کرتا ہوں۔', true),
('Fatima Ali', 'Pakistan', 5, 'Very reliable and punctual. They made our family trip to Makkah and Madinah stress-free.', 'موثوقون جداً وملتزمون بالمواعيد. جعلوا رحلة عائلتنا إلى مكة والمدينة خالية من التوتر.', 'بہت قابل اعتماد اور پنکچوئل۔ انہوں نے ہماری فیملی کے مکہ اور مدینہ کے سفر کو اسٹریس فری بنا دیا۔', true),
('Abdullah Mohammad', 'Indonesia', 5, 'Best transportation service for Hajj. The driver knew all the routes and was very helpful.', 'أفضل خدمة نقل للحج. السائق كان يعرف جميع الطرق وكان مساعداً جداً.', 'حج کے لیے بہترین ٹرانسپورٹ سروس۔ ڈرائیور تمام روٹس جانتا تھا اور بہت مددگار تھا۔', true);

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
('phone', '+966 50 000 0000'),
('whatsapp', '+966500000000'),
('email', 'info@zakarasma.com'),
('address', 'Makkah, Al Madinah Region, Saudi Arabia'),
('facebook_url', 'https://facebook.com/zakarasma'),
('twitter_url', 'https://twitter.com/zakarasma'),
('instagram_url', 'https://instagram.com/zakarasma'),
('youtube_url', 'https://youtube.com/zakarasma');
