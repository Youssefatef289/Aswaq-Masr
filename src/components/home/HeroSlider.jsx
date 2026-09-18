import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ShoppingBag, Sparkles, ArrowLeft, Percent, MapPin, Truck } from 'lucide-react';

const slides = [
  {
    id: 1,
    badge: 'خدمة حصرية لأهالي بني سويف',
    badgeIcon: MapPin,
    title: 'سوبرماركت أسواق مصر',
    highlight: 'توصيل فوري لباب البيت',
    desc: 'تسوق جميع احتياجاتك اليومية من الأغذية، المنظفات، والأجهزة بأفضل الأسعار مع توصيل فوري لجميع مراكز وقرى محافظة بني سويف.',
    ctaText: 'تسوق العروض الآن',
    ctaLink: '/products',
    secondaryText: 'تصفح الأقسام',
    secondaryLink: '/categories',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    tag: 'خصومات تصل إلى 40%',
    bgGradient: 'from-black/90 via-black/70 to-transparent'
  },
  {
    id: 2,
    badge: 'مهرجان التوفير الأسبوعي',
    badgeIcon: Percent,
    title: 'أقوى عروض السلع والمؤن',
    highlight: 'وفر مع كل كرتونة',
    desc: 'عروض حصرية على الزيوت، الأرز، السكر ومنتجات الألبان من أشهر البراندات مثل جهينة وكريستال بأسعار جملة تنافسية.',
    ctaText: 'شاهد أقوى التخفيضات',
    ctaLink: '/offers',
    secondaryText: 'البراندات المتاحة',
    secondaryLink: '/brands',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    tag: 'توصيل خلال ساعات',
    bgGradient: 'from-black/90 via-black/70 to-transparent'
  },
  {
    id: 3,
    badge: 'خدمة الطلب المباشر',
    badgeIcon: Truck,
    title: 'اطلب بسهولة عبر الواتساب',
    highlight: 'وادفع عند الاستلام',
    desc: 'وفرنا لك إمكانية إرسال مشترياتك مباشرة إلى محادثة الواتساب مع خدمة التوصيل حتى باب المنزل والدفع كاش عند المعاينة.',
    ctaText: 'ابدأ التسوق الآن',
    ctaLink: '/products',
    secondaryText: 'عروض خاصة',
    secondaryLink: '/offers',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80',
    tag: 'خدمة 24/7',
    bgGradient: 'from-black/90 via-black/70 to-transparent'
  }
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 min-h-[360px] sm:min-h-[440px] md:min-h-[480px]">
      {/* Slides */}
      {slides.map((slide, i) => {
        const IconComponent = slide.badgeIcon;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-7000 ease-out"
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r ${slide.bgGradient}`} />

            {/* Content Container */}
            <div className="absolute inset-0 flex items-end sm:items-center p-5 pb-14 sm:p-10 md:p-14 z-20">
              <div className="max-w-xl text-white space-y-3 sm:space-y-4 w-full">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-red text-white text-xs font-bold rounded-full shadow-lg">
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{slide.badge}</span>
                </div>

                {/* Title & Highlight */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight">
                  <span className="block">{slide.title}</span>
                  <span className="text-amber-400 block mt-1">{slide.highlight}</span>
                </h1>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-gray-100 line-clamp-3 sm:line-clamp-3 leading-relaxed font-normal max-w-lg">
                  {slide.desc}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to={slide.ctaLink}
                    className="bg-brand-red hover:bg-brand-darkRed text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-brand-red/50 transition transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{slide.ctaText}</span>
                  </Link>

                  <Link
                    to={slide.secondaryLink}
                    className="bg-white/15 hover:bg-white/25 text-white backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 border border-white/20 transition"
                  >
                    <span>{slide.secondaryText}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm flex items-center justify-center border border-white/10 transition"
        aria-label="Previous slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm flex items-center justify-center border border-white/10 transition"
        aria-label="Next slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-brand-red' : 'w-2 bg-white/40 hover:bg-white'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
