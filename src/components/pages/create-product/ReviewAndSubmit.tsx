import type { CreateProductFormData } from "@/types/form";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { getCategoryName } from "@/utils/categories";

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
          Xem lại thông tin sản phẩm
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Tên sản phẩm</p>
            <p className="font-medium">
              {formData.name ? formData.name : "Không có"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Loại sản phẩm</p>
            <p className="font-medium">{getCategoryName(formData.category)}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Nhà sản xuất</p>
            <p className="font-medium">
              {formData.producer_name ? formData.producer_name : "Không có"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Xuất xứ</p>
            <p className="font-medium">
              {formData.origin ? formData.origin : "Không có"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Ngày sản xuất</p>
            <p className="font-medium">
              {formData.manufacture_date
                ? format(formData.manufacture_date, "PPP")
                : "Không có"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Hạn sử dụng</p>
            <p className="font-medium">
              {formData.expiry_date
                ? format(formData.expiry_date, "PPP")
                : "Không có"}
            </p>
          </div>
        </div>

        {formData.description && (
          <div>
            <p className="text-muted-foreground text-sm">Mô tả</p>
            <p className="text-sm">{formData.description}</p>
          </div>
        )}

        <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-sm">Mô tả</p>
            <p className="font-mono text-lg">
              {formData.description ? formData.description : "Không có"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Hình ảnh</p>
            <p className="font-mono text-lg">
              {formData.image_url ? "Đã tải lên" : "Không có"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
