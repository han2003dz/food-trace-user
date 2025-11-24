import { api } from "@/config/api";
import type { Batch, BatchDetail, PaginatedBatchResponse } from "@/types/batch";
import type { CreateBatchFormData } from "@/types/form";

export interface UpdateBatchStatusPayload {
  event_type: string;
  metadata_uri?: string | null;
  receiver_wallet?: string | null;
}

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
  const res = await api().get(`/batches/${id}/detail`);
  return res.data;
};

export const getAllBatches = async (
  page: number,
  limit: number,
  status?: string
): Promise<PaginatedBatchResponse> => {
  if (status === "All") {
    status = undefined;
  }
  const res = await api().get("/batches", {
    params: {
      page,
      limit,
      sortBy: "created_at:DESC",
      ...(status ? { "filter.status": status } : {}),
    },
  });
  return {
    items: res.data.data,
    meta: res.data.meta,
  };
};

export const updateBatchStatus = async (
  batchId: string,
  data: UpdateBatchStatusPayload
) => {
  const res = await api().patch(`/batches/${batchId}/transfer`, data);
  return res.data;
};
