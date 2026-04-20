/**
 * Meta (Facebook) Pixel - standard events. No-op if the pixel script is not loaded.
 */
export function trackMetaPixel(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  const w = globalThis as unknown as Window;
  if (params !== undefined && Object.keys(params).length > 0) {
    w.fbq?.("track", eventName, params);
  } else {
    w.fbq?.("track", eventName);
  }
}
