/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { BackButton } from "@/components/common/BackButton";
import { ProgressBar } from "@/components/common/ProgressBar";

import { CreateBatchForm } from "@/components/pages/create-batch/CreateBatchForm";
import type { CreateBatchFormData, HandleChangeFormData } from "@/types/form";

import { useGetListProductsByOwner } from "@/hooks/useProducts";
import { createBatch } from "@/services/batches";
import { CreateBatchNoti } from "@/components/pages/create-batch/CreateBatchNoti";
import { useUserStore } from "@/stores/useUserStore";
import { useTransferBatch } from "@/hooks/contracts/useTransfer";
import { useGetBatch } from "@/hooks/contracts/useGetBatch";

const steps = ["Chọn sản phẩm", "Thông tin lô hàng", "Xem lại"];

const CreateBatch = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const { data: products } = useGetListProductsByOwner();
  const { transfer } = useTransferBatch();
  const { userDetail } = useUserStore();

  const [formData, setFormData] = useState<CreateBatchFormData>({
    product_id: "",
    creator_org_id: "",
    metadata_uri: "",
  });

  useEffect(() => {
    if (userDetail?.organization?.id) {
      setFormData((prev) => ({
        ...prev,
        creator_org_id: userDetail.organization.id,
      }));
    }
  }, [userDetail]);

  const { batch } = useGetBatch(27);
  console.log("batch", batch);

  useEffect(() => {
    if (batch) console.log("Batch info:", batch);
  }, [batch]);

  const handleChangeFormData: HandleChangeFormData = (eOrName, value) => {
    if (typeof eOrName === "string") {
      setFormData((prev) => ({ ...prev, [eOrName]: value }));
    } else {
      const { name, value } = eOrName.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep === 0 && !formData.product_id) {
      toast.error("Vui lòng chọn sản phẩm");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true); // ⏳ Bắt đầu loading
      await createBatch(formData);
      setIsSubmitted(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Không thể tạo lô hàng");
    } finally {
      setLoading(false); // ⏳ Tắt loading
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isSubmitted) return <CreateBatchNoti />;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <BackButton to={"/batches"} title={"Quay lại danh sách lô hàng"} />

      <div>
        <h1 className="text-3xl font-bold">Tạo Lô Hàng Mới</h1>
        <p className="text-muted-foreground mt-1">
          Thêm lô hàng mới cho sản phẩm của bạn
        </p>
      </div>

      <Button onClick={transfer}>Chuyển giao</Button>

      <ProgressBar
        steps={steps}
        progress={progress}
        currentStep={currentStep}
      />

      <motion.div
        className="relative group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

        <div className="relative bg-glass-gradient backdrop-blur-xl border border-border/50 rounded-2xl p-8">
          <CreateBatchForm
            currentStep={currentStep}
            formData={formData}
            products={products}
            handleChangeFormData={handleChangeFormData}
          />

          <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || loading}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} disabled={loading} className="gap-2">
                Tiếp tục <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="gap-2 bg-linear-to-r from-primary to-secondary"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Đang tạo...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Hoàn tất tạo lô hàng
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateBatch;
