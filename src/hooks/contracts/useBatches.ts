/* eslint-disable @typescript-eslint/no-explicit-any */
import { FOOD_TRACE_CONTRACT_ADDRESS } from "@/config/accountKit";
import { FOOD_TRACE_ABI } from "@/config/contracts";
import { QueryKey } from "@/types/queryKey";
import { useSmartAccountClient } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";

export interface UseBatchesReturn {
  batches: any;
  isLoading: boolean;
  error?: string;
  refetch: () => void;
}

export const useGetTotalBatches = (): UseBatchesReturn => {
  const { client } = useSmartAccountClient({});

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryKey.TOTAL_BATCHES, client?.account?.address],
    queryFn: async () => {
      if (!client) {
        throw new Error("Wallet not connected");
      }

      const totalBatches = await client.readContract({
        address: FOOD_TRACE_CONTRACT_ADDRESS,
        abi: FOOD_TRACE_ABI,
        functionName: "totalBatches",
        args: [],
      });

      console.log("totalBatches", totalBatches);

      return {
        totalBatches: Number(totalBatches),
      };
    },
    enabled: !!client?.account?.address,
  });

  console.log("data", data);

  return {
    batches: data ?? null,
    isLoading,
    error: error?.message,
    refetch,
  };
};
