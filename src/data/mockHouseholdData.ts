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
} from '../types/household';

export const INITIAL_MEMBERS: IndianFamilyMember[] = [
  {
    id: 'mem_papa',
    name: 'Rajesh Sharma',
    relationshipRole: 'Dad (Papa)',
    avatar: '👨‍💼',
    phoneNumber: '+91 98200 11223',
    activeChoreCount: 2,
    responsibilities: ['Civic Taxes', 'LPG Gas Booking', 'Society AGMs', 'Vehicle Servicing']
  },
  {
    id: 'mem_mummy',
    name: 'Sunita Sharma',
    relationshipRole: 'Mom (Mummy)',
    avatar: '👩‍🏫',
    phoneNumber: '+91 98200 44556',
    activeChoreCount: 3,
    responsibilities: ['Kitchen & Ration Management', 'Maid/Cook Supervision', 'Pooja Essentials', 'Milk Intake']
  },
  {
    id: 'mem_rohan',
    name: 'Rohan Sharma',
    relationshipRole: 'You (Self)',
    avatar: '👨‍💻',
    phoneNumber: '+91 98200 77889',
    activeChoreCount: 3,
    responsibilities: ['Electricity & Wi-Fi Bills', 'DTH Recharge', 'Tech & Appliance Warranties', 'Online Orders']
  },
  {
    id: 'mem_priya',
    name: 'Priya Sharma',
    relationshipRole: 'Sibling',
    avatar: '👩‍🎓',
    phoneNumber: '+91 98200 99001',
    activeChoreCount: 1,
    responsibilities: ['Daily Sabzi & Bread Runs', 'Courier & Package Intake', 'Plant Watering']
  }
];

export const INITIAL_VENDORS: IndianVendor[] = [
  {
    id: 'ven_electrician',
    name: 'Ramesh Mistri',
    trade: 'Local Electrician',
    businessName: 'Ramesh Electricals & Wiring',
    phoneNumber: '+91 98201 44321',
    whatsappNumber: '919820144321',
    areaLocality: 'Sector 4, Market Complex',
    rating: 4.8,
    isAvailable: true,
    notes: 'Knows our inverter wiring and MCB box layout. Honest and quick.',
    upiId: 'ramesh.electrician@okhdfcbank'
  },
  {
    id: 'ven_plumber',
    name: 'Suresh Kumar',
    trade: 'Local Plumber',
    businessName: 'Suresh Plumbing Solutions',
    phoneNumber: '+91 98192 88412',
    whatsappNumber: '919819288412',
    areaLocality: 'Near Main Water Tank',
    rating: 4.7,
    isAvailable: true,
    notes: 'Handles bathroom geyser fittings and overhead tank valve leakages.',
    upiId: 'sureshplumber@paytm'
  },
  {
    id: 'ven_ac_tech',
    name: 'Imran Mistri',
    trade: 'AC Service Technician',
    businessName: 'Cool Care AC Repair & Gas Refill',
    phoneNumber: '+91 98334 11920',
    whatsappNumber: '919833411920',
    areaLocality: 'Link Road',
    rating: 4.9,
    isAvailable: true,
    notes: 'Specialist for Voltas & Daikin Split ACs. Does wet foam jet cleaning.',
    upiId: 'imran.coolcare@upi'
  },
  {
    id: 'ven_kirana',
    name: 'Gupta Ji',
    trade: 'Kirana & General Store',
    businessName: 'Gupta Provision & General Stores',
    phoneNumber: '+91 98210 55674',
    whatsappNumber: '919821055674',
    areaLocality: 'B-Block Corner Store',
    rating: 4.9,
    isAvailable: true,
    notes: 'Offers free home delivery for orders > ₹300. WhatsApp grocery list accepted.',
    upiId: 'guptastore@icici'
  },
  {
    id: 'ven_sabzi',
    name: 'Raju Bhai',
    trade: 'Sabziwala (Vegetable Vendor)',
    businessName: 'Raju Fresh Sabzi Thela',
    phoneNumber: '+91 97690 33819',
    whatsappNumber: '9769033819',
    areaLocality: 'Daily Morning Market (Lane 2)',
    rating: 4.6,
    isAvailable: true,
    notes: 'Arrives daily at 9:30 AM outside our building gate. Always gives free Dhaniya-Mirchi.',
    upiId: 'rajuv@upi'
  },
  {
    id: 'ven_doodh',
    name: 'Bablu Yadav',
    trade: 'Doodhwala (Milk Vendor)',
    businessName: 'Yadav Dairy Farm',
    phoneNumber: '+91 98205 77123',
    whatsappNumber: '919820577123',
    areaLocality: 'Subhash Nagar Dairy',
    rating: 4.8,
    isAvailable: true,
    notes: 'Delivers 2L fresh cow milk daily at 6:30 AM. Bill calculated on 1st of every month.',
    upiId: 'yadavdairy@axl'
  },
  {
    id: 'ven_maid',
    name: 'Shanta Bai',
    trade: 'House Maid & Cook',
    businessName: 'Domestic Help',
    phoneNumber: '+91 98112 00491',
    whatsappNumber: '919811200491',
    areaLocality: 'Samata Nagar',
    rating: 5.0,
    isAvailable: true,
    notes: 'Cooks breakfast & dinner, cleans utensils. Salary ₹4,500 due on 1st of every month.',
    upiId: 'shantabai@gpay'
  }
];

