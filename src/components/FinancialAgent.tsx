import React, { useState } from 'react';
import { FinancialLiability } from '../types/household';
import { 
  CreditCard, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  FileText, 
  ShieldCheck, 
  Send,
  Zap,
  Copy,
  Check
} from 'lucide-react';

interface FinancialAgentProps {
  liabilities: FinancialLiability[];
  onResolveAnomaly: (liabilityId: string) => void;
}

export const FinancialAgent: React.FC<FinancialAgentProps> = ({
  liabilities,
  onResolveAnomaly,
}) => {
  const [selectedDispute, setSelectedDispute] = useState<FinancialLiability | null>(null);
  const [copied, setCopied] = useState(false);

  const totalMonthlyOutflow = liabilities.reduce((sum, item) => sum + item.amount, 0);
  const anomalies = liabilities.filter(l => l.isAnomaly);

  const handleCopyLetter = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Smart Financial Agent & Liability Tracker
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Recurring Event Bus
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated recurring bill reconciliation, price creep detection, and 1-click contract dispute generation.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            30-Day Projected Outflow: <span className="font-bold text-emerald-400 font-mono text-sm">${totalMonthlyOutflow.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Critical Anomaly Alerts Banner */}
      {anomalies.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Detected Financial Inefficiencies ({anomalies.length})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {anomalies.map((anomaly) => {
              const diff = anomaly.previousAmount ? anomaly.amount - anomaly.previousAmount : 0;
              const percent = anomaly.previousAmount ? ((diff / anomaly.previousAmount) * 100).toFixed(1) : 0;

              return (
                <div 
                  key={anomaly.id}
                  className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 shadow-lg shadow-rose-950/20 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{anomaly.vendor}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold">
                          +{percent}% Surge
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{anomaly.category} • Due {anomaly.nextDueDate}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-white">${anomaly.amount.toFixed(2)}</div>
                      <div className="text-[10px] font-mono text-rose-400">+${diff.toFixed(2)} delta</div>
                    </div>
                  </div>

                  <p className="text-xs text-rose-200/90 bg-slate-950/60 p-2.5 rounded-xl border border-rose-500/20">
                    {anomaly.anomalyReason}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setSelectedDispute(anomaly)}
                      className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1 font-medium underline-offset-2 hover:underline"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Generate AI Dispute / Cancellation
                    </button>

                    <button
                      onClick={() => onResolveAnomaly(anomaly.id)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Liabilities Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
            Active Domestic Liabilities
          </span>
          <span className="text-xs text-slate-500 font-mono">4 Subscriptions & Fixed Utilities</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {liabilities.map((item) => (
            <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className={`p-2.5 rounded-xl border ${
                  item.isAnomaly 
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}>
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{item.vendor}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Cycle: {item.frequency} • Autopay: {item.autopayEnabled ? 'Active' : 'Manual'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6">
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-white">${item.amount.toFixed(2)}</div>
                  <div className="text-[10px] font-mono text-slate-500">Next: {item.nextDueDate}</div>
                </div>

                <div className="w-24 text-right">
                  {item.isAnomaly ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      Flagged
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Reconciled
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dispute Letter Drawer / Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-[#0F172A] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5 text-cyan-400">
                <FileText className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">
                  Autonomous Dispute Draft — {selectedDispute.vendor}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedDispute(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                Close
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed max-h-72 overflow-y-auto">
              <p className="text-slate-500 mb-2">To: {selectedDispute.vendor} Customer Billing Support</p>
              <p className="text-slate-500 mb-3">Re: Notice of Unauthorized Rate Increase / Service Cancellation</p>
              <p className="mb-2">
                Dear Billing Department,
              </p>
              <p className="mb-2">
                I am writing regarding my domestic account for {selectedDispute.vendor}. Our automated household ledger identified an unscheduled billing jump from ${selectedDispute.previousAmount?.toFixed(2)} to ${selectedDispute.amount.toFixed(2)} effective {selectedDispute.nextDueDate}.
              </p>
              <p className="mb-2">
                This modification exceeds agreed contractual limits without prior written disclosure. Please either immediately roll back our tier to the grandfathered baseline or terminate the subscription effective at the end of the current billing cycle with a refund for unrendered services.
              </p>
              <p className="text-slate-400 mt-4">
                Respectfully,<br />
                The Rivera Household Estate<br />
                (Dispatched via Household OS Agent)
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleCopyLetter}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Notice Text'}</span>
              </button>

              <button
                onClick={() => {
                  onResolveAnomaly(selectedDispute.id);
                  setSelectedDispute(null);
                }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 transition-all font-bold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simulate Automated Email Send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
