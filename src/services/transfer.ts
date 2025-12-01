import { api } from "@/config/api";

// Gửi batch từ tổ chức A → B
export const transferBatch = async (
  batchId: string,
  data: { to_org_id: string; note?: string }
) => {
  const res = await api().post(`/transfer/${batchId}/transfer`, data);
  return res.data;
};

// Lấy danh sách batch đang được gửi tới mình
export const getIncomingTransfers = async () => {
  const res = await api().get(`/transfer/incoming`);
  return res.data;
};

// Người nhận chấp nhận lô hàng
export const acceptTransfer = async (transferId: string) => {
  const res = await api().post(`/transfer/${transferId}/accept`);
  return res.data;
};

// Người nhận từ chối lô hàng
export const rejectTransfer = async (transferId: string) => {
  const res = await api().post(`/transfer/${transferId}/reject`);
  return res.data;
};
