/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSmartAccountClient, useSendCalls } from "@account-kit/react";
import { encodeFunctionData, keccak256, type Address } from "viem";
import { MerkleTree } from "merkletreejs";
import { useState } from "react";
import { FOOD_TRACE_ABI } from "@/config/contracts";
import { FOOD_TRACE_CONTRACT_ADDRESS } from "@/config/accountKit";
import { toUtf8Bytes } from "ethers";

interface CreateBatchProps {
  batchCode: string;
  fromEventId: number;
  toEventId: number;
  events: any[];
}

export const useCreateBatch = () => {
  const { client } = useSmartAccountClient({});
  const { sendCallsAsync } = useSendCalls({ client });
  const [loading, setLoading] = useState(false);

  const createBatch = async ({
    batchCode,
    fromEventId,
    toEventId,
    events,
  }: CreateBatchProps) => {
    if (!client) throw new Error("Wallet not connected");
    if (!batchCode) throw new Error("Batch code is required");

    setLoading(true);

    try {
      // lọc các event nằm trong khoảng [fromEventId, toEventId]
      const selected = events.filter(
        (e) => e.id >= fromEventId && e.id <= toEventId
      );

      // hash từng event -> Merkle leaves
      const leaves = selected.map((e) =>
        keccak256(toUtf8Bytes(JSON.stringify(e)))
      );
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = tree.getHexRoot();

      console.log("🌿 Leaves:", leaves);
      console.log("🌳 Merkle root:", merkleRoot);

      // encode call đến hàm commitWithBatchCode
      const data = encodeFunctionData({
        abi: FOOD_TRACE_ABI,
        functionName: "commitWithBatchCode",
        args: [
          merkleRoot as Address,
          BigInt(fromEventId),
          BigInt(toEventId),
          batchCode,
        ],
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

  return { createBatch, loading };
};
