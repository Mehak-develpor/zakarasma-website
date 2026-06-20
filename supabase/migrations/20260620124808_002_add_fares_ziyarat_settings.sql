-- Fares/Routes table
CREATE TABLE fares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  route_name TEXT NOT NULL,
  route_name_ar TEXT,
  route_name_ur TEXT,
  route_name_tr TEXT,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  price_min INTEGER,
  price_max INTEGER,
  currency TEXT DEFAULT 'SAR',
  vehicle_category TEXT,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ziyarat sites table
CREATE TABLE ziyarat_sites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  name_ur TEXT,
  name_tr TEXT,
  description TEXT,
  description_ar TEXT,
  description_ur TEXT,
  description_tr TEXT,
  city TEXT NOT NULL CHECK (city IN ('makkah', 'madinah', 'other')),
  category TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social media links table
CREATE TABLE social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL UNIQUE,
  url TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQs table
CREATE TABLE faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  question_ar TEXT,
  question_ur TEXT,
  question_tr TEXT,
  answer TEXT NOT NULL,
  answer_ar TEXT,
  answer_ur TEXT,
  answer_tr TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment methods table
CREATE TABLE payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  name_ur TEXT,
  name_tr TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE fares ENABLE ROW LEVEL SECURITY;
ALTER TABLE ziyarat_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- RLS Policies for fares
CREATE POLICY "fares_select" ON fares FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "fares_insert" ON fares FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "fares_update" ON fares FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "fares_delete" ON fares FOR DELETE TO authenticated USING (true);

-- RLS Policies for ziyarat_sites
CREATE POLICY "ziyarat_select" ON ziyarat_sites FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "ziyarat_insert" ON ziyarat_sites FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "ziyarat_update" ON ziyarat_sites FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "ziyarat_delete" ON ziyarat_sites FOR DELETE TO authenticated USING (true);

-- RLS Policies for social_links
CREATE POLICY "social_select" ON social_links FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "social_insert" ON social_links FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "social_update" ON social_links FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "social_delete" ON social_links FOR DELETE TO authenticated USING (true);

-- RLS Policies for faqs
CREATE POLICY "faqs_select" ON faqs FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "faqs_insert" ON faqs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "faqs_update" ON faqs FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "faqs_delete" ON faqs FOR DELETE TO authenticated USING (true);

-- RLS Policies for payment_methods
CREATE POLICY "payment_select" ON payment_methods FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "payment_insert" ON payment_methods FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "payment_update" ON payment_methods FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "payment_delete" ON payment_methods FOR DELETE TO authenticated USING (true);

-- Insert default fares
INSERT INTO fares (route_name, route_name_ar, route_name_ur, route_name_tr, from_location, to_location, price_min, price_max, vehicle_category, is_popular, sort_order) VALUES
('Madinah Airport → Hotel', 'مطار المدينة ← الفندق', 'مدینہ ایئر پورٹ ← ہوٹل', 'Medine Havalimanı → Otel', 'Madinah Airport', 'Hotel', 150, 200, 'sedan', true, 1),
('Makkah Airport → Hotel', 'مطار مكة ← الفندق', 'مکہ ایئر پورٹ ← ہوٹل', 'Mekke Havalimanı → Otel', 'Makkah Airport', 'Hotel', 250, 250, 'sedan', true, 2),
('Jeddah Airport → Hotel', 'مطار جدة ← الفندق', 'جددہ ایئر پورٹ ← ہوٹل', 'Cidde Havalimanı → Otel', 'Jeddah Airport', 'Hotel', 250, 250, 'sedan', true, 3),
('Riyadh → Makkah', 'الرياض ← مكة', 'ریاض ← مکہ', 'Riyad → Mekke', 'Riyadh', 'Makkah', 1000, 1000, 'suv', true, 4),
('Riyadh → Madinah', 'الرياض ← المدينة', 'ریاض ← مدینہ', 'Riyad → Medine', 'Riyadh', 'Madinah', 1000, 1000, 'suv', true, 5),
('Madinah Ziyarat', 'زيارات المدينة', 'مدینہ زیارات', 'Medine Ziyareti', 'Madinah', 'Ziyarat Sites', 250, 250, 'van', true, 6),
('Madinah → Jeddah', 'المدينة ← جدة', 'مدینہ ← جددہ', 'Medine → Cidde', 'Madinah', 'Jeddah', 450, 450, 'sedan', true, 7),
('Madinah → Makkah', 'المدينة ← مكة', 'مدینہ ← مکہ', 'Medine → Mekke', 'Madinah', 'Makkah', 500, 500, 'sedan', true, 8);

