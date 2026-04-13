# Quick Reference: Mobile Chat Icon Cookie Consent

## TL;DR

The mobile chat icon now requires cookie consent before appearing. Desktop behavior is unchanged.

## Key Files

- `src/components/utils/ChatbaseWidget.tsx` - Main implementation
- `src/components/utils/CookieBanner.tsx` - Event dispatch

## How It Works

```typescript
// Mobile (< 768px)
if (no consent) → Hide chat icon
if (consent accepted or rejected) → Show chat icon

// Desktop (>= 768px)
Always show chat icon (unchanged)
```

## Testing Locally

1. Start dev server: `pnpm dev`
2. Open DevTools (F12)
3. Set mobile viewport (e.g., iPhone 12)
4. Clear localStorage: `localStorage.clear()`
5. Refresh page
6. Verify chat icon is hidden
7. Accept/reject cookie banner
8. Verify chat icon appears

## Quick Test Commands

```javascript
// Clear consent
localStorage.removeItem('cookie_consent');

// Set accepted
localStorage.setItem('cookie_consent', 'accepted');
window.dispatchEvent(new Event('cookie_consent_updated'));

// Set rejected
localStorage.setItem('cookie_consent', 'rejected');
window.dispatchEvent(new Event('cookie_consent_updated'));

// Check state
console.log('Consent:', localStorage.getItem('cookie_consent'));
console.log('Mobile:', window.innerWidth < 768);
console.log('Script loaded:', !!document.getElementById('chatbase-embed-script'));
```

## Configuration

```typescript
// In ChatbaseWidget.tsx
const MOBILE_BREAKPOINT = 768; // Change this to adjust mobile detection
```

## Troubleshooting

### Chat icon not appearing on mobile after consent
1. Check console for errors
2. Verify localStorage: `localStorage.getItem('cookie_consent')`
3. Verify event fired: `window.dispatchEvent(new Event('cookie_consent_updated'))`
4. Check viewport width: `window.innerWidth`

### Chat icon appearing before consent on mobile
1. Check if consent is already stored: `localStorage.getItem('cookie_consent')`
2. Verify mobile detection: `window.innerWidth < 768`
3. Check component state in React DevTools

### Desktop chat icon not appearing
1. This should never happen - desktop always shows chat
2. Check console for errors
3. Verify script loading: `document.getElementById('chatbase-embed-script')`

## Related Documents

- `IMPLEMENTATION_SUMMARY.md` - Full technical details
- `TESTING_MOBILE_CHAT_CONSENT.md` - Comprehensive test cases
- PR #106 - Pull request with discussion

## Support

For issues or questions:
- Check PR #106 discussion
- Review Linear issue SPA-108
- Contact the development team
