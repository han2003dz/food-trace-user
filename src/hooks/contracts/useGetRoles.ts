import { FOOD_TRACE_CONTRACT_ADDRESS } from "@/config/accountKit";
import { FOOD_TRACE_ABI } from "@/config/contracts";
import { mapRoles } from "@/utils/role";
import { useSmartAccountClient } from "@account-kit/react";
import { useEffect, useState } from "react";

export const useGetRole = () => {
  const { client } = useSmartAccountClient({});
  const [role, setRole] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBatch = async () => {
      if (!client) return;

      setLoading(true);
      try {
        const res = await client.readContract({
          address: FOOD_TRACE_CONTRACT_ADDRESS,
          abi: FOOD_TRACE_ABI,
          functionName: "roles",
          args: [client.account.address],
        });

        setRole(res);
      } catch (err) {
        console.error("❌ Error fetching role:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBatch();
  }, [client]);

  const roles = mapRoles(role);

  return { roles, loading };
};
