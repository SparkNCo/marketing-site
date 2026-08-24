/**
 * Canonical Cal.com booking link, reused across the marketing site.
 *
 * The platform already books calls through Cal.com (see the proposal
 * "Request a Call" CTA and the discovery flow). We build the URL from the
 * public Cal.com username when available so there is a single source of truth,
 * and fall back to the known booking handle otherwise.
 */
export function getBookingUrl(): string {
  const username = (import.meta.env.PUBLIC_CAL_USERNAME as string | undefined)?.trim();
  const handle = username && username.length > 0 ? username : "spark";
  return `https://cal.com/${handle}/consult`;
}
