/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useCreateBatch } from "@/hooks/useCreateBatch";
import { api } from "@/config/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

export const BatchCreate = () => {
  const { mutateAsync, isPending } = useCreateBatch();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [events, setEvents] = useState<any[]>([]);
  const [fromId, setFromId] = useState<number>(1);
  const [toId, setToId] = useState<number>(3);

  useEffect(() => {
    api()
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch(console.error);

    setEvents([
      { id: 1, name: "Harvested", data: { weight: 25, unit: "kg" } },
      { id: 2, name: "Packaged", data: { location: "Đà Lạt" } },
      { id: 3, name: "Shipped", data: { from: "Đà Lạt", to: "HCM" } },
    ]);
  }, []);

  const handleSubmit = async () => {
    if (!selectedProduct) {
      toast.error("Chọn sản phẩm trước");
      return;
    }
    try {
      const payload = {
        productId: selectedProduct,
        fromEventId: fromId,
        toEventId: toId,
        events,
      };
      const res = await mutateAsync(payload);
      console.log("res", res);
      toast.success("Batch created");
    } catch (err: any) {
      toast.error(`err: ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 bg-white rounded-xl shadow-md text-black">
      <h2 className="text-xl font-bold">Tạo Batch</h2>

      <div>
        <label className="font-medium">Chọn sản phẩm</label>
        <select
          className="border p-2 rounded-md w-full"
          onChange={(e) => setSelectedProduct(e.target.value)}
          value={selectedProduct}
        >
          <option value="">-- Chọn sản phẩm --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.origin})
            </option>
          ))}
        </select>
      </div>

      <Input
        type="number"
        value={fromId}
        onChange={(e) => setFromId(Number(e.target.value))}
        placeholder="From Event ID"
        className="text-white"
      />
      <Input
        type="number"
        value={toId}
        onChange={(e) => setToId(Number(e.target.value))}
        placeholder="To Event ID"
        className="text-white"
      />

      <Button className="w-full" onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Đang gửi lên chuỗi..." : "Tạo Batch"}
      </Button>

      <div className="bg-gray-50 p-3 rounded-md">
        <h4 className="font-medium mb-2">Các event mẫu:</h4>
        <pre className="text-sm text-gray-700">
          {JSON.stringify(events, null, 2)}
        </pre>
      </div>
    </div>
  );
};
