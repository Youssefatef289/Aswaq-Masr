import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Layers, Award, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const BottomNav = ({ onOpenCart }) => {
  const { totalItemsCount } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-1 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
              isActive ? 'text-brand-red font-bold' : 'text-gray-500 font-medium'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Home className={`w-5 h-5 ${isActive ? 'scale-110 text-brand-red stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[11px] mt-0.5">الرئيسية</span>
            </>
          )}
        </NavLink>

        {/* Categories */}
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
              isActive ? 'text-brand-red font-bold' : 'text-gray-500 font-medium'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Layers className={`w-5 h-5 ${isActive ? 'scale-110 text-brand-red stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[11px] mt-0.5">الأقسام</span>
            </>
          )}
        </NavLink>

        {/* Brands */}
        <NavLink
          to="/brands"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
              isActive ? 'text-brand-red font-bold' : 'text-gray-500 font-medium'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Award className={`w-5 h-5 ${isActive ? 'scale-110 text-brand-red stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[11px] mt-0.5">البراندات</span>
            </>
          )}
        </NavLink>

        {/* Cart Drawer Trigger */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-gray-500 hover:text-brand-red transition relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-2" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center border-2 border-white px-1">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-0.5 font-bold">السلة</span>
        </button>
      </div>
    </div>
  );
};
