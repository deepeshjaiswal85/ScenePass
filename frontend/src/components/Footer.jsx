import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Shield, Sparkles, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-emerald-500/20">
                <Ticket className="w-5 h-5 fill-slate-950" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white">
                Scene<span className="text-emerald-400">Pass</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              ScenePass is a next-generation entertainment discovery and ticketing platform. Discover trending movies, live concerts, theatre plays, and thrilling local experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-4 uppercase tracking-wider">Discover</h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li><Link to="/movies" className="hover:text-emerald-400 transition-colors">Movies Now Showing</Link></li>
              <li><Link to="/events" className="hover:text-emerald-400 transition-colors">Live Music & Comedy</Link></li>
              <li><Link to="/plays" className="hover:text-emerald-400 transition-colors">Theatre & Plays</Link></li>
              <li><Link to="/sports" className="hover:text-emerald-400 transition-colors">Sports Matches</Link></li>
              <li><Link to="/activities" className="hover:text-emerald-400 transition-colors">Activities & Experiences</Link></li>
            </ul>
          </div>

          {/* User Account */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-4 uppercase tracking-wider">Account</h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li><Link to="/profile" className="hover:text-emerald-400 transition-colors">My Profile</Link></li>
              <li><Link to="/profile?tab=bookings" className="hover:text-emerald-400 transition-colors">My Digital Bookings</Link></li>
              <li><Link to="/profile?tab=favorites" className="hover:text-emerald-400 transition-colors">Saved Favorites</Link></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Sign In / Sign Up</Link></li>
              <li><Link to="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1"><Shield className="w-3 h-3 text-amber-400" /> Admin Portal</Link></li>
            </ul>
          </div>

          {/* Customer Trust */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-4 uppercase tracking-wider">ScenePass Guarantee</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="font-semibold text-emerald-400 block mb-1">⚡ Instant QR Entry</span>
                <span className="text-slate-400">Scan digital e-tickets straight from your phone display.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="font-semibold text-cyan-400 block mb-1">🔒 100% Secure Checkout</span>
                <span className="text-slate-400">Encrypted instant simulated payment flows.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 ScenePass Entertainment Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Movie & Event Lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
