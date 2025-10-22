import { cookieToInitialState } from "@account-kit/core";
import { AlchemyAccountProvider } from "@account-kit/react";
import { accountKitConfig, queryClient } from "../config/accountKit";

const cookie = typeof document !== "undefined" ? document.cookie : undefined;

const initialState = cookieToInitialState(accountKitConfig, cookie);

export default function AccountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AlchemyAccountProvider
      config={accountKitConfig}
      queryClient={queryClient}
      initialState={initialState}
    >
      {children}
    </AlchemyAccountProvider>
  );
}
