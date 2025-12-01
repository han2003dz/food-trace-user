/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { CreateBatchNoti } from "@/components/pages/create-batch/CreateBatchNoti";
import { BackButton } from "@/components/common/BackButton";
import { ProgressBar } from "@/components/common/ProgressBar";
import type { CreateProductFormData, HandleChangeFormData } from "@/types/form";
import { CreateProductForm } from "@/components/pages/create-product/CreateProduct";
import { useUserStore } from "@/stores/useUserStore";
import { useCreateProduct } from "@/hooks/useProducts";

const steps = ["Thông tin cơ bản", "Nguồn gốc sản phẩm", "Xem lại & Gửi"];

const CreateProduct = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userDetail } = useUserStore();
  const { mutateAsync } = useCreateProduct();
  const [formData, setFormData] = useState<CreateProductFormData>({
    name: "",
    description: "",
    category: "",
    producer_name: userDetail?.organization.name || "",
    origin: "",
    image_url: null,
    manufacture_date: undefined,
    expiry_date: undefined,
    storage_conditions: "",
    nutritional_info: {},
  });

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        if (!formData.name.trim()) {
          toast.error("Tên sản phẩm là bắt buộc");
          return false;
        }
        if (!formData.category) {
          toast.error("Danh mục là bắt buộc");
          return false;
        }
        if (!formData.manufacture_date) {
          toast.error("Ngày sản xuất là bắt buộc");
          return false;
        }
        if (!formData.expiry_date) {
          toast.error("Ngày hết hạn là bắt buộc");
          return false;
        }
        if (formData.expiry_date <= formData.manufacture_date) {
          toast.error("Ngày hết hạn phải sau ngày sản xuất");
          return false;
        }
        return true;

      case 1:
        if (!formData?.origin?.trim()) {
          toast.error("Nguồn gốc là bắt buộc");
          return false;
        }
        if (!formData?.producer_name?.trim()) {
          toast.error("Tên nhà sản xuất là bắt buộc");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const transformFormData = (): CreateProductFormData => {
    return {
      name: formData.name.trim(),
      origin: formData?.origin?.trim() || "",
      category: formData.category,
      producer_name: formData?.producer_name?.trim(),
      manufacture_date: formData.manufacture_date,
      expiry_date: formData.expiry_date,
      description: formData.description
        ? formData.description.trim()
        : undefined,
      image_url: formData.image_url || undefined,
      storage_conditions: formData.storage_conditions?.trim() || undefined,
      nutritional_info:
        formData.nutritional_info &&
        Object.keys(formData.nutritional_info).length > 0
          ? formData.nutritional_info
          : undefined,
    };
  };

  const handleChangeFormData: HandleChangeFormData = (
    eOrName: any,
    value?: any
  ) => {
    if (typeof eOrName === "string") {
      setFormData((prev) => ({ ...prev, [eOrName]: value }));
    } else {
      const { name, value } = eOrName.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 1) {
        setFormData({ ...formData });
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước ảnh phải nhỏ hơn 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFormData((prev) => ({ ...prev, image: base64 }));
      toast.success("Tải ảnh thành công!");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(0) || !validateStep(1)) {
      toast.error("Vui lòng hoàn thành tất cả các trường bắt buộc");
      return;
    }
    setIsSubmitting(true);
    console.log("Submitting product data:", formData);

    try {
      const productData = transformFormData();

      await mutateAsync(productData);

      setIsSubmitted(true);
      toast.success("Tạo sản phẩm thành công!");

      setTimeout(() => {
        navigate("/products ");
      }, 2000);
    } catch (error: any) {
      console.error("Error creating product:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Tạo sản phẩm thất bại, vui lòng thử lại.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isSubmitted) {
    return <CreateBatchNoti />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <BackButton to={"/products"} title={"Quay lại danh sách sản phẩm"} />

      <div>
        <h1 className="text-3xl font-bold">Tạo sản phẩm mới</h1>
        <p className="text-muted-foreground mt-1">
          Thêm sản phẩm mới vào hệ thống
        </p>
      </div>

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
          <CreateProductForm
            currentStep={currentStep}
            formData={formData}
            handleChangeFormData={handleChangeFormData}
            handleImageChange={handleImageChange}
            handleImageClick={handleImageClick}
            handleRemoveImage={handleRemoveImage}
            fileInputRef={fileInputRef}
          />

          <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} className="gap-2">
                Tiếp tục <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2 bg-linear-to-r from-primary to-secondary cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Đang tạo...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Tạo sản phẩm
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

export default CreateProduct;
