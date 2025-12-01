/* eslint-disable @typescript-eslint/no-explicit-any */
import { FOOD_TRACE_CONTRACT_ADDRESS } from "@/config/accountKit";
import { FOOD_TRACE_ABI } from "@/config/contracts";
import { useSmartAccountClient, useSendCalls } from "@account-kit/react";
import { ethers } from "ethers";
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

    const recvHash = ethers.keccak256(ethers.toUtf8Bytes("recv#1"));

    try {
      // encode call đến hàm recordTraceEvent
      const data = encodeFunctionData({
        abi: FOOD_TRACE_ABI,
        functionName: "transferBatch",
        args: [
          BigInt(28),
          "0x36f1dbcea10086a6eCfC30F4246a718C1389b63c",
          2,
          recvHash as any,
        ],
      });

      const res = await sendCallsAsync({
        calls: [{ to: FOOD_TRACE_CONTRACT_ADDRESS, data }],
      });

      console.log("✅ TX submitted:", res);

      return res;
    } catch (error: any) {
      console.error("❌ Failed to transfer batch:", error);
      // throw error;
    } finally {
      setLoading(false);
    }
  };

  return { transfer, loading };
};
