export const ROLE = {
  PRODUCER: 1 << 0, // 1
  PROCESSOR: 1 << 1, // 2
  TRANSPORTER: 1 << 2, // 4
  RETAILER: 1 << 3, // 8
  AUDITOR: 1 << 4, // 16
};

export const ROLE_LABEL: Record<string, string> = {
  PRODUCER: "Producer",
  PROCESSOR: "Processor",
  TRANSPORTER: "Transporter",
  RETAILER: "Retailer",
  AUDITOR: "Auditor",
};
