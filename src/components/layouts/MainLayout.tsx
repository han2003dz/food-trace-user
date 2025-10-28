import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import clsx from "clsx";
import Sidebar from "./Sidebar";
import { ProtectedRoute } from "../../providers/ProtectedRoute";
import { useGetTotalBatches } from "@/hooks/contracts/useBatches";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { batches } = useGetTotalBatches();
  console.log("batches", batches);
  console.log("OK");
  return (
    <ProtectedRoute>
      <main className="min-h-screen flex flex-col bg-gray-50">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          userDetail={null}
        />

        <div className="relative flex-1 z-10">
          <Header collapsed={collapsed} />
          <div
            id="content"
            className={clsx(
              "duration-300 pt-[72px]",
              collapsed ? "pl-[72px]" : "pl-[250px]",
              "max-md:pl-0"
            )}
          >
            <div className="min-h-screen bg-gray-50 p-6">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
