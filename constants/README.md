# 🎨 Theme System - Teacher Mobile App

## Overview

This document provides a complete guide to the global theme system for the Teacher Mobile App. The theme system ensures consistent styling across the entire application and makes it easy to maintain and update the app's visual design.

---

## 🚨 **STRICT RULE**

**NEVER hardcode hex color codes in your components!**

Always import colors from `@/constants/theme`. This ensures:

- ✅ Consistency across the app
- ✅ Easy theme updates
- ✅ Better maintainability
- ✅ Support for dark mode in the future
- ✅ Type safety with TypeScript

---

## 📁 File Structure

```
constants/
├── theme.ts                    # Main theme file (USE THIS!)
├── theme.types.ts              # TypeScript type definitions
└── THEME_USAGE_GUIDE.md        # Detailed usage examples
```

---

## 🎯 Quick Start

### Basic Import

```typescript
import { AppColors, Spacing, BorderRadius, FontSizes } from "@/constants/theme";
```

### Basic Usage

```tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppColors, Spacing, FontSizes } from "@/constants/theme";

export const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.background.primary,
    padding: Spacing.md,
  },
  title: {
    color: AppColors.text.primary,
    fontSize: FontSizes.xl,
  },
});
```

---

## 🎨 Color Palette

### Primary Colors (Professional Blue)

**Use for:** Main buttons, headers, key UI elements

```typescript
AppColors.primary.main; // #4A90E2
AppColors.primary.light; // #6BA3E8
AppColors.primary.dark; // #3A7BC8
AppColors.primary.contrast; // #FFFFFF
```

### Secondary Colors (Purple Accent)

**Use for:** Accents, active states, highlights

```typescript
AppColors.secondary.main; // #7B68EE
AppColors.secondary.light; // #9B88FF
AppColors.secondary.dark; // #5B48CE
AppColors.secondary.contrast; // #FFFFFF
```

### Background Colors

**Use for:** Screen backgrounds, cards, surfaces

```typescript
AppColors.background.primary; // #FFFFFF (white)
AppColors.background.secondary; // #F5F7FA (light grey)
AppColors.background.tertiary; // #E8EBF0 (darker grey)
```

### Text Colors

**Use for:** All text elements

```typescript
AppColors.text.primary; // #1A1A1A (dark)
AppColors.text.secondary; // #6B7280 (grey)
AppColors.text.tertiary; // #9CA3AF (light grey)
AppColors.text.disabled; // #D1D5DB (disabled)
AppColors.text.inverse; // #FFFFFF (on dark backgrounds)
```

### Status Colors

#### ✅ Success (Present / Pass)

```typescript
AppColors.status.success.main; // #10B981
AppColors.status.success.background; // #D1FAE5
AppColors.status.success.text; // #065F46
```

#### ❌ Error (Absent / Fail)

```typescript
AppColors.status.error.main; // #EF4444
AppColors.status.error.background; // #FEE2E2
AppColors.status.error.text; // #991B1B
```

#### ⚠️ Warning (Late / Pending)

```typescript
AppColors.status.warning.main; // #F59E0B
AppColors.status.warning.background; // #FEF3C7
AppColors.status.warning.text; // #92400E
```

#### ℹ️ Info

```typescript
AppColors.status.info.main; // #3B82F6
AppColors.status.info.background; // #DBEAFE
AppColors.status.info.text; // #1E40AF
```

---

## 📏 Spacing Scale

Use consistent spacing throughout the app:

```typescript
Spacing.xs; // 4px
Spacing.sm; // 8px
Spacing.md; // 16px
Spacing.lg; // 24px
Spacing.xl; // 32px
Spacing["2xl"]; // 48px
Spacing["3xl"]; // 64px
```

**Example:**

```typescript
const styles = StyleSheet.create({
  container: {
    padding: Spacing.md, // 16px
    marginBottom: Spacing.lg, // 24px
  },
});
```

---

## 🔤 Font Sizes

