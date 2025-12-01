/* eslint-disable @typescript-eslint/no-unused-vars */
import { persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { useShallow } from "zustand/react/shallow";
import { StorageStoreName } from "../constants/storage";
import type { IUser } from "@/types/auth";

interface UserState {
  userDetail: IUser | null;
  setUserDetail: (detail: IUser | null) => void;
  updateUserDetail: (partial: Partial<IUser>) => void;
  resetUser: () => void;
}

export const useUserStore = createWithEqualityFn<UserState>()(
  persist(
    (set) => ({
      userDetail: null,

      setUserDetail: (userDetail) => set({ userDetail }),

      updateUserDetail: (partial) =>
        set((state) => {
          if (!state.userDetail) return { userDetail: null };
          return {
            userDetail: {
              ...state.userDetail,
              ...Object.fromEntries(
                Object.entries(partial).filter(([_, v]) => v !== undefined)
              ),
            },
          };
        }),

      resetUser: () => set({ userDetail: null }),
    }),
    {
      name: StorageStoreName.USER,
      partialize: (state) => ({ userDetail: state.userDetail }),
    }
  )
);

export const useUserShallow = <U>(selector: (s: UserState) => U) =>
  useUserStore(useShallow(selector));
