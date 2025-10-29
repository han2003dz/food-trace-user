import { Wallet, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";
import { cn, formatAddress } from "@/utils/libs";
import { Dropdown } from "../ui/Dropdown";
import { useRoleSignAndLogin } from "@/hooks/useRoleSignAndLogin";

interface HeaderProps {
  sidebarClosed: boolean;
}

export const Header = ({ sidebarClosed }: HeaderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const { handleLogout } = useRoleSignAndLogin();
  const handleConnect = () => {
    setIsConnected(true);
    setAddress("0x9324...761e");
  };

  return (
    <header
      className={cn(
        "h-16 border-b border-border/50 backdrop-blur-xl bg-card/30 flex items-center justify-between px-6 ml-[250px]",
        sidebarClosed ? "ml-[72px]" : "ml-[250px]"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-muted-foreground">Base Sepolia</span>
          <CheckCircle2 className="w-4 h-4 text-secondary" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isConnected ? (
          <div>
            <Dropdown
              label={formatAddress(address ?? "")}
              items={[
                { label: "View profile", onClick: () => alert("View Profile") },
                { label: "Settings", onClick: () => alert("Settings clicked") },
                { label: "Logout", onClick: () => handleLogout() },
              ]}
            />
          </div>
        ) : (
          <Button
            onClick={handleConnect}
            className="relative overflow-hidden group"
            variant="outline"
          >
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Wallet className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10">Connect Wallet</span>
          </Button>
        )}
      </div>
    </header>
  );
};
