/* eslint-disable @typescript-eslint/no-explicit-any */
import useUserStore from "@/stores/useUserStore";
import type { IUser } from "@/types/auth";
import {
  useLogout,
  useSignMessage,
  useSmartAccountClient,
} from "@account-kit/react";
import { useEffect, useRef, useState } from "react";
import { useGetNonce, useLogin } from "./useAuth";
import { useUserProfile } from "./useUser";

const roleMap: Record<string, number> = {
  PRODUCER: 1,
  DISTRIBUTOR: 2,
  TRANSPORTER: 3,
  CONSUMER: 4,
};

export const useRoleSignAndLogin = () => {
  const { client, address } = useSmartAccountClient({});
  const { logout } = useLogout();

  const { mutateAsync: getNonceAsync } = useGetNonce();
  const { mutateAsync: loginToSystem } = useLogin();
  const { mutateAsync: getUserProfile } = useUserProfile();

  const { setAuth, setUserDetail, hasSignedMessage } = useUserStore.getState();
  const [isSigning, setIsSigning] = useState(false);
  const [shouldShowSignPopup, setShouldShowSignPopup] = useState(
    !hasSignedMessage()
  );
  const isLoggingRef = useRef(false);

  const { signMessageAsync } = useSignMessage({ client });

  useEffect(() => {
    setShouldShowSignPopup(!hasSignedMessage());
  }, [hasSignedMessage]);

  const selectRoleAndLogin = async (role: string) => {
    if (!address || !client || isSigning || isLoggingRef.current || !role)
      return;
    try {
      isLoggingRef.current = true;
      setIsSigning(true);

      const nonce = await getNonceAsync(address);
      console.log("nonce", nonce);
      const message = typeof nonce.nonce === "string" ? nonce.nonce : "";
      const signature = await signMessageAsync({ message: message });
      console.log("signature", signature);
      const loginResponse = await loginToSystem({
        wallet_address: address,
        signature,
        role: roleMap[role] ?? 0,
      });

      if (loginResponse?.data?.accessToken) {
        setAuth({
          tokens: { accessToken: loginResponse.data.accessToken },
          address,
        });
      }

      const userProfile = await getUserProfile();
      setUserDetail(userProfile as IUser);
      setShouldShowSignPopup(false);
    } catch (err: any) {
      console.error("Sign & login failed:", err);
      // TODO: show toast error
    } finally {
      setIsSigning(false);
      isLoggingRef.current = false;
    }
  };

  const handleLogout = () => {
    logout();
    setAuth(null);
    setUserDetail(null);
    setShouldShowSignPopup(false);
  };

  return {
    selectRoleAndLogin,
    handleLogout,
    isSigning,
    shouldShowSignPopup,
    setShouldShowSignPopup,
  };
};
