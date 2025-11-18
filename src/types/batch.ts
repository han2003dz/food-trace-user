/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Organization } from "./organization";
import type { PaginationMeta } from "./paginate";
import type { ProductResponse } from "./products";

export interface Batch {
  id: string;
  product: ProductResponse;
  creator_org: Organization;
  current_owner: Organization;

  onchain_batch_id: number | null;

  initial_data_hash: string;
  metadata_uri: string | null;

  status: BatchStatus;
  closed: boolean;

  metadata?: Record<string, any> | null;

  events?: BatchEvent[];
  code?: BatchCode | null;
  merkle_root?: MerkleRoot | null;
  certifications?: BatchCertification[];

  tx_hash_pending?: string | null;
  onchain_synced: boolean;

  created_at: string;
  updated_at: string;
}

export interface BatchTimelineItem {
  id: string;
  event_type: string;
  label: string;
  at: string | null;
  actor_org_name: string | null;
  tx_hash: string | null;
}

export interface BatchDetail extends Batch {
  timeline: BatchTimelineItem[];
}

// STATUS ENUM
export type BatchStatus =
  | "HARVESTED"
  | "PROCESSED"
  | "IN_TRANSIT"
  | "WAREHOUSE"
  | "SOLD"
  | "RECALLED";

export interface BatchCode {
  id: string;
  batch_code: string;
  batch_code_hash: string;
  qr_image_url?: string | null;

  created_at: string;
}

export interface MerkleRoot {
  id: string;
  batch: Batch;
  root_hash: string;
  tx_hash?: string | null;
  block_number?: number | null;

  created_at: string;
}

export interface BatchCertification {
  id: string;
  batch: Batch;

  cert_type: string;
  issuer: string;
  issued_at: string;
  document_url?: string | null;

  created_at: string;
}

export interface BatchEvent {
  id: string;

  event_type:
    | "CREATED"
    | "PROCESSED"
    | "SHIPPED"
    | "RECEIVED"
    | "STORED"
    | "SOLD"
    | "RECALLED";

  batch: Batch;
  actor_org: Organization;

  metadata_uri?: string | null;
  data_hash?: string | null;

  tx_hash?: string | null;
  block_number?: number | null;
  timestamp?: string | null;

  created_at: string;
}

export interface PaginatedBatchResponse {
  items: Batch[];
  meta: PaginationMeta;
}
