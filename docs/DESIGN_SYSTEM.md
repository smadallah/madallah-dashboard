# 🎨 Design System & UI/UX Guidelines

## Color Palette

### Primary Colors
| Color | Hex Code | RGB | Usage |
|-------|----------|-----|-------|
| Blue | #3b82f6 | 59, 130, 246 | Primary buttons, links, headings |
| Purple | #8b5cf6 | 139, 92, 246 | Secondary actions, highlights |
| Green | #10b981 | 16, 185, 129 | Success states, confirmations |
| Orange | #f59e0b | 245, 158, 11 | Warnings, alerts, CTAs |
| Red | #ef4444 | 239, 68, 68 | Errors, danger zones |

### Neutral Colors
| Color | Hex Code | RGB | Usage |
|-------|----------|-----|-------|
| Gray-50 | #f9fafb | 249, 250, 251 | Background, light surfaces |
| Gray-100 | #f3f4f6 | 243, 244, 246 | Hover states, dividers |
| Gray-600 | #4b5563 | 75, 85, 99 | Body text |
| Gray-900 | #111827 | 17, 24, 39 | Headings, dark text |

---

## Typography System

### Font Family
```css
/* Primary Font (headings, emphasis) */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace (code, numbers) */
font-family: 'JetBrains Mono', 'Courier New', monospace;
```

### Font Sizes & Hierarchy

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| H1 | 48px | 700 (Bold) | 1.2 | Page titles |
| H2 | 36px | 700 (Bold) | 1.3 | Section titles |
| H3 | 24px | 600 (SemiBold) | 1.4 | Subsection titles |
| H4 | 20px | 600 (SemiBold) | 1.4 | Card titles |
| Body | 16px | 400 (Regular) | 1.6 | Main text content |
| Small | 14px | 400 (Regular) | 1.5 | Secondary text |
| Caption | 12px | 500 (Medium) | 1.5 | Labels, hints |

### Example Usage
```tsx
// Tailwind CSS classes
<h1 className="text-4xl font-bold leading-tight">Page Title</h1>
<p className="text-base font-normal leading-relaxed">Body text</p>
<span className="text-xs font-medium">Caption text</span>
```

---

## Spacing System

### Base Unit: 4px Grid

| Spacing | Value | CSS Class |
|---------|-------|-----------|
| XS | 4px | `gap-1` |
| S | 8px | `gap-2` |
| M | 12px | `gap-3` |
| L | 16px | `gap-4` |
| XL | 24px | `gap-6` |
| 2XL | 32px | `gap-8` |
| 3XL | 48px | `gap-12` |

### Application Examples
```tsx
// Tailwind spacing
<div className="p-4 gap-6">  {/* 16px padding, 24px gap */}
  <div className="mb-8">     {/* 32px margin bottom */}
    Content here
  </div>
</div>
```

---

## Component Design Specifications

### Buttons

#### Primary Button
```css
Background: #3b82f6
Padding: 12px 24px
Border-radius: 8px
Font-size: 16px
Font-weight: 600
Hover: #2563eb (darker)
Active: #1d4ed8
Disabled: #d1d5db
```

```tsx
<button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300">
  Click Me
</button>
```

#### Secondary Button
```css
Background: #f3f4f6
Border: 1px solid #e5e7eb
Padding: 12px 24px
Hover: #e5e7eb
```

#### Icon Button
```css
Size: 40px × 40px
Border-radius: 50%
Background: #f3f4f6
Hover: #e5e7eb
```

### Input Fields

#### Text Input Specifications
```css
Height: 44px
Padding: 12px 16px
Border: 1px solid #e5e7eb
Border-radius: 8px
Font-size: 16px
Focus border: #3b82f6
Focus shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)
```

```tsx
<input 
  className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  type="text"
  placeholder="Enter text..."
/>
```

### Cards

#### Standard Card
```css
Background: #ffffff
Border: 1px solid #e5e7eb
Border-radius: 12px
Padding: 24px
Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
Hover shadow: 0 10px 25px rgba(0, 0, 0, 0.1)
Transition: all 0.3s ease
```

```tsx
<div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
  {/* Card content */}
</div>
```

### Modals & Dialogs

#### Modal Overlay
```css
Background: rgba(0, 0, 0, 0.5)
Backdrop-filter: blur(2px)
```

#### Modal Content
```css
Background: #ffffff
Border-radius: 16px
Padding: 32px
Max-width: 500px
Box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3)
```

---

## Responsive Breakpoints

