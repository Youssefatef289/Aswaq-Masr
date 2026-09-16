import React, { useState } from 'react';
import { MessageCircle, Phone, Facebook, Instagram, Share2, X, ChevronUp } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export const FloatingContactWidget = () => {
  const { settings } = useAdminData();
  const [isOpen, setIsOpen] = useState(false);

  const cleanWhatsApp = (settings?.whatsapp || '201012345678').replace(/[^0-9]/g, '');
  const cleanPhone = settings?.phone || '19888';

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
      {/* Expanded Quick Links */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          
          {/* Facebook */}
          <a
            href={settings?.facebook || 'https://facebook.com/aswaqmasr'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-blue-600 text-white py-2 px-3.5 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105 group"
          >
            <span className="text-xs font-bold whitespace-nowrap">فيسبوك أسواق مصر</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Facebook className="w-3.5 h-3.5 fill-white" />
            </div>
          </a>

          {/* Instagram */}
          <a
            href={settings?.instagram || 'https://instagram.com/aswaqmasr'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white py-2 px-3.5 rounded-full shadow-lg hover:opacity-90 transition transform hover:scale-105 group"
          >
            <span className="text-xs font-bold whitespace-nowrap">انستجرام</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Instagram className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Phone Call */}
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-2.5 bg-gray-900 text-white py-2 px-3.5 rounded-full shadow-lg hover:bg-black transition transform hover:scale-105 group"
          >
            <span className="text-xs font-bold whitespace-nowrap">اتصال هاتفي ({cleanPhone})</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent('مرحباً، أود الاستفسار عن منتجات وعروض أسواق مصر في بني سويف')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-emerald-600 text-white py-2 px-3.5 rounded-full shadow-lg hover:bg-emerald-700 transition transform hover:scale-105 group"
          >
            <span className="text-xs font-bold whitespace-nowrap">تواصل مباشر واتساب</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
            </div>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="خيارات التواصل السريع"
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isOpen
            ? 'bg-gray-900 text-white rotate-90'
            : 'bg-emerald-600 text-white hover:bg-emerald-700 animate-bounce-short'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-7 h-7 fill-white" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-emerald-600 animate-ping" />
          </div>
        )}
      </button>
    </div>
  );
};

