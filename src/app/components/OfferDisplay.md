# OfferDisplay Component

## Overview
The OfferDisplay component is responsible for showing active offers to users based on their display type (banner or modal). It's integrated into the main layout and appears when users enter the site.

## Features

### Display Types
- **Banner Offers**: Displayed as animated banners at the top of the page
- **Modal Offers**: Displayed as popup modals with detailed information

### User Interaction
- Users can dismiss individual offers by clicking the close button
- Dismissed offers are stored in sessionStorage until browser refresh
- Modal offers show one at a time with a 1-second delay between them
- Banner offers appear simultaneously at the top of the page

### Behavior
- Offers appear automatically when user enters the site
- Dismissed offers will reappear after page refresh (not browser session)
- Modal offers include a "Shop Now" button that redirects to the shop page
- Responsive design works on all screen sizes

## Props
```typescript
interface OfferDisplayProps {
  offers: Offer[] | null;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  category?: string;
  min_order_amount?: number;
  start_date: string;
  end_date: string;
  display_type: 'modal' | 'banner';
  is_active: boolean;
}
```

## Usage
The component is automatically included in the RootClientLayout and receives active offers from the database.

```tsx
<OfferDisplay offers={offers || []} />
```

## Styling
- Uses custom CSS animations defined in globals.css
- Banner offers have a sliding entrance animation and subtle pulsing
- Modal offers have a fade-in and scale animation
- Fully responsive with dark mode support

## Integration
- Integrated in `RootClientLayout.tsx`
- Uses offers data fetched from `getActiveOffers()` function
- Positioned above the navbar to ensure maximum visibility
