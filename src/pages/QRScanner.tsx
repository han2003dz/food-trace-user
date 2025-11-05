// src/pages/public/QRScanner.tsx
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";

export const QRScanner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
      <h2 className="text-xl font-semibold">📷 Quét mã QR truy xuất</h2>
      <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(res) => {
            const text = res?.getText();
            if (text && text.includes("trace?batch=")) {
              const url = new URL(text);
              const batch = url.searchParams.get("batch");
              if (batch) navigate(`/trace?batch=${batch}`);
            }
          }}
        />
      </div>
      <p className="text-sm text-gray-500">
        Hướng camera vào mã QR trên bao bì sản phẩm.
      </p>
    </div>
  );
};
