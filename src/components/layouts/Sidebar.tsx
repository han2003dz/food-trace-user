/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Users, Settings } from "lucide-react";
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
import { useEffect } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Package, label: "Batches", path: "/batches" },
  { icon: Users, label: "Roles", path: "/roles" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface SidebarProps {
  setSidebarClosed: any;
}

export const Sidebar = ({ setSidebarClosed }: SidebarProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  useEffect(() => {
    setSidebarClosed(isCollapsed);
  }, [setSidebarClosed, isCollapsed]);

  const location = useLocation();

  return (
    <SidebarPrimitive
      className={cn(
        "border-r border-border/50 backdrop-blur-xl bg-sidebar/50",
        isCollapsed ? "w-[72px]" : "w-[250px]"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        <div>
          {!isCollapsed && (
            <h1
              className={cn(
                "text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent transition-all",
                isCollapsed && "text-lg"
              )}
            >
              FoodTrace
            </h1>
          )}

          {!isCollapsed && (
            <p className="text-xs text-muted-foreground mt-1">
              Blockchain Traceability
            </p>
          )}
        </div>
        <SidebarTrigger className="ml-auto" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
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
