import { FOOD_TRACE_CONTRACT_ADDRESS } from "@/config/accountKit";
import { FOOD_TRACE_ABI } from "@/config/contracts";
import { useSmartAccountClient } from "@account-kit/react";
import { useEffect, useState } from "react";

export const useGetBatch = (batchId: number) => {
  const { client } = useSmartAccountClient({});
  const [batch, setBatch] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBatch = async () => {
      if (!client) return;

      setLoading(true);
      try {
        const res = await client.readContract({
          address: FOOD_TRACE_CONTRACT_ADDRESS,
          abi: FOOD_TRACE_ABI,
          functionName: "batches",
          args: [BigInt(28)],
        });
        console.log("batch:", res);

        setBatch(res);
      } catch (err) {
        console.error("❌ Error fetching batch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBatch();
  }, [client, batchId]);

  return { batch, loading };
};
