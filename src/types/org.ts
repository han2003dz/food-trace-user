export type OrgType = "PRODUCER" | "LOGISTICS" | "RETAILER" | "AUDITOR";

export const ORG_TYPE_ROLES: Record<
  OrgType,
  { label: string; description: string }
> = {
  PRODUCER: {
    label: "Producer",
    description: "Create and manage products from origin",
  },
  LOGISTICS: {
    label: "Logistics Provider",
    description: "Transport and track shipments",
  },
  RETAILER: {
    label: "Retailer",
    description: "Sell products to end consumers",
  },
  AUDITOR: {
    label: "Auditor",
    description: "Verify and audit supply chain data",
  },
};
