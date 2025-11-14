import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { ProtectedRoute } from "../../providers/ProtectedRoute";
import { Sidebar } from "./Sidebar";
import { SidebarProvider, SidebarInset } from "../ui/Sidebar";
import { Header } from "./Header";
import { useState } from "react";
import { cn } from "@/utils/libs";
import { useIsMobile } from "@/hooks/useMobile";

export default function MainLayout() {
  const [sidebarClosed, setSidebarClosed] = useState<boolean>(false);
  const isMobile = useIsMobile();
  console.log(isMobile);
  return (
    <ProtectedRoute>
      {!isMobile ? (
        <SidebarProvider>
          <main className="flex min-h-screen w-full bg-linear-to-br from-background via-[#14213D] to-background">
            <Sidebar setSidebarClosed={setSidebarClosed} />

            <SidebarInset>
              <Header sidebarClosed={sidebarClosed} isMobile={isMobile} />
              <div
                id="content"
                className={cn(
                  "flex-1 pt-5 pb-8 px-6 transition-all",
                  sidebarClosed ? "ml-[72px]" : "ml-[250px]"
                )}
              >
                <Outlet />
              </div>
              <Footer />
            </SidebarInset>
          </main>
        </SidebarProvider>
      ) : (
        <>
          <Header sidebarClosed={sidebarClosed} isMobile={isMobile} />
          <div
            id="content"
            className={cn("flex-1 pt-5 pb-8 px-6 transition-all")}
          >
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </ProtectedRoute>
  );
}
