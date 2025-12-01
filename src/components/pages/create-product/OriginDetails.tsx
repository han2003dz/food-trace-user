import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import type { CreateProductFormData, HandleChangeFormData } from "@/types/form";
import { motion } from "framer-motion";
interface OriginDetailProps {
  formData: CreateProductFormData;
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
        <Label htmlFor="producer_name">Nhà sản xuất *</Label>
        <Input
          id="producer_name"
          name="producer_name"
          placeholder="e.g., Green Valley Farm"
          value={formData.producer_name}
          onChange={handleChangeFormData}
          className="bg-card/50"
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="origin">Nơi sản xuất *</Label>
        <Input
          id="origin"
          name="origin"
          placeholder="e.g., Hà Nội-Việt Nam"
          value={formData.origin}
          onChange={handleChangeFormData}
          className="bg-card/50"
        />
      </div>
    </motion.div>
  );
};
