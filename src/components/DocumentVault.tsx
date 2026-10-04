import React, { useState, useRef } from 'react';
import { IngestedVaultDocument } from '../types/household';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  Search, 
  Filter, 
  X, 
  Zap, 
  FileSpreadsheet, 
  Eye, 
  Sparkles,
  Download,
  IndianRupee,
  Calendar,
  Check
} from 'lucide-react';

interface DocumentVaultProps {
  documents: IngestedVaultDocument[];
  onUploadDocument: (newDoc: IngestedVaultDocument) => void;
  onPayBill?: (amount: number, title: string) => void;
}

export const DocumentVault: React.FC<DocumentVaultProps> = ({
  documents,
  onUploadDocument,
  onPayBill
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<IngestedVaultDocument | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Parsing Simulator
  const processUploadedFile = (file: File) => {
    setIsProcessing(true);
    setUploadProgress(`Scanning ${file.name} (Multimodal Vision Engine)...`);

    setTimeout(() => {
      setUploadProgress('Extracting Indian Metadata (Issuer, Due Amount ₹, Expiry, Consumer No.)...');
      
      setTimeout(() => {
        setUploadProgress('Reconciling with Household State Graph...');

        setTimeout(() => {
          setIsProcessing(false);
          setUploadProgress('');

          const isPdf = file.name.toLowerCase().endsWith('.pdf');
          const isBill = file.name.toLowerCase().includes('bill') || file.name.toLowerCase().includes('elec') || file.name.toLowerCase().includes('msedcl') || file.name.toLowerCase().includes('tax');
          const isWarranty = file.name.toLowerCase().includes('warranty') || file.name.toLowerCase().includes('ro') || file.name.toLowerCase().includes('geyser') || file.name.toLowerCase().includes('card');
          
          let category: IngestedVaultDocument['category'] = 'Electricity Bill';
          let issuer = 'MSEDCL Maharashtra State Discom';
          let dueAmountINR: number | undefined = 3450;
          let expiryDate: string | undefined = '2026-10-08';
          let status: IngestedVaultDocument['status'] = 'Expiring Soon';
          let associatedAsset = 'Household Electrical Meter #02854910';

          if (file.name.toLowerCase().includes('gharpatti') || file.name.toLowerCase().includes('house_tax') || file.name.toLowerCase().includes('property')) {
            category = 'Gharpatti (House Tax)';
            issuer = 'Pune / Brihanmumbai Municipal Corporation';
            dueAmountINR = 4200;
            expiryDate = '2026-10-31';
            status = 'Pending Action';
            associatedAsset = 'Flat 402 Residential Property';
          } else if (isWarranty) {
            category = 'Warranty Card';
            issuer = 'Kent RO Systems / Bajaj Electricals';
            dueAmountINR = undefined;
            expiryDate = '2026-11-15';
            status = 'Expiring Soon';
            associatedAsset = 'Domestic Appliance Asset';
          } else if (file.name.toLowerCase().includes('aadhar') || file.name.toLowerCase().includes('pan') || file.name.toLowerCase().includes('rent') || file.name.toLowerCase().includes('agreement')) {
            category = 'Rent / Lease Agreement';
            issuer = 'Sub-Registrar Office / UIDAI';
            dueAmountINR = undefined;
            expiryDate = '2027-08-31';
            status = 'Verified';
            associatedAsset = 'Legal Household Record';
          }

          const newDoc: IngestedVaultDocument = {
            id: `doc_${Date.now()}`,
            title: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
            fileName: file.name,
            fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            fileType: isPdf ? 'PDF' : 'JPG',
            uploadDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            category,
            issuer,
            expiryDate,
            dueAmountINR,
            status,
            associatedAsset,
            extractedDetails: {
              consumerNumber: `CONS-${Math.floor(10000000 + Math.random() * 90000000)}`,
              billingPeriod: 'Current Active Cycle',
              paymentRef: `REF-${Math.floor(100000 + Math.random() * 900000)}`
            }
          };

          onUploadDocument(newDoc);
          setSelectedDoc(newDoc);
        }, 600);
      }, 700);
    }, 700);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handlePresetUpload = (presetName: string, category: IngestedVaultDocument['category'], issuer: string, amount?: number, asset?: string) => {
    const fakeFile = new File(['dummy-content'], presetName, { type: presetName.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg' });
    processUploadedFile(fakeFile);
  };

  const getStatusBadge = (status: IngestedVaultDocument['status']) => {
    switch (status) {
      case 'Expiring Soon':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Pending Action':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'Paid':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Verified':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
    }
  };

  const filteredDocs = documents.filter(doc => {
    const matchesFilter = activeFilter === 'All' || doc.category === activeFilter;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Stats Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Indian Document Vault & Ingestion Pipeline
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              Active Storage
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Seamlessly upload MSEDCL bills, Gharpatti receipts, warranty cards, and domestic lease agreements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Document (PDF / Image)</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg,.webp"
            className="hidden"
          />
        </div>
      </div>

      {/* Drag & Drop Ingestion Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          isDragging 
            ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]' 
            : 'border-slate-700/80 hover:border-emerald-500/60 bg-[#0F172A]/70 hover:bg-slate-800/40'
        }`}
      >
        {isProcessing ? (
          <div className="py-4 space-y-3">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 animate-spin">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-white">AI Vision Extraction in Progress</div>
            <div className="text-xs font-mono text-emerald-400 animate-pulse">{uploadProgress}</div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800 flex items-center justify-center text-emerald-400">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white">
              Drag & Drop Indian Utility Bills, Tax Notices, or Warranty Cards
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Supports Electricity Bills (MSEDCL/Tata Power), Gharpatti Tax, Aadhar/PAN, Rent Agreements (PDF, JPG, PNG).
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono">Quick Demo Presets:</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePresetUpload('MSEDCL_Bill_Oct2026.pdf', 'Electricity Bill', 'MSEDCL Maharashtra', 3450, 'Meter #02854910');
                }}
                className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-mono"
              >
                + MSEDCL Bill (₹3,450)
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePresetUpload('Gharpatti_Municipal_Tax_2026.pdf', 'Gharpatti (House Tax)', 'Municipal Corp', 4200, 'Flat 402');
                }}
                className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-mono"
              >
                + Gharpatti Tax (₹4,200)
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePresetUpload('Kent_RO_Warranty_Card.jpg', 'Warranty Card', 'Kent RO Systems', undefined, 'Kent Grand+');
                }}
                className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 font-mono"
              >
                + Kent RO Warranty
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['All', 'Electricity Bill', 'Gharpatti (House Tax)', 'Warranty Card', 'Rent / Lease Agreement', 'Maintenance Receipt'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vault documents..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Vault Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            className="group relative bg-[#0F172A] border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 transition-all hover:shadow-xl hover:shadow-emerald-950/20 cursor-pointer space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 group-hover:border-emerald-500/30 text-emerald-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {doc.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                    {doc.fileName} • {doc.fileSize}
                  </span>
                </div>
              </div>

              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${getStatusBadge(doc.status)}`}>
                {doc.status}
              </span>
            </div>

            {/* Extracted Details Box */}
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span className="text-[10px]">ISSUER:</span>
                <span className="text-[11px] text-slate-200 font-semibold truncate max-w-[170px]">{doc.issuer}</span>
              </div>
              {doc.dueAmountINR !== undefined && (
                <div className="flex justify-between text-slate-400 pt-0.5">
                  <span className="text-[10px]">DUE AMOUNT:</span>
                  <span className="text-[11px] text-emerald-400 font-bold">₹{doc.dueAmountINR.toLocaleString('en-IN')}</span>
                </div>
              )}
              {doc.expiryDate && (
                <div className="flex justify-between text-slate-400 pt-0.5">
                  <span className="text-[10px]">DUE / EXPIRY:</span>
                  <span className="text-[11px] text-amber-300 font-semibold">{doc.expiryDate}</span>
                </div>
              )}
            </div>

            {/* Bottom Row */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3 text-slate-400" />
                {doc.uploadDate}
              </span>
              <span className="text-emerald-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Inspect Extracted Data &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Document Inspector & Extraction Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-[#0F172A] border border-emerald-500/40 rounded-2xl p-6 shadow-2xl space-y-5">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedDoc.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {selectedDoc.fileName} • {selectedDoc.fileType} • Uploaded {selectedDoc.uploadDate}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Extracted Telemetry Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Structured Extraction Payload
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getStatusBadge(selectedDoc.status)}`}>
                  {selectedDoc.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block">DOCUMENT CATEGORY</span>
                  <span className="font-bold text-slate-200">{selectedDoc.category}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">ISSUING AUTHORITY</span>
                  <span className="font-bold text-slate-200">{selectedDoc.issuer}</span>
                </div>
                {selectedDoc.dueAmountINR !== undefined && (
                  <div>
                    <span className="text-[10px] text-slate-500 block">TOTAL DUE AMOUNT</span>
                    <span className="font-bold text-emerald-400 text-sm">₹{selectedDoc.dueAmountINR.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {selectedDoc.expiryDate && (
                  <div>
                    <span className="text-[10px] text-slate-500 block">PAYMENT / EXPIRY DEADLINE</span>
                    <span className="font-bold text-amber-300">{selectedDoc.expiryDate}</span>
                  </div>
                )}
                {selectedDoc.associatedAsset && (
                  <div className="col-span-2 pt-2 border-t border-slate-800">
                    <span className="text-[10px] text-slate-500 block">LINKED HOUSEHOLD ASSET</span>
                    <span className="font-bold text-cyan-300">{selectedDoc.associatedAsset}</span>
                  </div>
                )}
                {selectedDoc.extractedDetails.consumerNumber && (
                  <div className="col-span-2 pt-1">
                    <span className="text-[10px] text-slate-500 block">CONSUMER / CA NUMBER</span>
                    <span className="font-bold text-slate-300">{selectedDoc.extractedDetails.consumerNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500 font-mono">
                Verified against Indian State Discom API
              </span>

              <div className="flex items-center gap-2">
                {selectedDoc.dueAmountINR && selectedDoc.status !== 'Paid' && onPayBill && (
                  <button
                    onClick={() => {
                      onPayBill(selectedDoc.dueAmountINR!, selectedDoc.title);
                      setSelectedDoc({ ...selectedDoc, status: 'Paid' });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>Pay ₹{selectedDoc.dueAmountINR.toLocaleString('en-IN')} via UPI</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
