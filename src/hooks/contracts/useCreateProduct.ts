/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSmartAccountClient, useSendCalls } from "@account-kit/react";
import { encodeFunctionData } from "viem";
import { useState } from "react";
import { FOOD_TRACE_ABI } from "@/config/contracts";
import { FOOD_TRACE_CONTRACT_ADDRESS } from "@/config/accountKit";

interface CreateProductProps {
  name: string;
  metadataUri: any;
}

export const useCreateProductOnchain = () => {
  const { client } = useSmartAccountClient({});
  const { sendCallsAsync } = useSendCalls({ client });
  const [loading, setLoading] = useState(false);

  const createProduct = async ({ name, metadataUri }: CreateProductProps) => {
    if (!client) throw new Error("Wallet not connected");

    setLoading(true);

    try {
      const data = encodeFunctionData({
        abi: FOOD_TRACE_ABI,
        functionName: "createProduct",
        args: [name, metadataUri],
      });

      const res = await sendCallsAsync({
        calls: [{ to: FOOD_TRACE_CONTRACT_ADDRESS, data }],
      });

      console.log("✅ TX submitted:", res);
      return res;
    } catch (error: any) {
      console.error("❌ Failed to create batch:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading };
};
