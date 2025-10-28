export const QueryKey = {
  TOTAL_BATCHES: "TOTAL_BATCHES",
} as const;

export type QueryKey = (typeof QueryKey)[keyof typeof QueryKey];
