import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../ui/Dialog";
import { Button } from "../ui/Button";

interface RoleSelectModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (role: string) => void;
}

export const RoleSelectModal = ({
  open,
  onClose,
  onSelect,
}: RoleSelectModalProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const roles = [
    { label: "Consumer", value: "CONSUMER" },
    { label: "Producer", value: "PRODUCER" },
    { label: "Distributor", value: "DISTRIBUTOR" },
    { label: "Transporter", value: "TRANSPORTER" },
  ];

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-md bg-white rounded-xl border-[#E5E7EB]">
        <DialogHeader>
          <DialogTitle>Choose your role</DialogTitle>
          <DialogDescription>
            Select the role you want to log in with in the FoodTrace system 🌿
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => setSelected(role.value)}
              className={`w-full text-left px-4 py-3 border rounded-xl transition-all ${
                selected === role.value
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="ghost" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!selected}
            onClick={() => onSelect(selected!)}
            className="rounded-xl"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
