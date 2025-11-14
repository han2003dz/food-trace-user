/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CreateBatchFormData {
  product_id: string;
  creator_org_id?: string;
  metadata_uri?: string;
}

export type HandleChangeFormData = (
  eOrName: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
  value?: any
) => void;

export interface CreateProductFormData {
  name: string;
  description?: string;
  image_url?: string | null;

  origin?: string;
  producer_name?: string;
  manufacture_date: Date | undefined;
  expiry_date: Date | undefined;

  category?: string;
  storage_conditions?: string;
  nutritional_info?: Record<string, any>;

  metadata_uri?: string;
  organization_id?: string;
}
