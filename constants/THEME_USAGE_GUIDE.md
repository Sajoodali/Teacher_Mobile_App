# Theme Usage Guide

## 📋 Overview

This guide explains how to use the global theme system in the Teacher Mobile App. **NEVER hardcode hex color codes in your components!** Always import and use colors from the theme file.

---

## 🎨 Available Color Palettes

### 1. **Primary Colors** (Professional Blue)
Used for main buttons, headers, and key UI elements.

```typescript
import { AppColors } from '@/constants/theme';

// Available shades:
AppColors.primary.main      // #4A90E2 - Main primary color
AppColors.primary.light     // #6BA3E8 - Lighter shade (hover/pressed)
AppColors.primary.dark      // #3A7BC8 - Darker shade (depth)
AppColors.primary.contrast  // #FFFFFF - Text on primary background
```

**Example Usage:**
```tsx
<TouchableOpacity 
  style={{ 
    backgroundColor: AppColors.primary.main,
    padding: 16,
    borderRadius: 8
  }}
>
  <Text style={{ color: AppColors.primary.contrast }}>
    Login
  </Text>
</TouchableOpacity>
```

---

### 2. **Secondary Colors** (Purple Accent)
Used for accents and active states.

```typescript
AppColors.secondary.main      // #7B68EE - Main secondary color
AppColors.secondary.light     // #9B88FF - Lighter purple
AppColors.secondary.dark      // #5B48CE - Darker purple
AppColors.secondary.contrast  // #FFFFFF - Text on secondary background
```

**Example Usage:**
```tsx
<View style={{ backgroundColor: AppColors.secondary.main }}>
  <Text style={{ color: AppColors.secondary.contrast }}>
    Active Tab
  </Text>
</View>
```

---

### 3. **Background Colors**
Used for screen backgrounds and surfaces.

```typescript
AppColors.background.primary    // #FFFFFF - Main background (white)
AppColors.background.secondary  // #F5F7FA - Light grey (cards/sections)
AppColors.background.tertiary   // #E8EBF0 - Darker grey (borders/dividers)
```

**Example Usage:**
```tsx
<View style={{ backgroundColor: AppColors.background.primary }}>
  <View style={{ 
    backgroundColor: AppColors.background.secondary,
    padding: 16,
    borderRadius: 8
  }}>
    <Text>Card Content</Text>
  </View>
</View>
```

---

### 4. **Text Colors**
Used for all text elements.

```typescript
AppColors.text.primary    // #1A1A1A - Main text (dark)
AppColors.text.secondary  // #6B7280 - Secondary text (grey)
AppColors.text.tertiary   // #9CA3AF - Tertiary text (lighter grey)
AppColors.text.disabled   // #D1D5DB - Disabled text
AppColors.text.inverse    // #FFFFFF - Text on dark backgrounds
```

**Example Usage:**
```tsx
<View>
  <Text style={{ color: AppColors.text.primary, fontSize: 18 }}>
    Main Heading
  </Text>
  <Text style={{ color: AppColors.text.secondary, fontSize: 14 }}>
    Subtitle or description
  </Text>
</View>
```

---

### 5. **Status Colors**
Used for attendance, grades, and status indicators.

#### ✅ Success (Present / Pass)
```typescript
AppColors.status.success.main        // #10B981 - Green
AppColors.status.success.light       // #34D399 - Light green
AppColors.status.success.dark        // #059669 - Dark green
AppColors.status.success.background  // #D1FAE5 - Light green bg
AppColors.status.success.text        // #065F46 - Dark green text
```

**Example Usage:**
```tsx
<View style={{ 
  backgroundColor: AppColors.status.success.background,
  padding: 12,
  borderRadius: 8
}}>
  <Text style={{ color: AppColors.status.success.text }}>
    ✓ Present
  </Text>
</View>
```

#### ❌ Error (Absent / Fail)
```typescript
AppColors.status.error.main        // #EF4444 - Red
AppColors.status.error.light       // #F87171 - Light red
AppColors.status.error.dark        // #DC2626 - Dark red
AppColors.status.error.background  // #FEE2E2 - Light red bg
AppColors.status.error.text        // #991B1B - Dark red text
```

**Example Usage:**
```tsx
<View style={{ 
  backgroundColor: AppColors.status.error.background,
  padding: 12,
  borderRadius: 8
}}>
  <Text style={{ color: AppColors.status.error.text }}>
    ✗ Absent
  </Text>
</View>
```

#### ⚠️ Warning (Late / Pending)
```typescript
AppColors.status.warning.main        // #F59E0B - Amber
AppColors.status.warning.light       // #FBBF24 - Light amber
AppColors.status.warning.dark        // #D97706 - Dark amber
AppColors.status.warning.background  // #FEF3C7 - Light amber bg
AppColors.status.warning.text        // #92400E - Dark amber text
```

**Example Usage:**
```tsx
<View style={{ 
  backgroundColor: AppColors.status.warning.background,
  padding: 12,
  borderRadius: 8
}}>
  <Text style={{ color: AppColors.status.warning.text }}>
    ⏱ Late
  </Text>
</View>
```