-- Insert Ziyarat sites
INSERT INTO ziyarat_sites (name, name_ar, name_ur, name_tr, description, description_ar, description_ur, description_tr, city, category, sort_order) VALUES
-- Makkah Ziyarat
('Jabal Al Noor', 'جبل النور', 'جبل نور', 'Nur Dağı', 'Mountain where the first revelation was received', 'الجبل الذي تلقى فيه النبي أول وحي', 'وہ پہاڑ جہاں پہلی وحی نازل ہوئی', 'İlk vahyin geldiği dağ', 'makkah', 'mountain', 1),
('Cave Hira', 'غار حراء', 'غارحراء', 'Hira Mağarası', 'Cave where Prophet Muhammad received the first revelation', 'الكهف الذي تلقى فيه النبي أول وحي', 'وہ غار جہاں نبی کو پہلی وحی ملی', 'Peygamberin ilk vahyi aldığı mağara', 'makkah', 'cave', 2),
('Jabal Thawr', 'جبل ثور', 'جبل ثور', 'Sevr Dağı', 'Mountain containing the cave where Prophet sheltered during Hijrah', 'الجبل الذي يضم الكهف الذي اختبأ فيه النبي أثناء الهجرة', 'وہ پہاڑ جس میں ہجرت کے دوران نبی نے پناہ لی', 'Hicret sırasında Peygamberin sığındığı mağaranın bulunduğu dağ', 'makkah', 'mountain', 3),
('Mina', 'منى', 'منی', 'Mina', 'Valley where pilgrims spend the night during Hajj', 'الوادي الذي يقضي فيه الحجاج الليل خلال الحج', 'وہ وادی جہاں حجاج حج کے دوران رات گزارتے ہیں', 'Hac sırasında hacıların geceyi geçirdiği vadi', 'makkah', 'valley', 4),
('Muzdalifah', 'مزدلفة', 'مزدلفہ', 'Müzdelife', 'Area where pilgrims collect pebbles for Rami', 'المنطقة التي يجمع فيها الحجاج الحصى للرمي', 'وہ علاقہ جہاں حجاج رمی کے لیے کنکر جمع کرتے ہیں', 'Hacıların Şeytan Taşlama için taş topladığı alan', 'makkah', 'valley', 5),
('Arafat', 'عرفات', 'عرفات', 'Arefe', 'Plain where the standing of Arafat takes place', 'السهل الذي يحدث فيه الوقوف بعرفات', 'وہ میدان جہاں عرفات کا وقوف ہوتا ہے', 'Arefe duruşunun gerçekleştiği düzlük', 'makkah', 'plain', 6),
-- Madinah Ziyarat
('Masjid Quba', 'مسجد قباء', 'مسجد قباء', 'Kuba Mescidi', 'First mosque built in Islam. Praying here equals one Umrah', 'أول مسجد بني في الإسلام. الصلاة فيه تعدل عمرة', 'اسلام میں بنایا جانے والی پہلی مسجد۔ یہاں نماز ایک عمرہ کے برابر ہے', 'İslam''da inşa edilen ilk mescit. Burada namaz kılmak bir Umreye denktir', 'madinah', 'mosque', 7),
('Masjid Qiblatain', 'مسجد القبلتين', 'مسجد قبلتین', 'Kıbleteyn Mescidi', 'Mosque where the Qibla direction was changed from Jerusalem to Makkah', 'المسجد الذي تغيرت فيه اتجاه القبلة من القدس إلى مكة', 'وہ مسجد جہاں قبلہ کا رخ بیت المقدس سے مکہ کی طرف تبدیل ہوا', 'Kıblenin Kudüs''ten Mekke''ye çevrildiği mescit', 'madinah', 'mosque', 8),
('Jannat Al Baqi', 'جنة البقيع', 'جنت البقیع', 'Cennetül Baki', 'Main cemetery of Madinah where many companions are buried', 'المقبرة الرئيسية في المدينة حيث دفن الكثير من الصحابة', 'مدینہ کا مرکزی قبرستان جہاں بہت سے صحابہ مدفون ہیں', 'Peygamberin ashabının çoğunun gömülü olduğu Medine''nin ana mezarlığı', 'madinah', 'cemetery', 9),
('Uhud Mountain', 'جبل أحد', 'جبل احد', 'Uhud Dağı', 'Site of the Battle of Uhud and martyrs cemetery', 'موقع غزوة أحد ومقبرة الشهداء', 'غزوہ احد اور شہداء کے قبرستان کا مقام', 'Uhud Savaşı ve şehitlik mezarlığının bulunduğu yer', 'madinah', 'mountain', 10),
('Seven Mosques', 'المساجد السبعة', 'سات مساجد', 'Yedi Mescit', 'Complex of seven small mosques from the Battle of the Trench', 'مجمع من سبعة مساجد صغيرة من غزوة الخندق', 'غزوہ خندق کے سات چھوٹی مسجدوں کا مجمع', 'Hendek Savaşı''ndan kalma yedi küçük mescit kompleksi', 'madinah', 'mosque', 11);

