/**
 * Example Component: Attendance Badge
 * 
 * This demonstrates how to use status colors from the theme.
 * NEVER hardcode colors - always import from theme!
 */

import { AppColors, BorderRadius, FontSizes, Spacing } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type AttendanceStatus = 'present' | 'absent' | 'late';

interface AttendanceBadgeProps {
  status: AttendanceStatus;
  showIcon?: boolean;
}

/**
 * A badge component for displaying attendance status
 */
export const AttendanceBadge: React.FC<AttendanceBadgeProps> = ({ 
  status,
  showIcon = true,
}) => {
  // Get status configuration
  const getStatusConfig = () => {
    switch (status) {
      case 'present':
        return {
          backgroundColor: AppColors.status.success.background,
          textColor: AppColors.status.success.text,
          label: 'Present',
          icon: '✓',
        };
      case 'absent':
        return {
          backgroundColor: AppColors.status.error.background,
          textColor: AppColors.status.error.text,
          label: 'Absent',
          icon: '✗',
        };
      case 'late':
        return {
          backgroundColor: AppColors.status.warning.background,
          textColor: AppColors.status.warning.text,
          label: 'Late',
          icon: '⏱',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View 
      style={[
        styles.badge, 
        { backgroundColor: config.backgroundColor }
      ]}
    >
      <Text style={[styles.text, { color: config.textColor }]}>
        {showIcon && `${config.icon} `}{config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start', // Don't stretch to full width
  },
  text: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
});
