import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import type { CreateBatchFormData, HandleChangeFormData } from "@/types/form";
import { motion } from "framer-motion";
interface OriginDetailProps {
  formData: CreateBatchFormData;
  handleChangeFormData: HandleChangeFormData;
}
export const OriginDetails = ({
  formData,
  handleChangeFormData,
}: OriginDetailProps) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="producerName">Producer Name *</Label>
        <Input
          id="producerName"
          name="producerName"
          placeholder="e.g., Green Valley Farm"
          value={formData.producerName}
          onChange={handleChangeFormData}
          className="bg-card/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="origin">Origin *</Label>
        <Input
          id="origin"
          name="origin"
          placeholder="e.g., California, USA"
          value={formData.origin}
          onChange={handleChangeFormData}
          className="bg-card/50"
        />
      </div>
    </motion.div>
  );
};