-- Insert social links
INSERT INTO social_links (platform, url, icon, sort_order) VALUES
('facebook', 'https://facebook.com/zakarasma', 'Facebook', 1),
('instagram', 'https://instagram.com/zakarasma', 'Instagram', 2),
('whatsapp', 'https://wa.me/966501416110', 'MessageCircle', 3),
('email', 'mailto:Zakarasma@harmain.com', 'Mail', 4);

-- Insert FAQs
INSERT INTO faqs (question, question_ar, question_ur, question_tr, answer, answer_ar, answer_ur, answer_tr, sort_order) VALUES
('How do I book a taxi?', 'كيف أحجز سيارة أجرة؟', 'میں ٹیکسی کیسے بک کروں؟', 'Nasıl taksi kiralarım?', 'You can book our taxi service through our website, WhatsApp, or by calling our 24/7 customer support. Simply provide your pickup location, destination, date, time, and number of passengers.', 'يمكنك حجز خدمة التاكسي من خلال موقعنا الإلكتروني أو الواتساب أو الاتصال بدعم العملاء على مدار الساعة. فقط قدم موقع الاستلام والوجهة والتاريخ والوقت وعدد الركاب.', 'آپ ہماری ویب سائٹ، واٹس اپ، یا 24/7 کسٹمر سپورٹ پر کال کر کے ہماری ٹیکسی سروس بک کر سکتے ہیں۔ فقط اپنا پک اپ لوکیشن، منزل، تاریخ، وقت اور مسافروں کی تعداد بتائیں۔', 'Web sitemiz, WhatsApp veya 7/24 müşteri hizmetlerini arayarak taksi hizmetimizi rezerve edebilirsiniz. Sadece alış noktanızı, varış noktanızı, tarih, saat ve yolcu sayısını belirtin.', 1),
('Can I pay online?', 'هل يمكنني الدفع عبر الإنترنت؟', 'کیا میں آن لائن ادائیگی کر سکتا ہوں؟', 'Online ödeme yapabilir miyim?', 'Yes, we accept online payments through credit cards, debit cards, and other digital payment methods. You can also pay in cash directly to the driver.', 'نعم، نقبل الدفع عبر الإنترنت من خلال البطاقات الائتمانية وبطاقات الخصم وطرق الدفع الرقمية الأخرى. يمكنك أيضاً الدفع نقداً مباشرة للسائق.', 'جی ہاں، ہم کریڈٹ کارڈز، ڈیبٹ کارڈز اور دیگر ڈیجیٹل ادائیگی کے طریقوں سے آن لائن ادائیگی قبول کرتے ہیں۔ آپ ڈرائیور کو براہ راست نقد بھی دے سکتے ہیں۔', 'Evet, kredi kartları, banka kartları ve diğer dijital ödeme yöntemleri ile online ödemeleri kabul ediyoruz. Sürücüye nakit de ödeyebilirsiniz.', 2),
('Do you provide airport transfers?', 'هل توفرون خدمة نقل المطار؟', 'کیا آپ ایئر پورٹ ٹرانسفر فراہم کرتے ہیں؟', 'Havalimanı transferi sunuyor musunuz?', 'Yes, we offer airport transfer services from Jeddah, Madinah, and Makkah airports. Our drivers will meet you at the arrivals with a name sign and assist with your luggage.', 'نعم، نقدم خدمات نقل المطار من مطارات جدة والمدينة ومكة. سيلتقيكم سائقونا عند وصولكم مع لوحة تحمل اسمكم ويساعدونكم في أمتعتكم.', 'جی ہاں، ہم جددہ، مدینہ اور مکہ ایئر پورٹس سے ایئر پورٹ ٹرانسفر سروسز پیش کرتے ہیں۔ ہمارے ڈرائیورز آپ کے نام کی تختی لے کر آمد پر آپ سے ملیں گے اور آپ کے سامان میں مدد کریں گے۔', 'Evet, Cidde, Medine ve Mekke havalimanlarından transfer hizmetleri sunuyoruz. Sürücülerimiz isminizin yazılı olduğu tabelayla varışta sizi karşılayacak ve bagajınızda yardımcı olacak.', 3),
('Do you provide Ziyarat tours?', 'هل توفرون جولات الزيارات؟', 'کیا آپ زیارات ٹورز فراہم کرتے ہیں؟', 'Ziyaret turları sunuyor musunuz?', 'Yes, we offer guided Ziyarat tours to all significant Islamic sites in Makkah and Madinah, including Jabal Al Noor, Cave Hira, Masjid Quba, Uhud, and more.', 'نعم، نقدم جولات موجهة لجميع المواقع الإسلامية الهامة في مكة والمدينة، بما في ذلك جبل النور وغار حراء ومسجد قباء وأحد وغيرها.', 'جی ہاں، ہم مکہ اور مدینہ میں تمام اہم اسلامی مقامات پر گائیڈڈ زیارات ٹورز پیش کرتے ہیں، بشمول جبل نور، غارحراء، مسجد قباء، احد اور مزید۔', 'Evet, Nur Dağı, Hira Mağarası, Kuba Mescidi, Uhud ve daha fazlası dahil olmak üzere Mekke ve Medine''deki tüm önemli İslami mekanlara rehberli ziyaret turları sunuyoruz.', 4),
('Do you operate 24/7?', 'هل تعملون على مدار الساعة؟', 'کیا آپ 24/7 کام کرتے ہیں؟', '7/24 hizmet veriyor musunuz?', 'Yes, our services are available 24 hours a day, 7 days a week. You can book at any time through our website or WhatsApp.', 'نعم، خدماتنا متاحة على مدار الساعة وطوال أيام الأسبوع. يمكنك الحجز في أي وقت من خلال موقعنا أو الواتساب.', 'جی ہاں، ہماری خدمات 24 گھنٹے، ہفتے کے 7 دن دستیاب ہیں۔ آپ کسی بھی وقت ہماری ویب سائٹ یا واٹس اپ کے ذریعے بکنگ کر سکتے ہیں۔', 'Evet, hizmetlerimiz günün 24 saati, haftanın 7 günü mevcuttur. Web sitemiz veya WhatsApp üzerinden her zaman rezervasyon yapabilirsiniz.', 5),
('Can I book in advance?', 'هل يمكنني الحجز مقدماً؟', 'کیا میں پہلے سے بکنگ کر سکتا ہوں؟', 'Önceden rezervasyon yapabilir miyim?', 'Yes, we recommend booking in advance especially during peak seasons like Hajj and Ramadan. Early booking ensures vehicle availability and better rates.', 'نعم، ننصح بالحجز مقدماً خاصة خلال مواسم الذروة مثل الحج ورمضان. الحجز المبكر يضمن توفر المركبة وأسعاراً أفضل.', 'جی ہاں، ہم حج اور رمضان جیسے مصروف مواسم میں پہلے سے بکنگ کرنے کی سفارش کرتے ہیں۔ جلد بکنگ گاڑی کی دستیابی اور بہتری قیمتیں یقینی بناتی ہے۔', 'Evet, özellikle Hac ve Ramazan gibi yoğun sezonlarda önceden rezervasyon yapmanızı öneririz. Erken rezervasyon, araç bulunabilirliğini ve daha iyi fiyatları garanti eder.', 6);

