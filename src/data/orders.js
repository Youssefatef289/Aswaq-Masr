export const initialOrders = [
  {
    id: 'ASM-10892',
    customerName: 'أحمد محمود حسن',
    phone: '01012345678',
    governorate: 'القاهرة',
    city: 'المعادي',
    address: 'شارع 9، برج النخيل، الدور 4',
    date: '2026-09-14T14:30:00Z',
    status: 'out-for-delivery', // 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled'
    statusLabel: 'في الطريق للتسليم',
    paymentMethod: 'الدفع عند الاستلام',
    subtotal: 735,
    shippingCost: 30,
    discount: 35,
    total: 730,
    items: [
      { id: 'prod-1', name: 'أرز مصري فاخر عريض الحبة - 5 كجم', price: 185, quantity: 2, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80' },
      { id: 'prod-3', name: 'مسحوق غسيل أوتوماتيك أريال لافندر - 4 كجم', price: 310, quantity: 1, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=300&q=80' },
      { id: 'prod-8', name: 'شاي ليبتون العلامة الصفراء ناعم - 250 جم', price: 65, quantity: 1, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  {
    id: 'ASM-10891',
    customerName: 'سارة عبد الله خالد',
    phone: '01198765432',
    governorate: 'الجيزة',
    city: 'الدقي',
    address: 'شارع مصدق، عمارة 15، شقة 2',
    date: '2026-09-13T10:15:00Z',
    status: 'delivered',
    statusLabel: 'تم التوصيل',
    paymentMethod: 'الدفع عند الاستلام',
    subtotal: 580,
    shippingCost: 30,
    discount: 0,
    total: 610,
    items: [
      { id: 'prod-2', name: 'حليب جهينة كامل الدسم - 1 لتر (عبوة 6 قطع)', price: 240, quantity: 1, image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=300&q=80' },
      { id: 'prod-4', name: 'زيت عباد الشمس كريستال نقي - 2.2 لتر', price: 195, quantity: 1, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80' },
      { id: 'prod-7', name: 'صابون دوف للجمال قالب ترطيب أصلي - 135 جم', price: 145, quantity: 1, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80' }
    ]
  },
  {
    id: 'ASM-10890',
    customerName: 'محمد طارق فاروق',
    phone: '01234567890',
    governorate: 'الإسكندرية',
    city: 'سموحة',
    address: 'شارع فوزي معاذ، أمام حديقة النزهة',
    date: '2026-09-15T09:40:00Z',
    status: 'preparing',
    statusLabel: 'جاري تجهيز الطلب',
    paymentMethod: 'بطاقة بنكية',
    subtotal: 1450,
    shippingCost: 40,
    discount: 50,
    total: 1440,
    items: [
      { id: 'prod-16', name: 'خلاط يدوي تورنيدو هاند بلندر 1000 وات مع مضرب ومفرمة', price: 1450, quantity: 1, image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=300&q=80' }
    ]
  }
];

