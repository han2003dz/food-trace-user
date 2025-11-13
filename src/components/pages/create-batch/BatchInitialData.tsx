/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import type { CreateBatchFormData, HandleChangeFormData } from "@/types/form";
import { sha256 } from "@/utils/hash";
import { motion } from "framer-motion";

interface BatchInitialDataProps {
  formData: CreateBatchFormData;
  handleChangeFormData: HandleChangeFormData;
}

export const BatchInitialData = ({
  formData,
  handleChangeFormData,
}: BatchInitialDataProps) => {
  const handleRawChange = (e: any) => {
    const raw = e.target.value;
    handleChangeFormData("initial_data_raw", raw);

    const hash = sha256(raw || "");
    handleChangeFormData("initial_data_hash", hash);
  };

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label>Initial Batch Data *</Label>
        <Textarea
          value={formData.initial_data_raw}
          placeholder="Describe this batch..."
          onChange={handleRawChange}
        />

        <p className="text-xs text-muted-foreground">
          This will be hashed and stored on-chain.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Metadata URI (Optional)</Label>
        <Input
          value={formData.metadata_uri}
          onChange={(e) => handleChangeFormData("metadata_uri", e.target.value)}
          placeholder="ipfs://xxxx"
        />
      </div>

      {formData.initial_data_hash && (
        <div className="space-y-2">
          <Label>Generated Hash</Label>
          <Input
            disabled
            value={formData.initial_data_hash}
            className="font-mono text-xs"
          />
        </div>
      )}
    </motion.div>
  );
};
