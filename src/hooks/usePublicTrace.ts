import { getPublicTrace } from "@/services/publicTrace";
import { useQuery } from "@tanstack/react-query";

export const useGetPublicTrace = (batchCode?: string) => {
  return useQuery({
    queryKey: ["public-trace", batchCode],
    queryFn: () => getPublicTrace(batchCode!),
    enabled: !!batchCode,
  });
};
