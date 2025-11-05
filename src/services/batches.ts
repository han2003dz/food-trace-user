/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/config/api";
interface EventItem {
  id: number;
  name: string;
  data?: Record<string, any>;
}
interface CreateBatchInput {
  productId: string;
  fromEventId: number;
  toEventId: number;
  events: EventItem[];
}

export const createBatch = async (data: CreateBatchInput) => {
  const res = await api().post("/batches/create", data);
  return res.data;
};
