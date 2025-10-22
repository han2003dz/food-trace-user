import {
  alchemy,
  baseSepolia,
  getAlchemyPaymasterAddress,
  type PolicyToken,
} from "@account-kit/infra";
import {
  cookieStorage,
  createConfig,
  type AlchemyAccountsUIConfig,
} from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { createPublicClient, toHex } from "viem";
import { createBundlerClient } from "viem/account-abstraction";
import { toUSDC } from "../utils/token";

// Environment variables validation
export const API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;
if (!API_KEY) {
  throw new Error("VITE_ALCHEMY_API_KEY is not set");
}

export const SPONSORSHIP_POLICY_ID = import.meta.env.VITE_ALCHEMY_POLICY_ID;
if (!SPONSORSHIP_POLICY_ID) {
  throw new Error("VITE_ALCHEMY_POLICY_ID is not set");
}

export const USDC_CONTRACT_ADDRESS = import.meta.env.VITE_USDC_CONTRACT_ADDRESS;
if (!USDC_CONTRACT_ADDRESS) {
  throw new Error("VITE_USDC_CONTRACT_ADDRESS is not set");
}

export const LOTTERY_CONTRACT_ADDRESS = import.meta.env
  .VITE_LOTTERY_CONTRACT_ADDRESS;
if (!LOTTERY_CONTRACT_ADDRESS) {
  throw new Error("VITE_LOTTERY_CONTRACT_ADDRESS is not set");
}

export const PAYMASTER_ADDRESS = getAlchemyPaymasterAddress(
  baseSepolia,
  "0.7.0"
);

// UI Configuration
export const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [
        { type: "passkey" },
        { type: "social", authProviderId: "google", mode: "popup" },
        { type: "social", authProviderId: "facebook", mode: "popup" },
      ],
      [{ type: "external_wallets" }],
    ],
    addPasskeyOnSignup: false,
  },
};

// Policy Token Configuration
export const policyToken: PolicyToken = {
  address: USDC_CONTRACT_ADDRESS, // USDC contract address
  maxTokenAmount: toUSDC(10), // 10 USDC
  permit: {
    paymasterAddress: PAYMASTER_ADDRESS, // Alchemy paymaster address to handle the gas for the permit
    autoPermitApproveTo: toUSDC(10), // 10 USDC
    autoPermitBelow: toUSDC(1), // 1 USDC
    erc20Name: "USD Coin", // USDC token name
    version: "1", // Permit version
  },
};

export const bundlerClient = createBundlerClient({
  transport: alchemy({ apiKey: API_KEY }),
  chain: baseSepolia,
});

export const publicClient = createPublicClient({
  transport: alchemy({ apiKey: API_KEY }),
  chain: baseSepolia,
});

// Account Kit Configuration
export const accountKitConfig = createConfig(
  {
    transport: alchemy({ apiKey: API_KEY }),
    chain: baseSepolia,
    ssr: true,
    storage: cookieStorage,
    enablePopupOauth: true,
    policyId: SPONSORSHIP_POLICY_ID,
    policyToken,
  },
  uiConfig
);

// Query Client
export const queryClient = new QueryClient();

// Paymaster Service Configuration
export const paymasterServiceConfig = {
  policyId: SPONSORSHIP_POLICY_ID,
  erc20: {
    tokenAddress: USDC_CONTRACT_ADDRESS,
    postOpSettings: {
      autoApprove: {
        below: toHex(toUSDC(0.01)),
        amount: toHex(toUSDC(10)),
      },
    },
  },
};
