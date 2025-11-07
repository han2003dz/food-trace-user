/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { CreateBatchNoti } from "@/components/pages/create-batch/CreateBatchNoti";
import { BackButton } from "@/components/common/BackButton";
import { ProgressBar } from "@/components/common/ProgressBar";
import type { CreateBatchFormData, HandleChangeFormData } from "@/types/form";
import { CreateBatchForm } from "@/components/pages/create-batch/CreateBatchForm";

const steps = ["Basic Info", "Origin Details", "Review & Submit"];
const CreateBatch = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<CreateBatchFormData>({
    productName: "",
    description: "",
    categoryId: "",
    producerName: "",
    origin: "",
    batchCode: "",
    manufactureDate: undefined,
    expiryDate: undefined,
  });

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
        const code = `BTH-${new Date().getFullYear()}-${Math.floor(
          Math.random() * 1000
        )
          .toString()
          .padStart(3, "0")}`;
        setFormData({ ...formData, batchCode: code });
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFormData((prev) => ({ ...prev, image: base64 }));
      toast.success("Image uploaded successfully!");
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

  const handleSubmit = () => {
    setIsSubmitted(true);
    console.log("formData", formData);
    setTimeout(() => {
      navigate("/batches");
    }, 2000);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isSubmitted) {
    return <CreateBatchNoti />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <BackButton to={"/batches"} title={"Back to Batches"} />

      <div>
        <h1 className="text-3xl font-bold">Create New Batch</h1>
        <p className="text-muted-foreground mt-1">
          Add a new product to the supply chain
        </p>
      </div>

      {/* Progress Bar */}
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
          {/* Form Steps */}
          <CreateBatchForm
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
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} className="gap-2">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="gap-2 bg-linear-to-r from-primary to-secondary"
              >
                <CheckCircle2 className="w-4 h-4" /> Submit Batch
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateBatch;
