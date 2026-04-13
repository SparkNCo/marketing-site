# Testing Guide: Mobile Chat Icon Cookie Consent Gating

This document provides manual testing instructions for verifying that the mobile chat icon is properly gated behind cookie consent.

## Test Environment Setup

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open the site in your browser
3. Open browser DevTools (F12)
4. Enable device emulation (mobile viewport)

## Test Cases

### Test 1: Fresh Session - No Consent (Mobile)

**Setup:**
1. Clear localStorage: `localStorage.clear()` in console
2. Refresh the page
3. Set viewport to mobile (e.g., iPhone 12 - 390x844)

**Expected Result:**
- ✅ Cookie banner should appear after ~1 second
- ✅ Chat icon should NOT be visible in the bottom right corner

**Verification:**
```javascript
// Check localStorage
console.log(localStorage.getItem('cookie_consent')); // Should be null

// Check if chat script is loaded
console.log(document.getElementById('chatbase-embed-script')); // Should be null
```

---

### Test 2: Accept Consent (Mobile)

**Setup:**
1. Continue from Test 1
2. Click "Accept" on the cookie banner

**Expected Result:**
- ✅ Cookie banner should disappear
- ✅ Chat icon should appear immediately (without page refresh)
- ✅ Chat icon should be visible in the bottom right corner

**Verification:**
```javascript
// Check localStorage
console.log(localStorage.getItem('cookie_consent')); // Should be "accepted"

// Check if chat script is loaded
console.log(document.getElementById('chatbase-embed-script')); // Should be an HTMLScriptElement

// Check if chat widget is visible
console.log(document.querySelector('iframe[src*="chatbase"]')); // Should exist after script loads
```

---

### Test 3: Reject Consent (Mobile)

**Setup:**
1. Clear localStorage: `localStorage.clear()`
2. Refresh the page
3. Keep viewport at mobile size
4. Wait for cookie banner to appear
5. Click "Reject" on the cookie banner

**Expected Result:**
- ✅ Cookie banner should disappear
- ✅ Chat icon should appear immediately (without page refresh)
- ✅ Chat icon should be visible in the bottom right corner

**Verification:**
```javascript
// Check localStorage
console.log(localStorage.getItem('cookie_consent')); // Should be "rejected"

// Check if chat script is loaded
console.log(document.getElementById('chatbase-embed-script')); // Should be an HTMLScriptElement
```

---

### Test 4: Returning User with Stored Consent (Mobile)

**Setup:**
1. Continue from Test 2 or Test 3 (with consent already stored)
2. Refresh the page
3. Keep viewport at mobile size

**Expected Result:**
- ✅ Cookie banner should NOT appear
- ✅ Chat icon should be visible immediately on page load
- ✅ No delay in chat icon appearance

**Verification:**
```javascript
// Check localStorage persists
console.log(localStorage.getItem('cookie_consent')); // Should be "accepted" or "rejected"

// Chat should load immediately
console.log(document.getElementById('chatbase-embed-script')); // Should exist
```

---

### Test 5: Desktop Behavior - No Consent

**Setup:**
1. Clear localStorage: `localStorage.clear()`
2. Refresh the page
3. Set viewport to desktop (e.g., 1920x1080)

**Expected Result:**
- ✅ Cookie banner should appear after ~1 second
- ✅ Chat icon should be visible immediately (not gated on desktop)

**Verification:**
```javascript
// Check localStorage
console.log(localStorage.getItem('cookie_consent')); // Should be null

// Chat should still load on desktop
console.log(document.getElementById('chatbase-embed-script')); // Should be an HTMLScriptElement
```

---

### Test 6: Desktop Behavior - With Consent

**Setup:**
1. Continue from Test 5
2. Accept or reject the cookie banner
3. Keep viewport at desktop size

**Expected Result:**
- ✅ Cookie banner should disappear
- ✅ Chat icon should remain visible (no change)

---

### Test 7: Viewport Resize - Mobile to Desktop

**Setup:**
1. Clear localStorage: `localStorage.clear()`
2. Refresh the page
3. Start with mobile viewport (390px width)
4. Verify chat icon is hidden
5. Resize viewport to desktop (1920px width)

