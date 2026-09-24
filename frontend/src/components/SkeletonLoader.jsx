import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden animate-pulse">
    <div className="aspect-[2/3] bg-slate-800" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-800 rounded w-3/4" />
      <div className="h-3 bg-slate-800 rounded w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-4 bg-slate-800 rounded w-1/4" />
        <div className="h-7 bg-slate-800 rounded-xl w-16" />
      </div>
    </div>
  </div>
);

export const ShowtimesSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="h-5 bg-slate-800 rounded w-1/3" />
        <div className="h-3 bg-slate-800 rounded w-1/4" />
        <div className="flex gap-2 pt-2">
          <div className="h-9 bg-slate-800 rounded-xl w-24" />
          <div className="h-9 bg-slate-800 rounded-xl w-24" />
          <div className="h-9 bg-slate-800 rounded-xl w-24" />
        </div>
      </div>
    ))}
  </div>
);