### Tailwind CSS Breakpoints
```css
sm: 640px   /* Tablets (portrait) */
md: 768px   /* Tablets (landscape) */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Mobile-First Approach
```tsx
// Tailwind responsive classes
<div className="text-sm sm:text-base md:text-lg lg:text-xl">
  Responsive text size
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {/* Grid layout adapts to screen size */}
</div>
```

---

## Icons & Visual Elements

### Icon Specifications
| Property | Value |
|----------|-------|
| Font | Lucide React |
| Default Size | 24px |
| Stroke Width | 2px |
| Color | Inherit from text |

### Icon Sizes
```tsx
<Icon size={16} /> {/* Small */}
<Icon size={24} /> {/* Default */}
<Icon size={32} /> {/* Large */}
<Icon size={48} /> {/* Extra Large */}
```

### Badge & Status Indicators

#### Status Colors
```css
Success: #10b981 (Green)
Warning: #f59e0b (Orange)
Error: #ef4444 (Red)
Info: #3b82f6 (Blue)
Pending: #f59e0b (Orange)
Completed: #10b981 (Green)
Cancelled: #6b7280 (Gray)
```

---

## Animation & Transitions

### Timing Functions
```css
ease-in: cubic-bezier(0.4, 0, 1, 1)
ease-out: cubic-bezier(0, 0, 0.2, 1)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### Duration Standards
```css
Fast: 150ms     /* UI feedback */
Normal: 300ms   /* Transitions */
Slow: 500ms     /* Page changes */
```

### Common Animations
```tsx
// Tailwind animation classes
<div className="animate-pulse">      {/* Pulsing effect */}
<div className="animate-bounce">     {/* Bouncing */}
<div className="transition-all duration-300 ease-out"> {/* Smooth transition */}
```

---

## Accessibility (a11y) Guidelines

### WCAG 2.1 Compliance

#### Color Contrast Ratios
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

#### Focus States
```tsx
// Always provide visible focus indicator
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Accessible Button
</button>
```

#### Keyboard Navigation
- Tab order follows logical flow
- All interactive elements are keyboard accessible
- Escape key closes modals
- Enter key submits forms

#### Screen Reader Support
```tsx
<button aria-label="Close modal">×</button>
<div role="alert" aria-live="polite">
  Important message
</div>
<img alt="Descriptive text for image" />
```

### Semantic HTML
```tsx
// Use semantic elements
<nav>     {/* Navigation */}
<main>    {/* Main content */}
<article> {/* Article content */}
<aside>   {/* Sidebar content */}
<footer>  {/* Footer */}
```

---

## Dark Mode Support

### Dark Color Scheme
```css
Background: #1f2937 (Gray-800)
Surface: #111827 (Gray-900)
Text: #f3f4f6 (Gray-100)
Border: #374151 (Gray-700)
```

### Implementation
```tsx
// Using Tailwind dark mode
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  Content adapts to dark mode
</div>
```

---

## Best Practices

### ✅ Do's
- Use consistent spacing and alignment
- Maintain visual hierarchy with typography
- Provide clear feedback for user actions
- Use appropriate color contrast
- Make interactive elements obvious
- Test on multiple devices
- Use semantic HTML
- Implement proper error messages
- Provide loading states
- Use micro-interactions for feedback

### ❌ Don'ts
- Don't use color alone to convey information
- Don't create inaccessible forms
- Don't use auto-playing media
- Don't rely on hover for mobile
- Don't use outdated technology
- Don't ignore keyboard navigation
- Don't create unnecessary animations
- Don't use unclear icons without labels
- Don't ignore loading states
- Don't use pure black (#000000)

---

## Component Library

### Available Components (shadcn/ui)
- Button, Input, Card
- Dialog, Popover, Dropdown Menu
- Table, Tabs, Accordion
- Avatar, Badge, Toast
- Loading Spinner, Skeleton
- Select, Checkbox, Radio
- Slider, Progress Bar
- Tooltip, Alert

### Usage Example
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter something..." />
      <Button variant="primary">Submit</Button>
    </Card>
  )
}
```

---

## Testing & Quality Assurance

### Design Review Checklist
- [ ] Color contrast meets WCAG standards
- [ ] Typography hierarchy is clear
- [ ] Spacing is consistent
- [ ] Components are responsive
- [ ] Focus states are visible
- [ ] Animations are smooth
- [ ] Icons are appropriate
- [ ] States are clearly defined
- [ ] Error messages are helpful
- [ ] Loading states are shown

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS 14+, Android 10+)

---

## Figma Design File

All components and designs are available in Figma:
- **URL**: https://figma.com/file/madallah-dashboard
- **Components Library**: Design System
- **Pages**: Web Mockups, Mobile Mockups, Components

---

## Version Control

- **Version**: 1.0.0
- **Last Updated**: June 2026
- **Maintained by**: Design Team

---

**Next Steps**: Refer to [ARCHITECTURE.md](./ARCHITECTURE.md) for technical implementation details.
