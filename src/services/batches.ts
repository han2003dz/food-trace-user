/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/config/api";

export interface CreateBatchPayload {
  batchCode: string;
  fromEventId: number;
  toEventId: number;
  events: any[];
}

export const createBatch = async (data: CreateBatchPayload) => {
  const res = await api().post("/batches", data);
  return res.data;
};
