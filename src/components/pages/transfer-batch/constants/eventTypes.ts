// Event types with role-based filtering

import { CheckCircle2, Info, Package, Store, Truck } from "lucide-react";

export const eventTypes = {
  producer: [
    {
      value: "PROCESSED",
      label: "Processed",
      icon: CheckCircle2,
      description: "Process the batch before shipping",
    },
    {
      value: "SHIPPED",
      label: "Shipped",
      icon: Truck,
      description: "Transfer batch to transporter",
    },
  ],

  transporter: [
    {
      value: "RECEIVED",
      label: "Received",
      icon: Package,
      description: "Confirm receipt from previous owner",
    },
    {
      value: "SHIPPED",
      label: "Shipped",
      icon: Truck,
      description: "Ship to processor or retailer",
    },
  ],

  processor: [
    {
      value: "RECEIVED",
      label: "Received",
      icon: Package,
      description: "Confirm receipt from transporter",
    },
    {
      value: "PROCESSED",
      label: "Processed",
      icon: CheckCircle2,
      description: "Batch has been processed",
    },
    {
      value: "SHIPPED",
      label: "Shipped",
      icon: Truck,
      description: "Ship processed batch to retailer",
    },
  ],

  retailer: [
    {
      value: "RECEIVED",
      label: "Received",
      icon: Package,
      description: "Confirm receipt at store",
    },
    {
      value: "STORED",
      label: "Stored",
      icon: Store,
      description: "Store or display the product",
    },
    {
      value: "SOLD",
      label: "Sold",
      icon: CheckCircle2,
      description: "Batch sold to customer",
    },
    {
      value: "RECALLED",
      label: "Recalled",
      icon: Info,
      description: "Recall unsafe or defective batch",
    },
  ],
};

// Timeline steps
export const timelineSteps = [
  { label: "Producer", status: "created" },
  { label: "Transporter", status: "in_transit" },
  { label: "Processor", status: "processed" },
  { label: "Retailer", status: "delivered" },
  { label: "Verified", status: "verified" },
];

// Known partner organizations (mock data)
export const knownPartners = [
  { id: "1", name: "Organic Transport Co.", address: "0x1234...5678" },
  { id: "2", name: "GreenLeaf Processors", address: "0xabcd...ef01" },
  { id: "3", name: "FreshMart Retail", address: "0x9876...5432" },
];
