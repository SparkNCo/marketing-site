# Implementation Summary: Mobile Chat Icon Cookie Consent Gating

## Overview

This implementation gates the mobile chat icon behind cookie consent, ensuring it only appears after the user has explicitly accepted or rejected the cookie banner. Desktop behavior remains unchanged.

## Problem Statement

The chat icon was visible on mobile devices before users made a cookie consent decision, which could be seen as tracking users without explicit consent.

## Solution

### Architecture

The solution uses a React state-based approach with event-driven updates:

1. **Mobile Detection**: Viewport width check (< 768px = mobile)
2. **Consent State**: Read from existing `localStorage.getItem('cookie_consent')`
3. **Conditional Rendering**: Only load chat script when conditions are met
4. **Event System**: Custom `cookie_consent_updated` event for immediate reactivity

### Components Modified

#### 1. ChatbaseWidget.tsx

**Key Changes:**
- Added `shouldShowOnMobile` state to control script loading
- Implemented `isMobile()` helper to check viewport width
- Implemented `hasConsentDecision()` helper to check localStorage
- Added two useEffect hooks:
  - First: Manages consent checking and event listeners
  - Second: Conditionally loads chat script based on state

**Logic Flow:**
```
1. Component mounts
2. Check if mobile viewport
   - If mobile: Check for consent decision
     - If consent exists: Set shouldShowOnMobile = true
     - If no consent: Set shouldShowOnMobile = false
   - If desktop: Set shouldShowOnMobile = true
3. Listen for events:
   - cookie_consent_updated: Recheck consent
   - resize: Recheck viewport and consent
4. Second useEffect watches shouldShowOnMobile:
   - If mobile AND no consent: Don't load script
   - Otherwise: Load chat script
```

#### 2. CookieBanner.tsx

**Key Changes:**
- Added `window.dispatchEvent(new Event('cookie_consent_updated'))` to both `accept()` and `reject()` functions
- This enables immediate reactivity without polling or page refresh

### Technical Decisions

#### Why 768px breakpoint?
- Industry standard for tablet/mobile boundary
- Matches common CSS framework breakpoints (Bootstrap, Tailwind)
- Covers most mobile devices and small tablets

#### Why treat both "accepted" and "rejected" as valid?
- Per requirements: "Show the mobile chat icon after the user accepts or rejects the cookie banner"
- The goal is to hide the icon until an explicit decision is made, not to hide it permanently
- Both decisions indicate user awareness and explicit choice

#### Why custom event instead of polling?
- More efficient (no interval timers)
- Immediate reactivity (no delay)
- Cleaner code (event-driven vs. polling)
- Better performance (fewer checks)

#### Why two separate useEffect hooks?
- **First useEffect**: Manages event listeners and consent checking logic
  - Depends on `shouldShowOnMobile` to re-establish listeners when state changes
- **Second useEffect**: Manages script loading/unloading
  - Depends on `shouldShowOnMobile` to load/unload script when state changes
- Separation of concerns: consent checking vs. script management

### Edge Cases Handled

1. **SSR/Hydration**: Checks for `window` and `document` before accessing
2. **Viewport Resize**: Dynamically updates when user resizes browser
3. **Malformed Consent**: Treats any value other than "accepted" or "rejected" as no consent
4. **Script Already Loaded**: Checks for existing script before loading
5. **Cleanup**: Removes event listeners and script on unmount

### Browser Compatibility

- Uses standard Web APIs (localStorage, addEventListener, CustomEvent)
- No polyfills required
- Compatible with all modern browsers (Chrome, Firefox, Safari, Edge)
- Works on mobile browsers (iOS Safari, Chrome Mobile)

## Testing Strategy

### Automated Testing
- ✅ Build passes successfully
- ✅ No TypeScript errors
- ✅ No runtime errors during build

### Manual Testing
See `TESTING_MOBILE_CHAT_CONSENT.md` for comprehensive test cases covering:
- Fresh session without consent (mobile)
- Accept consent (mobile)
- Reject consent (mobile)
- Returning user with stored consent (mobile)
- Desktop behavior (always shows)
- Viewport resize scenarios
- Edge cases

## Performance Impact

### Positive Impacts
- **Reduced Script Loading**: On mobile without consent, chat script is not loaded at all
- **Event-Driven**: No polling intervals consuming CPU cycles
- **Lazy Loading**: Script only loads when needed

### Neutral Impacts
- **State Management**: Minimal overhead from React state
- **Event Listeners**: Two lightweight event listeners (resize, custom event)

### No Negative Impacts
- No additional network requests
- No blocking operations
- No layout shifts

## Security Considerations

- **No New Storage**: Reuses existing localStorage mechanism
- **No External Dependencies**: Uses only native browser APIs
- **No User Data**: Only checks consent state, doesn't store user data
- **XSS Protection**: Script loading uses existing NOSONAR-approved pattern

## Accessibility

- **No Impact**: Chat icon visibility is visual only
- **Screen Readers**: Not affected by this change
- **Keyboard Navigation**: Not affected by this change

## Maintenance

### Future Considerations

1. **Breakpoint Configuration**: Could be extracted to a config file if needed
2. **Consent Key**: Currently hardcoded as `'cookie_consent'`, could be configurable
3. **Event Name**: Currently `'cookie_consent_updated'`, could be namespaced

### Potential Improvements

1. **Debounce Resize**: Could debounce resize event for better performance
2. **Prefers-Reduced-Motion**: Could respect user's motion preferences
3. **Testing Framework**: Could add unit tests with Jest/Vitest

## Deployment Checklist

- [x] Code changes committed
- [x] Build passes successfully
- [x] PR created with detailed description
- [x] Testing guide provided
- [ ] Manual testing completed
- [ ] PR reviewed and approved
- [ ] Merged to main
- [ ] Deployed to production
- [ ] Verified in production

## Rollback Plan

If issues arise in production:

1. **Quick Fix**: Revert the two commits:
   ```bash
   git revert HEAD~1..HEAD
   git push
   ```

2. **Alternative**: Set mobile breakpoint to 0 to disable gating:
   ```typescript
   const MOBILE_BREAKPOINT = 0; // Disables mobile gating
   ```

3. **Full Rollback**: Merge PR that reverts to original ChatbaseWidget.tsx

## Success Metrics

### Acceptance Criteria (from Linear issue)
- [ ] On a mobile viewport with no stored cookie decision, the chat icon is not visible
- [ ] After accepting the cookie banner on mobile, the chat icon becomes visible
- [ ] After rejecting the cookie banner on mobile, the chat icon becomes visible
- [ ] Reloading the page after a prior accept/reject decision keeps the chat icon visible on mobile
- [ ] Desktop behavior is unchanged

### Additional Metrics
- [ ] No increase in error rates
- [ ] No increase in bounce rates
- [ ] No complaints about missing chat icon
- [ ] Positive feedback on privacy compliance

## Related Documentation

- `TESTING_MOBILE_CHAT_CONSENT.md` - Comprehensive manual testing guide
- Linear Issue: SPA-108
- PR: #106

## Contact

For questions or issues with this implementation, refer to:
- PR Discussion: https://github.com/SparkNCo/marketing-site/pull/106
- Linear Issue: SPA-108
