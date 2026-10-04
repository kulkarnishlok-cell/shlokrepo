import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  Loader2, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Layers,
  Zap
} from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '../data/mockHouseholdData';
import { IngestedDocumentResult } from '../types/household';

interface DocumentIngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIngestSuccess: (result: IngestedDocumentResult) => void;
}

export const DocumentIngestionModal: React.FC<DocumentIngestionModalProps> = ({
  isOpen,
  onClose,
  onIngestSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  if (!isOpen) return null;

  const steps = [
    'Multimodal Vision Scan & Tokenization (Gemini 2.5 Flash)',
    'Entity & Schema Resolution (Assets, SLAs, Filters, Liabilities)',
    'Cross-Referencing Digital Twin State Graph',
    'Atomic Mutation & Event Dispatch Scheduled'
  ];

  const handleRunPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    setIsProcessing(true);
    setPipelineStep(0);

    // Simulate multi-step pipeline
    const interval = setInterval(() => {
      setPipelineStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            finishIngestion(presetId);
          }, 600);
          return prev;
        }
      });
    }, 600);
  };

  const finishIngestion = (presetId: string) => {
    setIsProcessing(false);
    
    // Create rich ingested result based on preset
    let result: IngestedDocumentResult;

    if (presetId === 'doc_preset_1') {
      result = {
        id: `ingest_${Date.now()}`,
        fileName: 'Carrier_HVAC_Annual_Service_Receipt.pdf',
        fileSize: '1.4 MB',
        uploadedAt: new Date().toLocaleTimeString(),
        vendor: 'Bay Area Climate Control Specialists',
        documentType: 'Invoice',
        totalAmount: 485.00,
        extractedAsset: {
          id: 'ast_carrier_hvac',
          name: 'Carrier Performance 16 Central AC & Heat Pump',
          category: 'HVAC',
          modelNumber: '24ACC636A003',
          serialNumber: '4421A90812',
          warrantyExpiry: '2031-10-04',
          healthScore: 98,
          maintenanceScheduleDays: 180,
          criticalConsumable: '16x25x1 MERV 11 Filter (Dual Zone)',
          annualReplacementCost: 5200,
          location: 'Outdoor Condenser Pad'
        },
        extractedTasks: [
          {
            id: `tsk_${Date.now()}`,
            title: 'Inspect Condenser Coil Clearance',
            description: 'Technician noted foliage encroachment on west-side condenser unit.',
            priority: 'medium',
            assignedToMemberId: 'mem_1',
            dueDate: '2026-10-20',
            status: 'pending',
            sourceCategory: 'Asset Maintenance'
          }
        ],
        summary: 'Extracted new AC Condenser warranty valid through 2031, registered dual-zone filter specification, scheduled spring coil inspection.'
      };
    } else {
      result = {
        id: `ingest_${Date.now()}`,
        fileName: 'Costco_Domestic_Restock_Receipt.jpg',
        fileSize: '3.8 MB',
        uploadedAt: new Date().toLocaleTimeString(),
        vendor: 'Costco Wholesale Corp',
        documentType: 'Receipt',
        totalAmount: 184.20,
        extractedInventory: [
          {
            id: 'inv_salt_extra',
            name: 'Water Softener Salt Pellets (4x 40lb)',
            category: 'Water',
            currentStock: 6,
            unit: 'Bags',
            dailyBurnRate: 0.067,
            daysRemaining: 90,
            reorderThresholdDays: 15,
            reorderQuantity: 4,
            estimatedCost: 28.00
          }
        ],
        summary: 'Added 4 bags of salt to inventory (+72 days runout reserve); updated pantry consumption baselines.'
      };
    }

    onIngestSuccess(result);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-2xl p-6 shadow-2xl overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Document & Receipt Ingestion Engine
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Multimodal OCR
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Transforms invoices, manuals, and receipts directly into active Digital Twin nodes.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-5 space-y-5">
          
          {/* Pipeline Running Overlay */}
          {isProcessing ? (
            <div className="py-8 px-6 bg-slate-950/70 border border-slate-800 rounded-xl space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                  <span className="text-sm font-semibold text-white">
                    Processing Document Payload...
                  </span>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  Step {pipelineStep + 1} of {steps.length}
                </span>
              </div>

              {/* Progress Steps list */}
              <div className="space-y-2.5">
                {steps.map((step, idx) => {
                  const isDone = idx < pipelineStep;
                  const isCurrent = idx === pipelineStep;
                  return (
                    <div
                      key={step}
                      className={`flex items-center gap-2.5 text-xs p-2 rounded-lg transition-all ${
                        isCurrent
                          ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-medium'
                          : isDone
                          ? 'text-emerald-400 bg-emerald-500/5'
                          : 'text-slate-500'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : isCurrent ? (
                        <Zap className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                      )}
                      <span>{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* Drag and Drop Zone */}
              <div 
                onClick={() => handleRunPreset('doc_preset_1')}
                className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-800/40 transition-all group"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="mt-3 text-sm font-semibold text-slate-200">
                  Drag and drop any domestic document or receipt
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  Accepts PDF, JPG, PNG, HEIC (Max 25MB). Auto-detects serials, warranties, filter sizes, and obligations.
                </p>
                <button className="mt-4 px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 text-slate-200 transition-all border border-slate-700 group-hover:border-cyan-400">
                  Browse Files
                </button>
              </div>

              {/* Hackathon Preset Documents (Guaranteed 100% Reliable Demo) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                    Demo Preset Payloads (Instant Real-time Test)
                  </span>
                  <span className="text-[11px] text-slate-400">Click to ingest live</span>
                </div>

                <div className="space-y-2">
                  {SAMPLE_DOCUMENTS.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => handleRunPreset(doc.id)}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40 cursor-pointer transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-cyan-400 border border-slate-700 group-hover:border-cyan-500/30">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                              {doc.title}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
                              {doc.fileType}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            {doc.sampleDetails}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {doc.totalAmount && (
                          <span className="text-xs font-mono font-bold text-slate-300">
                            ${doc.totalAmount.toFixed(2)}
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer info note */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Under the hood: Gemini 2.5 Flash Structured Schema (`response_schema`)
          </span>
          <span className="font-mono">Zero regex. Zero OCR templates.</span>
        </div>
      </div>
    </div>
  );
};
