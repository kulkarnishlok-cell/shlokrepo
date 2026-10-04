import React, { useState } from 'react';
import { IndianFinancialLiability } from '../types/household';
import { 
  IndianRupee, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  CreditCard, 
  Zap, 
  Tv, 
  Wifi, 
  Home, 
  Dumbbell, 
  FileText, 
  Send,
  Sparkles,
  QrCode,
  ShieldCheck,
  Check
} from 'lucide-react';

interface IndianFinancialAgentProps {
  liabilities: IndianFinancialLiability[];
  onPayBill: (liabilityId: string) => void;
}

export const IndianFinancialAgent: React.FC<IndianFinancialAgentProps> = ({
  liabilities,
  onPayBill,
}) => {
  const [selectedPayBill, setSelectedPayBill] = useState<IndianFinancialLiability | null>(null);
  const [upiProcessing, setUpiProcessing] = useState(false);
  const [upiSuccess, setUpiSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Urgent' | 'Utilities' | 'Subscriptions'>('All');

  const totalMonthlyOutflow = liabilities.reduce((acc, curr) => acc + curr.amountINR, 0);
  const dueWithinWeek = liabilities
    .filter(l => l.status !== 'Paid' && l.dueDaysRemaining <= 7)
    .reduce((acc, curr) => acc + curr.amountINR, 0);

  const getCategoryIcon = (category: IndianFinancialLiability['category']) => {
    switch (category) {
      case 'Electricity': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'Property Tax (Gharpatti)': return <Home className="w-4 h-4 text-cyan-400" />;
      case 'Broadband & Wi-Fi': return <Wifi className="w-4 h-4 text-blue-400" />;
      case 'DTH & Cable TV': return <Tv className="w-4 h-4 text-purple-400" />;
      case 'Fitness': return <Dumbbell className="w-4 h-4 text-emerald-400" />;
      default: return <CreditCard className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: IndianFinancialLiability['status']) => {
    switch (status) {
      case 'Urgent':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse';
      case 'Due Soon':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Paid':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Processing':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    }
  };

  const handleSimulateUpiPayment = () => {
    if (!selectedPayBill) return;
    setUpiProcessing(true);
    setTimeout(() => {
      setUpiProcessing(false);
      setUpiSuccess(true);
      setTimeout(() => {
        onPayBill(selectedPayBill.id);
        setUpiSuccess(false);
        setSelectedPayBill(null);
      }, 1200);
    }, 1500);
  };

  const filteredLiabilities = liabilities.filter(item => {
    if (activeTab === 'Urgent') return item.status === 'Urgent';
    if (activeTab === 'Utilities') return ['Electricity', 'Water', 'LPG Gas', 'Property Tax (Gharpatti)'].includes(item.category);
    if (activeTab === 'Subscriptions') return ['Broadband & Wi-Fi', 'DTH & Cable TV', 'OTT Subscription', 'Fitness'].includes(item.category);
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Indian Financial & Recurring Expense Agent
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              UPI & BBPS Integrated
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tracks recurring Indian utilities (MSEDCL/Tata Power), municipal Gharpatti tax, Wi-Fi, DTH recharges, and society dues.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300">
            Total Monthly Expenses: <span className="font-bold text-emerald-400 text-sm">₹{totalMonthlyOutflow.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#0F172A] border border-slate-800 p-3.5 rounded-2xl">
          <span className="text-[11px] font-mono text-slate-400 block">DUE IN NEXT 7 DAYS</span>
          <div className="text-lg font-bold font-mono text-amber-300 mt-0.5">
            ₹{dueWithinWeek.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-amber-400/80 font-mono">3 Bills Require Action</span>
        </div>

        <div className="bg-[#0F172A] border border-rose-500/30 p-3.5 rounded-2xl bg-rose-500/5">
          <span className="text-[11px] font-mono text-rose-300 block">URGENT LIABILITIES</span>
          <div className="text-lg font-bold font-mono text-rose-400 mt-0.5">
            {liabilities.filter(l => l.status === 'Urgent').length} Critical
          </div>
          <span className="text-[10px] text-rose-400/80 font-mono">JioFiber & Netflix due &le; 2 days</span>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-3.5 rounded-2xl">
          <span className="text-[11px] font-mono text-slate-400 block">MUNICIPAL GHARPATTI</span>
          <div className="text-lg font-bold font-mono text-cyan-300 mt-0.5">
            ₹4,200
          </div>
          <span className="text-[10px] text-cyan-400/80 font-mono">Early-bird rebate active</span>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-3.5 rounded-2xl">
          <span className="text-[11px] font-mono text-slate-400 block">RECONCILED BILLS</span>
          <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
            {liabilities.filter(l => l.status === 'Paid').length} Paid
          </div>
          <span className="text-[10px] text-emerald-400/80 font-mono">Municipal Water cleared</span>
        </div>
      </div>

      {/* Electricity Anomaly Banner */}
      {liabilities.some(l => l.isAnomaly && l.status !== 'Paid') && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg shadow-amber-950/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-white">
                  Electricity Consumption Anomaly Detected (MSEDCL)
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  +21% Surge
                </span>
              </div>
              <p className="text-xs text-amber-200/80 mt-0.5 leading-relaxed">
                Bill jumped from ₹2,850 to ₹3,450. Household AC short-cycling pushed units beyond the 300 kWh tariff slab.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSelectedPayBill(liabilities.find(l => l.id === 'fin_elec') || null)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all font-mono"
            >
              Pay ₹3,450 with UPI
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {(['All', 'Urgent', 'Utilities', 'Subscriptions'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === tab 
                ? 'bg-slate-800 text-emerald-400 border border-slate-700 font-semibold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab} ({tab === 'All' ? liabilities.length : tab === 'Urgent' ? liabilities.filter(l => l.status === 'Urgent').length : liabilities.filter(l => tab === 'Utilities' ? ['Electricity', 'Water', 'LPG Gas', 'Property Tax (Gharpatti)'].includes(l.category) : ['Broadband & Wi-Fi', 'DTH & Cable TV', 'OTT Subscription', 'Fitness'].includes(l.category)).length})
          </button>
        ))}
      </div>

      {/* Liabilities List */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl divide-y divide-slate-800/80">
        {filteredLiabilities.map((bill) => (
          <div
            key={bill.id}
            className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 mt-0.5">
                {getCategoryIcon(bill.category)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{bill.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {bill.billingCycle}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span>{bill.issuerVendor}</span>
                  {bill.consumerNumber && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-slate-500">{bill.consumerNumber}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
              <div className="text-right">
                <div className="text-base font-bold font-mono text-white">
                  ₹{bill.amountINR.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {bill.status === 'Paid' ? (
                    <span className="text-emerald-400 flex items-center justify-end gap-1">
                      <CheckCircle className="w-3 h-3" /> Paid
                    </span>
                  ) : (
                    <span>Due in {bill.dueDaysRemaining} Days ({bill.dueDate})</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(bill.status)}`}>
                  {bill.status}
                </span>

                {bill.status !== 'Paid' && (
                  <button
                    onClick={() => setSelectedPayBill(bill)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-mono shadow-md shadow-emerald-500/20"
                  >
                    Pay UPI
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simulated UPI Payment Modal (GPay / PhonePe / Paytm / BHIM) */}
      {selectedPayBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-[#0F172A] border border-emerald-500/40 rounded-2xl p-6 shadow-2xl space-y-5 text-center">
            
            {/* Modal Top */}
            <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-left">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">BBPS Indian Payment Gateway</span>
                <h3 className="text-sm font-bold text-white">{selectedPayBill.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPayBill(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                Cancel
              </button>
            </div>

            {/* Bill Details Box */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400">Payable Amount</span>
              <div className="text-2xl font-bold font-mono text-emerald-400">
                ₹{selectedPayBill.amountINR.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Bill ID: {selectedPayBill.consumerNumber || 'BBPS-2026-IND'} • Due {selectedPayBill.dueDate}
              </p>
            </div>

            {/* Mock QR Code for Indian Domestic Feel */}
            <div className="w-36 h-36 mx-auto bg-white p-2.5 rounded-xl shadow-lg flex flex-col items-center justify-center">
              <QrCode className="w-24 h-24 text-slate-900" />
              <span className="text-[8px] font-mono text-slate-600 font-bold tracking-widest mt-1">BHIM UPI 2.0</span>
            </div>

            <p className="text-xs text-slate-400">
              Scan with Google Pay, PhonePe, Paytm, or tap below to simulate 1-click auto-debit confirmation.
            </p>

            <button
              onClick={handleSimulateUpiPayment}
              disabled={upiProcessing || upiSuccess}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 transition-all font-mono flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              {upiSuccess ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>UPI Payment Successful (Ref #99210088)!</span>
                </>
              ) : upiProcessing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Authenticating with NPCI UPI Switch...</span>
                </>
              ) : (
                <>
                  <IndianRupee className="w-4 h-4 text-slate-950" />
                  <span>Confirm UPI Payment of ₹{selectedPayBill.amountINR.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
