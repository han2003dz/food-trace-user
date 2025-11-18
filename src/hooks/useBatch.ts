/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllBatches,
  getBatchByUser,
  getBatchDetailById,
  updateBatchStatus,
  type UpdateBatchStatusPayload,
} from "@/services/batches";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetBatchByUser = () => {
  return useQuery({
    queryKey: ["batches-by-user"],
    queryFn: getBatchByUser,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useGetBatchDetailById = (id: string) => {
  return useQuery({
    queryKey: ["batch-detail-by-id", id],
    queryFn: () => getBatchDetailById(id),
    enabled: !!id,
  });
};

export const useGetAllBatches = (
  page: number,
  limit: number,
  status?: string
) => {
  return useQuery({
    queryKey: ["all-batches", page, limit, status],
    queryFn: () => getAllBatches(page, limit, status),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useUpdateBatchStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      batchId,
      data,
    }: {
      batchId: string;
      data: UpdateBatchStatusPayload;
    }) => updateBatchStatus(batchId, data),

    onSuccess: () => {
      toast.success("Batch status updated successfully!");

      queryClient.invalidateQueries({ queryKey: ["batches-by-user"] });
      queryClient.invalidateQueries({ queryKey: ["all-batches"] });
      queryClient.invalidateQueries({ queryKey: ["batch-detail-by-id"] });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update status");
    },
  });
};
