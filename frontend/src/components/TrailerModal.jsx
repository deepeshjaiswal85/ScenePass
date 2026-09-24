import React from 'react';
import { X } from 'lucide-react';

const TrailerModal = ({ isOpen, onClose, trailerUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h3 className="font-heading font-bold text-lg text-white truncate max-w-md">
            {title} - Official Trailer
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={trailerUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
