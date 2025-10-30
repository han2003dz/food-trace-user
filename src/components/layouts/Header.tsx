import { Wallet, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { cn, formatAddress } from "@/utils/libs";
import { Dropdown } from "../ui/Dropdown";
import {
  useAuthentication,
  useAuthStatus,
  useWalletConnect,
} from "@/hooks/useAuth";

interface HeaderProps {
  sidebarClosed: boolean;
}

export const Header = ({ sidebarClosed }: HeaderProps) => {
  const { handleLogout } = useAuthentication();
  const { connectWallet, isConnecting, logout, address } = useWalletConnect();
  const { isConnected, isAuthenticated } = useAuthStatus();
  return (
    <header
      className={cn(
        "h-16 border-b border-border/50 backdrop-blur-xl bg-card/30 flex items-center justify-between px-6 transition-all duration-300",
        sidebarClosed ? "ml-[72px]" : "ml-[250px]"
      )}
    >
      {/* Left side: Network indicator */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-muted-foreground">Base Sepolia</span>
          <CheckCircle2 className="w-4 h-4 text-secondary" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!isConnected && !isAuthenticated ? (
          <Button
            onClick={connectWallet}
            className="relative overflow-hidden group cursor-pointer"
            variant="outline"
            disabled={isConnecting}
          >
            <Wallet className="w-4 h-4 mr-2" />
            <span className="font-semibold">
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </span>
          </Button>
        ) : (
          <Dropdown
            label={formatAddress(address || "0x")}
            items={
              isAuthenticated
                ? [
                    {
                      label: "View Profile",
                      onClick: () => alert("View Profile"),
                    },
                    {
                      label: "Settings",
                      onClick: () => alert("Settings clicked"),
                    },
                    { label: "Logout", onClick: () => handleLogout() },
                  ]
                : [{ label: "Disconnect", onClick: () => logout() }]
            }
          />
        )}
      </div>
    </header>
  );
};
