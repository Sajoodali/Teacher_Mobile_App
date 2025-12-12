/**
 * Color Palette Quick Reference
 * 
 * This file provides a visual reference of all colors in the theme.
 * Use this as a quick lookup when building components.
 */

import { AppColors, BorderRadius, FontSizes, Spacing } from '@/constants/theme';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface ColorSwatchProps {
  colorName: string;
  colorValue: string;
  description?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ colorName, colorValue, description }) => (
  <View style={styles.swatchContainer}>
    <View style={[styles.colorBox, { backgroundColor: colorValue }]} />
    <View style={styles.textContainer}>
      <Text style={styles.colorName}>{colorName}</Text>
      <Text style={styles.colorValue}>{colorValue}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  </View>
);

/**
 * Color Palette Reference Screen
 * 
 * This component displays all available colors in the theme.
 * Use this for reference when building new components.
 */
export const ColorPaletteReference: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Color Palette Reference</Text>
      
      {/* Primary Colors */}
      <Text style={styles.sectionTitle}>Primary Colors</Text>
      <Text style={styles.sectionDescription}>Use for main buttons, headers, and key UI elements</Text>
      <ColorSwatch colorName="Primary Main" colorValue={AppColors.primary.main} description="Main primary color" />
      <ColorSwatch colorName="Primary Light" colorValue={AppColors.primary.light} description="Hover/pressed states" />
      <ColorSwatch colorName="Primary Dark" colorValue={AppColors.primary.dark} description="Depth and shadows" />
      <ColorSwatch colorName="Primary Contrast" colorValue={AppColors.primary.contrast} description="Text on primary" />

      {/* Secondary Colors */}
      <Text style={styles.sectionTitle}>Secondary Colors</Text>
      <Text style={styles.sectionDescription}>Use for accents and active states</Text>
      <ColorSwatch colorName="Secondary Main" colorValue={AppColors.secondary.main} description="Main secondary color" />
      <ColorSwatch colorName="Secondary Light" colorValue={AppColors.secondary.light} description="Highlights" />
      <ColorSwatch colorName="Secondary Dark" colorValue={AppColors.secondary.dark} description="Depth" />
      <ColorSwatch colorName="Secondary Contrast" colorValue={AppColors.secondary.contrast} description="Text on secondary" />

      {/* Background Colors */}
      <Text style={styles.sectionTitle}>Background Colors</Text>
      <Text style={styles.sectionDescription}>Use for screen backgrounds and surfaces</Text>
      <ColorSwatch colorName="Background Primary" colorValue={AppColors.background.primary} description="Main background (white)" />
      <ColorSwatch colorName="Background Secondary" colorValue={AppColors.background.secondary} description="Cards and sections" />
      <ColorSwatch colorName="Background Tertiary" colorValue={AppColors.background.tertiary} description="Borders and dividers" />

      {/* Text Colors */}
      <Text style={styles.sectionTitle}>Text Colors</Text>
      <Text style={styles.sectionDescription}>Use for all text elements</Text>
      <ColorSwatch colorName="Text Primary" colorValue={AppColors.text.primary} description="Main text (dark)" />
      <ColorSwatch colorName="Text Secondary" colorValue={AppColors.text.secondary} description="Secondary text (grey)" />
      <ColorSwatch colorName="Text Tertiary" colorValue={AppColors.text.tertiary} description="Tertiary text (light grey)" />
      <ColorSwatch colorName="Text Disabled" colorValue={AppColors.text.disabled} description="Disabled text" />
      <ColorSwatch colorName="Text Inverse" colorValue={AppColors.text.inverse} description="Text on dark backgrounds" />

      {/* Status Colors - Success */}
      <Text style={styles.sectionTitle}>Status: Success (Present/Pass)</Text>
      <Text style={styles.sectionDescription}>Use for attendance present, passing grades</Text>
      <ColorSwatch colorName="Success Main" colorValue={AppColors.status.success.main} description="Main success color" />
      <ColorSwatch colorName="Success Light" colorValue={AppColors.status.success.light} description="Light variant" />
      <ColorSwatch colorName="Success Dark" colorValue={AppColors.status.success.dark} description="Dark variant" />
      <ColorSwatch colorName="Success Background" colorValue={AppColors.status.success.background} description="Background for badges" />
      <ColorSwatch colorName="Success Text" colorValue={AppColors.status.success.text} description="Text on success bg" />

      {/* Status Colors - Error */}
      <Text style={styles.sectionTitle}>Status: Error (Absent/Fail)</Text>
      <Text style={styles.sectionDescription}>Use for attendance absent, failing grades</Text>
      <ColorSwatch colorName="Error Main" colorValue={AppColors.status.error.main} description="Main error color" />
      <ColorSwatch colorName="Error Light" colorValue={AppColors.status.error.light} description="Light variant" />
      <ColorSwatch colorName="Error Dark" colorValue={AppColors.status.error.dark} description="Dark variant" />
      <ColorSwatch colorName="Error Background" colorValue={AppColors.status.error.background} description="Background for badges" />
      <ColorSwatch colorName="Error Text" colorValue={AppColors.status.error.text} description="Text on error bg" />

      {/* Status Colors - Warning */}
      <Text style={styles.sectionTitle}>Status: Warning (Late/Pending)</Text>
      <Text style={styles.sectionDescription}>Use for late attendance, pending items</Text>
      <ColorSwatch colorName="Warning Main" colorValue={AppColors.status.warning.main} description="Main warning color" />
      <ColorSwatch colorName="Warning Light" colorValue={AppColors.status.warning.light} description="Light variant" />
      <ColorSwatch colorName="Warning Dark" colorValue={AppColors.status.warning.dark} description="Dark variant" />
      <ColorSwatch colorName="Warning Background" colorValue={AppColors.status.warning.background} description="Background for badges" />
      <ColorSwatch colorName="Warning Text" colorValue={AppColors.status.warning.text} description="Text on warning bg" />

      {/* Status Colors - Info */}
      <Text style={styles.sectionTitle}>Status: Info</Text>
      <Text style={styles.sectionDescription}>Use for informational messages</Text>
      <ColorSwatch colorName="Info Main" colorValue={AppColors.status.info.main} description="Main info color" />
      <ColorSwatch colorName="Info Light" colorValue={AppColors.status.info.light} description="Light variant" />
      <ColorSwatch colorName="Info Dark" colorValue={AppColors.status.info.dark} description="Dark variant" />
      <ColorSwatch colorName="Info Background" colorValue={AppColors.status.info.background} description="Background for badges" />
      <ColorSwatch colorName="Info Text" colorValue={AppColors.status.info.text} description="Text on info bg" />

      {/* UI Colors */}
      <Text style={styles.sectionTitle}>UI Colors</Text>
      <Text style={styles.sectionDescription}>Additional utility colors</Text>
      <ColorSwatch colorName="Border" colorValue={AppColors.ui.border} description="Border color" />
      <ColorSwatch colorName="Divider" colorValue={AppColors.ui.divider} description="Divider color" />
      <ColorSwatch colorName="Shadow" colorValue={AppColors.ui.shadow} description="Shadow color" />
      <ColorSwatch colorName="Overlay" colorValue={AppColors.ui.overlay} description="Modal backdrop" />
      <ColorSwatch colorName="Card" colorValue={AppColors.ui.card} description="Card background" />
      <ColorSwatch colorName="Input Background" colorValue={AppColors.ui.input.background} description="Input field bg" />
      <ColorSwatch colorName="Input Border" colorValue={AppColors.ui.input.border} description="Input border" />
      <ColorSwatch colorName="Input Focus" colorValue={AppColors.ui.input.focus} description="Input focus state" />
      <ColorSwatch colorName="Input Error" colorValue={AppColors.ui.input.error} description="Input error state" />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Remember: NEVER hardcode these hex values in components!
        </Text>
        <Text style={styles.footerText}>
          Always import from @/constants/theme
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
    padding: Spacing.md,
  },
  title: {
    fontSize: FontSizes['3xl'],
    fontWeight: 'bold',
    color: AppColors.text.primary,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: AppColors.text.primary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  sectionDescription: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
    marginBottom: Spacing.md,
  },
  swatchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    backgroundColor: AppColors.background.secondary,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  colorBox: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
  },
  textContainer: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  colorName: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.text.primary,
  },
  colorValue: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
    fontFamily: 'monospace',
  },
  description: {
    fontSize: FontSizes.xs,
    color: AppColors.text.tertiary,
    marginTop: 2,
  },
  footer: {
    marginTop: Spacing.xl,
    marginBottom: Spacing['2xl'],
    padding: Spacing.md,
    backgroundColor: AppColors.status.info.background,
    borderRadius: BorderRadius.md,
  },
  footerText: {
    fontSize: FontSizes.sm,
    color: AppColors.status.info.text,
    textAlign: 'center',
    marginVertical: 2,
  },
});
