import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Check, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice, calculateDiscount } from '../../utils/formatters';

export const ProductCard = ({ product, showBrand = true }) => {
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isFavorite = isInWishlist(product.id);
  const isInCart = cartItems.some((item) => item.id === product.id);
  const discountPercent = product.discount || calculateDiscount(product.oldPrice, product.price);
  const mainImage = product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/80 hover:border-brand-red/40 transition-all duration-300 hover:shadow-card-hover flex flex-col justify-between overflow-hidden relative">
      {/* Top Badges & Actions */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden flex items-center justify-center p-3">
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 right-2.5 z-10 bg-brand-red text-white text-[11px] font-black px-2 py-0.5 rounded-lg shadow-sm">
            خصم {discountPercent}%
          </div>
        )}

        {/* New / Best Seller Badge */}
        {product.isNew && !discountPercent && (
          <div className="absolute top-2.5 right-2.5 z-10 bg-emerald-600 text-white text-[11px] font-black px-2 py-0.5 rounded-lg shadow-sm">
            جديد
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlist}
          aria-label="إضافة للمفضلة"
          className={`absolute top-2.5 left-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-red-50 text-brand-red shadow-sm'
              : 'bg-white/90 text-gray-400 hover:text-brand-red hover:bg-white shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-brand-red text-brand-red' : ''}`} />
        </button>

        {/* Product Image Link */}
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Content Section */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between gap-2 mb-1">
            {showBrand && product.brandName && (
              <span className="text-[11px] font-bold text-gray-400 hover:text-brand-red transition">
                {product.brandName}
              </span>
            )}
            {product.categoryName && (
              <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                {product.categoryName}
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-brand-red transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-gray-700">{product.rating || 4.8}</span>
            {product.reviewsCount > 0 && (
              <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
            )}
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-2 border-t border-gray-100 flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between gap-1">
            <div>
              <span className="text-base sm:text-lg font-black text-brand-red">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="text-xs text-gray-400 line-through mr-2 font-medium">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            
            {product.stock !== undefined && (
              <span className={`text-[10px] font-semibold ${product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {product.stock > 0 ? 'متوفر' : 'نفد'}
              </span>
            )}
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-2 sm:py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
              product.stock === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : isInCart
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                : 'bg-brand-red hover:bg-brand-darkRed text-white active:scale-[0.98]'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>في السلة (+1)</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>أضف للسلة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

