import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, Heart, ShoppingCart, Zap, ShieldCheck, Truck, 
  RotateCcw, Check, Plus, Minus, Share2, Award, ChevronRight 
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/product/ProductGrid';
import { useAdminData } from '../context/AdminDataContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, calculateDiscount } from '../utils/formatters';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useAdminData();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = products.find((p) => p.id === id) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'specifications' | 'reviews'

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">المنتج غير موجود</h2>
        <Link to="/products" className="text-brand-red font-bold underline mt-2 block">
          العودة لكل المنتجات
        </Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'];

  const discountPercent = product.discount || calculateDiscount(product.oldPrice, product.price);

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'الأقسام', to: '/categories' },
          { label: product.categoryName || 'القسم', to: `/category/${product.categoryId}` },
          { label: product.name }
        ]}
      />

      {/* Main Product Showcase Section */}
      <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Gallery: 5 cols on lg (Main Image 800x800, Thumbnails 150x150) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Image Viewport */}
            <div className="relative aspect-square w-full rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center p-4">
              {discountPercent > 0 && (
                <div className="absolute top-4 right-4 z-10 bg-brand-red text-white text-xs font-black px-3 py-1 rounded-lg shadow-md">
                  خصم {discountPercent}%
                </div>
              )}

              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isFavorite
                    ? 'bg-red-50 text-brand-red shadow-md'
                    : 'bg-white text-gray-400 hover:text-brand-red shadow-md'
                }`}
                title="إضافة للمفضلة"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-brand-red text-brand-red' : ''}`} />
              </button>

              <img
                src={images[activeImageIndex] || images[0]}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Thumbnails list (150x150) */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-50 p-1.5 border-2 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-brand-red ring-2 ring-brand-red/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`view-${idx}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info: 7 cols on lg */}
          <div className="lg:col-span-7 space-y-5">
            {/* Brand & Stock Pill */}
            <div className="flex items-center justify-between gap-2">
              <Link
                to={`/brand/${product.brandId}`}
                className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold transition"
              >
                <Award className="w-3.5 h-3.5 text-brand-red" />
                <span>الماركة: {product.brandName}</span>
              </Link>

              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                (product.stock ?? 10) > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600'
              }`}>
                {(product.stock ?? 10) > 0 ? '✓ متوفر في المخزن وجاهز للشحن' : 'غير متوفر حالياً'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 leading-snug">
              {product.name}
            </h1>

            {/* Rating & SKU */}
            <div className="flex flex-wrap items-center gap-4 text-xs pb-3 border-b border-gray-100">
              <div className="flex items-center gap-1.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating || 5)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-gray-800 font-bold mr-1">
                  {product.rating || 4.8}
                </span>
                <span className="text-gray-400">
                  ({product.reviewsCount || 120} تقييم من العملاء)
                </span>
              </div>

              {product.sku && (
                <span className="text-gray-400 font-mono">
                  كود المنتج: <strong className="text-gray-600">{product.sku}</strong>
                </span>
              )}
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-red-50/60 border border-brand-red/20 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-xs text-gray-500 font-semibold block mb-0.5">السعر الحالي:</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-brand-red">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && product.oldPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through font-bold">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
              </div>

              {discountPercent > 0 && product.oldPrice && (
                <div className="text-left">
                  <span className="text-xs text-emerald-700 font-bold block">
                    وفرت: {formatPrice(product.oldPrice - product.price)} ({discountPercent}%)
                  </span>
                  <span className="text-[11px] text-gray-500">شامل ضريبة القيمة المضافة</span>
                </div>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Quantity Selector & Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-700">الكمية:</span>
                <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center font-bold disabled:opacity-40 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center text-sm font-black text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-8 h-8 rounded-lg bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center font-bold transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-xs text-gray-400">
                  الإجمالي: <strong className="text-gray-900 font-bold">{formatPrice(product.price * quantity)}</strong>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="py-3.5 px-6 rounded-xl font-black text-sm bg-brand-red hover:bg-brand-darkRed text-white flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all transform active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>إضافة إلى السلة</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 rounded-xl font-black text-sm bg-gray-900 hover:bg-black text-white flex items-center justify-center gap-2 shadow-md transition-all transform active:scale-95"
                >
                  <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span>شراء فوري مباشر</span>
                </button>
              </div>
            </div>

            {/* Guarantees Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-red shrink-0" />
                <span>توصيل سريع لباب البيت</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-red shrink-0" />
                <span>ضمان أصالة وجودة 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-brand-red shrink-0" />
                <span>إرجاع سهل خلال 14 يوم</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description / Specifications / Reviews */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Tab Headers */}
        <div className="flex items-center gap-3 border-b border-gray-200 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'description'
                ? 'bg-brand-red text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            وصف المنتج الكامل
          </button>
          <button
            onClick={() => setActiveTab('specifications')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'specifications'
                ? 'bg-brand-red text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            المواصفات والتفاصيل الفنية
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'reviews'
                ? 'bg-brand-red text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            آراء وتقييمات المشترين ({product.reviewsCount || 12})
          </button>
        </div>

        {/* Tab Contents */}
        <div>
          {activeTab === 'description' && (
            <div className="prose prose-sm text-gray-700 leading-relaxed max-w-none space-y-3">
              <p>{product.description}</p>
              <p className="text-xs text-gray-500">
                جميع المنتجات المباعة في متجر أسواق مصر تخضع لرقابة الجودة وتضمن تاريخ إنتاج حديث معبأ ومعقم بأحدث المعايير الصحية المعتمدة.
              </p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="divide-y divide-gray-100 max-w-2xl">
              {product.specifications && product.specifications.length > 0 ? (
                product.specifications.map((spec, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-500">{spec.key}</span>
                    <span className="font-semibold text-gray-900">{spec.value}</span>
                  </div>
                ))
              ) : (
                <div className="space-y-2 text-xs">
                  <div className="py-2 flex justify-between">
                    <span className="font-bold text-gray-500">الماركة</span>
                    <span>{product.brandName}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="font-bold text-gray-500">القسم</span>
                    <span>{product.categoryName}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 max-w-3xl">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
                <div className="text-3xl font-black text-brand-red">{product.rating || 4.8}</div>
                <div>
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-semibold mt-0.5 block">
                    بناءً على {product.reviewsCount || 120} تقييم حقيقي
                  </span>
                </div>
              </div>

              {/* Sample User Reviews */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-gray-100 bg-white space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">محمود علي - القاهرة</span>
                    <span className="text-[10px] text-gray-400">منذ يومين</span>
                  </div>
                  <div className="flex text-amber-400"><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /></div>
                  <p className="text-xs text-gray-600">منتج ممتاز ومطابق للمواصفات تماماً، وسرعة التوصيل كانت مذهلة شكراً أسواق مصر.</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-100 bg-white space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">هبة إبراهيم - الإسكندرية</span>
                    <span className="text-[10px] text-gray-400">منذ أسبوع</span>
                  </div>
                  <div className="flex text-amber-400"><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /><Star className="w-3 h-3 fill-amber-400" /></div>
                  <p className="text-xs text-gray-600">جودة أصلية وتغليف ممتاز وسعر أرخص من المحلات الخارجية.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900">منتجات ذات صلة قد تعجبك</h2>
            <Link
              to={`/category/${product.categoryId}`}
              className="text-xs font-bold text-brand-red hover:underline"
            >
              عرض المزيد من {product.categoryName}
            </Link>
          </div>

          <ProductGrid products={relatedProducts} columns="grid-cols-2 md:grid-cols-4" />
        </section>
      )}
    </div>
  );
};

