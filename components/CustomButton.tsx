/**
 * Example Component: Custom Button
 * 
 * This demonstrates how to properly use the theme system.
 * NEVER hardcode colors - always import from theme!
 */

import { AppColors, BorderRadius, FontSizes, Spacing } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

/**
 * A reusable button component that follows the app's theme
 */
export const CustomButton: React.FC<CustomButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  // Get colors based on variant
  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return {
          background: AppColors.primary.main,
          text: AppColors.primary.contrast,
        };
      case 'secondary':
        return {
          background: AppColors.secondary.main,
          text: AppColors.secondary.contrast,
        };
      case 'success':
        return {
          background: AppColors.status.success.main,
          text: AppColors.text.inverse,
        };
      case 'error':
        return {
          background: AppColors.status.error.main,
          text: AppColors.text.inverse,
        };
      case 'warning':
        return {
          background: AppColors.status.warning.main,
          text: AppColors.text.inverse,
        };
      default:
        return {
          background: AppColors.primary.main,
          text: AppColors.primary.contrast,
        };
    }
  };

  const colors = getButtonColors();
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { 
          backgroundColor: isDisabled 
            ? AppColors.ui.border 
            : colors.background,
        },
        fullWidth && styles.fullWidth,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <Text 
          style={[
            styles.text, 
            { 
              color: isDisabled 
                ? AppColors.text.disabled 
                : colors.text 
            }
          ]}
        >
          {title}
        </Text>
      )}
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
    minHeight: 48, // Good for accessibility
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontSize: FontSizes.base,
    fontWeight: '600',
  },
});