#### ℹ️ Info
```typescript
AppColors.status.info.main        // #3B82F6 - Blue
AppColors.status.info.light       // #60A5FA - Light blue
AppColors.status.info.dark        // #2563EB - Dark blue
AppColors.status.info.background  // #DBEAFE - Light blue bg
AppColors.status.info.text        // #1E40AF - Dark blue text
```

---

### 6. **UI Colors**
Additional utility colors for borders, shadows, etc.

```typescript
AppColors.ui.border              // #E5E7EB - Border color
AppColors.ui.divider             // #F3F4F6 - Divider color
AppColors.ui.shadow              // #00000029 - Shadow color
AppColors.ui.overlay             // #00000080 - Overlay/modal backdrop
AppColors.ui.card                // #FFFFFF - Card background
AppColors.ui.input.background    // #F9FAFB - Input background
AppColors.ui.input.border        // #D1D5DB - Input border
AppColors.ui.input.focus         // Primary blue - Input focus
AppColors.ui.input.error         // Error red - Input error
```

**Example Usage:**
```tsx
<TextInput
  style={{
    backgroundColor: AppColors.ui.input.background,
    borderWidth: 1,
    borderColor: AppColors.ui.input.border,
    padding: 12,
    borderRadius: 8
  }}
  placeholderTextColor={AppColors.text.tertiary}
/>
```

---

### 7. **Dark Mode Colors**
Complete dark theme palette (for future dark mode support).

```typescript
AppColors.dark.primary.main
AppColors.dark.secondary.main
AppColors.dark.background.primary
AppColors.dark.text.primary
// ... etc
```

---

## 📏 Additional Theme Utilities

### Font Sizes
```typescript
import { FontSizes } from '@/constants/theme';

FontSizes.xs    // 12
FontSizes.sm    // 14
FontSizes.base  // 16
FontSizes.lg    // 18
FontSizes.xl    // 20
FontSizes['2xl'] // 24
FontSizes['3xl'] // 30
FontSizes['4xl'] // 36
```

### Spacing
```typescript
import { Spacing } from '@/constants/theme';

Spacing.xs    // 4
Spacing.sm    // 8
Spacing.md    // 16
Spacing.lg    // 24
Spacing.xl    // 32
Spacing['2xl'] // 48
Spacing['3xl'] // 64
```

### Border Radius
```typescript
import { BorderRadius } from '@/constants/theme';

BorderRadius.sm    // 4
BorderRadius.md    // 8
BorderRadius.lg    // 12
BorderRadius.xl    // 16
BorderRadius['2xl'] // 24
BorderRadius.full  // 9999 (fully rounded)
```

---

## 🚀 Complete Component Example

Here's a complete example of a button component using the theme:

```tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppColors, Spacing, BorderRadius, FontSizes } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'error';
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary' 
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary': return AppColors.primary.main;
      case 'secondary': return AppColors.secondary.main;
      case 'success': return AppColors.status.success.main;
      case 'error': return AppColors.status.error.main;
      default: return AppColors.primary.main;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: getBackgroundColor() }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: AppColors.text.inverse,
    fontSize: FontSizes.base,
    fontWeight: '600',
  },
});
```

---

## 📱 Attendance Status Example

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppColors, Spacing, BorderRadius, FontSizes } from '@/constants/theme';

type AttendanceStatus = 'present' | 'absent' | 'late';

interface AttendanceBadgeProps {
  status: AttendanceStatus;
}

export const AttendanceBadge: React.FC<AttendanceBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'present':
        return {
          bg: AppColors.status.success.background,
          text: AppColors.status.success.text,
          label: 'Present',
        };
      case 'absent':
        return {
          bg: AppColors.status.error.background,
          text: AppColors.status.error.text,
          label: 'Absent',
        };
      case 'late':
        return {
          bg: AppColors.status.warning.background,
          text: AppColors.status.warning.text,
          label: 'Late',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  text: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
});
```

---

## ⚠️ IMPORTANT RULES

1. **NEVER hardcode hex colors** in your components
2. **ALWAYS import** from `@/constants/theme`
3. **Use semantic naming** - choose colors based on their purpose, not their appearance
4. **Be consistent** - use the same color for the same purpose across the app
5. **Think accessibility** - ensure sufficient contrast between text and backgrounds

---

## 🎯 Quick Reference

**For buttons/headers:** `AppColors.primary.*`  
**For accents/active states:** `AppColors.secondary.*`  
**For backgrounds:** `AppColors.background.*`  
**For text:** `AppColors.text.*`  
**For attendance/grades:**
- Present/Pass: `AppColors.status.success.*`
- Absent/Fail: `AppColors.status.error.*`
- Late/Pending: `AppColors.status.warning.*`

---

## 📝 Notes

- The theme includes both light and dark mode colors
- All colors are designed to be professional and accessible
- The color palette follows modern design principles
- Status colors are optimized for educational contexts

Happy coding! 🚀
