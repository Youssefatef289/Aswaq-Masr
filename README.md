# 🛒 منصة أسواق مصر للتجارة الإلكترونية (Aswaaq Masr) 🇪🇬

منصة متكاملة واحترافية للتسوق الإلكتروني والسوبرماركت بنطاق حصري لمحافظة **بني سويف**، مبنية بأحدث التقنيات: **React 18**، **Vite**، **Tailwind CSS**، و **Supabase Backend**، مع دعم كامل للغة العربية (RTL) وتجربة مستخدم فائقة السلاسة على جميع الأجهزة.

![Aswaaq Masr Preview](https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 الميزات الرئيسية (Key Features)

### 🛍️ واجهة المتجر وتجربة التسوق (Storefront):
- **Hero Slider متجاوب 100%**: مصمم باحترافية للشاشات الكبيرة والهواتف الذكية مع تباين فائق ونصوص واضحة.
- **سلة التسوق الجانبية (Slide-over Cart Drawer)**: فتح فوري وسلس لمودال السلة الجانبي مع إمكانية إتمام الطلب وتطبيق الكوبونات خطوة بخطوة دون مغادرة الصفحة.
- **الطلب المباشر عبر الواتساب (WhatsApp Direct Order)**: تجهيز رسالة الفاتورة والمنتجات والعنوان وفتح محادثة الواتساب بضغطة زر واحدة.
- **نطاق التوصيل الحصري (بني سويف)**: تغطية كافة مراكز وأحياء محافظة بني سويف (مدينة بني سويف، شرق النيل، الواسطى، ناصر، إهناسيا، ببا، الفشن، سمسطا) مع احتساب تكلفة الشحن المناسبة لكل مركز.
- **شجرة البحث المتقدمة (Advanced Search Tree)**: بحث فوري يدمج المنتجات، الأقسام، وكافة الماركات المسجلة ذات الصلة (مثل إظهار منتجات وبراندات الزبادي عند البحث عن "زبادي").
- **تتبع الطلبات المباشر (Order Tracking Timeline)**: شريط مراحل التوصيل بأيقونات ملونة ومتابعة الطلب برقم الفاتورة.
- **قائمة المفضلة (Wishlist)**: حفظ المنتجات ومزامنتها ونقلها للسلة بسهولة.
- **شريط التواصل العائم (Floating Contact Widget)**: وصول سريع للواتساب، الاتصال الهاتفي، وصفحات فيسبوك وانستجرام.
- **تصميم الفوتر المركزي**: لوجو مميز في المنتصف، السلوجن، وأزرار التواصل المنظمة.

---

### 👑 لوحة التحكم الإدارية (Admin Dashboard CMS):
- **إحصائيات ومخططات مبيعات تفاعلية (Sales Analytics & Charts)**.
- **إدارة المنتجات (Products CMS)**: إضافة، تعديل، حذف، ضبط الأسعار، المخزون، والأكواد (SKU).
- **إدارة الأقسام والبراندات والعروض (Categories, Brands & Offers CMS)**.
- **إدارة الطلبات (Orders Management)**: متابعة تفاصيل الفواتير وتحديث حالات الطلبات فوريًا (`Pending`, `Confirmed`, `Preparing`, `Out for Delivery`, `Delivered`, `Cancelled`).
- **سجل العملاء وإعدادات المتجر (Customers & Store Settings)**.

---

## 🔐 بيانات اعتماد مسؤول لوحة التحكم (Admin Credentials):

- **الرابط:** `/admin` أو تسجيل الدخول من `/login`
- **اسم المستخدم (Username):** `admin@aswaqmasr.com` (أو `admin`)
- **كلمة المرور (Password):** `Admin@AswaqMasr2026`

---

## 🗄️ إعداد وقواعد بيانات Supabase (Backend Setup)

### 1. إنشاء الجداول وتفعيل الـ Schema:
قم بفتح مشروعك في [Supabase](https://supabase.com)، ثم انتقل إلى **SQL Editor**، وقم بنسخ ولصق محتويات ملف [`supabase_schema.sql`](./supabase_schema.sql) والضغط على **Run**.

يتضمن المخطط الجداول التالية:
* `products`: المنتجات، التصنيفات، الماركات، الأسعار، والمخزون.
* `categories`: الأقسام والصور والروابط.
* `brands`: الماركات التجارية والشعارات.
* `orders`: الطلبات، العناوين، وبيانات العملاء.
* `users`: المستخدمين وصلاحيات الأدمن.
* `settings`: إعدادات المتجر والتواصل.

### 2. إعداد المتغيرات البيئية (`.env`):
قم بإنشاء ملف `.env` في المجلد الرئيسي للمشروع وأضف مفاتيح مشروعك في Supabase:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

*(يعمل الموقع بنظام Fallback ذكي ومتزامن مع التخزين المحلي في حال عدم ضبط المفاتيح لضمان تجربة فورية متواصلة).*

---

## 🚀 التثبيت والتشغيل المحلي (Installation & Run)

```bash
# 1. استنساخ المستودع
git clone https://github.com/Youssefatef289/Aswaq-Masr.git

# 2. الدخول لمجلد المشروع
cd Aswaq-Masr

# 3. تثبيت الحزم
npm install

# 4. تشغيل خادم التطوير السريع
npm run dev

# 5. بناء نسخة الإنتاج
npm run build
```

---

## 📂 هيكل المشروع (Project Structure)

```text
aswaaq-masr/
├── supabase_schema.sql      # مخطط واستعلامات قواعد بيانات Supabase
├── .env.example             # نموذج المتغيرات البيئية
├── src/
│   ├── components/
│   │   ├── cart/            # CartDrawer (Slide-over Modal)
│   │   ├── common/          # Header, Footer, BottomNav, FloatingContactWidget, Breadcrumbs
│   │   ├── home/            # HeroSlider, CategoriesGrid, FeaturedOffers, BrandsSlider
│   │   └── product/         # ProductCard, ProductGrid, ProductFilter
│   ├── context/             # AuthContext, CartContext, WishlistContext, AdminDataContext, ToastContext
│   ├── data/                # Initial Data & Mock Fallbacks (products, categories, brands, governorates)
│   ├── layouts/             # MainLayout, AdminLayout, AuthLayout
│   ├── pages/               # Storefront & Admin Pages
│   ├── routes/              # AppRoutes.jsx
│   ├── services/            # supabase.js (Client & Service Layer)
│   └── styles/              # index.css (Tailwind & Brand Tokens)
```

---

## 📜 الترخيص وحقوق الملكية

جميع الحقوق محفوظة © 2026 **أسواق مصر** - صُنع بكل فخر في جمهورية مصر العربية 🇪🇬.

