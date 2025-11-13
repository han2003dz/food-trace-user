import { CATEGORIES } from "@/mocks/categories";
import type { CreateProductFormData } from "@/types/form";
import { motion } from "framer-motion";
import { format } from "date-fns";
interface ReviewAndSubmitFormProps {
  formData: CreateProductFormData;
}
export const ReviewAndSubmitForm = ({ formData }: ReviewAndSubmitFormProps) => {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-card/30 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-primary">
          Review Your Product
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Product Name</p>
            <p className="font-medium">
              {formData.name ? formData.name : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Category</p>
            <p className="font-medium">
              {CATEGORIES.find((cat) => String(cat.id) === formData.category)
                ?.name
                ? CATEGORIES.find((cat) => String(cat.id) === formData.category)
                    ?.name
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Producer</p>
            <p className="font-medium">
              {formData.producer_name ? formData.producer_name : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Origin</p>
            <p className="font-medium">
              {formData.origin ? formData.origin : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Manufacture Date</p>
            <p className="font-medium">
              {formData.manufacture_date
                ? format(formData.manufacture_date, "PPP")
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Expiry Date</p>
            <p className="font-medium">
              {formData.expiry_date
                ? format(formData.expiry_date, "PPP")
                : "N/A"}
            </p>
          </div>
        </div>
        {formData.description && (
          <div>
            <p className="text-muted-foreground text-sm"> Description </p>
            <p className="text-sm">{formData.description}</p>
          </div>
        )}
        <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-sm"> Description </p>
            <p className="font-mono text-lg">
              {formData.description ? formData.description : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Image</p>
            <p className="font-mono text-lg">
              {formData.description ? formData.description : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
