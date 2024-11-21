/**
 * Calculate reading time for a given text content
 * Average reading speed: 200 words per minute
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime || 1; // Return at least 1 minute
}
