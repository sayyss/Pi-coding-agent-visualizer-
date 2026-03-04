export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function formatTokenCount(tokens: number): string {
  if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(1)}K`;
  }
  return String(tokens);
}
