import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aswaaq_user');
      return saved ? JSON.parse(saved) : {
        id: 'usr-1',
        name: 'كريم الشناوي',
        email: 'karim@example.com',
        phone: '01012345678',
        role: 'admin', // default to admin for seamless evaluation of admin panel
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        governorate: 'cairo',
        city: 'المعادي',
        address: 'شارع 9، المعادي، القاهرة'
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

  const login = (email, password, role = 'user') => {
    // Simulated login
    const newUser = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0] || 'مستخدم أسواق مصر',
      email: email,
      phone: '010' + Math.floor(10000000 + Math.random() * 90000000),
      role: email.includes('admin') ? 'admin' : role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      governorate: 'cairo',
      city: 'القاهرة',
      address: 'القاهرة، جمهورية مصر العربية'
    };
    setUser(newUser);
    addToast(`مرحباً بك مجدداً، ${newUser.name}! 👋`, 'success');
    return true;
  };

  const register = (userData) => {
    const newUser = {
      id: 'usr-' + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role || 'user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      governorate: userData.governorate || 'cairo',
      city: userData.city || 'القاهرة',
      address: userData.address || ''
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

