import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../ui/Dialog";
import { Button } from "../ui/Button";
import { useState } from "react";
import { useAuthentication } from "@/hooks/useAuth";

export const VerifyOwnershipModal = () => {
  const [open, setOpen] = useState(true);
  const { handleSignMessage } = useAuthentication();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-xl border-gray-600">
        <DialogHeader>
          <DialogTitle>Verify It's you</DialogTitle>
          <DialogDescription>
            Please click “continue” and sign the message in your wallet to
            verify your account ownership.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-col gap-2">
          <Button
            className="rounded-xl w-full cursor-pointer text-black font-bold"
            onClick={async () => {
              await handleSignMessage();
              setOpen(false);
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