export const INITIAL_LIABILITIES: IndianFinancialLiability[] = [
  {
    id: 'fin_elec',
    title: 'Electricity Bill (MSEDCL / Tata Power)',
    issuerVendor: 'MSEDCL Maharashtra Discom',
    category: 'Electricity',
    amountINR: 3450,
    previousAmountINR: 2850,
    billingCycle: 'Monthly',
    dueDate: '2026-10-08',
    dueDaysRemaining: 4,
    status: 'Due Soon', // Amber
    consumerNumber: '028549102831',
    isAnomaly: true,
    anomalyReason: 'Unexplained 21% surge (+₹600) compared to September due to high AC usage and tier slab breach.',
    paymentMode: 'UPI / NetBanking'
  },
  {
    id: 'fin_gharpatti',
    title: 'Gharpatti (Municipal House / Property Tax)',
    issuerVendor: 'Municipal Corporation (PMC / BMC)',
    category: 'Property Tax (Gharpatti)',
    amountINR: 4200,
    previousAmountINR: 4200,
    billingCycle: 'Annual',
    dueDate: '2026-10-31',
    dueDaysRemaining: 27,
    status: 'Due Soon',
    consumerNumber: 'PROP-TX-2026-8819',
    paymentMode: 'UPI / NetBanking'
  },
  {
    id: 'fin_water',
    title: 'Municipal Water Supply Cess',
    issuerVendor: 'City Water Board (Jal Vibhag)',
    category: 'Water',
    amountINR: 450,
    previousAmountINR: 450,
    billingCycle: 'Quarterly',
    dueDate: '2026-09-30',
    dueDaysRemaining: 0,
    status: 'Paid', // Green
    consumerNumber: 'WTR-7721-A',
    paymentMode: 'UPI / NetBanking'
  },
  {
    id: 'fin_wifi',
    title: 'JioFiber 100 Mbps Unlimited Broadband',
    issuerVendor: 'Reliance Jio Infocomm',
    category: 'Broadband & Wi-Fi',
    amountINR: 825,
    previousAmountINR: 825,
    billingCycle: 'Monthly',
    dueDate: '2026-10-06',
    dueDaysRemaining: 2,
    status: 'Urgent', // Red
    consumerNumber: 'JIO-FIBRE-020948',
    paymentMode: 'UPI / NetBanking'
  },
  {
    id: 'fin_netflix',
    title: 'Netflix Premium 4K UHD Plan',
    issuerVendor: 'Netflix India',
    category: 'OTT Subscription',
    amountINR: 649,
    previousAmountINR: 649,
    billingCycle: 'Monthly',
    dueDate: '2026-10-05',
    dueDaysRemaining: 1,
    status: 'Urgent', // Red
    paymentMode: 'Auto-Debit'
  },
  {
    id: 'fin_dth',
    title: 'Tata Play Mega HD Package (Cable TV)',
    issuerVendor: 'Tata Play DTH',
    category: 'DTH & Cable TV',
    amountINR: 450,
    previousAmountINR: 450,
    billingCycle: 'Monthly',
    dueDate: '2026-10-09',
    dueDaysRemaining: 5,
    status: 'Due Soon',
    consumerNumber: 'Subscriber ID: 1008892110',
    paymentMode: 'UPI / NetBanking'
  },
  {
    id: 'fin_gym',
    title: 'Fitness Gym Membership (Gold’s Gym)',
    issuerVendor: 'Gold’s Gym Sector 7',
    category: 'Fitness',
    amountINR: 2000,
    previousAmountINR: 2000,
    billingCycle: 'Monthly',
    dueDate: '2026-10-14',
    dueDaysRemaining: 10,
    status: 'Due Soon',
    paymentMode: 'UPI / NetBanking'
  },
  {
    id: 'fin_society',
    title: 'Co-op Housing Society Monthly Maintenance',
    issuerVendor: 'Gokul Dham CHS Ltd.',
    category: 'Society Maintenance',
    amountINR: 3500,
    previousAmountINR: 3500,
    billingCycle: 'Monthly',
    dueDate: '2026-10-12',
    dueDaysRemaining: 8,
    status: 'Due Soon',
    paymentMode: 'UPI / NetBanking'
  }
];

