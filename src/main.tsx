import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AccountProvider from "./providers/AccountProvider.tsx";
// import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AccountProvider>
      <Suspense fallback={<p>Loading...</p>}>
        {/* <Toaster />
        <Sonner /> */}
        <App />
      </Suspense>
    </AccountProvider>
  </StrictMode>
);
