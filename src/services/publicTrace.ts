import { api } from "@/config/api";

export const getPublicTrace = async (batchCode: string) => {
  const res = await api().get(`/public-trace/${batchCode}`);
  return res.data;
};