export const INITIAL_INVENTORY: IndianInventoryItem[] = [
  {
    id: 'inv_atta',
    name: 'Chakki Fresh Sharbati Atta',
    category: 'Grains & Atta',
    currentStock: 1.5,
    unit: 'kg',
    thresholdStock: 5.0,
    status: 'critical_low', // Red
    dailyConsumption: 0.8,
    estimatedDaysRemaining: 1,
    preferredBrand: 'Aashirvaad / Local Chakki',
    estimatedCostINR: 210,
    addedToKiranaList: true
  },
  {
    id: 'inv_milk',
    name: 'Fresh Cow/Buffalo Milk (Pasteurized)',
    category: 'Dairy',
    currentStock: 0.5,
    unit: 'L',
    thresholdStock: 2.0,
    status: 'critical_low', // Red
    dailyConsumption: 1.5,
    estimatedDaysRemaining: 0,
    preferredBrand: 'Amul Taaza / Local Dairy',
    estimatedCostINR: 66,
    addedToKiranaList: true
  },
  {
    id: 'inv_dal',
    name: 'Unpolished Toor Dal (Arhar)',
    category: 'Pulses (Dals)',
    currentStock: 0.8,
    unit: 'kg',
    thresholdStock: 2.0,
    status: 'running_out', // Yellow
    dailyConsumption: 0.25,
    estimatedDaysRemaining: 3,
    preferredBrand: 'Tata Sampann',
    estimatedCostINR: 165,
    addedToKiranaList: false
  },
  {
    id: 'inv_oil',
    name: 'Mustard / Sunflower Cooking Oil',
    category: 'Cooking Oils',
    currentStock: 4.0,
    unit: 'L',
    thresholdStock: 1.5,
    status: 'sufficient', // Green
    dailyConsumption: 0.12,
    estimatedDaysRemaining: 33,
    preferredBrand: 'Fortune Sunlite / Fortune Kachi Ghani',
    estimatedCostINR: 580,
    addedToKiranaList: false
  },
  {
    id: 'inv_chai',
    name: 'Kadak Chai Leaves (Patti)',
    category: 'Beverages',
    currentStock: 350,
    unit: 'g',
    thresholdStock: 150,
    status: 'sufficient',
    dailyConsumption: 25,
    estimatedDaysRemaining: 14,
    preferredBrand: 'Wagh Bakri Premium CTC',
    estimatedCostINR: 190,
    addedToKiranaList: false
  },
  {
    id: 'inv_rice',
    name: 'Royal Basmati Rice',
    category: 'Grains & Atta',
    currentStock: 5.0,
    unit: 'kg',
    thresholdStock: 2.5,
    status: 'sufficient',
    dailyConsumption: 0.4,
    estimatedDaysRemaining: 12,
    preferredBrand: 'Daawat Rozana Gold',
    estimatedCostINR: 420,
    addedToKiranaList: false
  },
  {
    id: 'inv_surf',
    name: 'Surf Excel Matic Front-Load Detergent',
    category: 'Cleaning & Hygiene',
    currentStock: 1.2,
    unit: 'kg',
    thresholdStock: 1.0,
    status: 'running_out',
    dailyConsumption: 0.1,
    estimatedDaysRemaining: 4,
    preferredBrand: 'Surf Excel Matic',
    estimatedCostINR: 280,
    addedToKiranaList: false
  }
];

