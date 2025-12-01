// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
// } from "../ui/Dialog";
// import { Button } from "../ui/Button";
// import { useState } from "react";
// import { useAuthentication } from "@/hooks/useAuth";
// import { toast } from "sonner";

// export const VerifyOwnershipModal = () => {
//   const [open, setOpen] = useState(true);
//   const [isLogin, setIsLogin] = useState(false);
//   const { handleSignMessage } = useAuthentication();

//   const handleLogin = async () => {
//     setIsLogin(true);
//     try {
//       await handleSignMessage();
//       setOpen(false);
//       toast.success("Login successful! Welcome back");
//     } catch (error) {
//       toast.error("Login Failed! Please try again");
//       console.log("error", error);
//     } finally {
//       setIsLogin(false);
//     }
//   };
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-md rounded-xl border-gray-600">
//         <DialogHeader>
//           <DialogTitle>Verify It's you</DialogTitle>
//           <DialogDescription>
//             Please click “continue” and sign the message in your wallet to
//             verify your account ownership.
//           </DialogDescription>
//         </DialogHeader>

//         <DialogFooter className="mt-6 flex flex-col gap-2">
//           <Button
//             className="rounded-xl w-full cursor-pointer text-black font-bold"
//             onClick={handleLogin}
//             disabled={isLogin}
//           >
//             {isLogin ? "Signing..." : "Continue"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };
