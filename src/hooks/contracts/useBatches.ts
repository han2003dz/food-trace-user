import { FOOD_TRACE_CONTRACT_ADDRESS } from "@/config/accountKit";
import { FOOD_TRACE_ABI } from "@/config/contracts";
import { useSmartAccountClient } from "@account-kit/react";
import { useEffect, useState } from "react";

export const useGetTotalBatches = () => {
  const { client } = useSmartAccountClient({});
  const [totalBatches, setTotalBatches] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalBatches = async () => {
      if (!client) return;
      try {
        const result = await client.readContract({
          address: FOOD_TRACE_CONTRACT_ADDRESS,
          abi: FOOD_TRACE_ABI,
          functionName: "totalBatches",
        });
        setTotalBatches(Number(result));
      } catch (err) {
        console.error("Error fetching totalBatches:", err);
      }
    };

    fetchTotalBatches();
  }, [client]);

  return { totalBatches };
};