export const INITIAL_ASSETS: IndianHouseholdAsset[] = [
  {
    id: 'ast_ac',
    name: 'Voltas 1.5 Ton 5-Star Inverter Split AC',
    category: 'Air Conditioner',
    brandModel: '185V Vectra Pearl',
    serialNumber: 'VOLT-2023-9941A',
    purchaseDate: '2023-04-12',
    warrantyExpiry: '2028-04-12',
    healthScore: 78,
    nextServiceDue: '2026-10-25',
    serviceCycleDays: 120,
    criticalConsumable: 'Copper Condenser Mesh Filter Clean',
    location: 'Master Bedroom',
    assignedVendorId: 'ven_ac_tech',
    failureRiskNote: 'Dust accumulation on cooling fins increases power consumption by 18%.',
    replacementCostINR: 38500
  },
  {
    id: 'ast_ro',
    name: 'Kent Grand Plus RO + UV + UF Water Purifier',
    category: 'Water Purifier',
    brandModel: 'Kent Grand+ Mineral RO 9L',
    serialNumber: 'KENT-RO-778219',
    purchaseDate: '2022-09-15',
    warrantyExpiry: '2026-11-01',
    healthScore: 62,
    nextServiceDue: '2026-10-18',
    serviceCycleDays: 180,
    criticalConsumable: 'Carbon Filter + Sediment Candle Replacement',
    location: 'Kitchen Sink Counter',
    assignedVendorId: 'ven_plumber',
    failureRiskNote: 'TDS controller membrane choking due to high municipal borewell hardness.',
    replacementCostINR: 16500
  },
  {
    id: 'ast_geyser',
    name: 'Bajaj New Shakti Neo 25L Storage Geyser',
    category: 'Water Heating',
    brandModel: 'Shakti Neo 25 Litre Titanium',
    serialNumber: 'BAJ-GEO-881290',
    purchaseDate: '2021-10-20',
    warrantyExpiry: '2026-10-20',
    healthScore: 68,
    nextServiceDue: '2026-10-22',
    serviceCycleDays: 365,
    criticalConsumable: 'Magnesium Sacrificial Anode',
    location: 'Common Bathroom',
    assignedVendorId: 'ven_plumber',
    failureRiskNote: 'Warranty expiring this month! Heating element scaling due to hard water.',
    replacementCostINR: 7800
  },
  {
    id: 'ast_inverter',
    name: 'Luminous Zelio+ 1100 Inverter with Exide 150Ah Battery',
    category: 'Power Backup',
    brandModel: 'Zelio 1100 + Exide IT500 Tall Tubular',
    serialNumber: 'EXD-TUB-554109',
    purchaseDate: '2023-01-10',
    warrantyExpiry: '2027-01-10',
    healthScore: 92,
    nextServiceDue: '2026-11-15',
    serviceCycleDays: 120,
    criticalConsumable: 'Battery Distilled Water Top-up',
    location: 'Utility Balcony',
    assignedVendorId: 'ven_electrician',
    failureRiskNote: 'Distilled water level indicator float check required before Diwali.',
    replacementCostINR: 22000
  },
  {
    id: 'ast_activa',
    name: 'Honda Activa 6G (Smart Key Edition)',
    category: 'Vehicle',
    brandModel: 'Activa 6G Pearl Siren Blue',
    serialNumber: 'ME4JF913NL00214',
    purchaseDate: '2022-11-04',
    warrantyExpiry: '2027-11-04',
    healthScore: 88,
    nextServiceDue: '2026-12-05',
    serviceCycleDays: 120,
    criticalConsumable: 'Engine Oil (10W-30) + Air Filter',
    location: 'Building Stilt Parking #B-14',
    replacementCostINR: 88000
  }
];

