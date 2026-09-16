export const initialProducts = [
  {
    id: 'prod-yogurt-1',
    name: 'زبادي جهينة طبيعي كامل الدسم - عبوة عائلية (6 قطع × 105 جم)',
    brandId: 'juhayna',
    brandName: 'جهينة',
    categoryId: 'dairy-eggs',
    categoryName: 'ألبان، أجبان وبيض',
    price: 48,
    oldPrice: 58,
    discount: 17,
    rating: 4.9,
    reviewsCount: 165,
    stock: 80,
    sku: 'JUH-YOG-NAT-6X',
    isBestSeller: true,
    isNew: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'زبادي جهينة الطبيعي الطازج المحضر من حليب بقري نقي 100%، غني بالبروبيوتيك والكالسيوم لتعزيز الهضم وصحة الأسرة يومياً.',
    specifications: [
      { key: 'الكمية', value: '6 أكواب × 105 جرام' },
      { key: 'النوع', value: 'زبادي طبيعي طازج' },
      { key: 'نسبة الدسم', value: 'كامل الدسم' }
    ]
  },
  {
    id: 'prod-yogurt-2',
    name: 'زبادي جهينة لايت خالي الدسم - 105 جم (عرض 4 قطع)',
    brandId: 'juhayna',
    brandName: 'جهينة',
    categoryId: 'dairy-eggs',
    categoryName: 'ألبان، أجبان وبيض',
    price: 34,
    oldPrice: 40,
    discount: 15,
    rating: 4.8,
    reviewsCount: 92,
    stock: 60,
    sku: 'JUH-YOG-LIGHT-4X',
    isBestSeller: false,
    isNew: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'زبادي لايت خفيف ولذيذ بدون أي دسم إضافي، مثالي لمتبعي الحمية الغذائية والرياضيين ومحبي الرشاقة.',
    specifications: [
      { key: 'الكمية', value: '4 أكواب × 105 جرام' },
      { key: 'النوع', value: 'زبادي لايت خالي الدسم' }
    ]
  },
  {
    id: 'prod-yogurt-3',
    name: 'زبادي جهينة بالفراولة الطبيعية وقطع الفواكه - 105 جم',
    brandId: 'juhayna',
    brandName: 'جهينة',
    categoryId: 'dairy-eggs',
    categoryName: 'ألبان، أجبان وبيض',
    price: 12,
    oldPrice: 15,
    discount: 20,
    rating: 4.9,
    reviewsCount: 128,
    stock: 90,
    sku: 'JUH-YOG-STRAW',
    isBestSeller: true,
    isNew: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'زبادي فواكه كريمي ولذيذ غني بقطع الفراولة الطبيعية ومحبوب لدى الأطفال والكبار كوجبة خفيفة ومغذية.',
    specifications: [
      { key: 'الوزن', value: '105 جرام' },
      { key: 'النكهة', value: 'فراولة طبيعية' }
    ]
  },
  {
    id: 'prod-1',
    name: 'أرز مصري فاخر عريض الحبة - 5 كجم',
    brandId: 'el-doha',
    brandName: 'الضحى',
    categoryId: 'food-cupboard',
    categoryName: 'مواد غذائية ومؤن',
    price: 185,
    oldPrice: 220,
    discount: 16,
    rating: 4.9,
    reviewsCount: 142,
    stock: 50,
    sku: 'DOH-RICE-5KG',
    isBestSeller: true,
    isNew: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'أرز مصري درجة أولى منقى ومغسول إلكترونياً بأعلى معايير الجودة والنقاء، حبة عريضة متماسكة لا تعجن ومثالية لجميع الأطباق والولائم الشرقية.',
    specifications: [
      { key: 'الوزن الصافي', value: '5 كيلوجرام' },
      { key: 'نوع الأرز', value: 'مصري عريض الحبة نمرة 1' },
      { key: 'التعبئة', value: 'كيس محكم الإغلاق' },
      { key: 'بلد المنشأ', value: 'مصر' }
    ]
  },
  {
    id: 'prod-2',
    name: 'حليب جهينة كامل الدسم - 1 لتر (عبوة 6 قطع)',
    brandId: 'juhayna',
    brandName: 'جهينة',
    categoryId: 'dairy-eggs',
    categoryName: 'ألبان، أجبان وبيض',
    price: 240,
    oldPrice: 275,
    discount: 13,
    rating: 4.8,
    reviewsCount: 98,
    stock: 35,
    sku: 'JUH-MILK-FULL-6X1',
    isBestSeller: true,
    isNew: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'حليب بقري طبيعي 100% مبستر ومعقم بأحدث التقنيات للحفاظ على الفيتامينات والكالسيوم الطبيعي. طعم غني ومثالي للأسرة والقهوة.',
    specifications: [
      { key: 'الحجم', value: '6 × 1 لتر (كرتونة)' },
      { key: 'نسبة الدسم', value: 'كامل الدسم (3%)' },
      { key: 'المكونات', value: 'حليب بقري طبيعي 100%' }
    ]
  },
  {
    id: 'prod-3',
    name: 'مسحوق غسيل أوتوماتيك أريال لافندر - 4 كجم',
    brandId: 'ariel',
    brandName: 'أريال',
    categoryId: 'cleaning-household',
    categoryName: 'منظفات وعناية بالمنزل',
    price: 310,
    oldPrice: 380,
    discount: 18,
    rating: 4.9,
    reviewsCount: 215,
    stock: 45,
    sku: 'ARIEL-AUTO-4KG',
    isBestSeller: true,
    isNew: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'يقضي على أصعب البقع في غسلة واحدة حتى في الماء البارد مع انتعاش عطر اللافندر الفرنسي الذي يدوم طويلاً.',
    specifications: [
      { key: 'الوزن', value: '4 كجم' },
      { key: 'نوع الغسالة', value: 'الغسالات الأوتوماتيك وفوق الأوتوماتيك' }
    ]
  },
  {
    id: 'prod-4',
    name: 'زيت عباد الشمس كريستال نقي - 2.2 لتر',
    brandId: 'crystal',
    brandName: 'كريستال',
    categoryId: 'food-cupboard',
    categoryName: 'مواد غذائية ومؤن',
    price: 195,
    oldPrice: 230,
    discount: 15,
    rating: 4.7,
    reviewsCount: 84,
    stock: 60,
    sku: 'CRYS-SUN-2.2L',
    isBestSeller: true,
    isNew: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'زيت عباد شمس مكرر ونقي 100% معزز بفيتامين A و D، خفيف على المعدة وخالٍ من الكوليسترول.',
    specifications: [
      { key: 'السعة', value: '2.2 لتر' },
      { key: 'النوع', value: 'زيت عباد شمس صافي' }
    ]
  },
  {
    id: 'prod-5',
    name: 'قهوة نسكافيه كلاسيك سريعة التحضير - 200 جرام برطمان',
    brandId: 'nescafe',
    brandName: 'نسكافيه',
    categoryId: 'beverages',
    categoryName: 'مشروبات وعصائر',
    price: 165,
    oldPrice: 195,
    discount: 15,
    rating: 4.9,
    reviewsCount: 160,
    stock: 40,
    sku: 'NES-CLASS-200G',
    isBestSeller: true,
    isNew: false,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'حبوب بن روبوستا محمصة بعناية 100% لتقديم نكهة غنية قوية ورائحة قهوة منعشة.',
    specifications: [
      { key: 'الوزن', value: '200 جرام' }
    ]
  },
  {
    id: 'prod-6',
    name: 'حفاضات بامبرز بريميوم كير مقاس 4 (ماكسي 9-14 كجم) - 60 حفاضة',
    brandId: 'pampers',
    brandName: 'بامبرز',
    categoryId: 'baby-care',
    categoryName: 'مستلزمات الأطفال والرضع',
    price: 360,
    oldPrice: 420,
    discount: 14,
    rating: 4.8,
    reviewsCount: 110,
    stock: 25,
    sku: 'PAMP-PREM-SZ4-60',
    isBestSeller: false,
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'أفضل حماية للبشرة من بامبرز بنعومة فائقة وقنوات امتصاص ثلاثية ومؤشر للبلل.',
    specifications: [
      { key: 'المقاس', value: 'مقاس 4 (9 إلى 14 كجم)' },
      { key: 'العدد', value: '60 حفاضة' }
    ]
  },
  {
    id: 'prod-7',
    name: 'صابون دوف للجمال قالب ترطيب أصلي - 135 جم (4 قطع)',
    brandId: 'dove',
    brandName: 'دوف',
    categoryId: 'personal-care',
    categoryName: 'عناية شخصية وجمال',
    price: 145,
    oldPrice: 175,
    discount: 17,
    rating: 4.9,
    reviewsCount: 175,
    stock: 55,
    sku: 'DOVE-BAR-4X135G',
    isBestSeller: true,
    isNew: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'تركيبة دوف الأصلية الكلاسيكية الممزوجة بـ 1/4 كريم مرطب تحافظ على رطوبة بشرتك.',
    specifications: [
      { key: 'العدد والوزن', value: '4 قوالب × 135 جرام' }
    ]
  },
  {
    id: 'prod-8',
    name: 'شاي ليبتون العلامة الصفراء ناعم - 250 جم',
    brandId: 'lipton',
    brandName: 'ليبتون',
    categoryId: 'beverages',
    categoryName: 'مشروبات وعصائر',
    price: 65,
    oldPrice: 78,
    discount: 16,
    rating: 4.8,
    reviewsCount: 310,
    stock: 80,
    sku: 'LIP-TEA-250G',
    isBestSeller: true,
    isNew: false,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'شاي أحمر كلاسيكي مصنع من أجود براعم الشاي المجففة تحت أشعة الشمس.',
    specifications: [
      { key: 'الوزن', value: '250 جرام' }
    ]
  },
  {
    id: 'prod-9',
    name: 'سائل غسيل الأطباق فيري بلس بالليمون - 1 لتر',
    brandId: 'fairy',
    brandName: 'فيري',
    categoryId: 'cleaning-household',
    categoryName: 'منظفات وعناية بالمنزل',
    price: 68,
    oldPrice: 85,
    discount: 20,
    rating: 4.9,
    reviewsCount: 190,
    stock: 70,
    sku: 'FAIRY-LEM-1L',
    isBestSeller: true,
    isNew: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'تركيبة مركزة للغاية بقطرة واحدة تقضي على أصعب الدهون وتمنح أوانيك لمعاناً فائقاً.',
    specifications: [
      { key: 'الحجم', value: '1 لتر' }
    ]
  },
  {
    id: 'prod-10',
    name: 'شوكولاتة كادبوري ديري ميلك سادة فاخرة - 90 جم (عرض 3 قطع)',
    brandId: 'cadbury',
    brandName: 'كادبوري',
    categoryId: 'snacks-sweets',
    categoryName: 'حلويات وشوكولاتة ومسليات',
    price: 135,
    oldPrice: 165,
    discount: 18,
    rating: 4.9,
    reviewsCount: 140,
    stock: 50,
    sku: 'CAD-DAIRY-3X90G',
    isBestSeller: false,
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'شوكولاتة الحليب الناعمة والشهيرة من كادبوري مصنوعة من الحليب الطازج.',
    specifications: [
      { key: 'الوزن', value: '3 ألواح × 90 جرام' }
    ]
  },
  {
    id: 'prod-11',
    name: 'غلاية مياه كهربائية ستانلس ستيل تورنيدو - 1.7 لتر (2200 وات)',
    brandId: 'tornado',
    brandName: 'تورنيدو',
    categoryId: 'home-kitchen',
    categoryName: 'أدوات وأجهزة منزلية',
    price: 699,
    oldPrice: 850,
    discount: 17,
    rating: 4.8,
    reviewsCount: 88,
    stock: 18,
    sku: 'TOR-KETTLE-1.7L',
    isBestSeller: false,
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'غلاية تورنيدو من الفولاذ المقاوم للصدأ الصحي عالي المتانة، قدرة 2200 وات لغليان فائق السرعة.',
    specifications: [
      { key: 'القدرة الكهربائية', value: '2200 وات' },
      { key: 'السعة', value: '1.7 لتر' }
    ]
  },
  {
    id: 'prod-12',
    name: 'مكرونة الضحى فرن بيني ريجاتي - 400 جم (عرض 5 أكياس)',
    brandId: 'el-doha',
    brandName: 'الضحى',
    categoryId: 'food-cupboard',
    categoryName: 'مواد غذائية ومؤن',
    price: 95,
    oldPrice: 115,
    discount: 17,
    rating: 4.9,
    reviewsCount: 130,
    stock: 65,
    sku: 'DOH-PENNE-5X400G',
    isBestSeller: true,
    isNew: false,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'مكرونة فاخرة مصنعة من سيمولينا قمح ديورم الصلب 100% بلون ذهبي شهي.',
    specifications: [
      { key: 'الكمية', value: '5 أكياس × 400 جرام' }
    ]
  },
  {
    id: 'prod-14',
    name: 'شيبسي بطاطس مقرمشة بنكهة الشطة والليمون حجم عائلي - 100 جم (4 أكياس)',
    brandId: 'chipsy',
    brandName: 'شيبسي',
    categoryId: 'snacks-sweets',
    categoryName: 'حلويات وشوكولاتة ومسليات',
    price: 55,
    oldPrice: 65,
    discount: 15,
    rating: 4.8,
    reviewsCount: 180,
    stock: 75,
    sku: 'CHIP-HOT-4X100G',
    isBestSeller: true,
    isNew: false,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'شرائح بطاطس طبيعية 100% مقلية بزيت نقي ومتبلة بأقوى خلطة شطة وليمون مصرية.',
    specifications: [
      { key: 'الكمية', value: '4 أكياس × 100 جرام' }
    ]
  },
  {
    id: 'prod-15',
    name: 'عصير جهينة بيور برتقال طبيعي بدون سكر مضاف - 1 لتر (عبوة 3 قطع)',
    brandId: 'juhayna',
    brandName: 'جهينة',
    categoryId: 'beverages',
    categoryName: 'مشروبات وعصائر',
    price: 110,
    oldPrice: 130,
    discount: 15,
    rating: 4.9,
    reviewsCount: 112,
    stock: 45,
    sku: 'JUH-PURE-ORANG-3X1L',
    isBestSeller: false,
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'عصير برتقال طبيعي معصور 100% بدون أي إضافة سكر أو مواد حافظة.',
    specifications: [
      { key: 'الحجم', value: '3 عبوات × 1 لتر' }
    ]
  },
  {
    id: 'prod-16',
    name: 'خلاط يدوي تورنيدو هاند بلندر 1000 وات مع مضرب ومفرمة',
    brandId: 'tornado',
    brandName: 'تورنيدو',
    categoryId: 'home-kitchen',
    categoryName: 'أدوات وأجهزة منزلية',
    price: 1450,
    oldPrice: 1750,
    discount: 17,
    rating: 4.9,
    reviewsCount: 76,
    stock: 15,
    sku: 'TOR-BLENDER-1000W',
    isBestSeller: true,
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'محرك قوي جداً 1000 وات مع شفرات حادة من التيتانيوم غير القابل للصدأ وسرعات متعددة.',
    specifications: [
      { key: 'القدرة', value: '1000 وات تيربو' }
    ]
  }
];
