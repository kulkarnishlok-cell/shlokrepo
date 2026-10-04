import React, { useState } from 'react';
import { InventoryItem } from '../types/household';
import { 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  CheckCircle, 
  Plus, 
  Check, 
  ExternalLink,
  Flame,
  Droplet,
  Coffee,
  Sparkles
} from 'lucide-react';

interface InventoryManagerProps {
  items: InventoryItem[];
  onToggleCart: (itemId: string) => void;
  onOrderAllCart: () => void;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({
  items,
  onToggleCart,
  onOrderAllCart,
}) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartItems = items.filter(i => i.inCart);
  const totalCartCost = cartItems.reduce((sum, item) => sum + item.estimatedCost, 0);

  const handleOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      onOrderAllCart();
      setOrderPlaced(false);
    }, 1200);
  };

  const getItemIcon = (category: string) => {
    switch (category) {
      case 'Filters': return <Flame className="w-4 h-4 text-amber-400" />;
      case 'Water': return <Droplet className="w-4 h-4 text-cyan-400" />;
      case 'Pantry': return <Coffee className="w-4 h-4 text-emerald-400" />;
      default: return <Package className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Predictive Inventory & Consumption Engine
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Runout Velocity Modeling
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Calculates household daily burn rates to replenish domestic staples just-in-time before depletion.
          </p>
        </div>

        {cartItems.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleOrder}
              disabled={orderPlaced}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20"
            >
              {orderPlaced ? (
                <>
                  <CheckCircle className="w-4 h-4 animate-spin" />
                  <span>Dispatching Replenishment Order...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>1-Click Replenish Cart ({cartItems.length} items • ${totalCartCost.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Grid of Consumables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const isCritical = item.daysRemaining <= item.reorderThresholdDays;
          const isWarning = item.daysRemaining <= item.reorderThresholdDays * 1.5;

          return (
            <div
              key={item.id}
              className={`bg-[#0F172A] border rounded-2xl p-4 transition-all shadow-xl ${
                isCritical 
                  ? 'border-rose-500/50 shadow-rose-950/20' 
                  : isWarning 
                  ? 'border-amber-500/40' 
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                    {getItemIcon(item.category)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      Current Stock: {item.currentStock} {item.unit}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-base font-bold font-mono ${
                    isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {item.daysRemaining} Days
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Runout Remaining</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min((item.daysRemaining / 45) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Consumption Velocity Details */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-slate-500 block text-[10px]">DAILY BURN RATE</span>
                  <span className="font-semibold text-slate-300">~{item.dailyBurnRate} {item.unit}/day</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">REORDER TRIGGER</span>
                  <span className="font-semibold text-slate-300">&le; {item.reorderThresholdDays} days</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Pack Estimate: ${item.estimatedCost.toFixed(2)}
                </span>

                <button
                  onClick={() => onToggleCart(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    item.inCart
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {item.inCart ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Queued in Cart</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Queue Restock</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
