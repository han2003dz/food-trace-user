/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Certification } from "./certification";

export interface ProductOwner {
  id: string;
  username?: string;
  email?: string;
  wallet_address?: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  origin: string | null;
  producer_name: string | null;
  manufacture_date: string | null; // ISO date string
  expiry_date: string | null; // ISO date string
  current_owner: ProductOwner | null;
  owner_wallet: string | null;
  image_url: string | null;
  description: string | null;
  certifications: Certification[] | null;
  storage_conditions: string | null;
  nutritional_info: Record<string, any> | null;
  onchain_id: number | null;
  leaf_hash: string | null;
  metadata: Record<string, any> | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  category: string;
}

export interface ProductListItem {
  id: string;
  name: string;
  origin: string | null;
  producer_name: string | null;
  manufacture_date: string | null;
  expiry_date: string | null;
  image_url: string | null;
  description: string | null;
  certifications: Certification[] | null;
  created_at: string;
  category_id: string;
}