Use consistent font sizes:

```typescript
FontSizes.xs; // 12px
FontSizes.sm; // 14px
FontSizes.base; // 16px
FontSizes.lg; // 18px
FontSizes.xl; // 20px
FontSizes["2xl"]; // 24px
FontSizes["3xl"]; // 30px
FontSizes["4xl"]; // 36px
```

**Example:**

```typescript
const styles = StyleSheet.create({
  heading: {
    fontSize: FontSizes["2xl"], // 24px
  },
  body: {
    fontSize: FontSizes.base, // 16px
  },
});
```

---

## ⭕ Border Radius

Use consistent border radius:

```typescript
BorderRadius.sm; // 4px
BorderRadius.md; // 8px
BorderRadius.lg; // 12px
BorderRadius.xl; // 16px
BorderRadius["2xl"]; // 24px
BorderRadius.full; // 9999px (fully rounded)
```

**Example:**

```typescript
const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg, // 12px
  },
  button: {
    borderRadius: BorderRadius.md, // 8px
  },
});
```

---

## 📚 Example Components

### Example 1: Custom Button

See `components/CustomButton.tsx` for a complete example of:

- Using primary/secondary/status colors
- Handling disabled states
- Implementing loading states
- Using spacing and border radius

### Example 2: Attendance Badge

See `components/AttendanceBadge.tsx` for a complete example of:

- Using status colors (success/error/warning)
- Creating reusable badge components
- Proper color usage for different states

---

## ✅ Best Practices

### DO ✅

```typescript
// ✅ GOOD: Import and use theme colors
import { AppColors } from "@/constants/theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.primary.main,
  },
});
```

### DON'T ❌

```typescript
// ❌ BAD: Hardcoded hex color
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4A90E2", // DON'T DO THIS!
  },
});
```

---

## 🌙 Dark Mode Support

The theme includes a complete dark mode palette under `AppColors.dark`. This is ready for future implementation:

```typescript
AppColors.dark.primary.main;
AppColors.dark.background.primary;
AppColors.dark.text.primary;
// ... etc
```

---

## 🔧 Updating Colors

To update colors across the entire app:

1. Open `constants/theme.ts`
2. Update the color values in the appropriate section
3. Save the file
4. All components using the theme will automatically update!

---

## 📖 Additional Resources

- **Detailed Usage Guide:** See `THEME_USAGE_GUIDE.md` for more examples
- **Type Definitions:** See `theme.types.ts` for TypeScript types
- **Example Components:** See `components/CustomButton.tsx` and `components/AttendanceBadge.tsx`

---

## 🎓 Education App Color Meanings

| Color               | Meaning         | Use Case                                   |
| ------------------- | --------------- | ------------------------------------------ |
| 🔵 Primary Blue     | Main actions    | Login buttons, headers, primary CTAs       |
| 🟣 Secondary Purple | Accents         | Active tabs, highlights, secondary actions |
| 🟢 Green            | Success/Present | Attendance present, passing grades         |
| 🔴 Red              | Error/Absent    | Attendance absent, failing grades          |
| 🟡 Yellow/Amber     | Warning/Late    | Late attendance, pending items             |
| ⚪ Grey             | Neutral         | Backgrounds, disabled states, borders      |

---

## 💡 Tips

1. **Use semantic names**: Choose colors based on their purpose (e.g., `AppColors.status.success.main` for success states)
2. **Be consistent**: Use the same color for the same purpose throughout the app
3. **Think accessibility**: Ensure good contrast between text and backgrounds
4. **Use the spacing scale**: Don't use arbitrary numbers like `padding: 13`
5. **Leverage TypeScript**: The theme is fully typed for autocomplete support

---

## 🚀 Next Steps

1. ✅ Theme system is set up
2. ⏭️ Start building components using the theme
3. ⏭️ Create screens with consistent styling
4. ⏭️ Implement dark mode (future)

---

**Remember:** NEVER hardcode colors! Always use the theme! 🎨
