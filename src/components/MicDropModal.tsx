import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight,
  Flame,
  Droplet,
  Zap,
  ShoppingCart
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MicDropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const MicDropModal: React.FC<MicDropModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleAuthorize = () => {
    setIsExecuting(true);

    setTimeout(() => {
      setIsExecuting(false);
      setIsDone(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        onSuccess();
        onClose();
        setIsDone(false);
      }, 1500);
    }, 1000);
  };

  const actionItems = [
    {
      icon: <Droplet className="w-4 h-4 text-cyan-400" />,
      title: "Mitigate Plumbing Catastrophic Flood Risk",
      detail: "Schedules automated NFC reminder to shut off main valve before 10-day trip. Protects $1,950 water heater tank breach risk."
    },
    {
      icon: <Zap className="w-4 h-4 text-rose-400" />,
      title: "File Autonomous Energy Rate Surge Dispute",
      detail: "Dispatches formal tariff audit letter to Pacific Gas & Electric for unseasonal 39.1% MoM surge ($60.30 credit request)."
    },
    {
      icon: <ShoppingCart className="w-4 h-4 text-emerald-400" />,
      title: "Dispatch HVAC Consumable Replenishment",
      detail: "Executes 1-click cart purchase of 16x25x1 MERV 11 filter (3-pack) before weekend service window."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0F172A] border border-emerald-500/50 rounded-2xl p-6 shadow-2xl shadow-emerald-950/50 overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Autonomous Remediation Batch</h3>
              <p className="text-xs text-slate-400">Zero-Cognitive-Load Execution</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4">
          <p className="text-xs text-slate-300">
            Household OS has synthesized the entire household state graph. Authorizing will atomically resolve all 3 flagged domestic hazards:
          </p>

          <div className="space-y-2.5">
            {actionItems.map((item, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-slate-800 shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center justify-between">
            <span>Resulting Household Score:</span>
            <span className="font-bold text-base text-emerald-400">100% (Optimal)</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleAuthorize}
            disabled={isExecuting || isDone}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 group disabled:opacity-60"
          >
            {isDone ? (
              <>
                <CheckCircle className="w-4 h-4 text-slate-950" />
                <span>All Systems Protected!</span>
              </>
            ) : isExecuting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                <span>Reconciling State Graph...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Authorize All Protective Actions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
