/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { useCreateBatchAPI } from "@/hooks/useCreateBatch";

export const CreateBatchForm = () => {
  const { handleCreateBatch, loading } = useCreateBatchAPI();

  const [batchCode, setBatchCode] = useState("");
  const [fromEventId, setFromEventId] = useState(1);
  const [toEventId, setToEventId] = useState(3);
  const [events] = useState([
    { id: 1, name: "Harvested", location: "Da Lat" },
    { id: 2, name: "Packed", location: "HCMC" },
    { id: 3, name: "Transported", location: "Ha Noi" },
    { id: 4, name: "Delivered", location: "Customer" },
  ]);
  console.log("OKKKKKKk");
  const handleSubmit = async () => {
    if (!batchCode) return toast.error("Please enter batch code");
    console.log("OKKK");
    try {
      const res = await handleCreateBatch({
        batchCode,
        fromEventId,
        toEventId,
        events,
      });
      toast.success(`✅ Batch submitted! TX: ${res.result.metadata.tx_hash}`);
    } catch (err: any) {
      toast.error(`❌ ${err.message}`);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Create New Batch...
      </h2>
      <Input
        placeholder="Batch Code"
        value={batchCode}
        onChange={(e) => setBatchCode(e.target.value)}
        className="mb-3 bg-gray-800 border-gray-700"
      />
      <div className="flex gap-3 mb-4">
        <Input
          type="number"
          value={fromEventId}
          onChange={(e) => setFromEventId(Number(e.target.value))}
          className="bg-gray-800 border-gray-700"
        />
        <Input
          type="number"
          value={toEventId}
          onChange={(e) => setToEventId(Number(e.target.value))}
          className="bg-gray-800 border-gray-700"
        />
      </div>
      <Button
        onClick={() => handleSubmit()}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-600 text-black font-bold"
      >
        {loading ? "Submitting..." : "Create Batch"}
      </Button>
    </div>
  );
};
