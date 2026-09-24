import React from 'react';
import { Check } from 'lucide-react';

// Rows configuration
const ROWS = [
  { rowLabel: 'A', category: 'VIP', price: 550, seatsCount: 12 },
  { rowLabel: 'B', category: 'VIP', price: 550, seatsCount: 12 },
  { rowLabel: 'C', category: 'Premium', price: 380, seatsCount: 14 },
  { rowLabel: 'D', category: 'Premium', price: 380, seatsCount: 14 },
  { rowLabel: 'E', category: 'Premium', price: 380, seatsCount: 14 },
  { rowLabel: 'F', category: 'Regular', price: 250, seatsCount: 16 },
  { rowLabel: 'G', category: 'Regular', price: 250, seatsCount: 16 },
  { rowLabel: 'H', category: 'Regular', price: 250, seatsCount: 16 },
];

const SeatGrid = ({ bookedSeats = [], selectedSeats = [], onToggleSeat, pricing }) => {
  
  const getSeatPrice = (category) => {
    if (!pricing) return 250;
    if (category === 'VIP') return pricing.vip || 550;
    if (category === 'Premium') return pricing.premium || 380;
    return pricing.regular || 250;
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Screen Curved Projection Visualizer */}
      <div className="space-y-2 text-center pt-2">
        <div className="w-full h-3 bg-gradient-to-r from-emerald-500/20 via-emerald-400 to-emerald-500/20 rounded-full screen-curve shadow-lg shadow-emerald-500/30" />
        <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-slate-500">
          All Eyes This Way • Cinema Screen
        </span>
      </div>

      {/* Seat Rows Layout */}
      <div className="space-y-4 py-4 overflow-x-auto no-scrollbar">
        {ROWS.map((rowInfo) => {
          const rowSeats = Array.from({ length: rowInfo.seatsCount }, (_, i) => `${rowInfo.rowLabel}${i + 1}`);
          const rowPrice = getSeatPrice(rowInfo.category);

          return (
            <div key={rowInfo.rowLabel} className="flex items-center justify-center gap-3 min-w-[600px]">
              
              {/* Row Label */}
              <span className="w-6 text-center font-heading font-extrabold text-xs text-slate-400">
                {rowInfo.rowLabel}
              </span>

              {/* Seat Buttons Grid */}
              <div className="flex items-center gap-2">
                {rowSeats.map((seatId, idx) => {
                  const isBooked = bookedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  // Aisle gap space in middle
                  const isAisle = idx === Math.floor(rowInfo.seatsCount / 2);

                  return (
                    <React.Fragment key={seatId}>
                      {isAisle && <div className="w-6" />}
                      <button
                        disabled={isBooked}
                        onClick={() => onToggleSeat(seatId, rowPrice, rowInfo.category)}
                        title={isBooked ? `${seatId} - Booked` : `${seatId} - ₹${rowPrice}`}
                        className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all duration-200 flex items-center justify-center ${
                          isBooked
                            ? 'bg-slate-900 border border-slate-800 text-slate-700 cursor-not-allowed'
                            : isSelected
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40 scale-110 font-extrabold border border-emerald-400'
                            : 'bg-slate-950 border border-slate-700/80 text-slate-300 hover:border-emerald-400 hover:text-emerald-400 hover:scale-105'
                        }`}
                      >
                        {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : seatId}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Price Label */}
              <span className="w-12 text-right text-[10px] font-semibold text-slate-500">
                ₹{rowPrice}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend Bar */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-slate-800/80 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-700" />
          <span className="text-slate-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-emerald-400">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800" />
          <span className="text-slate-600">Occupied</span>
        </div>
      </div>

    </div>
  );
};

export default SeatGrid;
