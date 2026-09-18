import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabaseService, isSupabaseConfigured, normalizeProfile } from '../services/supabase';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();

  // user is the normalized public.profiles row (roles ONLY from DB — never from user_metadata)
  const [user, setUser] = useState(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const hydrateUserFromSession = useCallback(async (session) => {
    if (!session?.user?.id) {
      setUser(null);
      setIsAuthenticated(false);
      return;
    }

    // IMPORTANT: role is read ONLY from public.profiles (DB). Never trust client-side claims.
    let profile = await supabaseService.getProfile(session.user.id);
    if (!profile) {
      // Profile wasn't created yet (race with trigger) — retry a few times
      for (let attempt = 0; attempt < 4 && !profile; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        profile = await supabaseService.getProfile(session.user.id);
      }
    }

    const normalized = normalizeProfile(profile || {
      id: session.user.id,
      full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
      email: session.user.email,
      phone: session.user.user_metadata?.phone || '',
      role: 'customer'
    });

    setUser(normalized);
    setIsAuthenticated(true);
    return normalized;
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoadingSession(false);
      return;
    }

    // 1) Restore persisted session
    supabaseService.getSession().then((session) => {
      hydrateUserFromSession(session).finally(() => setIsLoadingSession(false));
    });

    // 2) Live auth state changes (login / logout / token refresh)
    const { unsubscribe } = supabaseService.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        hydrateUserFromSession(session);
      } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [hydrateUserFromSession]);

  const login = async (username, password) => {
    if (!isSupabaseConfigured) {
      addToast('لم يتم إعداد Supabase بعد — أضف مفاتيح المشروع في ملف .env', 'error');
      return { success: false, error: 'Supabase غير مهيأ' };
    }

    if (!username || !password) {
      addToast('يرجى إدخال اسم المستخدم وكلمة المرور', 'error');
      return { success: false, error: 'بيانات ناقصة' };
    }

    const result = await supabaseService.signIn(email, password);
    if (!result.success) {
      const message =
        String(result.error || '').toLowerCase().includes('invalid login')
          ? 'اسم المستخدم أو كلمة المرور غير صحيحة'
          : result.error || 'تعذر تسجيل الدخول';
      addToast(message, 'error');
      return { success: false, error: message };
    }

    const hydrated = await hydrateUserFromSession(result.session);
    addToast(`مرحباً بك مجدداً، ${hydrated?.name || 'عميل أسواق مصر'}! 👋`, 'success');
    return { success: true, user: hydrated };
  };

  const register = async (userData) => {
    if (!isSupabaseConfigured) {
      addToast('لم يتم إعداد Supabase بعد — أضف مفاتيح المشروع في ملف .env', 'error');
      return { success: false, error: 'Supabase غير مهيأ' };
    }

    if (!userData.username || !userData.password || !userData.name) {
      addToast('يرجى ملء جميع الحقول المطلوبة', 'error');
      return { success: false, error: 'بيانات ناقصة' };
    }

    if (!/^[a-zA-Z0-9_.-]{3,30}$/.test(userData.username)) {
      addToast('اسم المستخدم يجب أن يكون من 3 إلى 30 حرفاً إنجليزياً أو أرقاماً', 'error');
      return { success: false, error: 'اسم مستخدم غير صالح' };
    }

    if (userData.password.length < 8) {
      addToast('كلمة المرور يجب أن تكون 8 أحرف على الأقل', 'error');
      return { success: false, error: 'كلمة المرور قصيرة جداً' };
    }

    const result = await supabaseService.signUp({
      username: userData.username,
      password: userData.password,
      fullName: userData.name,
      phone: userData.phone,
      governorate: userData.governorate,
      city: userData.city
    });

    if (!result.success) {
      addToast(result.error || 'تعذر إنشاء الحساب', 'error');
      return { success: false, error: result.error };
    }

    let hydrated = null;
    if (result.session) {
      hydrated = await hydrateUserFromSession(result.session);
    }

    addToast(`تم إنشاء الحساب بنجاح! أهلاً بك في أسواق مصر 🎉 (${hydrated?.name || userData.name})`, 'success');
    return { success: true, user: hydrated, requiresEmailConfirmation: !result.session };
  };

  const logout = async () => {
    await supabaseService.signOut();
    setUser(null);
    setIsAuthenticated(false);
    addToast('تم تسجيل الخروج بنجاح', 'info');
  };

  const updateProfile = async (updatedData) => {
    if (!user?.id) return { success: false, error: 'غير مسجل دخول' };

    const saved = await supabaseService.updateProfile(user.id, updatedData);
    if (!saved) {
      addToast('تعذر تحديث البيانات', 'error');
      return { success: false };
    }

    setUser(normalizeProfile(saved));
    addToast('تم تحديث البيانات بنجاح', 'success');
    return { success: true, user: normalizeProfile(saved) };
  };

  const resetPassword = async (email) => {
    return supabaseService.resetPassword(email);
  };

  const isAdmin = !!user && user.role === 'admin';
  const isManager = !!user && (user.role === 'admin' || user.role === 'manager');
  const canManageStore = isAdmin || isManager;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingSession,
        isAdmin,
        isManager,
        canManageStore,
        isSupabaseConfigured,
        login,
        register,
        logout,
        updateProfile,
        resetPassword
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