export const INITIAL_CHORES: IndianChoreTask[] = [
  {
    id: 'tsk_lpg',
    title: 'Book LPG Cylinder Refill (Indane 14.2kg)',
    description: 'Current kitchen cylinder reached 10% reserve. Book via BharatGas/Indane WhatsApp or Umang app.',
    category: 'Kitchen & Ration',
    assignedToMemberId: 'mem_papa',
    dueDate: '2026-10-06',
    priority: 'High',
    status: 'Pending',
    whatsappReminderText: 'Papa, please book Indane LPG cylinder refill today before 5 PM so delivery arrives in 2 days.'
  },
  {
    id: 'tsk_gharpatti',
    title: 'Pay Gharpatti (Property Tax) Online Before Month-End',
    description: 'Municipal early-bird rebate of 2% applicable if paid before October 31st on PMC/BMC citizen portal.',
    category: 'Civic & Tax',
    assignedToMemberId: 'mem_rohan',
    dueDate: '2026-10-20',
    priority: 'High',
    status: 'Pending',
    whatsappReminderText: 'Rohan, remember to pay the annual Gharpatti tax of ₹4,200 online.'
  },
  {
    id: 'tsk_water_tank',
    title: 'Schedule Overhead Water Tank Cleaning',
    description: 'Borewell sediment accumulation noticed in bathroom taps. Call Suresh Plumber to sanitize building tank.',
    category: 'Asset Maintenance',
    assignedToMemberId: 'mem_papa',
    dueDate: '2026-10-15',
    priority: 'Medium',
    status: 'Pending',
    linkedVendorId: 'ven_plumber',
    whatsappReminderText: 'Papa, please coordinate with Suresh Plumber for overhead tank cleaning this Sunday.'
  },
  {
    id: 'tsk_maid_salary',
    title: 'Pay Shanta Bai (Maid/Cook) Monthly Salary (₹4,500)',
    description: 'Monthly housekeeping and cooking wages for September. Transfer via GPay/PhonePe.',
    category: 'Staff Management',
    assignedToMemberId: 'mem_mummy',
    dueDate: '2026-10-05',
    priority: 'High',
    status: 'Pending',
    linkedVendorId: 'ven_maid',
    whatsappReminderText: 'Mummy, please transfer ₹4,500 to Shanta Bai via UPI.'
  },
  {
    id: 'tsk_dth_recharge',
    title: 'Recharge Tata Play DTH for Dada-Dadi',
    description: 'Star Plus, Sony Entertainment, and Aaj Tak channels expire in 5 days. Recharge ₹450 package.',
    category: 'Utility Payment',
    assignedToMemberId: 'mem_rohan',
    dueDate: '2026-10-08',
    priority: 'Medium',
    status: 'Pending',
    whatsappReminderText: 'Rohan, Tata Play pack is expiring in 5 days, recharge with ₹450.'
  },
  {
    id: 'tsk_sabzi',
    title: 'Buy Fresh Vegetables from Raju Sabziwala',
    description: 'Get 1kg Potatoes (Aloo), 1kg Onions (Pyaaz), 500g Tomatoes (Tamatar), and Dhaniya-Mirchi.',
    category: 'Kitchen & Ration',
    assignedToMemberId: 'mem_priya',
    dueDate: '2026-10-04',
    priority: 'Medium',
    status: 'In Progress',
    linkedVendorId: 'ven_sabzi',
    whatsappReminderText: 'Priya, Raju bhai is standing at the gate. Go buy Aloo, Pyaaz, and Tamatar.'
  }
];

