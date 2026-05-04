export function formatListText(text?: string | null): string[] {
  if (!text) return [];

  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}
