/**
 * Token utility functions for converting between decimal and bigint
 */

// Common token decimals
export const TOKEN_DECIMALS = {
  USDC: 6,
  USDT: 6,
  DAI: 18,
  WETH: 18,
  WBTC: 8,
  ETH: 18,
} as const;

export type TokenType = keyof typeof TOKEN_DECIMALS;

/**
 * Convert decimal amount to bigint based on token type
 * @param amount - The decimal amount (e.g., 10.5)
 * @param tokenType - The token type (USDC, USDT, DAI, etc.)
 * @returns bigint representation of the amount
 */
export const toTokenAmount = (amount: number, tokenType: TokenType): bigint => {
  const decimals = TOKEN_DECIMALS[tokenType];
  const multiplier = Math.pow(10, decimals);
  return BigInt(Math.floor(amount * multiplier));
};

/**
 * Convert bigint amount back to decimal based on token type
 * @param amount - The bigint amount
 * @param tokenType - The token type (USDC, USDT, DAI, etc.)
 * @returns decimal representation of the amount
 */
export const fromTokenAmount = (
  amount: bigint,
  tokenType: TokenType
): number => {
  const decimals = TOKEN_DECIMALS[tokenType];
  const divisor = Math.pow(10, decimals);
  return Number(amount) / divisor;
};

/**
 * Convenience function for USDC (most commonly used)
 * @param amount - The decimal amount (e.g., 10.5)
 * @returns bigint representation of the USDC amount
 */
export const toUSDC = (amount: number): bigint => {
  return toTokenAmount(amount, "USDC");
};

/**
 * Convenience function for USDT
 * @param amount - The decimal amount (e.g., 10.5)
 * @returns bigint representation of the USDT amount
 */
export const toUSDT = (amount: number): bigint => {
  return toTokenAmount(amount, "USDT");
};

/**
 * Convenience function for DAI
 * @param amount - The decimal amount (e.g., 10.5)
 * @returns bigint representation of the DAI amount
 */
export const toDAI = (amount: number): bigint => {
  return toTokenAmount(amount, "DAI");
};

/**
 * Convenience function for WETH
 * @param amount - The decimal amount (e.g., 10.5)
 * @returns bigint representation of the WETH amount
 */
export const toWETH = (amount: number): bigint => {
  return toTokenAmount(amount, "WETH");
};

/**
 * Convenience function for WBTC
 * @param amount - The decimal amount (e.g., 10.5)
 * @returns bigint representation of the WBTC amount
 */
export const toWBTC = (amount: number): bigint => {
  return toTokenAmount(amount, "WBTC");
};

/**
 * Convenience function for ETH
 * @param amount - The decimal amount (e.g., 10.5)
 * @returns bigint representation of the ETH amount
 */
export const toETH = (amount: number): bigint => {
  return toTokenAmount(amount, "ETH");
};

/**
 * Convert ID to hex hash by taking the last 64 characters and prepending "0x"
 * @param id - The ID string to convert
 * @returns hex hash with "0x" prefix
 */
export const toHexHash = (id: string): `0x${string}` => {
  return `0x${id.slice(-64)}` as `0x${string}`;
};
