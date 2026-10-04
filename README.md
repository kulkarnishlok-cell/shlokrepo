# 🏠 Household Management OS — India Edition (🇮🇳)

> **"An AI-powered autonomous domestic control plane that unifies an Indian household's scattered bills, documents, local vendors, kitchen ration, and family chores into one synchronized system."**

---

## 🌟 Executive Overview & Problem Statement

Most domestic apps fail because they treat household management as disconnected to-do lists, generic expense trackers, or PDF storage folders. In reality, a modern Indian home is a **complex distributed system** running with fragmented state:
- **Tax & Utility Deadlines:** Municipal Gharpatti tax, MSEDCL/Tata Power electricity tariffs, water cess, and DTH recharges run on unmonitored asynchronous clocks.
- **Mental Load & Single Point of Failure:** Domestic logistics (booking LPG cylinders, paying maid/cook wages, checking water tanks) often overburden one family member.
- **Local Service Coordination:** Relying on handwritten scraps or memory to find trusted local contacts (electricians, plumbers, kirana stores, doodhwala, sabziwala).
- **Kitchen Depletion Risk:** Essentials like Chakki Atta, Milk, and Toor Dal running out unexpectedly without proactive inventory tracking.

**Household Management OS (HH-OS)** transforms unstructured domestic telemetry (invoices, receipts, warranty cards, meter readings) into a live **Household Digital Twin** and provides automated closed-loop scheduling, UPI bill settlement, and WhatsApp vendor dispatch.

---

## ⚡ The 6 Core Indian Household Modules

### 1. 📄 Functional Document Vault & Ingestion Pipeline
- **Real File Uploading:** Working HTML5 drag-and-drop & file picker supporting `.pdf`, `.jpg`, and `.png` (Electricity bills, Gharpatti tax receipts, warranty cards, rent agreements, society share certificates).
- **AI Extraction Simulator:** Automatically scans uploaded documents to extract Document Type, Issuing Authority, Expiry Date, Due Amount in ₹, and Consumer/CA numbers.
- **Categorized Grid:** Organizes records with status badges (`Expiring Soon`, `Paid`, `Verified`, `Pending Action`) and instant preview inspection.
- **Quick Demo Presets:** Includes 1-click sample presets (+ MSEDCL Bill, + Gharpatti Tax, + Kent RO Warranty).

### 2. 💰 Indian Financial & Recurring Expense Agent
- **100% Indian Currency & Billing (₹):**
  - **Civic Tax:** Municipal Gharpatti (Property Tax) ₹4,200 (with early-bird rebate).
  - **Discom Utilities:** MSEDCL Electricity Bill ₹3,450, Municipal Water Cess ₹450.
  - **Connectivity & Subscriptions:** JioFiber 100 Mbps ₹825, Tata Play DTH ₹450, Netflix Premium ₹649, Gold's Gym ₹2,000, Society Maintenance ₹3,500.
- **Color-Coded Alert Hierarchy:**
  - 🔴 **Red (Urgent):** Due in $\le 2$ days (Netflix renews tomorrow, JioFiber in 2 days).
  - 🟡 **Amber (Due Soon):** Due in 3–5 days (MSEDCL in 4 days, Tata Play in 5 days).
  - 🟢 **Green (Paid):** Reconciled receipts.
- **Electricity Surge Anomaly Detection:** Flags an unseasonal **+21% surge (+₹600)** due to AC short-cycling pushing consumption into higher tariff slabs.
- **Simulated BBPS / UPI Payment:** 1-click simulated payment modal with QR code and GPay/PhonePe confirmation that instantly clears the obligation.

### 3. 🔧 Local Indian Vendor & Service Directory
- **Verified Local Contacts:**
  - **Ramesh Mistri** (Local Electrician — *+91 98201 44321*)
  - **Suresh Kumar** (Local Plumber — *+91 98192 88412*)
  - **Imran Mistri** (AC Service Technician — *+91 98334 11920*)
  - **Gupta Ji** (Gupta Kirana & General Store — *+91 98210 55674*)
  - **Raju Bhai** (Sabziwala — *+91 97690 33819*)
  - **Bablu Yadav** (Doodhwala — *+91 98205 77123*)
  - **Shanta Bai** (House Maid & Cook — *+91 98112 00491*)
- **Direct Domestic Actions:**
  - 📞 **"Call Direct":** Initiates phone call (`tel:` protocol).
  - 💬 **"WhatsApp":** Opens pre-filled polite Hinglish message customized for that trade.
  - 🛠️ **"Log Service Request":** Automatically logs a service ticket and dispatches it to family chores.

### 4. 🛒 Smart Indian Kitchen & Household Inventory
- **Daily Indian Staples Tracked:**
  - **Chakki Fresh Sharbati Atta:** 1.5 kg remaining ⚠️ (*Critical Low — threshold 5 kg*)
  - **Fresh Cow/Buffalo Milk:** 0.5 L remaining ⚠️ (*Refill Needed Today — threshold 2 L*)
  - **Unpolished Toor Dal:** 0.8 kg remaining 🟡 (*Running Out Soon — threshold 2 kg*)
  - **Mustard / Sunflower Oil:** 4.0 L remaining 🟢 (*Sufficient*)
  - **Kadak Chai Leaves (Patti):** 350 g remaining 🟢 (*Sufficient*)
  - **Royal Basmati Rice:** 5.0 kg remaining 🟢 (*Sufficient*)
  - **Surf Excel Matic Detergent:** 1.2 kg remaining 🟡 (*Running Out Soon*)
