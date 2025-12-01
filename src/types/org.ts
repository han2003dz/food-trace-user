export type OrgType =
  | "PRODUCER"
  | "PROCESSOR"
  | "RETAILER"
  | "AUDITOR"
  | "TRANSPORTER";

export const ORG_TYPE_ROLES: Record<
  OrgType,
  { label: string; description: string }
> = {
  PRODUCER: {
    label: "Producer",
    description: "Create and manage products from origin",
  },
  PROCESSOR: {
    label: "Processor Provider",
    description: "Transport and track shipments",
  },

  TRANSPORTER: {
    label: "TRANSPORTER Provider",
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
