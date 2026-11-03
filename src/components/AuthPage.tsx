import React, { useState } from 'react';
import {
  Sprout,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  LogOut,
  ShoppingBag,
  Bookmark,
  Calendar,
} from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinedDate: string;
  city?: string;
}

interface AuthPageProps {
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  savedPlantsCount: number;
  ordersCount: number;
  onNavigateHome: () => void;
  onExploreProducts: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  currentUser,
  onLogin,
  onLogout,
  savedPlantsCount,
  ordersCount,
  onNavigateHome,
  onExploreProducts,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide your email and password.');
      return;
    }

    // Demo sign in
    const user: UserProfile = {
      name: name || email.split('@')[0],
      email: email,
      phone: phone || '0300 1234567',
      city: city,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    onLogin(user);
    setSuccessMsg('Signed in successfully! Welcome back.');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const user: UserProfile = {
      name: name,
      email: email,
      phone: phone || '0300 1234567',
      city: city,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    onLogin(user);
    setSuccessMsg('Account created successfully! Welcome to GreenSpace.');
  };

  const handleOneClickDemo = () => {
    const demoUser: UserProfile = {
      name: 'Mubashir Memon',
      email: 'memonmubashir256@gmail.com',
      phone: '0300 8765432',
      city: 'Karachi',
      joinedDate: 'Nov 2026',
    };
    onLogin(demoUser);
  };

  // If already logged in, show User Profile Dashboard
  if (currentUser) {
    return (
      <div className="min-h-screen pb-24 bg-[#FAF9EF]">
        {/* Banner */}
        <div className="bg-[#123D25] text-white py-12 px-4 sm:px-8 border-b-4 border-[#267A3E]">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-full bg-[#E8F2DD] text-[#123D25] flex items-center justify-center font-bold text-2xl shadow-inner border-2 border-[#4CAF50]">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#4CAF50]">
                  GreenSpace Member
                </span>
                <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold">
                  Welcome, {currentUser.name}!
                </h1>
                <p className="text-xs text-[#E8F2DD]/80">
                  {currentUser.email} • {currentUser.city || 'Pakistan'}
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#E8F2DD] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-[#17251B]/60 font-semibold block uppercase">
                  My Orders
                </span>
                <span className="text-2xl font-bold text-[#123D25] mt-1 block">
                  {ordersCount} Placed
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E8F2DD] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-[#17251B]/60 font-semibold block uppercase">
                  Saved Plants
                </span>
                <span className="text-2xl font-bold text-[#123D25] mt-1 block">
                  {savedPlantsCount} In Garden
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center">
                <Bookmark className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E8F2DD] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-[#17251B]/60 font-semibold block uppercase">
                  Member Since
                </span>
                <span className="text-xl font-bold text-[#123D25] mt-1 block">
                  {currentUser.joinedDate}
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Account Details Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8F2DD] shadow-sm space-y-4">
            <h3 className="font-serif-heading font-bold text-xl text-[#123D25]">
              Personal Information & Shipping Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-[#FAF9EF] border border-[#E8F2DD]">
                <span className="text-gray-400 block text-[11px]">Full Name</span>
                <span className="font-bold text-[#123D25]">{currentUser.name}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF9EF] border border-[#E8F2DD]">
                <span className="text-gray-400 block text-[11px]">Email Address</span>
                <span className="font-bold text-[#123D25]">{currentUser.email}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF9EF] border border-[#E8F2DD]">
                <span className="text-gray-400 block text-[11px]">Contact Number</span>
                <span className="font-bold text-[#123D25]">{currentUser.phone || '0300 1234567'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF9EF] border border-[#E8F2DD]">
                <span className="text-gray-400 block text-[11px]">Default City</span>
                <span className="font-bold text-[#123D25]">{currentUser.city || 'Lahore'}</span>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={onExploreProducts}
                className="px-6 py-2.5 rounded-full bg-[#123D25] hover:bg-[#267A3E] text-white text-xs sm:text-sm font-semibold transition"
              >
                Browse Vertical Catalog
              </button>
              <button
                onClick={onNavigateHome}
                className="px-6 py-2.5 rounded-full border border-[#E8F2DD] text-[#123D25] text-xs sm:text-sm font-semibold hover:bg-[#FAF9EF] transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in: Show Sign In / Sign Up Form
  return (
    <div className="min-h-screen pb-20 bg-[#FAF9EF] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-[#123D25] flex items-center justify-center text-white mx-auto shadow-md">
            <Sprout className="w-8 h-8 text-[#4CAF50]" />
          </div>
          <h2 className="font-serif-heading text-3xl font-bold text-[#123D25]">
            {mode === 'signin' ? 'Sign In to GreenSpace' : 'Create an Account'}
          </h2>
          <p className="text-xs sm:text-sm text-[#17251B]/70 max-w-sm mx-auto">
            {mode === 'signin'
              ? 'Access your saved vertical garden setups, AI plant diagnosis history, and order tracking.'
              : 'Join Pakistan’s premier vertical gardening community and unlock personalized AI plant care.'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8F2DD] shadow-xl space-y-6">
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-2xl bg-[#FAF9EF] p-1 border border-[#E8F2DD]">
            <button
              onClick={() => {
                setMode('signin');
                setError('');
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition ${
                mode === 'signin'
                  ? 'bg-[#123D25] text-white shadow-sm'
                  : 'text-[#17251B]/70 hover:text-[#123D25]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition ${
                mode === 'signup'
                  ? 'bg-[#123D25] text-white shadow-sm'
                  : 'text-[#17251B]/70 hover:text-[#123D25]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error & Success Messages */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-xl bg-[#E8F2DD] border border-[#C4D7BC] text-xs text-[#123D25] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#267A3E]" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mubashir Memon"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none focus:ring-2 focus:ring-[#267A3E]/30"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none focus:ring-2 focus:ring-[#267A3E]/30"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full pl-9 pr-2 py-2.5 text-xs rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                    City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[#17251B]/70">
                  Password *
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to your registered email.')}
                    className="text-[11px] text-[#267A3E] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none focus:ring-2 focus:ring-[#267A3E]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#123D25] hover:bg-[#267A3E] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
            >
              <span>{mode === 'signin' ? 'Sign In to Account' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#E8F2DD] w-full" />
            <span className="bg-white px-3 text-xs text-[#17251B]/50 shrink-0">
              or continue with
            </span>
            <div className="border-t border-[#E8F2DD] w-full" />
          </div>

          {/* 1-Click Demo Login Button for easy testing */}
          <button
            onClick={handleOneClickDemo}
            className="w-full py-2.5 rounded-2xl bg-[#E8F2DD] hover:bg-[#d8e8ca] text-[#123D25] font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#267A3E]" />
            <span>Instant Demo Sign In (1-Click)</span>
          </button>

          {/* Privacy Note */}
          <p className="text-center text-[11px] text-[#17251B]/50 leading-relaxed">
            By signing in, you agree to GreenSpace’s Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};
