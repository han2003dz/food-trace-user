export const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID!;
if (!PRIVY_APP_ID) throw new Error("VITE_PRIVY_APP_ID is not set");

export const PRIVY_CLIENT_ID = import.meta.env.VITE_PRIVY_CLIENT_ID!;
if (!PRIVY_CLIENT_ID) throw new Error("VITE_PRIVY_CLIENT_ID is not set");
