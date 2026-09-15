import React from 'react';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';

export const ProductGrid = ({ products = [], columns = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' }) => {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-6 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-red-50 text-brand-red rounded-full flex items-center justify-center mb-3">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-gray-800 mb-1">لا توجد منتجات مطابقة حالياً</h3>
        <p className="text-xs text-gray-500 max-w-sm">
          جرب تغيير خيارات الفلترة أو البحث بكلمات مختلفة للعثور على ما تبحث عنه.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${columns} gap-3 sm:gap-5`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

