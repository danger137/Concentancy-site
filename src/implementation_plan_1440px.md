# Global 1440px Hero Alignment Plan

Sync all page heroes to match the left-aligned Study Abroad style for large screens (1440px+).

## Proposed Changes

### Global CSS
- [MODIFY] [global.css](file:///c:/Users/Goli%20Gangster/Desktop/Codix/concentancy/education-point-next/src/styles/global.css)
    - Add/Update rules for large screens (min-width: 1440px) to ensure `.center_o1`, `.center_h`, and other hero containers are left-aligned.
    - Ensure breadcrumbs and headings within these containers are left-aligned.

### Service Pages (JSX cleanup)
- [MODIFY] [visit-visa/page.tsx](file:///c:/Users/Goli%20Gangster/Desktop/Codix/concentancy/education-point-next/src/app/services/visit-visa/page.tsx)
    - Remove `text-center` from hero content.
- [MODIFY] [contact/page.tsx](file:///c:/Users/Goli%20Gangster/Desktop/Codix/concentancy/education-point-next/src/app/contact/page.tsx)
    - Ensure left-alignment for large screens.
- [MODIFY] [about/page.tsx](file:///c:/Users/Goli%20Gangster/Desktop/Codix/concentancy/education-point-next/src/app/about/page.tsx)
    - Verify and update hero alignment.

## Verification
- Check all pages at 1440px resolution using browser tools.
