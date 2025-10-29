export interface Batch {
  id: string;
  batchCode: string;
  product: string;
  owner: string;
  status: "created" | "in_transit" | "processed" | "delivered" | "verified";
  timestamp: string;
  category: string;
  producerName: string;
  location: string;
  image?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  status: "completed" | "pending" | "active";
}

export const mockBatches: Batch[] = [
  {
    id: "1",
    batchCode: "BTH-2024-001",
    product: "Organic Tomatoes",
    owner: "Green Valley Farm",
    status: "verified",
    timestamp: "2024-01-15T10:30:00Z",
    category: "Vegetables",
    producerName: "John Smith",
    location: "California, USA",
  },
  {
    id: "2",
    batchCode: "BTH-2024-002",
    product: "Free Range Eggs",
    owner: "Sunrise Poultry",
    status: "delivered",
    timestamp: "2024-01-14T14:20:00Z",
    category: "Dairy & Eggs",
    producerName: "Maria Garcia",
    location: "Texas, USA",
  },
  {
    id: "3",
    batchCode: "BTH-2024-003",
    product: "Wild Salmon",
    owner: "Ocean Fresh Co.",
    status: "in_transit",
    timestamp: "2024-01-13T08:15:00Z",
    category: "Seafood",
    producerName: "Pacific Fisheries",
    location: "Alaska, USA",
  },
  {
    id: "4",
    batchCode: "BTH-2024-004",
    product: "Organic Coffee Beans",
    owner: "Mountain Peak Farms",
    status: "processed",
    timestamp: "2024-01-12T16:45:00Z",
    category: "Beverages",
    producerName: "Carlos Rodriguez",
    location: "Colombia",
  },
  {
    id: "5",
    batchCode: "BTH-2024-005",
    product: "Grass-Fed Beef",
    owner: "Prairie Ranch",
    status: "created",
    timestamp: "2024-01-11T12:00:00Z",
    category: "Meat",
    producerName: "Robert Johnson",
    location: "Montana, USA",
  },
];

export const mockTimeline: TimelineEvent[] = [
  {
    id: "1",
    title: "Producer Created",
    description: "Batch created by Green Valley Farm",
    timestamp: "2024-01-15T10:30:00Z",
    icon: "🧑‍🌾",
    status: "completed",
  },
  {
    id: "2",
    title: "Quality Check",
    description: "Passed organic certification inspection",
    timestamp: "2024-01-15T14:00:00Z",
    icon: "✅",
    status: "completed",
  },
  {
    id: "3",
    title: "Transported",
    description: "En route to processing facility",
    timestamp: "2024-01-16T08:00:00Z",
    icon: "🚚",
    status: "completed",
  },
  {
    id: "4",
    title: "Processed",
    description: "Washed, sorted, and packaged",
    timestamp: "2024-01-17T10:30:00Z",
    icon: "🏭",
    status: "completed",
  },
  {
    id: "5",
    title: "Delivered to Retailer",
    description: "Delivered to Fresh Market Store #42",
    timestamp: "2024-01-18T09:00:00Z",
    icon: "🏬",
    status: "completed",
  },
  {
    id: "6",
    title: "Consumer Verified",
    description: "QR code scanned by consumer",
    timestamp: "2024-01-19T15:30:00Z",
    icon: "👨‍👩‍👧‍👦",
    status: "completed",
  },
];

export const statusColors = {
  created: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  in_transit: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  processed: "bg-purple-500/20 text-purple-400 border-purple-500/50",
  delivered: "bg-green-500/20 text-green-400 border-green-500/50",
  verified: "bg-secondary/20 text-secondary border-secondary/50",
};
