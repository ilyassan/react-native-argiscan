import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

interface BadgeProps {
  text: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  style?: ViewStyle;
}

export default function Badge({ text, variant = 'default', style }: BadgeProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getBadgeStyle = (): ViewStyle => {
    const variantStyles: Record<string, ViewStyle> = {
      success: {
        backgroundColor: colorScheme === 'light'
          ? 'rgba(106, 153, 78, 0.2)'
          : 'rgba(129, 199, 132, 0.2)',
      },
      warning: {
        backgroundColor: colorScheme === 'light'
          ? 'rgba(255, 152, 0, 0.2)'
          : 'rgba(255, 183, 77, 0.2)',
      },
      error: {
        backgroundColor: colorScheme === 'light'
          ? 'rgba(244, 67, 54, 0.2)'
          : 'rgba(239, 83, 80, 0.2)',
      },
      info: {
        backgroundColor: colorScheme === 'light'
          ? 'rgba(76, 175, 80, 0.2)'
          : 'rgba(129, 199, 132, 0.2)',
      },
      default: {
        backgroundColor: colors.borderLight,
      },
    };

    return variantStyles[variant];
  };

  const getTextStyle = (): TextStyle => {
    const variantStyles: Record<string, TextStyle> = {
      success: {
        color: colors.healthy,
      },
      warning: {
        color: colors.warning,
      },
      error: {
        color: colors.diseased,
      },
      info: {
        color: colors.primary,
      },
      default: {
        color: colors.text,
      },
    };

    return variantStyles[variant];
  };

  return (
    <View style={[styles.container, getBadgeStyle(), style]}>
      <Text style={[styles.text, getTextStyle()]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
  },
});
