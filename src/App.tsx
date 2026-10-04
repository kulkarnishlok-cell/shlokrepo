import React, { useState } from 'react';
import { 
  INITIAL_MEMBERS, 
  INITIAL_VENDORS, 
  INITIAL_LIABILITIES, 
  INITIAL_INVENTORY, 
  INITIAL_ASSETS, 
  INITIAL_CHORES, 
  INITIAL_VAULT_DOCUMENTS, 
  INITIAL_GRAPH_NODES, 
  INITIAL_GRAPH_EDGES 
} from './data/mockHouseholdData';
import { 
  IndianHouseholdAsset, 
  IndianFinancialLiability, 
  IndianInventoryItem, 
  IndianVendor, 
  IndianFamilyMember, 
  IndianChoreTask, 
  IngestedVaultDocument, 
  GraphNode, 
  GraphEdge 
} from './types/household';
import { Header } from './components/Header';
import { IndianDigitalTwinDashboard } from './components/IndianDigitalTwinDashboard';
import { DocumentVault } from './components/DocumentVault';
import { IndianFinancialAgent } from './components/IndianFinancialAgent';
import { VendorDirectory } from './components/VendorDirectory';
import { KitchenInventory } from './components/KitchenInventory';
import { IndianChoreCoordinator } from './components/IndianChoreCoordinator';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  // Central State Store
  const [documents, setDocuments] = useState<IngestedVaultDocument[]>(INITIAL_VAULT_DOCUMENTS);
  const [liabilities, setLiabilities] = useState<IndianFinancialLiability[]>(INITIAL_LIABILITIES);
  const [inventory, setInventory] = useState<IndianInventoryItem[]>(INITIAL_INVENTORY);
  const [vendors, setVendors] = useState<IndianVendor[]>(INITIAL_VENDORS);
  const [members, setMembers] = useState<IndianFamilyMember[]>(INITIAL_MEMBERS);
  const [chores, setChores] = useState<IndianChoreTask[]>(INITIAL_CHORES);
  const [assets, setAssets] = useState<IndianHouseholdAsset[]>(INITIAL_ASSETS);
  const [graphNodes, setGraphNodes] = useState<GraphNode[]>(INITIAL_GRAPH_NODES);
  const [graphEdges, setGraphEdges] = useState<GraphEdge[]>(INITIAL_GRAPH_EDGES);

  // App Navigation & Theme
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Handle Document Upload
  const handleUploadDocument = (newDoc: IngestedVaultDocument) => {
    setDocuments(prev => [newDoc, ...prev]);

    // If it's a bill with a due amount, synchronize with Liabilities
    if (newDoc.dueAmountINR) {
      const newLiability: IndianFinancialLiability = {
        id: `fin_${Date.now()}`,
        title: newDoc.title,
        issuerVendor: newDoc.issuer,
        category: newDoc.category === 'Gharpatti (House Tax)' ? 'Property Tax (Gharpatti)' : 'Electricity',
        amountINR: newDoc.dueAmountINR,
        billingCycle: 'Monthly',
        dueDate: newDoc.expiryDate || '2026-10-31',
        dueDaysRemaining: 14,
        status: 'Due Soon',
        consumerNumber: newDoc.extractedDetails.consumerNumber,
        paymentMode: 'UPI / NetBanking'
      };
      setLiabilities(prev => [newLiability, ...prev]);
    }

    // Add node to state graph
    const newNode: GraphNode = {
      id: newDoc.id,
      type: 'financial',
      label: newDoc.title.slice(0, 18),
      subtitle: newDoc.dueAmountINR ? `₹${newDoc.dueAmountINR.toLocaleString('en-IN')}` : newDoc.status,
      x: 520,
      y: 260,
      status: newDoc.status === 'Expiring Soon' ? 'warning' : 'healthy',
      iconName: 'CreditCard',
      metadata: { issuer: newDoc.issuer }
    };
    setGraphNodes(prev => [newNode, ...prev]);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  // Handle UPI Payment for a Bill
  const handlePayBill = (liabilityId: string) => {
    setLiabilities(prev => prev.map(l => {
      if (l.id === liabilityId) {
        return { ...l, status: 'Paid', dueDaysRemaining: 0, isAnomaly: false };
      }
      return l;
    }));

    // Reconcile corresponding Vault Document
    setDocuments(prev => prev.map(d => {
      if (d.category === 'Electricity Bill' && liabilityId.includes('elec')) {
        return { ...d, status: 'Paid' };
      }
      if (d.category === 'Gharpatti (House Tax)' && liabilityId.includes('gharpatti')) {
        return { ...d, status: 'Paid' };
      }
      return d;
    }));

    // Update Digital Twin Node
    setGraphNodes(prev => prev.map(n => {
      if (n.id === 'fin_elec' && liabilityId.includes('elec')) {
        return { ...n, status: 'healthy', subtitle: 'Paid via UPI (₹3,450)' };
      }
      if (n.id === 'fin_gharpatti' && liabilityId.includes('gharpatti')) {
        return { ...n, status: 'healthy', subtitle: 'Reconciled (₹4,200)' };
      }
      return n;
    }));

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Handle Inventory Actions
  const handleToggleKiranaList = (itemId: string) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, addedToKiranaList: !item.addedToKiranaList };
      }
      return item;
    }));
  };

  const handleRestockItem = (itemId: string) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          currentStock: item.thresholdStock * 2,
          status: 'sufficient',
          estimatedDaysRemaining: 25,
          addedToKiranaList: false
        };
      }
      return item;
    }));
  };

  const handleRestockAllLow = () => {
    setInventory(prev => prev.map(item => ({
      ...item,
      currentStock: item.thresholdStock * 2,
      status: 'sufficient',
      estimatedDaysRemaining: 30,
      addedToKiranaList: false
    })));

    setGraphNodes(prev => prev.map(n => {
      if (n.type === 'inventory') {
        return { ...n, status: 'healthy', subtitle: 'Restocked (Sufficient)' };
      }
      return n;
    }));

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Handle Chore Completion
  const handleCompleteChore = (choreId: string) => {
    setChores(prev => prev.map(c => {
      if (c.id === choreId) {
        return { ...c, status: c.status === 'Completed' ? 'Pending' : 'Completed' };
      }
      return c;
    }));
  };

  const handleAddChore = (newChore: IndianChoreTask) => {
    setChores(prev => [newChore, ...prev]);
  };

  // Handle Vendor Service Request
  const handleLogServiceRequest = (vendorName: string, serviceTitle: string) => {
    const newChore: IndianChoreTask = {
      id: `tsk_svc_${Date.now()}`,
      title: `${serviceTitle} (${vendorName})`,
      description: `Service visit scheduled with ${vendorName}. Coordinate timing and payment.`,
      category: 'Asset Maintenance',
      assignedToMemberId: 'mem_rohan',
      dueDate: '2026-10-06',
      priority: 'High',
      status: 'In Progress',
      whatsappReminderText: `Reminder: ${vendorName} is scheduled to visit for: ${serviceTitle}`
    };
    setChores(prev => [newChore, ...prev]);
  };

  // Calculate Critical Alert Count
  const criticalBillsCount = liabilities.filter(l => l.status === 'Urgent').length;
  const lowInventoryCount = inventory.filter(i => i.status === 'critical_low').length;
  const totalAlerts = criticalBillsCount + lowInventoryCount;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#080C14] text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col font-sans transition-colors duration-200`}>
      
      {/* Top Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenUpload={() => setActiveTab('vault')}
        criticalAlertCount={totalAlerts}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Feature Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        
        {/* Feature 6 & Overview: Indian Digital Twin & AI Copilot */}
        {activeTab === 'dashboard' && (
          <IndianDigitalTwinDashboard
            nodes={graphNodes}
            edges={graphEdges}
            assets={assets}
            liabilities={liabilities}
            inventory={inventory}
            vendors={vendors}
            chores={chores}
            onSelectSubsystem={(tab) => setActiveTab(tab)}
            onPayBill={handlePayBill}
          />
        )}

        {/* Feature 1: Functional Document Vault & Ingestion Pipeline */}
        {activeTab === 'vault' && (
          <DocumentVault
            documents={documents}
            onUploadDocument={handleUploadDocument}
            onPayBill={(amount, title) => {
              const matched = liabilities.find(l => title.toLowerCase().includes(l.category.toLowerCase()) || l.title.toLowerCase().includes(title.toLowerCase()));
              if (matched) handlePayBill(matched.id);
            }}
          />
        )}

        {/* Feature 2: Indian Financial & Recurring Expense Agent */}
        {activeTab === 'financials' && (
          <IndianFinancialAgent
            liabilities={liabilities}
            onPayBill={handlePayBill}
          />
        )}

        {/* Feature 3: Local Indian Vendor & Service Directory */}
        {activeTab === 'vendors' && (
          <VendorDirectory
            vendors={vendors}
            onLogServiceRequest={handleLogServiceRequest}
          />
        )}

        {/* Feature 4: Smart Indian Kitchen & Household Inventory */}
        {activeTab === 'inventory' && (
          <KitchenInventory
            items={inventory}
            onToggleKiranaList={handleToggleKiranaList}
            onRestockItem={handleRestockItem}
            onRestockAllLow={handleRestockAllLow}
          />
        )}

        {/* Feature 5: Indian Household Task & Chore Coordinator */}
        {activeTab === 'chores' && (
          <IndianChoreCoordinator
            chores={chores}
            members={members}
            onCompleteChore={handleCompleteChore}
            onAddChore={handleAddChore}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-800/60 bg-[#0B0F17]/70 text-center text-xs text-slate-500 font-mono">
        Household OS — Built for the Indian Modern Home (Sharma Family • Flat 402, Gokul Dham Heights)
      </footer>
    </div>
  );
};

export default App;
