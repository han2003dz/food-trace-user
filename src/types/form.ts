import type { Certification } from "./certification";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CreateBatchFormData {
  productName: string;
  description: string;
  categoryId: string;
  producerName: string;
  origin: string;
  batchCode: string;
  manufactureDate: Date | undefined;
  expiryDate: Date | undefined;
  image?: string | null;
  certifications?: Certification[];
  storageConditions?: string;
  nutritionalInfo?: Record<string, any>;
}

export type HandleChangeFormData = (
  eOrName: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
  value?: any
) => void;

export interface CreateProductFormData {
  product_name: string;
  origin: string;
  producer_name: string;
  category_id: string;
  manufacture_date: Date | undefined;
  expiry_date: Date | undefined;
  description?: string;
  image?: string | null;
  certifications?: Certification[];
  storage_conditions?: string;
  nutritional_info?: Record<string, any>;
}
