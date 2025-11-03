import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
  variant?: 'default' | 'outlined' | 'elevated';
}

export default function Card({
  children,
  style,
  noPadding = false,
  variant = 'default'
}: CardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: colors.backgroundCard,
      borderRadius: BorderRadius.lg,
      padding: noPadding ? 0 : Spacing.md,
    };

    const variantStyles: Record<string, ViewStyle> = {
      default: {
        ...Shadows.sm,
      },
      outlined: {
        borderWidth: 1,
        borderColor: colors.border,
      },
      elevated: {
        ...Shadows.md,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
}
