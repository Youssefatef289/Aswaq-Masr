import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShoppingBag, Sparkles, ArrowLeft, Percent } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'كل احتياجات بيتك في مكان واحد',
    highlight: 'بأفضل أسعار السوق المصري',
    description: 'تسوق آلاف المنتجات من السوبرماركت، المواد الغذائية، والمنظفات مع توصيل فوري لباب بيتك.',
    badge: 'خصومات حصرية تصل إلى 40%',
    buttonText: 'تسوق العروض الآن',
    buttonLink: '/offers',
    secondaryButtonText: 'تصفح الأقسام',
    secondaryButtonLink: '/categories',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1920&q=80',
    tagColor: 'bg-red-500'
  },
  {
    id: 2,
    title: 'مهرجان التوفير للمؤن والزيوت',
    highlight: 'أجود الماركات المعتمدة 100%',
    description: 'أكبر تشكيلة من الأرز الفاخر، الزيوت، المكرونة، والألبان الطازجة بأسعار الجملة المباشرة.',
    badge: 'عروض كبرى على المواد الغذائية',
    buttonText: 'اكتشف عروض المؤن',
    buttonLink: '/category/food-cupboard',
    secondaryButtonText: 'كل المنتجات',
    secondaryButtonLink: '/products',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80',
    tagColor: 'bg-amber-500'
  },
  {
    id: 3,
    title: 'أقوى منتجات العناية والمنظفات',
    highlight: 'انتعاش ونظافة فائقة لمنزلك',
    description: 'وفري مع باقات مساحيق الغسيل، المطهرات، ومستلزمات العناية الشخصية بأسعار لا تقبل المنافسة.',
    badge: 'اشتري 2 واحصل على 1 مجاناً',
    buttonText: 'تسوق المنظفات',
    buttonLink: '/category/cleaning-household',
    secondaryButtonText: 'تصفح البراندات',
    secondaryButtonLink: '/brands',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1920&q=80',
    tagColor: 'bg-blue-500'
  }
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-gray-900 aspect-[16/9] sm:aspect-[21/9] lg:aspect-[1920/600] max-h-[580px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image with Gradient Overlay */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-7000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent flex items-center" />

          {/* Slide Text Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
              <div className="max-w-2xl text-white space-y-3 sm:space-y-4">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-brand-red/90 text-white text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-md animate-pulse">
                  <Percent className="w-4 h-4" />
                  <span>{slide.badge}</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                  {slide.title}
                  <span className="block text-brand-red mt-1 drop-shadow-md">
                    {slide.highlight}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-xs sm:text-base text-gray-200 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-xl font-normal">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
                  <Link
                    to={slide.buttonLink}
                    className="bg-brand-red hover:bg-brand-darkRed text-white px-6 sm:px-8 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{slide.buttonText}</span>
                  </Link>

                  <Link
                    to={slide.secondaryButtonLink}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/40 px-5 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-1.5"
                  >
                    <span>{slide.secondaryButtonText}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="السابق"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-brand-red text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="التالي"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-brand-red text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-1/2 translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-brand-red' : 'w-2.5 bg-white/50 hover:bg-white'
            }`}
            aria-label={`الشريحة ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

