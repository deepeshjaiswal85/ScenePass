import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket, Mail, Lock, Shield, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (res.user.role === 'admin') navigate('/admin');
      else navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleQuickDemo = (demoType) => {
    if (demoType === 'user') {
      setEmail('user@scenepass.com');
      setPassword('scenepass123');
    } else {
      setEmail('admin@scenepass.com');
      setPassword('scenepass123');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <Ticket className="w-7 h-7 fill-slate-950" />
        </div>
        <h1 className="font-heading font-black text-3xl text-white">Welcome Back</h1>
        <p className="text-xs text-slate-400">Sign in to manage your bookings & favorites</p>
      </div>

      {/* Quick Fill Demo Login Pills */}
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block text-center">Quick Demo Credentials</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('user')}
            className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5 transition-all"
          >
            <UserCheck className="w-3.5 h-3.5" /> User Demo
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('admin')}
            className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-amber-400 flex items-center justify-center gap-1.5 transition-all"
          >
            <Shield className="w-3.5 h-3.5" /> Admin Demo
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <div>
          <label className="text-xs text-slate-400 font-semibold block mb-1">Email Address</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@scenepass.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500"
              required
            />
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-400 font-semibold block mb-1">Password</label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500"
              required
            />
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/20 mt-2"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-xs text-slate-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-emerald-400 font-bold hover:underline">
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
