import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TransferBatchHeader = ({ batchId }: { batchId: string }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-8">
      <Button
        variant="ghost"
        onClick={() => navigate(`/batches/${batchId}`)}
        className="mb-4 hover:bg-accent/10"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Batch Details
      </Button>
      <h1 className="text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
        Transfer Batch
      </h1>
      <p className="text-muted-foreground mt-2">
        Transfer batch ownership to the next actor in the supply chain
      </p>
    </div>
  );
};
