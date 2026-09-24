import React, { useState } from 'react';
import { X, CreditCard, QrCode, Building2, Wallet, ShieldCheck, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const PaymentModal = ({ isOpen, onClose, totalAmount, onPaymentSuccess }) => {
  if (!isOpen) return null;

  const [paymentMode, setPaymentMode] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated fields
  const [upiId, setUpiId] = useState('scenepass@upi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');

  const handlePay = () => {
    setIsProcessing(true);

    // Simulate payment gateway delay (2.5 seconds)
    setTimeout(() => {
      setIsProcessing(false);
      // Trigger festive confetti celebrate effect
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      onPaymentSuccess(paymentMode.toUpperCase());
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">ScenePass Pay</span>
            <h3 className="font-heading font-extrabold text-xl text-white">Complete Payment</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Banner */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Total Amount Payable</span>
          <span className="font-heading font-black text-2xl text-emerald-400">₹{totalAmount}</span>
        </div>

        {/* Payment Modes Selector Tabs */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'upi', label: 'UPI / QR', icon: QrCode },
            { id: 'card', label: 'Card', icon: CreditCard },
            { id: 'netbanking', label: 'NetBank', icon: Building2 },
            { id: 'wallet', label: 'Wallet', icon: Wallet },
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = paymentMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setPaymentMode(mode.id)}
                disabled={isProcessing}
                className={`flex flex-col items-center p-3 rounded-2xl border text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Payment Mode Form Fields */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 min-h-[140px]">
          {paymentMode === 'upi' && (
            <div className="space-y-3 text-center">
              <div className="w-32 h-32 bg-white p-2 rounded-xl mx-auto shadow-md flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=scenepass@pay&pn=ScenePass&am=${totalAmount}`}
                  alt="UPI QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[11px] text-slate-400">Scan QR using GPay, PhonePe, Paytm or BHIM</p>
            </div>
          )}

          {paymentMode === 'card' && (
            <div className="space-y-3 text-left">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Expiry</label>
                  <input type="text" defaultValue="08/29" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">CVV</label>
                  <input type="password" defaultValue="•••" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white" />
                </div>
              </div>
            </div>
          )}

          {paymentMode === 'netbanking' && (
            <div className="space-y-2 text-left">
              <label className="text-[10px] text-slate-400 block">Select Preferred Bank</label>
              <select className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none">
                <option>HDFC Bank</option>
                <option>State Bank of India (SBI)</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
            </div>
          )}

          {paymentMode === 'wallet' && (
            <div className="space-y-2 text-left">
              <label className="text-[10px] text-slate-400 block">Select Digital Wallet</label>
              <select className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none">
                <option>Paytm Wallet</option>
                <option>PhonePe Wallet</option>
                <option>Amazon Pay</option>
              </select>
            </div>
          )}
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>256-Bit SSL Encryption • Simulated Payment Sandbox</span>
        </div>

        {/* Submit Pay Button */}
        <button
          disabled={isProcessing}
          onClick={handlePay}
          className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-extrabold text-base flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-500/25"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Authorizing Transaction...</span>
            </>
          ) : (
            <span>Pay ₹{totalAmount} Now</span>
          )}
        </button>

      </div>
    </div>
  );
};

export default PaymentModal;
