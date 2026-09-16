import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aswaaq_user');
      return saved ? JSON.parse(saved) : {
        id: 'usr-admin-1',
        name: 'Admin',
        email: 'admin@aswaqmasr.com',
        phone: '01012345678',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        governorate: 'beni-suef',
        city: 'بني سويف',
        address: 'بني سويف، جمهورية مصر العربية'
      };
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('aswaaq_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aswaaq_user');
    }
  }, [user]);

  const login = (emailOrUsername, password, role = 'user') => {
    const cleanInput = (emailOrUsername || '').trim().toLowerCase();
    
    // Dedicated Admin Authentication check
    if (
      (cleanInput === 'admin@aswaqmasr.com' || cleanInput === 'admin') &&
      password === 'Admin@AswaqMasr2026'
    ) {
      const adminUser = {
        id: 'usr-admin-1',
        name: 'Admin',
        email: 'admin@aswaqmasr.com',
        phone: '01012345678',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        governorate: 'beni-suef',
        city: 'بني سويف',
        address: 'بني سويف، جمهورية مصر العربية'
      };
      setUser(adminUser);
      addToast('تم تسجيل دخول مسؤول لوحة التحكم بنجاح! 👑', 'success');
      return { success: true, user: adminUser };
    }

    // Standard User / Fallback Login
    const newUser = {
      id: 'usr-' + Date.now(),
      name: cleanInput.split('@')[0] || 'مستخدم أسواق مصر',
      email: cleanInput.includes('@') ? cleanInput : `${cleanInput}@aswaqmasr.com`,
      phone: '010' + Math.floor(10000000 + Math.random() * 90000000),
      role: role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      governorate: 'beni-suef',
      city: 'بني سويف',
      address: 'بني سويف، جمهورية مصر العربية'
    };
    setUser(newUser);
    addToast(`مرحباً بك مجدداً، ${newUser.name}! 👋`, 'success');
    return { success: true, user: newUser };
  };

  const register = (userData) => {
    const newUser = {
      id: 'usr-' + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role || 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      governorate: 'beni-suef',
      city: userData.city || 'بني سويف',
      address: userData.address || 'بني سويف'
    };
    setUser(newUser);
    addToast('تم إنشاء الحساب بنجاح! أهلاً بك في أسواق مصر 🎉', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aswaaq_user');
    addToast('تم تسجيل الخروج بنجاح', 'info');
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    addToast('تم تحديث البيانات بنجاح', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
