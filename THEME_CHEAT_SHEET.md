# 🎨 Theme Cheat Sheet - Quick Reference

## Import Statement

```typescript
import { AppColors, Spacing, BorderRadius, FontSizes } from "@/constants/theme";
```

---

## 🎨 Colors Quick Reference

### Primary (Blue)

```typescript
AppColors.primary.main; // #4A90E2 - Buttons, headers
AppColors.primary.light; // #6BA3E8 - Hover states
AppColors.primary.dark; // #3A7BC8 - Depth
AppColors.primary.contrast; // #FFFFFF - Text on primary
```

### Secondary (Purple)

```typescript
AppColors.secondary.main; // #7B68EE - Accents
AppColors.secondary.light; // #9B88FF - Highlights
AppColors.secondary.dark; // #5B48CE - Depth
AppColors.secondary.contrast; // #FFFFFF - Text on secondary
```

### Backgrounds

```typescript
AppColors.background.primary; // #FFFFFF - Main background
AppColors.background.secondary; // #F5F7FA - Cards
AppColors.background.tertiary; // #E8EBF0 - Borders
```

### Text

```typescript
AppColors.text.primary; // #1A1A1A - Main text
AppColors.text.secondary; // #6B7280 - Secondary text
AppColors.text.tertiary; // #9CA3AF - Light text
AppColors.text.disabled; // #D1D5DB - Disabled
AppColors.text.inverse; // #FFFFFF - On dark bg
```

### Status: Success (Present/Pass) ✅

```typescript
AppColors.status.success.main; // #10B981
AppColors.status.success.background; // #D1FAE5
AppColors.status.success.text; // #065F46
```

### Status: Error (Absent/Fail) ❌

```typescript
AppColors.status.error.main; // #EF4444
AppColors.status.error.background; // #FEE2E2
AppColors.status.error.text; // #991B1B
```

### Status: Warning (Late/Pending) ⚠️

```typescript
AppColors.status.warning.main; // #F59E0B
AppColors.status.warning.background; // #FEF3C7
AppColors.status.warning.text; // #92400E
```

### Status: Info ℹ️

```typescript
AppColors.status.info.main; // #3B82F6
AppColors.status.info.background; // #DBEAFE
AppColors.status.info.text; // #1E40AF
```

### UI Colors

```typescript
AppColors.ui.border; // #E5E7EB
AppColors.ui.divider; // #F3F4F6
AppColors.ui.card; // #FFFFFF
AppColors.ui.input.background; // #F9FAFB
AppColors.ui.input.border; // #D1D5DB
AppColors.ui.input.focus; // Primary blue
AppColors.ui.input.error; // Error red
```

---

## 📏 Spacing

```typescript
Spacing.xs; // 4px
Spacing.sm; // 8px
Spacing.md; // 16px   ⭐ Most common
Spacing.lg; // 24px
Spacing.xl; // 32px
Spacing["2xl"]; // 48px
Spacing["3xl"]; // 64px
```

---

## 🔤 Font Sizes

```typescript
FontSizes.xs; // 12px
FontSizes.sm; // 14px
FontSizes.base; // 16px   ⭐ Body text
FontSizes.lg; // 18px
FontSizes.xl; // 20px
FontSizes["2xl"]; // 24px   ⭐ Headings
FontSizes["3xl"]; // 30px
FontSizes["4xl"]; // 36px
```

---

## ⭕ Border Radius

```typescript
BorderRadius.sm; // 4px
BorderRadius.md; // 8px    ⭐ Most common
BorderRadius.lg; // 12px
BorderRadius.xl; // 16px
BorderRadius["2xl"]; // 24px
BorderRadius.full; // 9999px (fully rounded)
```

---

## 🚀 Common Patterns

### Button

```typescript
{
  backgroundColor: AppColors.primary.main,
  paddingVertical: Spacing.md,
  paddingHorizontal: Spacing.lg,
  borderRadius: BorderRadius.md,
}
```

### Card

```typescript
{
  backgroundColor: AppColors.ui.card,
  padding: Spacing.md,
  borderRadius: BorderRadius.lg,
  borderWidth: 1,
  borderColor: AppColors.ui.border,
}
```

### Heading

```typescript
{
  color: AppColors.text.primary,
  fontSize: FontSizes['2xl'],
  fontWeight: '600',
  marginBottom: Spacing.sm,
}
```

### Body Text

```typescript
{
  color: AppColors.text.secondary,
  fontSize: FontSizes.base,
  lineHeight: 24,
}
```

### Success Badge

```typescript
{
  backgroundColor: AppColors.status.success.background,
  paddingVertical: Spacing.xs,
  paddingHorizontal: Spacing.sm,
  borderRadius: BorderRadius.sm,
}
// Text:
{
  color: AppColors.status.success.text,
  fontSize: FontSizes.sm,
  fontWeight: '600',
}
```

### Error Badge

```typescript
{
  backgroundColor: AppColors.status.error.background,
  paddingVertical: Spacing.xs,
  paddingHorizontal: Spacing.sm,
  borderRadius: BorderRadius.sm,
}
// Text:
{
  color: AppColors.status.error.text,
  fontSize: FontSizes.sm,
  fontWeight: '600',
}
```

### Input Field

```typescript
{
  backgroundColor: AppColors.ui.input.background,
  borderWidth: 1,
  borderColor: AppColors.ui.input.border,
  borderRadius: BorderRadius.md,
  padding: Spacing.md,
  fontSize: FontSizes.base,
  color: AppColors.text.primary,
}
```

---

## 🎯 Use Cases

| Element           | Color                            |
| ----------------- | -------------------------------- |
| Login Button      | `AppColors.primary.main`         |
| Header Background | `AppColors.primary.main`         |
| Active Tab        | `AppColors.secondary.main`       |
| Screen Background | `AppColors.background.primary`   |
| Card Background   | `AppColors.background.secondary` |
| Main Heading      | `AppColors.text.primary`         |
| Subtitle          | `AppColors.text.secondary`       |
| Present Badge     | `AppColors.status.success.*`     |
| Absent Badge      | `AppColors.status.error.*`       |
| Late Badge        | `AppColors.status.warning.*`     |
| Border            | `AppColors.ui.border`            |
| Divider           | `AppColors.ui.divider`           |

---

## ⚠️ REMEMBER

❌ **NEVER** do this:

```typescript
backgroundColor: "#4A90E2"; // WRONG!
```

✅ **ALWAYS** do this:

```typescript
backgroundColor: AppColors.primary.main; // CORRECT!
```

---

## 📱 Attendance Status Quick Copy

```typescript
// Present
backgroundColor: AppColors.status.success.background,
color: AppColors.status.success.text,

// Absent
backgroundColor: AppColors.status.error.background,
color: AppColors.status.error.text,

// Late
backgroundColor: AppColors.status.warning.background,
color: AppColors.status.warning.text,
```

---

**Print this and keep it handy! 📌**
