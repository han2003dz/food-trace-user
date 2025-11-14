import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import type { CreateBatchFormData, HandleChangeFormData } from "@/types/form";
import { motion } from "framer-motion";

interface BatchInitialDataProps {
  formData: CreateBatchFormData;
  handleChangeFormData: HandleChangeFormData;
}

export const BatchInitialData = ({
  formData,
  handleChangeFormData,
}: BatchInitialDataProps) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label>Metadata URI (Optional)</Label>
        <Input
          value={formData.metadata_uri}
          onChange={(e) => handleChangeFormData("metadata_uri", e.target.value)}
          placeholder="ipfs://xxxx"
        />
      </div>
    </motion.div>
  );
};
