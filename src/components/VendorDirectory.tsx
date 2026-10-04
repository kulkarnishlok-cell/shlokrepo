import React, { useState } from 'react';
import { IndianVendor } from '../types/household';
import { 
  Phone, 
  MessageSquare, 
  Wrench, 
  Star, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Search, 
  Plus, 
  Sparkles,
  Send,
  Zap,
  ShoppingBag,
  Droplet,
  Coffee,
  X
} from 'lucide-react';

interface VendorDirectoryProps {
  vendors: IndianVendor[];
  onLogServiceRequest?: (vendorName: string, serviceTitle: string) => void;
}

export const VendorDirectory: React.FC<VendorDirectoryProps> = ({
  vendors,
  onLogServiceRequest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrade, setSelectedTrade] = useState<string>('All');
  const [serviceModalVendor, setServiceModalVendor] = useState<IndianVendor | null>(null);
  const [serviceTaskTitle, setServiceTaskTitle] = useState('');
  const [requestLogged, setRequestLogged] = useState(false);

  const getTradeIcon = (trade: IndianVendor['trade']) => {
    switch (trade) {
      case 'Local Electrician': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'Local Plumber': return <Droplet className="w-4 h-4 text-cyan-400" />;
      case 'AC Service Technician': return <Wrench className="w-4 h-4 text-purple-400" />;
      case 'Kirana & General Store': return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case 'Sabziwala (Vegetable Vendor)': return <ShoppingBag className="w-4 h-4 text-green-400" />;
      case 'Doodhwala (Milk Vendor)': return <Coffee className="w-4 h-4 text-blue-400" />;
      default: return <Wrench className="w-4 h-4 text-slate-400" />;
    }
  };

  const getWhatsAppPrefillText = (vendor: IndianVendor) => {
    switch (vendor.trade) {
      case 'Local Electrician':
        return encodeURIComponent('Namaste Ramesh ji, hamare ghar ke master bedroom ka switchboard aur inverter battery check karwana hai. Aap kab aa sakte ho?');
      case 'Local Plumber':
        return encodeURIComponent('Namaste Suresh ji, hamare bathroom geyser tap mein leakage hai aur overhead tank clean karwana hai. Please visit karein.');
      case 'AC Service Technician':
        return encodeURIComponent('Namaste Imran ji, Voltas Split AC ki regular servicing aur cooling coil foam cleaning karwani hai.');
      case 'Kirana & General Store':
        return encodeURIComponent('Namaste Gupta ji, hamare ghar ka grocery ration order: 5kg Chakki Atta, 1L Sunflower Oil, aur 1kg Toor Dal ghar par bhej dijiye.');
      case 'Sabziwala (Vegetable Vendor)':
        return encodeURIComponent('Raju bhai, kal subah 1kg Aloo, 1kg Pyaaz, 500g Tamatar aur thoda Dhaniya-Mirchi gate par le aana.');
      case 'Doodhwala (Milk Vendor)':
        return encodeURIComponent('Bablu bhai, kal subah 1 litre cow milk extra delivery kar dena.');
      default:
        return encodeURIComponent('Namaste, Household OS ke through contact kar rahe hain.');
    }
  };

  const handleCreateServiceRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceModalVendor || !serviceTaskTitle.trim()) return;

    if (onLogServiceRequest) {
      onLogServiceRequest(serviceModalVendor.name, serviceTaskTitle);
    }

    setRequestLogged(true);
    setTimeout(() => {
      setRequestLogged(false);
      setServiceModalVendor(null);
      setServiceTaskTitle('');
    }, 1200);
  };

  const filteredVendors = vendors.filter(v => {
    const matchesTrade = selectedTrade === 'All' || v.trade === selectedTrade;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.areaLocality.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrade && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Local Indian Vendor & Service Directory
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {vendors.length} Verified Contacts
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Emergency contacts for your trusted local mistri, plumber, kirana store, sabziwala, and doodhwala.
          </p>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search electrician, plumber, kirana..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Trade Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {['All', 'Local Electrician', 'Local Plumber', 'AC Service Technician', 'Kirana & General Store', 'Sabziwala (Vegetable Vendor)', 'Doodhwala (Milk Vendor)', 'House Maid & Cook'].map(trade => (
          <button
            key={trade}
            onClick={() => setSelectedTrade(trade)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedTrade === trade
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
            }`}
          >
            {trade}
          </button>
        ))}
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all space-y-4 flex flex-col justify-between"
          >
            {/* Top Info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                    {getTradeIcon(vendor.trade)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{vendor.name}</h3>
                    <p className="text-xs font-semibold text-emerald-400">{vendor.trade}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold font-mono">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {vendor.rating}
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-300 font-medium">{vendor.businessName}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{vendor.areaLocality}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 italic">
                "{vendor.notes}"
              </div>
            </div>

            {/* Action Buttons: Call, WhatsApp, Log Request */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {/* Direct Phone Call */}
                <a
                  href={`tel:${vendor.phoneNumber}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Call Direct</span>
                </a>

                {/* Direct WhatsApp with pre-filled Indian message */}
                <a
                  href={`https://wa.me/${vendor.whatsappNumber}?text=${getWhatsAppPrefillText(vendor)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/30 hover:border-emerald-400 transition-all font-mono"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Log Service Ticket */}
              <button
                onClick={() => setServiceModalVendor(vendor)}
                className="w-full py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-1.5"
              >
                <Wrench className="w-3.5 h-3.5 text-slate-400" />
                <span>Log Service Request Ticket</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Log Service Request Modal */}
      {serviceModalVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-[#0F172A] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  Schedule Service with {serviceModalVendor.name}
                </h3>
              </div>
              <button
                onClick={() => setServiceModalVendor(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateServiceRequest} className="space-y-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  WORK DESCRIPTION
                </label>
                <input
                  type="text"
                  required
                  value={serviceTaskTitle}
                  onChange={(e) => setServiceTaskTitle(e.target.value)}
                  placeholder={`e.g. Inverter battery distilled water check, or AC foam clean`}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono space-y-1">
                <div>Vendor: {serviceModalVendor.name} ({serviceModalVendor.trade})</div>
                <div>Phone: {serviceModalVendor.phoneNumber}</div>
                <div>Assigned Domestic Chores: Rohan Sharma (You)</div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setServiceModalVendor(null)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={requestLogged}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all font-mono"
                >
                  {requestLogged ? 'Ticket Logged!' : 'Dispatch Household Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
