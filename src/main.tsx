import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AccountProvider from "./providers/AccountProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AccountProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <App />
      </Suspense>
    </AccountProvider>
  </StrictMode>
);
