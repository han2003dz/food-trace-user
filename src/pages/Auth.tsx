import { useAuthModal, useSignerStatus } from "@account-kit/react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { cn } from "../utils/libs";
import { FullScreenLoader } from "../components/ui/FullscreenLoader";

export default function LoginPage() {
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (signerStatus.isConnected) {
      navigate("/", { replace: true });
    }
  }, [signerStatus.isConnected, navigate]);

  if (signerStatus.isAuthenticating || signerStatus.isInitializing) {
    return <FullScreenLoader />;
  }

  return (
    <Card
      className={cn(
        "relative w-full max-w-md shadow-xl border border-gray-200/50 mx-auto mt-[10%]",
        "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md",
        "hover:shadow-2xl transition-all duration-300"
      )}
    >
      <CardHeader className="text-center space-y-4 pb-8">
        <CardTitle className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Smart Wallets
        </CardTitle>
        <CardDescription className="text-base text-gray-600 dark:text-gray-400">
          Experience seamless onchain UX with smart wallets. Click log in to
          continue.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pb-8">
        <button
          onClick={openAuthModal}
          className="w-full h-12 text-base font-medium bg-linear-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white shadow-lg rounded-md transition-all duration-200"
        >
          {signerStatus.isAuthenticating ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 inline-block" />
              Logging in...
            </>
          ) : (
            <>Login</>
          )}
        </button>
      </CardContent>
    </Card>
  );
}
