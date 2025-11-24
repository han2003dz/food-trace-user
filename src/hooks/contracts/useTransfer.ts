/* eslint-disable @typescript-eslint/no-explicit-any */
import { FOOD_TRACE_CONTRACT_ADDRESS } from "@/config/accountKit";
import { FOOD_TRACE_ABI } from "@/config/contracts";
import { useSmartAccountClient, useSendCalls } from "@account-kit/react";
import { useState } from "react";
import { encodeFunctionData } from "viem";

export const useTransferBatch = () => {
  const { client } = useSmartAccountClient({});
  const { sendCallsAsync } = useSendCalls({ client });
  const [loading, setLoading] = useState(false);

  const transfer = async () => {
    if (!client) throw new Error("Wallet not connected");
    console.log("client", client.account.address);
    setLoading(true);

    try {
      // encode call đến hàm recordTraceEvent
      const data = encodeFunctionData({
        abi: FOOD_TRACE_ABI,
        functionName: "recordTraceEvent",
        args: [
          BigInt(20),
          2,
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0xf994B8828e8cBd2C01E96A22c69FaAb9adaE96d9",
        ],
      });

      const res = await sendCallsAsync({
        calls: [{ to: FOOD_TRACE_CONTRACT_ADDRESS, data }],
      });

      console.log("✅ TX submitted:", res);
      return res;
    } catch (error: any) {
      console.error("❌ Failed to transfer batch:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { transfer, loading };
};
