import React, { useState } from 'react';
import { IndianInventoryItem } from '../types/household';
import { 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  CheckCircle, 
  Plus, 
  Check, 
  Coffee, 
  Droplet, 
  MessageSquare,
  Sparkles,
  ExternalLink,
  Flame
} from 'lucide-react';

interface KitchenInventoryProps {
  items: IndianInventoryItem[];
  onToggleKiranaList: (itemId: string) => void;
  onRestockItem: (itemId: string) => void;
  onRestockAllLow: () => void;
}

export const KitchenInventory: React.FC<KitchenInventoryProps> = ({
  items,
  onToggleKiranaList,
  onRestockItem,
  onRestockAllLow,
}) => {
  const [orderSent, setOrderSent] = useState(false);

  const lowStockItems = items.filter(i => i.status === 'critical_low' || i.status === 'running_out');
  const itemsInList = items.filter(i => i.addedToKiranaList);

  const getStatusBadge = (status: IndianInventoryItem['status']) => {
    switch (status) {
      case 'critical_low':
        return {
          label: '⚠️ Critical Low',
          badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse font-bold',
          barClass: 'bg-rose-500'
        };
      case 'running_out':
        return {
          label: '🟡 Running Out Soon',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold',
          barClass: 'bg-amber-500'
        };
      case 'sufficient':
        return {
          label: '🟢 Sufficient Stock',
          badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          barClass: 'bg-emerald-500'
        };
    }
  };

  const generateWhatsAppKiranaText = () => {
    const list = itemsInList.map(i => `• ${i.name} (${i.preferredBrand})`).join('%0A');
    const msg = `Namaste Gupta ji, hamare ghar ka ration order:%0A${list}%0APlease Flat 402 mein home delivery bhej dijiye. Bill UPI kar denge.`;
    return `https://wa.me/919821055674?text=${msg}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Smart Indian Kitchen & Ration Inventory
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Chakki & Daily Dairy
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tracks Indian staples (Chakki Atta, Basmati Rice, Toor Dal, Milk, Oil) with automated Kirana list synchronization.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {itemsInList.length > 0 && (
            <a
              href={generateWhatsAppKiranaText()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-mono shadow-md shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send WhatsApp List to Gupta Kirana ({itemsInList.length} items)</span>
            </a>
          )}

          <button
            onClick={onRestockAllLow}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-all font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mark Low Items Restocked</span>
          </button>
        </div>
      </div>

      {/* Critical Stock Alert Banner */}
      {lowStockItems.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-rose-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                {lowStockItems.length} Kitchen Staples Reached Reorder Threshold
              </h4>
              <p className="text-xs text-rose-300/80 mt-0.5">
                Chakki Fresh Atta ({items.find(i => i.id === 'inv_atta')?.currentStock} kg) and Milk ({items.find(i => i.id === 'inv_milk')?.currentStock} L) need immediate refill for today's meals.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-bold text-rose-300">
              Est. Cost: ₹{lowStockItems.reduce((acc, curr) => acc + curr.estimatedCostINR, 0)}
            </span>
          </div>
        </div>
      )}

      {/* Inventory Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const badge = getStatusBadge(item.status);
          const percent = Math.min((item.currentStock / (item.thresholdStock * 2)) * 100, 100);

          return (
            <div
              key={item.id}
              className={`bg-[#0F172A] border rounded-2xl p-4 shadow-xl transition-all space-y-3 flex flex-col justify-between ${
                item.status === 'critical_low' 
                  ? 'border-rose-500/50 shadow-rose-950/30' 
                  : item.status === 'running_out'
                  ? 'border-amber-500/40' 
                  : 'border-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      Brand: {item.preferredBrand}
                    </p>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${badge.badgeClass}`}>
                    {badge.label}
                  </span>
                </div>

                {/* Stock Level Display */}
                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-2xl font-bold font-mono text-white">
                      {item.currentStock}
                    </span>
                    <span className="text-xs font-mono text-slate-400 ml-1">{item.unit}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-slate-400">
                      ~{item.estimatedDaysRemaining} Days Left
                    </span>
                    <span className="text-[10px] text-slate-500 block font-mono">
                      Threshold: {item.thresholdStock} {item.unit}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${badge.barClass}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
                  <span>Consumption: ~{item.dailyConsumption} {item.unit}/day</span>
                  <span className="text-slate-300 font-semibold">₹{item.estimatedCostINR}</span>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onToggleKiranaList(item.id)}
                  className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 font-mono ${
                    item.addedToKiranaList
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {item.addedToKiranaList ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>On Kirana List</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Kirana List</span>
                    </>
                  )}
                </button>

                {item.status !== 'sufficient' && (
                  <button
                    onClick={() => onRestockItem(item.id)}
                    className="py-1.5 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    title="Mark item as bought and refilled"
                  >
                    Restock
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
