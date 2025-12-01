import { Wallet, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { cn, formatAddress } from "@/utils/libs";
import { Dropdown } from "../ui/Dropdown";
import { useLoginToSystem, useWalletConnect } from "@/hooks/useAuth";
import { selectWalletAddress, useAuthStore } from "@/stores/useAuthStore";

interface HeaderProps {
  sidebarClosed: boolean;
  isMobile: boolean;
}

export const Header = ({ sidebarClosed, isMobile }: HeaderProps) => {
  const { connectWallet, disconnectWallet, isConnecting } = useWalletConnect();
  const { isLoggingIn } = useLoginToSystem();

  const walletAddress = useAuthStore(selectWalletAddress);

  const isConnected = Boolean(walletAddress);
  const isLoading = isConnecting || isLoggingIn;

  const connectedLabel = walletAddress
    ? formatAddress(walletAddress)
    : "Unknown";

  const buttonText = isConnected
    ? connectedLabel
    : isLoading
    ? "Connecting..."
    : "Connect Wallet";

  return (
    <header
      className={cn(
        "h-16 border-b border-border/50 backdrop-blur-xl bg-card/30 flex items-center justify-between px-6 transition-all duration-300 z-20",
        !isMobile && (sidebarClosed ? "ml-[72px]" : "ml-[250px]")
      )}
    >
      {/* Network indicator */}
      <div className="flex items-center gap-2 text-sm">
        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span className="text-muted-foreground">Base Sepolia</span>
        <CheckCircle2 className="w-4 h-4 text-secondary" />
      </div>

      {/* Wallet area */}
      <div className="flex items-center">
        {!isConnected ? (
          <Button
            disabled={isLoading}
            onClick={() => !isLoading && connectWallet()}
            className={cn(
              "rounded-xl flex items-center gap-2",
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            <Wallet className="w-4 h-4" />
            {buttonText}
          </Button>
        ) : (
          <Dropdown
            label={connectedLabel}
            items={[
              { label: "View Profile", onClick: () => alert("View Profile") },
              { label: "Settings", onClick: () => alert("Settings clicked") },
              { label: "Logout", onClick: disconnectWallet },
            ]}
          />
        )}
      </div>
    </header>
  );
};