- **1-Click WhatsApp Kirana Order:** Compiles all low items into an automated WhatsApp grocery order to Gupta Kirana with flat delivery address (*Flat 402*).

### 5. 👨👩👧 Indian Household Task & Chore Coordinator
- **Culturally Relevant Domestic Routines:**
  - *"Book LPG Cylinder refill (Indane 14.2kg)"* $\rightarrow$ Assigned to **Papa (Rajesh)**
  - *"Pay Gharpatti (Property Tax) online before month-end"* $\rightarrow$ Assigned to **Rohan (Self)**
  - *"Schedule Overhead Water Tank cleaning with Suresh Plumber"* $\rightarrow$ Assigned to **Papa (Rajesh)**
  - *"Pay Shanta Bai (Maid) monthly salary of ₹4,500"* $\rightarrow$ Assigned to **Mom (Sunita)**
  - *"Recharge Tata Play DTH for Dada-Dadi"* $\rightarrow$ Assigned to **Rohan (Self)**
  - *"Buy fresh vegetables (Dhaniya-Mirchi, Sabzi) from Raju Sabziwala"* $\rightarrow$ Assigned to **Priya (Sibling)**
- **Features:** WhatsApp ping reminders to family members, task filters, priority tags, and 1-click completion.

### 6. 🤖 AI Household Agent & Indian Digital Twin Dashboard
- **Unified Domestic State KPIs:**
  - Monthly Expenses: **₹15,019**
  - Active Domestic Tasks: **5 Tasks**
  - Appliance Health Alerts: **Kent RO & Bajaj Geyser**
  - Urgent Ration Items: **Atta & Milk**
- **Interactive SVG State Graph:** Visually maps Voltas Split AC, Kent RO Purifier, Bajaj Geyser, Exide Inverter, MSEDCL Bill, Gharpatti Tax, and Family Members with glowing status halos (Green, Amber, Red).
- **Conversational Indian Copilot:** Natural language prompt interface answering questions with tool calling:
  - *"When is the Gharpatti tax payment due?"*
  - *"Who is our local electrician and what is his number?"*
  - *"Show me all subscriptions due this week."*
  - *"Why did our electricity bill increase this month?"*

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 18 + TypeScript + Vite 6
- **Styling:** Tailwind CSS (Dark/Light mode support, cyber glow animations)
- **Icons:** Lucide React
- **Celebrations:** Canvas Confetti
- **State Architecture:** Local-First reactive state model with simulated AI multimodal vision extraction and NPCI UPI payment reconciliation.

---

## 🚀 Quick Start Guide (Run Locally)

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# 1. Clone or extract the project folder
cd household-os

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will be live at:
👉 **`http://localhost:3000`**

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Directory Structure

```
household-os/
├── src/
│   ├── components/
│   │   ├── Header.tsx                     # Top navigation, India locale badge, theme toggle
│   │   ├── IndianDigitalTwinDashboard.tsx # Feature 6: State graph & Natural language Copilot
│   │   ├── DocumentVault.tsx              # Feature 1: Functional PDF/Image uploader & vault
│   │   ├── IndianFinancialAgent.tsx       # Feature 2: Indian utility bills, Gharpatti, UPI pay
│   │   ├── VendorDirectory.tsx            # Feature 3: Ramesh Mistri, Suresh Plumber, Kirana, WhatsApp
│   │   ├── KitchenInventory.tsx           # Feature 4: Chakki Atta, Milk, Toor Dal, Kirana WhatsApp order
│   │   └── IndianChoreCoordinator.tsx     # Feature 5: LPG booking, maid salary, family assignments
│   ├── data/
│   │   └── mockHouseholdData.ts           # Pre-seeded Indian household entities & relations
│   ├── types/
│   │   └── household.ts                   # Core TypeScript interfaces for Indian household
│   ├── App.tsx                            # Root state management & feature routing
│   ├── index.css                          # Cyber grid & glowing neon animations
│   └── main.tsx                           # React DOM bootstrap
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🏆 Demo Script for Presentation / Judging (3 Minutes)

1. **Minute 0:00 - 0:45 (The Hook):** Open `Digital Twin & AI` tab. Explain that Indian homes run without an operating system, causing bill penalties and cognitive overload. Show the interactive topology graph with Voltas AC, Kent RO, and family nodes.
2. **Minute 0:45 - 1:30 (Document Ingestion & Financials):** Switch to `Document Vault`. Drag & drop a bill or click `+ MSEDCL Bill (₹3,450)`. Watch the AI vision pipeline extract due date, consumer number, and update the graph. Show the `Indian Financials` tab and pay the bill via simulated UPI (confetti celebration).
3. **Minute 1:30 - 2:15 (Vendors & Kitchen Staples):** Open `Local Vendors` and show direct WhatsApp messaging to Ramesh Mistri and Gupta Kirana. Switch to `Kitchen Inventory`, click `Send WhatsApp List to Gupta Kirana` to demonstrate automated domestic procurement.
4. **Minute 2:15 - 3:00 (The Mic Drop Copilot):** Return to `Digital Twin & AI` and type:
   > *"When is our Gharpatti tax payment due?"* or *"Why did our electricity bill increase this month?"*
   Demonstrate the AI Copilot diagnosing the AC cooling coil and providing a 1-click WhatsApp button to dispatch the technician.

---

## 📄 License
MIT License. Created for Hackathons, AI Pair Programming, and Modern Smart Home innovation.
