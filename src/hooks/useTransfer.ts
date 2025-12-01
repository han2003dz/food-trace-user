import {
  acceptTransfer,
  getIncomingTransfers,
  rejectTransfer,
  transferBatch,
} from "@/services/transfer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Hook gửi batch
export const useTransferBatch = () => {
  return useMutation({
    mutationFn: ({
      batchId,
      data,
    }: {
      batchId: string;
      data: { to_org_id: string; note?: string };
    }) => transferBatch(batchId, data),
  });
};

// Hook lấy danh sách incoming
export const useIncomingTransfers = () => {
  return useQuery({
    queryKey: ["incoming_transfers"],
    queryFn: () => getIncomingTransfers(),
  });
};

// Hook accept
export const useAcceptTransfer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (transferId: string) => acceptTransfer(transferId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incoming_transfers"] });
    },
  });
};

// Hook reject
export const useRejectTransfer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (transferId: string) => rejectTransfer(transferId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incoming_transfers"] });
    },
  });
};
