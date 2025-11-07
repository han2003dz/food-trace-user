/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent } from "react";

export interface CreateBatchFormData {
  productName: string;
  categoryId: string;
  producerName: string;
  origin: string;
  batchCode: string;

  description?: string;
  manufactureDate?: Date;
  expiryDate?: Date;
  image?: string | null;

  certifications?: {
    type: string; // "VietGAP"
    issuer: string; // "Bộ NN&PTNT"
    id: string; // "VG-2025-001"
  }[];
  storageConditions?: string; // "18°C - 22°C"
  nutritionalInfo?: Record<string, any>; // { calories: 50, protein: 2g }
}

export interface HandleChangeFormData {
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;

  <K extends keyof CreateBatchFormData>(
    name: K,
    value: CreateBatchFormData[K]
  ): void;
}
