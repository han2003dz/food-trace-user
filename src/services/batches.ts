import { api } from "@/config/api";
import type { Batch, BatchDetail } from "@/types/batch";
import type { CreateBatchFormData } from "@/types/form";

export const createBatch = async (data: CreateBatchFormData) => {
  console.log("data", data);
  const payload = {
    product_id: data.product_id,
    creator_org_id: data.creator_org_id,
    metadata_uri: data.metadata_uri || null,
  };
  const res = await api().post("/batches/create", payload);
  return res.data;
};

export const getBatchByUser = async (): Promise<Batch[]> => {
  const res = await api().get("/batches/my");
  return res.data;
};

export const getBatchDetailById = async (id: string): Promise<BatchDetail> => {
  const res = await api().get(`/batches/${id}`);
  return res.data;
};
