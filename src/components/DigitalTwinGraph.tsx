import React, { useState } from 'react';
import { 
  GraphNode, 
  GraphEdge, 
  NodeType, 
  HealthStatus 
} from '../types/household';
import { 
  Flame, 
  Droplet, 
  WashingMachine, 
  Car, 
  User, 
  Zap, 
  CreditCard, 
  Filter, 
  Package, 
  Coffee, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Info,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';

interface DigitalTwinGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onSelectNode?: (node: GraphNode) => void;
  onResolveHazard?: (nodeId: string) => void;
}

export const DigitalTwinGraph: React.FC<DigitalTwinGraphProps> = ({
  nodes,
  edges,
  onSelectNode,
  onResolveHazard
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('ast_1');
  const [filterType, setFilterType] = useState<NodeType | 'all'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const getNodeIcon = (iconName: string, className: string = "w-5 h-5") => {
    switch (iconName) {
      case 'Flame': return <Flame className={className} />;
      case 'Droplet': return <Droplet className={className} />;
      case 'WashingMachine': return <WashingMachine className={className} />;
      case 'Car': return <Car className={className} />;
      case 'User': return <User className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'CreditCard': return <CreditCard className={className} />;
      case 'Filter': return <Filter className={className} />;
      case 'Package': return <Package className={className} />;
      case 'Coffee': return <Coffee className={className} />;
      default: return <Info className={className} />;
    }
  };

  const getStatusColor = (status: HealthStatus) => {
    switch (status) {
      case 'healthy':
        return {
          bg: '#10B981',
          border: '#34D399',
          glow: 'rgba(16, 185, 129, 0.45)',
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
        };
      case 'warning':
        return {
          bg: '#F59E0B',
          border: '#FBBF24',
          glow: 'rgba(245, 158, 11, 0.5)',
          badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
        };
      case 'critical':
        return {
          bg: '#F43F5E',
          border: '#FB7185',
          glow: 'rgba(244, 63, 94, 0.65)',
          badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
        };
    }
  };

  const filteredNodes = nodes.filter(n => filterType === 'all' || n.type === filterType);
  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
  const filteredEdges = edges.filter(e => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target));

  return (
    <div className="relative w-full h-[580px] bg-[#0A0E17] border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      
      {/* Top Overlay Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-lg">
          <span className="text-xs font-semibold text-slate-300">Filter Topology:</span>
          {(['all', 'asset', 'family', 'financial', 'inventory'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-0.5 rounded text-xs capitalize transition-all ${
                filterType === type 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type === 'all' ? 'All Subsystems' : type}
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 shadow-lg">
          <button 
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.4))}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.75))}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setZoomLevel(1)}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded text-xs font-mono"
            title="Reset Zoom"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main SVG Graph Canvas */}
      <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden cyber-grid">
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full select-none"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
        >
          <defs>
            {/* Pulsing filters for nodes */}
            <filter id="glow-healthy" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-warning" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-critical" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="16" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Linear gradients for edges */}
            <linearGradient id="edge-normal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="edge-alert" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Render Graph Edges */}
          {filteredEdges.map((edge) => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const isAlert = edge.status === 'alert';
            const isPulsing = edge.status === 'pulsing';

            return (
              <g key={edge.id} className="transition-all duration-300">
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isAlert ? 'url(#edge-alert)' : 'url(#edge-normal)'}
                  strokeWidth={isAlert ? 2.5 : 1.5}
                  strokeDasharray={isPulsing || isAlert ? "6, 4" : undefined}
                  className={isPulsing || isAlert ? "animate-pulse" : ""}
                />
                {/* Edge Label pill */}
                <rect
                  x={(sourceNode.x + targetNode.x) / 2 - 28}
                  y={(sourceNode.y + targetNode.y) / 2 - 10}
                  width="56"
                  height="18"
                  rx="9"
                  fill="#0B0F17"
                  stroke={isAlert ? '#F43F5E' : '#334155'}
                  strokeWidth="1"
                />
                <text
                  x={(sourceNode.x + targetNode.x) / 2}
                  y={(sourceNode.y + targetNode.y) / 2 + 3}
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

          {/* Render Graph Nodes */}
          {filteredNodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            const colors = getStatusColor(node.status);
            const isCritical = node.status === 'critical';
            const isWarning = node.status === 'warning';

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => {
                  setSelectedNodeId(node.id);
                  if (onSelectNode) onSelectNode(node);
                }}
                className="cursor-pointer group"
              >
                {/* Outer status halo / pulse */}
                {(isCritical || isWarning) && (
                  <circle
                    r={isSelected ? "44" : "38"}
                    fill={colors.glow}
                    className="animate-ping opacity-30"
                  />
                )}

                {/* Node Outer Ring */}
                <circle
                  r={isSelected ? "34" : "28"}
                  fill="#0F172A"
                  stroke={isSelected ? '#38BDF8' : colors.border}
                  strokeWidth={isSelected ? "3" : "2"}
                  filter={isCritical ? "url(#glow-critical)" : isWarning ? "url(#glow-warning)" : "url(#glow-healthy)"}
                  className="transition-all duration-300"
                />

                {/* Internal colored indicator dot */}
                <circle
                  cx="16"
                  cy="-16"
                  r="5"
                  fill={colors.bg}
                  stroke="#0F172A"
                  strokeWidth="2"
                />

                {/* Node Icon foreignObject */}
                <foreignObject x="-14" y="-14" width="28" height="28" className="pointer-events-none">
                  <div className="w-full h-full flex items-center justify-center text-slate-100">
                    {getNodeIcon(node.iconName, isSelected ? "w-6 h-6 text-cyan-300" : "w-5 h-5 text-slate-200")}
                  </div>
                </foreignObject>

                {/* Node Label Text */}
                <text
                  y="45"
                  textAnchor="middle"
                  fill={isSelected ? '#38BDF8' : '#F1F5F9'}
                  fontSize="12"
                  fontWeight="700"
                  className="pointer-events-none transition-colors"
                >
                  {node.label}
                </text>

                {/* Node Subtitle */}
                <text
                  y="59"
                  textAnchor="middle"
                  fill={isCritical ? '#F43F5E' : isWarning ? '#F59E0B' : '#94A3B8'}
                  fontSize="10"
                  fontFamily="monospace"
                  className="pointer-events-none"
                >
                  {node.subtitle}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Node Inspector Panel (Bottom Drawer) */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
          <div className="flex items-center gap-3.5">
            <div className={`p-2.5 rounded-xl border ${
              selectedNode.status === 'healthy' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : selectedNode.status === 'warning'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
              {getNodeIcon(selectedNode.iconName, "w-6 h-6")}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{selectedNode.label}</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedNode.type}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border capitalize ${
                  getStatusColor(selectedNode.status).badge
                }`}>
                  {selectedNode.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{selectedNode.subtitle}</p>
            </div>
          </div>

          {/* Quick Telemetry / Action for Selected Node */}
          <div className="flex items-center gap-3">
            {selectedNode.healthScore !== undefined && (
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-mono">Subsystem Health</div>
                <div className={`text-base font-bold font-mono ${
                  selectedNode.healthScore > 80 ? 'text-emerald-400' : selectedNode.healthScore > 60 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {selectedNode.healthScore}%
                </div>
              </div>
            )}

            {selectedNode.status !== 'healthy' && onResolveHazard && (
              <button
                onClick={() => onResolveHazard(selectedNode.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Resolve Hazard</span>
              </button>
            )}

            <button
              onClick={() => setSelectedNodeId(null)}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg text-xs"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
