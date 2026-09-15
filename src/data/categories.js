export const initialCategories = [
  {
    id: 'food-cupboard',
    name: 'مواد غذائية ومؤن',
    nameEn: 'Food Cupboard',
    slug: 'food-cupboard',
    description: 'أجود أنواع الأرز، المكرونة، الزيوت، السمن، السكر، والبقوليات بأفضل الأسعار.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1400&q=80',
    productCount: 42,
    subCategories: ['أرز ومكرونة', 'زيوت وسمن', 'بقوليات وحبوب', 'صلصات وتوابل', 'معلبات']
  },
  {
    id: 'beverages',
    name: 'مشروبات وعصائر',
    nameEn: 'Beverages',
    slug: 'beverages',
    description: 'شاي، قهوة، مشروبات غازية، عصائر طبيعية ومياه معدنية لكل العائلة.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1400&q=80',
    productCount: 28,
    subCategories: ['شاي وأعشاب', 'بن وقهوة', 'مياه معدنية', 'عصائر طبيعية', 'مشروبات غازية']
  },
  {
    id: 'dairy-eggs',
    name: 'ألبان، أجبان وبيض',
    nameEn: 'Dairy & Eggs',
    slug: 'dairy-eggs',
    description: 'حليب طازج، أجبان بيضاء ورومي وشيدر، زبادي، وبيض مزارع طازج يومياً.',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1400&q=80',
    productCount: 35,
    subCategories: ['حليب معبأ وطازج', 'أجبان متنوعة', 'زبادي ورائب', 'زبدة وقشطة', 'بيض طازج']
  },
  {
    id: 'cleaning-household',
    name: 'منظفات وعناية بالمنزل',
    nameEn: 'Cleaning & Household',
    slug: 'cleaning-household',
    description: 'مساحيق غسيل، معطرات، مناديل، أدوات نظافة ومطهرات قوية لحماية منزلك.',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1400&q=80',
    productCount: 38,
    subCategories: ['مساحيق غسيل', 'مطهرات ومعقمات', 'منظفات أطباق', 'مناديل وورقيات', 'معطرات جو']
  },
  {
    id: 'personal-care',
    name: 'عناية شخصية وجمال',
    nameEn: 'Personal Care',
    slug: 'personal-care',
    description: 'شامبوهات، صابون، معجون أسنان، عناية بالبشرة والشعر للرجال والنساء.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80',
    productCount: 30,
    subCategories: ['عناية بالشعر', 'عناية بالبشرة', 'استحمام وصابون', 'عناية بالفم والأسنان', 'عطور ومزيلات عرق']
  },
  {
    id: 'baby-care',
    name: 'مستلزمات الأطفال والرضع',
    nameEn: 'Baby Care',
    slug: 'baby-care',
    description: 'حفاضات، أطعمة رضع، مناديل مبللة، وشامبوهات آمنة لبشرة طفلك الحساسة.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1400&q=80',
    productCount: 22,
    subCategories: ['حفاضات ومناديل', 'طعام وحليب أطفال', 'عناية واستحمام الرضيع', 'إكسسوارات الرضاعة']
  },
  {
    id: 'home-kitchen',
    name: 'أدوات وأجهزة منزلية',
    nameEn: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'أطقم طهي، خلاطات، غلايات كهربائية، أدوات مطبخ وأجهزة منزلية صغيرة معتمدة.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1400&q=80',
    productCount: 25,
    subCategories: ['أجهزة مطبخ صغيرة', 'أواني وأطقم طهي', 'أدوات سفرة ومائدة', 'تخزين وتنظيم']
  },
  {
    id: 'snacks-sweets',
    name: 'حلويات وشوكولاتة ومسليات',
    nameEn: 'Snacks & Sweets',
    slug: 'snacks-sweets',
    description: 'بسكويت، شيبسي، مكسرات، شوكولاتة فاخرة، وحلويات لكل الأوقات السعيدة.',
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1400&q=80',
    productCount: 34,
    subCategories: ['شوكولاتة وكاندي', 'بسكويت وكيك', 'شيبس وسناكس', 'مكسرات وفاكهة مجففة']
  }
];

