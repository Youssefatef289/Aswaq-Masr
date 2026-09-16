export const initialProducts = [
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
      { key: 'بلد المنشأ', value: 'مصر' },
      { key: 'تاريخ الصلاحية', value: '18 شهر من الإنتاج' }
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
      { key: 'المكونات', value: 'حليب بقري طبيعي 100%' },
      { key: 'الحفظ', value: 'يحفظ في مكان جاف ويوضع بالثلاجة بعد الفتح' }
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
    description: 'يقضي على أصعب البقع في غسلة واحدة حتى في الماء البارد مع انتعاش عطر اللافندر الفرنسي الذي يدوم طويلاً على الملابس البيضاء والملونة.',
    specifications: [
      { key: 'الوزن', value: '4 كجم' },
      { key: 'نوع الغسالة', value: 'الغسالات الأوتوماتيك وفوق الأوتوماتيك' },
      { key: 'الرائحة', value: 'عبير اللافندر المنعش' }
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
    description: 'زيت عباد شمس مكرر ونقي 100% معزز بفيتامين A و D، خفيف على المعدة وخالٍ من الكوليسترول، مناسب للقلي والطبخ وإعداد السلطات.',
    specifications: [
      { key: 'السعة', value: '2.2 لتر' },
      { key: 'النوع', value: 'زيت عباد شمس صافي' },
      { key: 'الفيتامينات', value: 'مدعم بفيتامين A & D' }
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
    description: 'حبوب بن روبوستا محمصة بعناية 100% لتقديم نكهة غنية قوية ورائحة قهوة منعشة تمنحك التركيز والطاقة مع كل رشفة.',
    specifications: [
      { key: 'الوزن', value: '200 جرام' },
      { key: 'نوع العبوة', value: 'برطمان زجاجي فاخر' },
      { key: 'النوع', value: 'قهوة سريعة الذوبان 100%' }
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
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'أفضل حماية للبشرة من بامبرز بنعومة فائقة كالريش وقنوات امتصاص ثلاثية ومؤشر للبلل، لحماية طفلك من الحساسية والتسريب حتى 12 ساعة.',
    specifications: [
      { key: 'المقاس', value: 'مقاس 4 (9 إلى 14 كجم)' },
      { key: 'العدد', value: '60 حفاضة' },
      { key: 'المميزات', value: 'طبقة لوشن للألوفيرا ومؤشر بلل' }
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
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-00994406a75f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'تركيبة دوف الأصلية الكلاسيكية الممزوجة بـ 1/4 كريم مرطب ومنظفات لطيفة تحافظ على رطوبة بشرتك ونعومتها الطبيعية على عكس الصابون العادي.',
    specifications: [
      { key: 'العدد والوزن', value: '4 قوالب × 135 جرام' },
      { key: 'نوع البشرة', value: 'جميع أنواع البشرة الحساسة والعادية' }
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
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'شاي أحمر كلاسيكي مصنع من أجود براعم الشاي المجففة تحت أشعة الشمس لمذاق أصيل ولون عنبري عميق ونكهة غنية لا تقاوم.',
    specifications: [
      { key: 'الوزن', value: '250 جرام' },
      { key: 'نوع الشاي', value: 'شاي أسود حبيبات ناعمة' },
      { key: 'الأصل', value: 'شاي سيلاني وكيني عالي الجودة' }
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
      'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'تركيبة مركزة للغاية بقطرة واحدة فقط تقضي على أصعب وأعتى الدهون المحترقة وتمنح أوانيك بريقاً ولمعاناً فائقاً مع رائحة الليمون الزكية.',
    specifications: [
      { key: 'الحجم', value: '1 لتر مركز' },
      { key: 'الرائحة', value: 'ليمون منعش' },
      { key: 'الكفاءة', value: 'يدوم حتى 3 أضعاف السوائل العادية' }
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
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'شوكولاتة الحليب الناعمة والشهيرة من كادبوري مصنوعة من كوب ونصف من الحليب الطازج في كل لوح لتذوب في الفم بسلاسة فائقة.',
    specifications: [
      { key: 'الوزن', value: '3 ألواح × 90 جرام' },
      { key: 'المكونات', value: 'شوكولاتة حليب سادة 100%' }
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
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'غلاية تورنيدو من الفولاذ المقاوم للصدأ المقاوم للصدأ الصحي عالي المتانة، قدرة 2200 وات لغليان فائق السرعة مع قاعدة تدور 360 درجة وفصل تلقائي آمن.',
    specifications: [
      { key: 'القدرة الكهربائية', value: '2200 وات' },
      { key: 'السعة', value: '1.7 لتر' },
      { key: 'الخامة', value: 'ستانلس ستيل صحي ضد الصدأ' },
      { key: 'الضمان', value: 'ضمان سنتين من العربي جروب' }
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
      'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'مكرونة فاخرة مصنعة من سيمولينا قمح ديورم الصلب 100% بلون ذهبي شهي وقوام متماسك لا يلتصق بعد السلق ومناسب لجميع أنواع الطواجن.',
    specifications: [
      { key: 'الكمية', value: '5 أكياس × 400 جرام' },
      { key: 'المكونات', value: 'سيمولينا قمح ديورم نقي 100%' }
    ]
  },
  {
    id: 'prod-13',
    name: 'شامبو لوريال إلفيف للشعر الجاف والتالف بالزيت المغذي - 400 مل',
    brandId: 'dove',
    brandName: 'دوف',
    categoryId: 'personal-care',
    categoryName: 'عناية شخصية وجمال',
    price: 130,
    oldPrice: 160,
    discount: 18,
    rating: 4.7,
    reviewsCount: 92,
    stock: 40,
    sku: 'SHAMP-NOUR-400ML',
    isBestSeller: false,
    isNew: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'تغذية فائقة للشعر من الجذور حتى الأطراف بخلاصة 6 زيوت زهرية ثمينة ليمنح شعرك نعومة ولمعاناً لا يقاوم بدون أي ملمس دهني.',
    specifications: [
      { key: 'الحجم', value: '400 مل' },
      { key: 'نوع الشعر', value: 'الشعر العادي إلى الجاف والتالف' }
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
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'شرائح بطاطس طبيعية 100% مقلية بزيت نقي ومتبلة بأقوى خلطة شطة وليمون مصرية تعشقها الحواس لقرمشة مثالية وسهرات ممتعة.',
    specifications: [
      { key: 'الكمية', value: '4 أكياس × 100 جرام' },
      { key: 'النكهة', value: 'شطة وليمون حارة' }
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
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'عصير برتقال طبيعي معصور 100% بدون أي إضافة سكر أو مواد حافظة أو ألوان صناعية، مصدر ممتاز لفيتامين C المنعش لجميع أفراد الأسرة.',
    specifications: [
      { key: 'الحجم', value: '3 عبوات × 1 لتر' },
      { key: 'المكونات', value: 'عصير برتقال طبيعي 100% بدون سكر مضاف' }
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
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'محرك قوي جداً 1000 وات مع شفرات حادة من التيتانيوم غير القابل للصدأ وسرعات متعددة + خاصية التربو، يشمل دورق خفق ومفرمة لحوم وخضار ومضرب بيض.',
    specifications: [
      { key: 'القدرة', value: '1000 وات تيربو' },
      { key: 'الملحقات', value: 'مفرمة 500 مل + دورق 800 مل + مضرب خفق' },
      { key: 'الضمان', value: 'ضمان سنة كاملة معتمد' }
    ]
  }
];

