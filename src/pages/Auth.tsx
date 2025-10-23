import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardDescription, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { FullScreenLoader } from "../components/ui/FullscreenLoader";
import useUserStore from "@/stores/useUserStore";
import { cn } from "../utils/libs";

import { useWalletConnect } from "@/hooks/useWalletConnect";
import { RoleSelectModal } from "@/components/common/RoleSelectModal";
import { useRoleSignAndLogin } from "@/hooks/useRoleSignAndLogin";

export default function LoginPage() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.userDetail);
  console.log("OK");
  const { connectWallet, isConnecting, isConnected, isAuthenticating } =
    useWalletConnect();

  const { selectRoleAndLogin } = useRoleSignAndLogin();

  const [showRoleModal, setShowRoleModal] = useState(false);

  useEffect(() => {
    if (isConnected && !user) {
      setShowRoleModal(true);
    }
  }, [isConnected, user]);

  useEffect(() => {
    if (isConnected && user) {
      navigate("/", { replace: true });
    }
  }, [isConnected, user, navigate]);

  if (isAuthenticating) return <FullScreenLoader />;
  return (
    <>
      {showRoleModal && (
        <RoleSelectModal
          open={showRoleModal}
          onClose={() => setShowRoleModal(false)}
          onSelect={async (role) => {
            await selectRoleAndLogin(role);
            // setShowRoleModal(false);
            // navigate("/", { replace: true });
          }}
        />
      )}

      {!isConnected && (
        <Card
          className={cn(
            "relative w-full max-w-md shadow-xl border border-gray-200/50 mx-auto mt-[10%] px-6",
            "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md",
            "hover:shadow-2xl transition-all duration-300"
          )}
        >
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="flex items-center justify-center gap-2">
              <img src="/logo.svg" alt="food trace logo" className="w-8 h-8" />
              <p className="text-2xl font-bold text-[#16B364]">Food Trace</p>
            </div>
            <p className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-0 mt-4">
              Hi, Welcome Back
            </p>
            <CardDescription className="text-base text-[#667085] dark:text-gray-400">
              Connect your wallet to continue 🌿
            </CardDescription>
          </CardHeader>

          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full h-12 text-base font-medium bg-linear-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white shadow-lg transition-all duration-200 rounded-xl cursor-pointer"
          >
            {isConnecting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block" />
                Connecting...
              </>
            ) : (
              <>Connect Wallet</>
            )}
          </Button>
        </Card>
      )}
    </>
  );
}
