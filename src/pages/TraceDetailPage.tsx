// src/pages/public/TraceDetail.tsx
import { useSearchParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useGetPublicTrace } from "@/hooks/usePublicTrace";

export const TraceDetail = () => {
  const [params] = useSearchParams();
  const batchCode = params.get("batch");
  const { data, isLoading, error } = useGetPublicTrace(batchCode || undefined);

  if (isLoading)
    return <p className="text-center mt-10">🔍 Đang truy xuất dữ liệu...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">
        ❌ Không tìm thấy batch hoặc lỗi kết nối
      </p>
    );
  if (!data)
    return (
      <p className="text-center mt-10">Vui lòng quét QR hoặc nhập mã batch</p>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-5 mt-10">
      <h1 className="text-2xl font-bold">{data.batch_code}</h1>

      {data.verified ? (
        <div className="bg-green-100 text-green-700 p-2 rounded-md text-center">
          ✅ ĐÃ CHỨNG THỰC TRÊN BLOCKCHAIN
        </div>
      ) : (
        <div className="bg-yellow-100 text-yellow-700 p-2 rounded-md text-center">
          ⚠️ DỮ LIỆU CHƯA XÁC NHẬN
        </div>
      )}

      <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
        <p>
          <strong>Sản phẩm:</strong> {data.product?.name}
        </p>
        <p>
          <strong>Nguồn gốc:</strong> {data.product?.origin}
        </p>
        <p>
          <strong>Chủ sở hữu:</strong> {data.created_by?.username}
        </p>
        <p>
          <strong>Ngày tạo:</strong>{" "}
          {new Date(data.created_at).toLocaleString()}
        </p>
      </div>

      <div className="border-t pt-4 text-xs text-gray-600">
        <p>
          <strong>Merkle Root:</strong> {data.merkle_root}
        </p>
        <p>
          <strong>Tx Hash:</strong>{" "}
          <a
            href={`https://sepolia.basescan.org/tx/${data.tx_hash}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            {data.tx_hash?.slice(0, 20)}...
          </a>
        </p>
      </div>

      <div className="flex justify-center pt-4">
        <QRCode
          value={`https://1dh4n9ds-5173.asse.devtunnels.ms/trace?batch=${data.batch_code}`}
          size={150}
        />
      </div>
    </div>
  );
};
