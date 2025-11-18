/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Loader2,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  useCreateOrganization,
  useGetOrganizationByUser,
} from "@/hooks/useOrganizations";
import useUserStore from "@/stores/useUserStore";
import { ORG_TYPE_ROLES, type OrgType } from "@/types/org";

export default function CreateOrganization() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { mutate: createOrg, isPending: isSubmitting } =
    useCreateOrganization();

  const { data: organization } = useGetOrganizationByUser();
  const { userDetail } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    org_type: "" as OrgType | "",
    metadata_uri: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    org_type: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      org_type: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Organization name is required";
    }

    if (!formData.org_type) {
      newErrors.org_type = "Please select an organization type";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.org_type;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    createOrg(
      {
        name: formData.name,
        org_type: formData.org_type,
        metadata_uri: formData.metadata_uri || undefined,
      },
      {
        onSuccess: () => {
          setShowSuccessModal(true);
        },
        onError: (error: any) => {
          console.error("error", error);
          toast.error(
            error?.response?.data?.message || "Failed to create organization."
          );
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-accent/50"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="w-8 h-8 text-primary" />
            {userDetail?.role === "CUSTOMER"
              ? "Create Organization"
              : "Organization"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {userDetail?.role === "CUSTOMER"
              ? "Register your organization on FoodTrace system"
              : "Your organization on FoodTrace system"}
          </p>
        </div>
      </div>
      {userDetail?.role === "CONSUMER" ? (
        <>
          <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-xl p-8 space-y-6">
            {/* Organization Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Organization Name *
              </Label>
              <Input
                id="name"
                placeholder="GreenFarm Cooperative"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors({ ...errors, name: "" });
                }}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name}</p>
              )}
            </div>

            {/* Organization Type */}
            <div className="space-y-2">
              <Label htmlFor="org_type" className="text-sm font-medium">
                Organization Type *
              </Label>
              <Select
                value={formData.org_type}
                onValueChange={(value) => {
                  setFormData({ ...formData, org_type: value as OrgType });
                  setErrors({ ...errors, org_type: "" });
                }}
              >
                <SelectTrigger
                  className={errors.org_type ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRODUCER">🏭 PRODUCER</SelectItem>
                  <SelectItem value="LOGISTICS">🚚 LOGISTICS</SelectItem>
                  <SelectItem value="RETAILER">🏪 RETAILER</SelectItem>
                  <SelectItem value="AUDITOR">🔍 AUDITOR</SelectItem>
                </SelectContent>
              </Select>
              {errors.org_type && (
                <p className="text-destructive text-sm">{errors.org_type}</p>
              )}
            </div>

            {/* Role Preview */}
            {formData.org_type && (
              <div className="p-4 rounded-lg bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">
                      Role Preview: {ORG_TYPE_ROLES[formData.org_type].label}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {ORG_TYPE_ROLES[formData.org_type].description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata URI (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="metadata_uri" className="text-sm font-medium">
                Metadata URI{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="metadata_uri"
                placeholder="ipfs://Qm..."
                value={formData.metadata_uri}
                onChange={(e) =>
                  setFormData({ ...formData, metadata_uri: e.target.value })
                }
              />
              <p className="text-muted-foreground text-xs">
                Store additional organization metadata on IPFS
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-border/50">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2 bg-linear-to-r from-primary to-secondary min-w-[200px]"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Building2 className="w-5 h-5" />
                    Create Organization
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Success Modal */}
          <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-background" />
                  </div>
                </div>
                <DialogTitle className="text-center text-2xl">
                  Organization Registered Successfully!
                </DialogTitle>
                <DialogDescription className="text-center">
                  Your organization has been added to FoodTrace and registered
                  on-chain.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  onClick={() => navigate("/")}
                  className="w-full bg-linear-to-r from-primary to-secondary"
                >
                  Continue to Dashboard
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-xl p-8 space-y-6">
            {/* Organization Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Organization Name *
              </Label>
              <Input
                id="name"
                placeholder="GreenFarm Cooperative"
                value={organization?.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors({ ...errors, name: "" });
                }}
                className={errors.name ? "border-destructive" : ""}
                readOnly
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name}</p>
              )}
            </div>

            {/* Organization Type */}
            <div className="space-y-2">
              <Label htmlFor="org_type" className="text-sm font-medium">
                Organization Type *
              </Label>
              <Select value={organization?.org_type}>
                <SelectTrigger
                  className={errors.org_type ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRODUCER">🏭 PRODUCER</SelectItem>
                  <SelectItem value="LOGISTICS">🚚 LOGISTICS</SelectItem>
                  <SelectItem value="RETAILER">🏪 RETAILER</SelectItem>
                  <SelectItem value="AUDITOR">🔍 AUDITOR</SelectItem>
                </SelectContent>
              </Select>
              {errors.org_type && (
                <p className="text-destructive text-sm">{errors.org_type}</p>
              )}
            </div>

            {/* Role Preview */}
            {formData.org_type && (
              <div className="p-4 rounded-lg bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">
                      Role Preview: {ORG_TYPE_ROLES[formData.org_type].label}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {ORG_TYPE_ROLES[formData.org_type].description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata URI (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="metadata_uri" className="text-sm font-medium">
                Metadata URI{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="metadata_uri"
                placeholder="ipfs://Qm..."
                value={formData.metadata_uri}
                onChange={(e) =>
                  setFormData({ ...formData, metadata_uri: e.target.value })
                }
              />
              <p className="text-muted-foreground text-xs">
                Store additional organization metadata on IPFS
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-border/50">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2 bg-linear-to-r from-primary to-secondary min-w-[200px]"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Building2 className="w-5 h-5" />
                    Update Organization
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Success Modal */}
          <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-background" />
                  </div>
                </div>
                <DialogTitle className="text-center text-2xl">
                  Organization Registered Successfully!
                </DialogTitle>
                <DialogDescription className="text-center">
                  Your organization has been added to FoodTrace and registered
                  on-chain.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  onClick={() => navigate("/")}
                  className="w-full bg-linear-to-r from-primary to-secondary"
                >
                  Continue to Dashboard
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
      {/* Main Form Card */}
    </div>
  );
}
