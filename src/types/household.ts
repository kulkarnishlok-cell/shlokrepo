export type NodeType = 'asset' | 'financial' | 'inventory' | 'family' | 'vendor' | 'task';

export type HealthStatus = 'healthy' | 'warning' | 'critical';

export interface GraphNode {
  id: string;
  type: NodeType;
  label: string;
  subtitle: string;
  x: number;
  y: number;
  status: HealthStatus;
  healthScore?: number; // 0 - 100
  metadata: Record<string, any>;
  iconName: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  status?: 'normal' | 'pulsing' | 'alert';
}

export interface IndianHouseholdAsset {
  id: string;
  name: string;
  category: 'Air Conditioner' | 'Water Purifier' | 'Water Heating' | 'Power Backup' | 'Kitchen Appliance' | 'Vehicle';
  brandModel: string;
  serialNumber?: string;
  purchaseDate: string;
  warrantyExpiry: string;
  healthScore: number; // 0 - 100
  nextServiceDue: string;
  serviceCycleDays: number;
  criticalConsumable?: string;
  location: string;
  assignedVendorId?: string;
  failureRiskNote?: string;
  replacementCostINR: number;
}

export interface IndianFinancialLiability {
  id: string;
  title: string;
  issuerVendor: string;
  category: 'Property Tax (Gharpatti)' | 'Electricity' | 'Water' | 'LPG Gas' | 'Broadband & Wi-Fi' | 'DTH & Cable TV' | 'OTT Subscription' | 'Fitness' | 'Society Maintenance' | 'Staff Salary';
  amountINR: number;
  previousAmountINR?: number;
  billingCycle: 'Monthly' | 'Quarterly' | 'Bi-Monthly' | 'Annual';
  dueDate: string;
  dueDaysRemaining: number;
  status: 'Urgent' | 'Due Soon' | 'Paid' | 'Processing';
  consumerNumber?: string;
  isAnomaly?: boolean;
  anomalyReason?: string;
  paymentMode: 'UPI / NetBanking' | 'Auto-Debit' | 'Cash to Vendor';
}

export interface IndianVendor {
  id: string;
  name: string;
  trade: 'Local Electrician' | 'Local Plumber' | 'AC Service Technician' | 'Kirana & General Store' | 'Sabziwala (Vegetable Vendor)' | 'Doodhwala (Milk Vendor)' | 'House Maid & Cook' | 'Carpenter';
  businessName: string;
  phoneNumber: string;
  whatsappNumber: string;
  areaLocality: string;
  rating: number;
  isAvailable: boolean;
  notes: string;
  upiId?: string;
}

export interface IndianInventoryItem {
  id: string;
  name: string;
  category: 'Grains & Atta' | 'Dairy' | 'Cooking Oils' | 'Pulses (Dals)' | 'Beverages' | 'Cleaning & Hygiene' | 'Pooja Essentials';
  currentStock: number;
  unit: 'kg' | 'L' | 'g' | 'Packets' | 'Bottles';
  thresholdStock: number;
  status: 'critical_low' | 'running_out' | 'sufficient';
  dailyConsumption: number;
  estimatedDaysRemaining: number;
  preferredBrand: string;
  estimatedCostINR: number;
  addedToKiranaList?: boolean;
}

export interface IndianFamilyMember {
  id: string;
  name: string;
  relationshipRole: 'Dad (Papa)' | 'Mom (Mummy)' | 'You (Self)' | 'Sibling';
  avatar: string;
  phoneNumber: string;
  activeChoreCount: number;
  responsibilities: string[];
}

export interface IndianChoreTask {
  id: string;
  title: string;
  description: string;
  category: 'Utility Payment' | 'Asset Maintenance' | 'Kitchen & Ration' | 'Staff Management' | 'Civic & Tax';
  assignedToMemberId: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  linkedVendorId?: string;
  whatsappReminderText?: string;
}

export interface IngestedVaultDocument {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  fileType: 'PDF' | 'JPG' | 'PNG';
  uploadDate: string;
  category: 'Electricity Bill' | 'Gharpatti (House Tax)' | 'Warranty Card' | 'Identity Document' | 'Rent / Lease Agreement' | 'Maintenance Receipt';
  issuer: string;
  expiryDate?: string;
  dueAmountINR?: number;
  status: 'Expiring Soon' | 'Paid' | 'Verified' | 'Pending Action';
  associatedAsset?: string;
  extractedDetails: {
    consumerNumber?: string;
    propertyId?: string;
    billingPeriod?: string;
    sanctionedLoad?: string;
    warrantyDuration?: string;
    paymentRef?: string;
  };
  filePreviewUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: string;
  content: string;
  toolCall?: {
    name: string;
    params: Record<string, any>;
    status: 'executing' | 'completed';
  };
  actionCard?: {
    type: 'upi_pay' | 'whatsapp_vendor' | 'kirana_order' | 'view_document';
    title: string;
    description: string;
    amountINR?: number;
    items?: string[];
    actionLabel: string;
    payload?: any;
  };
}
