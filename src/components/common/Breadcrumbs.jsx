import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-500 py-3 overflow-x-auto whitespace-nowrap">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-brand-red transition text-gray-600 font-medium"
      >
        <Home className="w-3.5 h-3.5 text-gray-400" />
        <span>الرئيسية</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronLeft className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          {item.to ? (
            <Link
              to={item.to}
              className="hover:text-brand-red transition text-gray-600 font-medium truncate max-w-[200px]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-brand-red font-bold truncate max-w-[200px]">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

