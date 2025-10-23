import { persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { useShallow } from "zustand/react/shallow";

import { isEqual } from "lodash";
import { type IUser, type IUserAuth } from "@/types/auth";
import { StorageStoreName } from "@/constants/storage";

export const deepCompareState = (oldState: unknown, newState: unknown) =>
  isEqual(oldState, newState);

interface UserState {
  auth: IUserAuth | null;
  userDetail: IUser | null;
  setAuth: (user: IUserAuth | null) => void;
  setUserDetail: (detail: IUser | null) => void;
  updateUserDetail: (detail: Partial<IUser>) => void;
  hasSignedMessage: () => boolean;
}

const useUserStore = createWithEqualityFn<UserState>()(
  persist(
    (set, get) => ({
      auth: null,
      userDetail: null,
      setAuth: (auth) => set({ auth }),
      setUserDetail: (userDetail) => set({ userDetail }),
      updateUserDetail: (partial) =>
        set((state) => ({
          userDetail: state.userDetail
            ? { ...state.userDetail, ...partial }
            : null,
        })),
      hasSignedMessage: () => Boolean(get().auth?.tokens?.accessToken),
    }),
    {
      name: StorageStoreName.USER,
    }
  ),
  deepCompareState
);

export default useUserStore;

export const useUserShallow = <U>(selector: (state: UserState) => U) =>
  useUserStore(useShallow(selector));
