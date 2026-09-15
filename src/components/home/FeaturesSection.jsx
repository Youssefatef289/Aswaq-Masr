import React from 'react';
import { Truck, ShieldCheck, Clock, Headphones, Award, ThumbsUp } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Truck,
      title: 'شحن فوري وسريع',
      description: 'توصيل لباب بيتك خلال 24 ساعة في القاهرة والجيزة وخلال يومين للمحافظات.'
    },
    {
      icon: ShieldCheck,
      title: 'ضمان الجودة 100%',
      description: 'جميع المنتجات أصلية ومنتقاة من كبرى الماركات المعتمدة وصلاحية حديثة.'
    },
    {
      icon: ThumbsUp,
      title: 'أفضل قيمة وتوفير',
      description: 'أسعار جملة وعروض حقيقية وتخفيضات مستمرة توفر ميزانية بيتك.'
    },
    {
      icon: Headphones,
      title: 'خدمة عملاء مميزة',
      description: 'فريق دعم مصري متاح لمساعدتك عبر الخط الساخن والواتساب طوال أيام الأسبوع.'
    }
  ];

  return (
    <section className="py-8 sm:py-12 border-t border-gray-100 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-gray-200/80 hover:border-brand-red/40 hover:shadow-card transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 text-brand-red flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

