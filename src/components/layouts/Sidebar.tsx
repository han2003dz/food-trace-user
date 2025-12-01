import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  ShoppingBag,
  Atom,
} from "lucide-react";
import { cn } from "@/utils/libs";
import {
  Sidebar as SidebarPrimitive,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "../ui/Sidebar";
import { useEffect, useMemo } from "react";
import { selectWalletAddress, useAuthStore } from "@/stores/useAuthStore";

// 🔥 Dịch label sang tiếng Việt (trừ Dashboard)
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Tổ chức", path: "/organizations" },
  { icon: ShoppingBag, label: "Sản phẩm", path: "/products" },
  { icon: Package, label: "Lô hàng", path: "/batches" },
  { icon: Atom, label: "Chuyển giao", path: "/transfer" },
  { icon: Users, label: "Vai trò", path: "/roles" },
  { icon: Settings, label: "Cài đặt", path: "/settings" },
];

const minimalNav = [{ icon: LayoutDashboard, label: "Dashboard", path: "/" }];

interface SidebarProps {
  setSidebarClosed: (closed: boolean) => void;
}

export const Sidebar = ({ setSidebarClosed }: SidebarProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const location = useLocation();
  const walletAddress = useAuthStore(selectWalletAddress);

  const isConnected = Boolean(walletAddress);

  useEffect(() => {
    setSidebarClosed(isCollapsed);
  }, [isCollapsed, setSidebarClosed]);

  const displayedNav = useMemo(() => {
    return isConnected ? navItems : minimalNav;
  }, [isConnected]);

  return (
    <SidebarPrimitive
      className={cn(
        "border-r border-border/50 backdrop-blur-xl bg-sidebar/50 transition-all duration-300",
        isCollapsed ? "w-[72px]" : "w-[250px]"
      )}
    >
      {/* Header Sidebar */}
      <div className="p-6 flex items-center justify-between">
        <div>
          {!isCollapsed && (
            <>
              <h1
                className={cn(
                  "text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent transition-all"
                )}
              >
                FoodTrace
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                Blockchain traceability
              </p>
            </>
          )}
        </div>
        <SidebarTrigger className="ml-auto" />
      </div>

      {/* Menu Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {displayedNav.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  location.pathname.startsWith(item.path + "/");

                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer",
                          "hover:bg-accent/10 group relative overflow-hidden",
                          isActive &&
                            "bg-accent/20 shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                        )}
                      >
                        {isActive && (
                          <div
                            className="absolute inset-0 bg-linear-to-r from-primary/10 to-secondary/10 animate-shimmer"
                            style={{ backgroundSize: "200% 100%" }}
                          />
                        )}
                        <Icon
                          className={cn(
                            "w-5 h-5 transition-colors relative z-10",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        {!isCollapsed && (
                          <span
                            className={cn(
                              "text-sm font-medium transition-colors relative z-10",
                              isActive
                                ? "text-foreground"
                                : "text-muted-foreground group-hover:text-foreground"
                            )}
                          >
                            {item.label}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarPrimitive>
  );
};
