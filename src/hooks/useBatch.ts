import { getBatchByUser, getBatchDetailById } from "@/services/batches";
import { useQuery } from "@tanstack/react-query";

export const useGetBatchByUser = () => {
  return useQuery({
    queryKey: ["batches-by-user"],
    queryFn: getBatchByUser,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useGetBatchDetailById = (id: string) => {
  return useQuery({
    queryKey: ["batch-detail-by-id", id],
    queryFn: () => getBatchDetailById(id),
    enabled: !!id,
  });
};
