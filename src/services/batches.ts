import { api } from "@/config/api";
import type { CreateBatchFormData } from "@/types/form";

export const createBatch = async (data: CreateBatchFormData) => {
  console.log("data", data);
  const payload = {
    product_id: data.product_id,
    creator_org_id: data.creator_org_id,
    initial_data_hash: data.initial_data_hash,
    metadata_uri: data.metadata_uri || null,
  };
  const res = await api().post("/batches/create", payload);
  return res.data;
};