export const INITIAL_VAULT_DOCUMENTS: IngestedVaultDocument[] = [
  {
    id: 'doc_msedcl',
    title: 'MSEDCL Electricity Consumer Bill (October 2026)',
    fileName: 'MSEDCL_Bill_Oct2026.pdf',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    uploadDate: '02 Oct 2026',
    category: 'Electricity Bill',
    issuer: 'Maharashtra State Electricity Distribution Co.',
    expiryDate: '2026-10-08',
    dueAmountINR: 3450,
    status: 'Expiring Soon',
    associatedAsset: 'Household Meter #02854910',
    extractedDetails: {
      consumerNumber: '028549102831',
      billingPeriod: '01 Sep - 30 Sep 2026',
      sanctionedLoad: '5.00 kW',
      paymentRef: 'MSEDCL-OCT-4910'
    }
  },
  {
    id: 'doc_gharpatti',
    title: 'Municipal Property Tax Assessment (Gharpatti 2026-27)',
    fileName: 'PMC_Gharpatti_Receipt_2026.pdf',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    uploadDate: '15 Sep 2026',
    category: 'Gharpatti (House Tax)',
    issuer: 'Pune Municipal Corporation (Property Tax Dept)',
    expiryDate: '2026-10-31',
    dueAmountINR: 4200,
    status: 'Pending Action',
    associatedAsset: 'Flat 402, Gokul Dham Heights',
    extractedDetails: {
      propertyId: 'PMC-PT-WARD14-402',
      billingPeriod: 'Financial Year 2026-2027',
      paymentRef: 'GHARPATTI-CHQ-9912'
    }
  },
  {
    id: 'doc_kent',
    title: 'Kent Grand+ RO Purifier Warranty & AMC Card',
    fileName: 'Kent_RO_Warranty_Card.jpg',
    fileSize: '3.1 MB',
    fileType: 'JPG',
    uploadDate: '12 Sep 2026',
    category: 'Warranty Card',
    issuer: 'Kent RO Systems Ltd.',
    expiryDate: '2026-11-01',
    status: 'Expiring Soon',
    associatedAsset: 'Kent Grand Plus RO Purifier',
    extractedDetails: {
      warrantyDuration: '1 Year Comprehensive + 3 Years Service',
      paymentRef: 'AMC-KENT-4491'
    }
  },
  {
    id: 'doc_society',
    title: 'Registered Society Share Certificate & Deed of Apartment',
    fileName: 'Society_Share_Certificate_Flat402.pdf',
    fileSize: '4.8 MB',
    fileType: 'PDF',
    uploadDate: '01 Aug 2026',
    category: 'Rent / Lease Agreement',
    issuer: 'Gokul Dham CHS Registrar',
    status: 'Verified',
    associatedAsset: 'Flat 402 Residential Title',
    extractedDetails: {
      propertyId: 'CHS-CERT-00402',
      paymentRef: 'STAMP-DUTY-VERIFIED'
    }
  },
  {
    id: 'doc_water',
    title: 'Municipal Water Cess Paid Receipt',
    fileName: 'Municipal_Water_Cess_Q3.pdf',
    fileSize: '820 KB',
    fileType: 'PDF',
    uploadDate: '28 Sep 2026',
    category: 'Maintenance Receipt',
    issuer: 'City Jal Sansthan',
    dueAmountINR: 450,
    status: 'Paid',
    associatedAsset: 'Borewell & Corporation Meter',
    extractedDetails: {
      consumerNumber: 'WTR-7721-A',
      paymentRef: 'UPI-BBPS-99210041'
    }
  }
];

