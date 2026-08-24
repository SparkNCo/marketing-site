/** Display label for select / multi-select options. */
export function toTitleCase(value: string): string {
  return value
    .trim()
    .split(/(\s+)/)
    .map((part) => {
      if (/^\s+$/.test(part) || part.length === 0) return part;
      const match = /^([^a-zA-Z0-9]*)(.*)$/.exec(part);
      if (!match) return part;
      const [, prefix, rest] = match;
      if (!rest) return part;
      return prefix + rest.charAt(0).toUpperCase() + rest.slice(1).toLowerCase();
    })
    .join("");
}

/** Canonical value stored and sent to the server. */
export function toOptionValue(value: string): string {
  return value.trim().toLowerCase();
}
