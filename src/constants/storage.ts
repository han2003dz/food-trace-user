export const StorageStoreName = {
  USER: "user-storage",
  SETTINGS: "settings-storage",
  SESSION: "session-storage",
  AUTH: "auth-storage",
} as const;

export type StorageStoreName =
  (typeof StorageStoreName)[keyof typeof StorageStoreName];
