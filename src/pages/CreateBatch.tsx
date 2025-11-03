import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

const steps = ["Basic Info", "Origin Details", "Review & Submit"];

const CreateBatch = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    producerName: "",
    farmLocation: "",
    batchCode: "",
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 1) {
        // Generate batch code when moving to review step
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

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/batches");
    }, 2000);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center h-[80vh]"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle2 className="w-24 h-24 text-secondary mx-auto" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Batch Created Successfully!
            </h2>
            <p className="text-muted-foreground mt-2">
              Redirecting to batch management...
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/batches")}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Batches
      </Button>

      <div>
        <h1 className="text-3xl font-bold">Create New Batch</h1>
        <p className="text-muted-foreground mt-1">
          Add a new product to the supply chain
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          {steps.map((step, index) => (
            <span
              key={step}
              className={
                index <= currentStep
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }
            >
              {step}
            </span>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Form Steps */}
      <motion.div
        className="relative group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
        <div className="relative bg-glass-gradient backdrop-blur-xl border border-border/50 rounded-2xl p-8">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input
                    id="productName"
                    placeholder="e.g., Organic Tomatoes"
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                    className="bg-card/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the product..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="bg-card/50 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Vegetables, Dairy, Meat"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="bg-card/50"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
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
                    placeholder="e.g., Green Valley Farm"
                    value={formData.producerName}
                    onChange={(e) =>
                      setFormData({ ...formData, producerName: e.target.value })
                    }
                    className="bg-card/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmLocation">Farm Location *</Label>
                  <Input
                    id="farmLocation"
                    placeholder="e.g., California, USA"
                    value={formData.farmLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, farmLocation: e.target.value })
                    }
                    className="bg-card/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Product Image (Optional)</Label>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-card/30 rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-primary">
                    Review Your Batch
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Product Name</p>
                      <p className="font-medium">{formData.productName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium">{formData.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Producer</p>
                      <p className="font-medium">{formData.producerName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium">{formData.farmLocation}</p>
                    </div>
                  </div>

                  {formData.description && (
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Description
                      </p>
                      <p className="text-sm">{formData.description}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border/50">
                    <p className="text-muted-foreground text-sm">
                      Auto-generated Batch Code
                    </p>
                    <p className="font-mono text-lg text-primary">
                      {formData.batchCode}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} className="gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="gap-2 bg-linear-to-r from-primary to-secondary"
              >
                <CheckCircle2 className="w-4 h-4" />
                Submit Batch
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateBatch;