export const INITIAL_GRAPH_NODES: GraphNode[] = [
  // Core Assets
  {
    id: 'ast_ac',
    type: 'asset',
    label: 'Voltas Split AC',
    subtitle: 'Health: 78% (Service Due)',
    x: 480,
    y: 190,
    status: 'warning',
    healthScore: 78,
    iconName: 'Flame',
    metadata: { model: '185V Vectra', location: 'Master Bedroom' }
  },
  {
    id: 'ast_ro',
    type: 'asset',
    label: 'Kent RO Purifier',
    subtitle: 'Health: 62% (Filter Choke)',
    x: 310,
    y: 330,
    status: 'warning',
    healthScore: 62,
    iconName: 'Droplet',
    metadata: { model: 'Kent Grand+', risk: 'Borewell Hardness' }
  },
  {
    id: 'ast_geyser',
    type: 'asset',
    label: 'Bajaj 25L Geyser',
    subtitle: 'Warranty Expiring!',
    x: 650,
    y: 330,
    status: 'critical',
    healthScore: 68,
    iconName: 'Zap',
    metadata: { model: 'Shakti Neo', risk: 'Anode Scaling' }
  },
  {
    id: 'ast_inverter',
    type: 'asset',
    label: 'Exide Inverter Battery',
    subtitle: 'Health: 92% (Water OK)',
    x: 820,
    y: 210,
    status: 'healthy',
    healthScore: 92,
    iconName: 'Activity',
    metadata: { battery: '150Ah Tubular' }
  },

  // Family Members
  {
    id: 'mem_papa',
    type: 'family',
    label: 'Papa (Rajesh)',
    subtitle: 'Head (2 Tasks)',
    x: 290,
    y: 110,
    status: 'healthy',
    iconName: 'User',
    metadata: { role: 'Dad (Papa)' }
  },
  {
    id: 'mem_mummy',
    type: 'family',
    label: 'Mummy (Sunita)',
    subtitle: 'Kitchen & Staff (3 Tasks)',
    x: 650,
    y: 110,
    status: 'warning',
    iconName: 'User',
    metadata: { role: 'Mom (Mummy)' }
  },
  {
    id: 'mem_rohan',
    type: 'family',
    label: 'Rohan (You)',
    subtitle: 'Bills & Tech (3 Tasks)',
    x: 470,
    y: 70,
    status: 'healthy',
    iconName: 'User',
    metadata: { role: 'You (Self)' }
  },

  // Financial Liabilities
  {
    id: 'fin_elec',
    type: 'financial',
    label: 'MSEDCL Bill (₹3,450)',
    subtitle: 'Due in 4 Days (+21% Surge)',
    x: 150,
    y: 240,
    status: 'critical',
    iconName: 'Zap',
    metadata: { amount: '₹3,450', dueDate: '08 Oct' }
  },
  {
    id: 'fin_gharpatti',
    type: 'financial',
    label: 'Gharpatti Tax (₹4,200)',
    subtitle: 'Annual Municipal Due',
    x: 130,
    y: 380,
    status: 'warning',
    iconName: 'CreditCard',
    metadata: { amount: '₹4,200', dueDate: '31 Oct' }
  },

  // Inventory Consumables
  {
    id: 'inv_atta',
    type: 'inventory',
    label: 'Chakki Atta (1.5 kg)',
    subtitle: '⚠️ Low Stock! 1 Day Left',
    x: 480,
    y: 370,
    status: 'critical',
    iconName: 'Package',
    metadata: { stock: '1.5 kg', threshold: '5.0 kg' }
  },
  {
    id: 'inv_milk',
    type: 'inventory',
    label: 'Fresh Milk (0.5 L)',
    subtitle: '⚠️ Refill Needed Today',
    x: 320,
    y: 480,
    status: 'critical',
    iconName: 'Droplet',
    metadata: { stock: '0.5 L' }
  },
  {
    id: 'inv_dal',
    type: 'inventory',
    label: 'Toor Dal (0.8 kg)',
    subtitle: '🟡 3 Days Remaining',
    x: 650,
    y: 480,
    status: 'warning',
    iconName: 'Package',
    metadata: { stock: '0.8 kg' }
  }
];

export const INITIAL_GRAPH_EDGES: GraphEdge[] = [
  // Family to Assets & Tasks
  { id: 'e1', source: 'mem_rohan', target: 'fin_elec', label: 'Pays Online', status: 'alert' },
  { id: 'e2', source: 'mem_papa', target: 'fin_gharpatti', label: 'Oversees Tax', status: 'normal' },
  { id: 'e3', source: 'mem_mummy', target: 'inv_atta', label: 'Monitors Ration', status: 'alert' },
  { id: 'e4', source: 'mem_mummy', target: 'inv_milk', label: 'Orders Daily', status: 'alert' },
  { id: 'e5', source: 'mem_rohan', target: 'ast_ac', label: 'Schedules Service', status: 'pulsing' },
  { id: 'e6', source: 'mem_papa', target: 'ast_geyser', label: 'Inspects Geyser', status: 'alert' },

  // Financial to Physical
  { id: 'e7', source: 'fin_elec', target: 'ast_ac', label: 'High Load', status: 'alert' },
  { id: 'e8', source: 'ast_ro', target: 'inv_milk', label: 'Water for Chai', status: 'normal' }
];
