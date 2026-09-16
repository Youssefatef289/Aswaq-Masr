import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShoppingBag, Sparkles, ArrowLeft, Percent, MapPin, Truck } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'كل احتياجات بيتك في بني سويف',
    highlight: 'بأفضل الأسعار وتوصيل فوري',
    description: 'تسوق آلاف المنتجات من السوبرماركت والمواد الغذائية والمنظفات والألبان الطازجة مباشرة لباب بيتك.',
    badge: 'توصيل فوري لجميع مراكز بني سويف 🚚',
    buttonText: 'تسوق العروض الآن',
    buttonLink: '/offers',
    secondaryButtonText: 'تصفح الأقسام',
    secondaryButtonLink: '/categories',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 2,
    title: 'مهرجان التوفير للأغذية والمؤن',
    highlight: 'أجود الماركات المعتمدة 100%',
    description: 'أكبر تشكيلة من الأرز الفاخر، الزيوت، المكرونة، والزبادي والألبان بأسعار الجملة المباشرة.',
    badge: 'خصومات تصل إلى 35% 🔥',
    buttonText: 'عروض المواد الغذائية',
    buttonLink: '/category/food-cupboard',
    secondaryButtonText: 'كل المنتجات',
    secondaryButtonLink: '/products',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 3,
    title: 'أقوى منتجات المنظفات والعناية',
    highlight: 'نظافة وانتعاش بأقل تكلفة',
    description: 'وفري ميزانية بيتك مع باقات مساحيق الغسيل والمطهرات والعناية الشخصية في بني سويف.',
    badge: 'اشتري 2 واحصل على 1 مجاناً ⭐',
    buttonText: 'تسوق المنظفات',
    buttonLink: '/category/cleaning-household',
    secondaryButtonText: 'تصفح البراندات',
    secondaryButtonLink: '/brands',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1920&q=80',
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
    <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-gray-950 min-h-[380px] sm:min-h-[440px] md:min-h-[480px] lg:aspect-[1920/600] flex items-center">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image with Dark Contrast Overlay for Mobile & Desktop */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-7000 ease-out"
          />
          {/* Multi-gradient backdrop to ensure text is 100% crystal clear on any phone screen */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/95 via-black/80 md:via-black/70 to-black/40 md:to-transparent" />

          {/* Slide Text Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 w-full py-8 md:py-0">
              <div className="max-w-2xl text-white space-y-3 sm:space-y-4 text-right">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-brand-red text-white text-[11px] sm:text-xs font-black px-3 py-1 rounded-full shadow-md">
                  <Percent className="w-3.5 h-3.5 shrink-0" />
                  <span>{slide.badge}</span>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-snug sm:leading-tight text-white drop-shadow-md">
                  {slide.title}
                  <span className="block text-amber-300 md:text-brand-red mt-1 font-black">
                    {slide.highlight}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 sm:line-clamp-3 leading-relaxed font-normal max-w-lg">
                  {slide.description}
                </p>

                {/* Action Buttons */}
                <div className="pt-2 sm:pt-4 flex items-center gap-2.5 sm:gap-3">
                  <Link
                    to={slide.buttonLink}
                    className="bg-brand-red hover:bg-brand-darkRed text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-red-600/30 transition transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>{slide.buttonText}</span>
                  </Link>

                  <Link
                    to={slide.secondaryButtonLink}
                    className="bg-white/15 hover:bg-white/25 text-white border border-white/30 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm backdrop-blur-md transition flex items-center gap-1.5"
                  >
                    <span>{slide.secondaryButtonText}</span>
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows (Hidden on very small screens for clean UI, visible on sm+) */}
      <button
        onClick={prevSlide}
        aria-label="السابق"
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-brand-red text-white items-center justify-center backdrop-blur-xs transition border border-white/20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="التالي"
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-brand-red text-white items-center justify-center backdrop-blur-xs transition border border-white/20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 right-1/2 translate-x-1/2 z-20 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-brand-red' : 'w-2 bg-white/40 hover:bg-white'
            }`}
            aria-label={`الشريحة ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
