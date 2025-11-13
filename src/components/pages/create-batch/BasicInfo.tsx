/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { motion } from "framer-motion";
import type { CreateBatchFormData, HandleChangeFormData } from "@/types/form";

interface BasicBatchInfoProps {
  formData: CreateBatchFormData;
  handleChangeFormData: HandleChangeFormData;
  products: any;
}

export const BasicBatchInfo = ({
  formData,
  handleChangeFormData,
  products,
}: BasicBatchInfoProps) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label>Select Product *</Label>
        <Select
          value={formData.product_id}
          onValueChange={(v) => handleChangeFormData("product_id", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose product" />
          </SelectTrigger>
          <SelectContent>
            {products?.map((p: any) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};
