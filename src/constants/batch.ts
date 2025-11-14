export const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Harvested", value: "HARVESTED" },
  { label: "Processed", value: "PROCESSED" },
  { label: "In Transit", value: "IN_TRANSIT" },
  { label: "Warehouse", value: "WAREHOUSE" },
  { label: "Sold", value: "SOLD" },
  { label: "Recalled", value: "RECALLED" },
];

export const statusColors: Record<string, string> = {
  HARVESTED: "border-emerald-500 text-emerald-500",
  PROCESSED: "border-blue-500 text-blue-500",
  IN_TRANSIT: "border-yellow-500 text-yellow-500",
  WAREHOUSE: "border-purple-500 text-purple-500",
  SOLD: "border-green-600 text-green-600",
  RECALLED: "border-red-500 text-red-500",
};
