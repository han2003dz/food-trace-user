/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Certification } from "./certification";

export interface CreateBatchFormData {
  product_id: string;
  description?: string;
  from_event_id: number;
  to_event_id: number;
  events: any;
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