-- Insert payment methods
INSERT INTO payment_methods (name, name_ar, name_ur, name_tr, icon, sort_order) VALUES
('Cash', 'نقداً', 'نقد', 'Nakit', 'Banknote', 1),
('Credit Card', 'بطاقة ائتمان', 'کریڈٹ کارڈ', 'Kredi Kartı', 'CreditCard', 2),
('Debit Card', 'بطاقة خصم', 'ڈیبٹ کارڈ', 'Banka Kartı', 'CreditCard', 3),
('Online Payment', 'دفع عبر الإنترنت', 'آن لائن ادائیگی', 'Online Ödeme', 'Globe', 4);

-- Update site settings with new contact info
UPDATE site_settings SET value = '+966 50 141 6110' WHERE key = 'phone';
UPDATE site_settings SET value = '+966501416110' WHERE key = 'whatsapp';
UPDATE site_settings SET value = 'Zakarasma@harmain.com' WHERE key = 'email';
INSERT INTO site_settings (key, value) VALUES ('email_secondary', 'Zakarasma@umrahtaxi.com') ON CONFLICT (key) DO UPDATE SET value = 'Zakarasma@umrahtaxi.com';
INSERT INTO site_settings (key, value) VALUES ('google_maps_url', 'https://maps.app.goo.gl/w47SGshx3WfPcx46A') ON CONFLICT (key) DO UPDATE SET value = 'https://maps.app.goo.gl/w47SGshx3WfPcx46A';
INSERT INTO site_settings (key, value) VALUES ('fare_notice', 'Prices may vary according to route, vehicle type, season and customer requirements.') ON CONFLICT (key) DO UPDATE SET value = 'Prices may vary according to route, vehicle type, season and customer requirements.';
INSERT INTO site_settings (key, value) VALUES ('fare_notice_ar', 'قد تختلف الأسعار حسب المسار ونوع المركبة والموسم ومتطلبات العميل.') ON CONFLICT (key) DO UPDATE SET value = 'قد تختلف الأسعار حسب المسار ونوع المركبة والموسم ومتطلبات العميل.';
INSERT INTO site_settings (key, value) VALUES ('fare_notice_ur', 'قیمتیں روٹ، گاڑی کی قسم، سیزن اور کلائنٹ کی ضروریات کے مطابق مختلف ہو سکتی ہیں۔') ON CONFLICT (key) DO UPDATE SET value = 'قیمتیں روٹ، گاڑی کی قسم، سیزن اور کلائنٹ کی ضروریات کے مطابق مختلف ہو سکتی ہیں۔';
INSERT INTO site_settings (key, value) VALUES ('fare_notice_tr', 'Fiyatlar güzergah, araç tipi, sezon ve müşteri gereksinimlerine göre değişebilir.') ON CONFLICT (key) DO UPDATE SET value = 'Fiyatlar güzergah, araç tipi, sezon ve müşteri gereksinimlerine göre değişebilir.';