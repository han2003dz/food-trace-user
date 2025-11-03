/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createBatch, type CreateBatchPayload } from "@/services/batches";

export const useCreateBatchAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateBatch = async (payload: CreateBatchPayload) => {
    setLoading(true);
    setError(null);
    try {
      console.log("okk");
      const result = await createBatch(payload);
      return result;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateBatch, loading, error };
};
