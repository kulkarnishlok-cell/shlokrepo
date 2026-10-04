import React from 'react';
import { HouseholdAsset } from '../types/household';
import { 
  Flame, 
  Droplet, 
  WashingMachine, 
  Car, 
  AlertTriangle, 
  CheckCircle, 
  Wrench, 
  ShieldCheck, 
  Calendar, 
  FileText,
  DollarSign
} from 'lucide-react';

interface AssetTrackerProps {
  assets: HouseholdAsset[];
  onTriggerMaintenance: (assetId: string) => void;
}

export const AssetTracker: React.FC<AssetTrackerProps> = ({
  assets,
  onTriggerMaintenance,
}) => {
  const getAssetIcon = (category: string) => {
    switch (category) {
      case 'HVAC': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Plumbing': return <Droplet className="w-5 h-5 text-cyan-400" />;
      case 'Appliance': return <WashingMachine className="w-5 h-5 text-purple-400" />;
      case 'Vehicle': return <Car className="w-5 h-5 text-emerald-400" />;
      default: return <Wrench className="w-5 h-5 text-slate-400" />;
    }
  };

  const getHealthBadge = (score: number) => {
    if (score >= 80) {
      return {
        text: 'Optimal Condition',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        bar: 'bg-emerald-500'
      };
    }
    if (score >= 60) {
      return {
        text: 'Degrading / Attention',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        bar: 'bg-amber-500'
      };
    }
    return {
      text: 'Critical Wear Risk',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      bar: 'bg-rose-500'
    };
  };

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Predictive Asset & Maintenance Tracker
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {assets.length} Active Nodes
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Physical degradation modeling, warranty protection windows, and proactive failure mitigation.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
            Total Capital Protected: <span className="font-bold text-white">$52,950</span>
          </div>
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {assets.map((asset) => {
          const badge = getHealthBadge(asset.healthScore);
          const isWarning = asset.healthScore < 80;
          const isCritical = asset.healthScore < 60;

          return (
            <div
              key={asset.id}
              className={`relative bg-[#0F172A] border rounded-2xl p-5 transition-all shadow-xl ${
                isCritical 
                  ? 'border-rose-500/60 shadow-rose-950/40' 
                  : isWarning 
                  ? 'border-amber-500/50 shadow-amber-950/30' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/80">
                    {getAssetIcon(asset.category)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{asset.name}</h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      Model: {asset.modelNumber} • {asset.location}
                    </p>
                  </div>
                </div>

                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>
                  {badge.text}
                </span>
              </div>

              {/* Health Score Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <span className="text-slate-400">Subsystem Health Index</span>
                  <span className="font-bold text-white">{asset.healthScore}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${badge.bar}`}
                    style={{ width: `${asset.healthScore}%` }}
                  />
                </div>
              </div>

              {/* Telemetry Details */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-slate-500 block text-[10px]">NEXT ACTION DUE</span>
                  <span className="font-bold text-slate-200">{asset.nextMaintenanceDue}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">WARRANTY EXPIRES</span>
                  <span className="font-bold text-slate-200">{asset.warrantyExpiry}</span>
                </div>
                {asset.criticalConsumable && (
                  <div className="col-span-2 pt-1 border-t border-slate-800/60">
                    <span className="text-slate-500 block text-[10px]">CRITICAL CONSUMABLE SPEC</span>
                    <span className="font-bold text-cyan-300">{asset.criticalConsumable}</span>
                  </div>
                )}
              </div>

              {/* Failure Risk Alert Callout */}
              {asset.failureRiskDescription && (
                <div className={`mt-3 p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                  isCritical 
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' 
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${isCritical ? 'text-rose-400' : 'text-amber-400'}`} />
                  <div>
                    <span className="font-semibold text-slate-200">Failure Risk Analysis: </span>
                    {asset.failureRiskDescription}
                  </div>
                </div>
              )}

              {/* Bottom Action Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  Risk Exposure: ${asset.annualReplacementCost}
                </span>

                <button
                  onClick={() => onTriggerMaintenance(asset.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-emerald-500/40 transition-all flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isCritical ? 'Immediate Mitigation' : 'Log Maintenance'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