**Expected Result:**
- ✅ Chat icon should appear when viewport becomes desktop-sized
- ✅ No consent required on desktop

---

### Test 8: Viewport Resize - Desktop to Mobile (No Consent)

**Setup:**
1. Clear localStorage: `localStorage.clear()`
2. Refresh the page
3. Start with desktop viewport (1920px width)
4. Verify chat icon is visible
5. Resize viewport to mobile (390px width)

**Expected Result:**
- ✅ Chat icon should disappear when viewport becomes mobile-sized
- ✅ Cookie banner should still be visible

---

### Test 9: Viewport Resize - Desktop to Mobile (With Consent)

**Setup:**
1. Set localStorage: `localStorage.setItem('cookie_consent', 'accepted')`
2. Refresh the page
3. Start with desktop viewport (1920px width)
4. Verify chat icon is visible
5. Resize viewport to mobile (390px width)

**Expected Result:**
- ✅ Chat icon should remain visible when viewport becomes mobile-sized
- ✅ Consent is already stored, so no gating needed

---

## Edge Cases

### Edge Case 1: Malformed Consent Value

**Setup:**
```javascript
localStorage.setItem('cookie_consent', 'invalid_value');
```
Refresh the page on mobile viewport.

**Expected Result:**
- ✅ Chat icon should be hidden (invalid value treated as no consent)
- ✅ Cookie banner should appear

---

### Edge Case 2: Rapid Viewport Changes

**Setup:**
1. Set consent: `localStorage.setItem('cookie_consent', 'accepted')`
2. Rapidly resize viewport between mobile and desktop multiple times

**Expected Result:**
- ✅ Chat icon visibility should update smoothly
- ✅ No errors in console
- ✅ No duplicate chat scripts loaded

---

## Browser Testing Matrix

Test on the following browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Automated Verification Script

Run this in the browser console to quickly verify the implementation:

```javascript
// Test utility functions
const testMobileChatConsent = {
  clearConsent() {
    localStorage.removeItem('cookie_consent');
    console.log('✅ Consent cleared');
  },
  
  setAccepted() {
    localStorage.setItem('cookie_consent', 'accepted');
    window.dispatchEvent(new Event('cookie_consent_updated'));
    console.log('✅ Consent set to accepted');
  },
  
  setRejected() {
    localStorage.setItem('cookie_consent', 'rejected');
    window.dispatchEvent(new Event('cookie_consent_updated'));
    console.log('✅ Consent set to rejected');
  },
  
  checkState() {
    const consent = localStorage.getItem('cookie_consent');
    const script = document.getElementById('chatbase-embed-script');
    const isMobile = window.innerWidth < 768;
    
    console.log('--- Current State ---');
    console.log('Viewport:', isMobile ? 'Mobile' : 'Desktop');
    console.log('Consent:', consent || 'none');
    console.log('Chat Script Loaded:', !!script);
    console.log('Expected Chat Visible:', !isMobile || !!consent);
    console.log('-------------------');
  }
};

// Make it globally available
window.testMobileChatConsent = testMobileChatConsent;

console.log('Test utilities loaded! Use window.testMobileChatConsent');
console.log('Available methods:');
console.log('  - clearConsent()');
console.log('  - setAccepted()');
console.log('  - setRejected()');
console.log('  - checkState()');
```

## Success Criteria

All test cases should pass with the following outcomes:

1. ✅ Mobile viewport without consent: Chat icon hidden
2. ✅ Mobile viewport with consent (accepted or rejected): Chat icon visible
3. ✅ Desktop viewport: Chat icon always visible (regardless of consent)
4. ✅ Consent decision triggers immediate visibility update (no refresh needed)
5. ✅ Viewport resize properly updates chat icon visibility
6. ✅ Stored consent persists across page reloads
7. ✅ No console errors during any test case
8. ✅ No duplicate chat scripts loaded

## Notes

- The mobile breakpoint is set at 768px (standard tablet/mobile boundary)
- Both "accepted" and "rejected" consent values allow the chat icon to show
- Desktop behavior is unchanged from the original implementation
- The implementation uses a custom event (`cookie_consent_updated`) for immediate reactivity
