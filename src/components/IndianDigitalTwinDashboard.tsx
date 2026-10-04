import React, { useState } from 'react';
import { 
  GraphNode, 
  GraphEdge, 
  IndianHouseholdAsset, 
  IndianFinancialLiability, 
  IndianInventoryItem, 
  IndianVendor, 
  IndianChoreTask,
  ChatMessage
} from '../types/household';
import { 
  Flame, 
  Droplet, 
  Zap, 
  User, 
  Package, 
  CreditCard, 
  CheckCircle, 
  AlertTriangle, 
  IndianRupee, 
  Search, 
  Sparkles, 
  Bot, 
  Phone, 
  Calendar, 
  ArrowRight,
  TrendingDown,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  Activity
} from 'lucide-react';

interface IndianDigitalTwinDashboardProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  assets: IndianHouseholdAsset[];
  liabilities: IndianFinancialLiability[];
  inventory: IndianInventoryItem[];
  vendors: IndianVendor[];
  chores: IndianChoreTask[];
  onSelectSubsystem: (tab: string) => void;
  onPayBill: (billId: string) => void;
}

export const IndianDigitalTwinDashboard: React.FC<IndianDigitalTwinDashboardProps> = ({
  nodes,
  edges,
  assets,
  liabilities,
  inventory,
  vendors,
  chores,
  onSelectSubsystem,
  onPayBill,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('ast_ac');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<ChatMessage | null>({
    id: 'ai_welcome',
    sender: 'assistant',
    timestamp: 'Just now',
    content: 'Namaste! Household OS Indian Digital Twin is active. You can ask about Gharpatti tax deadlines, Ramesh Mistri’s contact, weekly bills, or MSEDCL electricity surges.'
  });

  const totalMonthlyOutflow = liabilities.reduce((acc, curr) => acc + curr.amountINR, 0);
  const pendingChoresCount = chores.filter(c => c.status !== 'Completed').length;
  const criticalInventoryCount = inventory.filter(i => i.status === 'critical_low').length;
  const expiringWarrantiesCount = assets.filter(a => a.healthScore < 80).length;

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  // Pre-configured Natural Language AI queries
  const sampleQueries = [
    "When is the Gharpatti tax payment due?",
    "Who is our local electrician and what is his number?",
    "Show me all subscriptions due this week.",
    "Why did our electricity bill increase this month?"
  ];

  const handleAskAI = (prompt: string) => {
    setSearchQuery(prompt);
    const p = prompt.toLowerCase();

    let reply: ChatMessage;

    if (p.includes('gharpatti') || p.includes('tax') || p.includes('property')) {
      reply = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        toolCall: {
          name: 'query_municipal_tax_ledger(asset="Flat 402")',
          params: { authority: 'Pune / BMC Municipal Corp' },
          status: 'completed'
        },
        content: `Your annual Gharpatti (Property / House Tax) of ₹4,200 is due on October 31, 2026. \n\n• Early-bird rebate: 2% discount applied if paid online before month-end.\n• Linked Task: Assigned to Rohan Sharma (Self).`,
        actionCard: {
          type: 'upi_pay',
          title: 'Pay Annual Gharpatti Tax',
          description: 'Municipal Corporation Portal (PMC/BMC) online assessment',
          amountINR: 4200,
          actionLabel: 'Pay ₹4,200 via UPI / NetBanking',
          payload: { id: 'fin_gharpatti' }
        }
      };
    } else if (p.includes('electrician') || p.includes('ramesh') || p.includes('mistri') || p.includes('wiring')) {
      reply = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        toolCall: {
          name: 'lookup_vendor_directory(trade="Electrician")',
          params: { location: 'Sector 4' },
          status: 'completed'
        },
        content: `Our primary verified local electrician is Ramesh Mistri (Ramesh Electricals).\n\n• Phone: +91 98201 44321\n• Area: Sector 4, Market Complex\n• Rating: 4.8 / 5.0 (Knows our Inverter & MCB box wiring).`,
        actionCard: {
          type: 'whatsapp_vendor',
          title: 'Ramesh Mistri - Electrician',
          description: '+91 98201 44321 • Available Now',
          actionLabel: 'Open WhatsApp Chat with Ramesh',
          payload: { phone: '919820144321' }
        }
      };
    } else if (p.includes('subscription') || p.includes('this week') || p.includes('due')) {
      reply = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        toolCall: {
          name: 'get_upcoming_liabilities(window_days=7)',
          params: { status: 'unpaid' },
          status: 'completed'
        },
        content: `Here are the 3 domestic bills and subscriptions due in the next 7 days:\n\n1. Netflix Premium: ₹649 (Renews Tomorrow!)\n2. JioFiber Broadband (100 Mbps): ₹825 (Due in 2 days)\n3. MSEDCL Electricity Bill: ₹3,450 (Due in 4 days)\n\nTotal outflow due this week: ₹4,924.`,
        actionCard: {
          type: 'upi_pay',
          title: 'Settle Urgent Domestic Bills',
          description: '3 bills due within 4 days',
          amountINR: 4924,
          actionLabel: 'View Financial Agent',
          payload: { tab: 'financials' }
        }
      };
    } else if (p.includes('electricity') || p.includes('surge') || p.includes('increase') || p.includes('msedcl')) {
      reply = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        toolCall: {
          name: 'analyze_discom_power_tariff(consumer="028549102831")',
          params: { lookback: '60_days' },
          status: 'completed'
        },
        content: `Your MSEDCL electricity bill increased by +21% (+₹600) from ₹2,850 in September to ₹3,450 in October.\n\nRoot Cause: Master Bedroom Voltas Split AC cooling coil has dust accumulation, causing continuous compressor running and pushing consumption past the 300 unit subsidised slab into higher commercial tier rates.`,
        actionCard: {
          type: 'whatsapp_vendor',
          title: 'Schedule AC Foam Jet Cleaning',
          description: 'Imran AC Mistri • Estimated service ₹450 (saves ~₹600/mo in electricity)',
          actionLabel: 'WhatsApp Imran AC Technician',
          payload: { phone: '919833411920' }
        }
      };
    } else {
      reply = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        toolCall: {
          name: 'query_digital_twin_state()',
          params: { query: prompt },
          status: 'completed'
        },
        content: `Understood query: "${prompt}". All 5 household subsystems are operating normally. Total monthly expenses stand at ₹${totalMonthlyOutflow.toLocaleString('en-IN')}, with 2 urgent kitchen items needing refill.`,
      };
    }

    setAiResponse(reply);
  };

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Droplet': return <Droplet className="w-5 h-5 text-cyan-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'User': return <User className="w-5 h-5 text-slate-200" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-emerald-400" />;
      case 'Package': return <Package className="w-5 h-5 text-purple-400" />;
      default: return <Activity className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top AI Natural Language Interface Bar */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/40 p-4 rounded-2xl shadow-xl space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Conversational Indian Household Copilot
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Online
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Query domestic tax deadlines, local electrician contacts, utility surges, or ration stock.
            </p>
          </div>
        </div>

        {/* Input box */}
        <form 
          onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) handleAskAI(searchQuery); }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask anything: 'When is Gharpatti due?' or 'Who is our electrician?'"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all font-sans"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-mono shadow-md shadow-emerald-500/20 flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask Copilot</span>
          </button>
        </form>

        {/* Suggested Indian Queries Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[11px] text-slate-500 font-mono shrink-0">Try:</span>
          {sampleQueries.map((q) => (
            <button
              key={q}
              onClick={() => handleAskAI(q)}
              className="px-2.5 py-1 text-[11px] whitespace-nowrap rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-emerald-500/40 transition-all flex items-center gap-1 font-sans"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>{q}</span>
            </button>
          ))}
        </div>

        {/* AI Answer & Tool Calling Display */}
        {aiResponse && (
          <div className="mt-3 p-4 rounded-xl bg-slate-950/90 border border-emerald-500/30 space-y-3 animate-in fade-in duration-200">
            {aiResponse.toolCall && (
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  Tool: <span className="font-bold text-slate-200">{aiResponse.toolCall.name}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  {aiResponse.toolCall.status}
                </span>
              </div>
            )}

            <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed">
              {aiResponse.content}
            </p>

            {aiResponse.actionCard && (
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-emerald-300">{aiResponse.actionCard.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{aiResponse.actionCard.description}</p>
                </div>

                <div className="shrink-0">
                  {aiResponse.actionCard.type === 'upi_pay' && (
                    <button
                      onClick={() => onSelectSubsystem('financials')}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-mono"
                    >
                      {aiResponse.actionCard.actionLabel}
                    </button>
                  )}

                  {aiResponse.actionCard.type === 'whatsapp_vendor' && (
                    <a
                      href={`https://wa.me/${aiResponse.actionCard.payload?.phone || '919820144321'}?text=Namaste,%20Household%20OS%20se%20contact%20kar%20rahe%20hain.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all font-mono inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{aiResponse.actionCard.actionLabel}</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4 Core State Overview KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Metric 1: Monthly Expenses in ₹ */}
        <div 
          onClick={() => onSelectSubsystem('financials')}
          className="bg-[#0F172A] border border-slate-800 hover:border-emerald-500/50 p-4 rounded-2xl cursor-pointer transition-all shadow-lg group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>MONTHLY EXPENSES (₹)</span>
            <IndianRupee className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">
            ₹{totalMonthlyOutflow.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amber-400 mt-1 flex items-center gap-1 font-mono">
            <Clock className="w-3 h-3" /> MSEDCL Due in 4 Days
          </div>
        </div>

        {/* Metric 2: Pending Family Chores */}
        <div 
          onClick={() => onSelectSubsystem('chores')}
          className="bg-[#0F172A] border border-slate-800 hover:border-cyan-500/50 p-4 rounded-2xl cursor-pointer transition-all shadow-lg group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>PENDING CHORES</span>
            <CheckCircle className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">
            {pendingChoresCount} Tasks Active
          </div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1 font-mono">
            <Flame className="w-3 h-3" /> Book LPG Cylinder Today
          </div>
        </div>

        {/* Metric 3: Expiring Warranties / Service */}
        <div 
          onClick={() => onSelectSubsystem('vault')}
          className="bg-[#0F172A] border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl cursor-pointer transition-all shadow-lg group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>EXPIRING WARRANTIES</span>
            <AlertTriangle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-bold font-mono text-white mt-2">
            {expiringWarrantiesCount} Appliances
          </div>
          <div className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-mono">
            <Zap className="w-3 h-3" /> Kent RO & Geyser Service Due
          </div>
        </div>

        {/* Metric 4: Low Stock Kitchen Items */}
        <div 
          onClick={() => onSelectSubsystem('inventory')}
          className="bg-[#0F172A] border border-slate-800 hover:border-rose-500/50 p-4 rounded-2xl cursor-pointer transition-all shadow-lg group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>KITCHEN LOW STOCK</span>
            <Package className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl font-bold font-mono text-rose-400 mt-2">
            {criticalInventoryCount} Critical Low
          </div>
          <div className="text-[11px] text-rose-300 mt-1 flex items-center gap-1 font-mono">
            <span>Atta (1.5kg) & Milk (0.5L)</span>
          </div>
        </div>
      </div>

      {/* Indian Digital Twin Interactive SVG Topology Graph */}
      <div className="bg-[#0A0E17] border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              Indian Household Digital Twin (Live State Graph)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Synchronized
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Click any node to inspect telemetry</span>
        </div>

        {/* SVG Graph Canvas */}
        <div className="w-full h-[440px] relative rounded-xl overflow-hidden cyber-grid bg-slate-950/60 border border-slate-800/80">
          <svg viewBox="0 0 1000 560" className="w-full h-full select-none">
            {/* Edges */}
            {edges.map((edge) => {
              const source = nodes.find(n => n.id === edge.source);
              const target = nodes.find(n => n.id === edge.target);
              if (!source || !target) return null;

              const isAlert = edge.status === 'alert';

              return (
                <g key={edge.id}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={isAlert ? '#F43F5E' : '#334155'}
                    strokeWidth={isAlert ? 2 : 1.5}
                    strokeDasharray={isAlert ? "6, 4" : undefined}
                    className={isAlert ? "animate-pulse" : ""}
                  />
                  <rect
                    x={(source.x + target.x) / 2 - 28}
                    y={(source.y + target.y) / 2 - 9}
                    width="56"
                    height="18"
                    rx="9"
                    fill="#0B0F17"
                    stroke={isAlert ? '#F43F5E' : '#334155'}
                    strokeWidth="1"
                  />
                  <text
                    x={(source.x + target.x) / 2}
                    y={(source.y + target.y) / 2 + 3}
                    textAnchor="middle"
                    fill={isAlert ? '#FDA4AF' : '#94A3B8'}
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="monospace"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              const isCritical = node.status === 'critical';
              const isWarning = node.status === 'warning';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="cursor-pointer group"
                >
                  {(isCritical || isWarning) && (
                    <circle
                      r={isSelected ? "44" : "36"}
                      fill={isCritical ? "rgba(244, 63, 94, 0.4)" : "rgba(245, 158, 11, 0.3)"}
                      className="animate-ping opacity-35"
                    />
                  )}

                  <circle
                    r={isSelected ? "34" : "28"}
                    fill="#0F172A"
                    stroke={isSelected ? '#10B981' : isCritical ? '#F43F5E' : isWarning ? '#F59E0B' : '#334155'}
                    strokeWidth={isSelected ? "3" : "2"}
                  />

                  <circle
                    cx="15"
                    cy="-15"
                    r="4"
                    fill={isCritical ? '#F43F5E' : isWarning ? '#F59E0B' : '#10B981'}
                  />

                  <text
                    y="45"
                    textAnchor="middle"
                    fill={isSelected ? '#10B981' : '#F1F5F9'}
                    fontSize="11"
                    fontWeight="700"
                  >
                    {node.label}
                  </text>

                  <text
                    y="58"
                    textAnchor="middle"
                    fill={isCritical ? '#F43F5E' : isWarning ? '#F59E0B' : '#94A3B8'}
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {node.subtitle}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Inspector Drawer */}
        {selectedNode && (
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                {getNodeIcon(selectedNode.iconName)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">{selectedNode.label}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {selectedNode.type}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                    selectedNode.status === 'critical' ? 'text-rose-400 bg-rose-500/10' : selectedNode.status === 'warning' ? 'text-amber-400 bg-amber-500/10' : 'text-emerald-400 bg-emerald-500/10'
                  }`}>
                    {selectedNode.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">{selectedNode.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedNode.type === 'financial' && (
                <button
                  onClick={() => onSelectSubsystem('financials')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono"
                >
                  Manage Bill
                </button>
              )}
              {selectedNode.type === 'inventory' && (
                <button
                  onClick={() => onSelectSubsystem('inventory')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono"
                >
                  Order Ration
                </button>
              )}
              <button
                onClick={() => setSelectedNodeId(null)}
                className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
