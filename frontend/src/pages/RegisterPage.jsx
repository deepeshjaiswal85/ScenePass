import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket, Mail, Lock, User, Phone, MapPin, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CITIES } from '../context/CityContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Jaipur');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await register({ name, email, phone, password, city });
    setLoading(false);

    if (res.success) {
      navigate('/');
    } else {
      setError('Registration failed. Please check details.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <Ticket className="w-7 h-7 fill-slate-950" />
        </div>
        <h1 className="font-heading font-black text-3xl text-white">Join ScenePass</h1>
        <p className="text-xs text-slate-400">Create your account for instant ticket booking</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <div>
          <label className="text-xs text-slate-400 font-semibold block mb-1">Full Name</label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aarav Sharma"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500"
              required
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-400 font-semibold block mb-1">Email Address</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aarav@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500"
              required
            />
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-semibold block mb-1">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none"
            >
              {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
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
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p className="text-center text-xs text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="text-emerald-400 font-bold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
