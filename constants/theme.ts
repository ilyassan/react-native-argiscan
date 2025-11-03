/**
 * AgroSense Design System
 * Unified theme configuration for the AgroSense mobile application
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Primary colors
    primary: '#4CAF50',
    primaryLight: '#81C784',
    primaryDark: '#388E3C',

    // Accent colors
    accent: '#66BB6A',
    warning: '#FF9800',
    error: '#F44336',
    success: '#6A994E',

    // Background colors
    background: '#F8F9FA',
    backgroundCard: '#FFFFFF',
    backgroundOverlay: 'rgba(0, 0, 0, 0.5)',

    // Text colors
    text: '#1A1A1A',
    textSecondary: '#666666',
    textLight: '#999999',

    // Border colors
    border: '#E0E0E0',
    borderLight: '#F5F5F5',

    // Status colors
    healthy: '#4CAF50',
    diseased: '#F44336',
    inProgress: '#FF9800',

    // Tab colors
    tabIconDefault: '#999999',
    tabIconSelected: '#4CAF50',

    icon: '#1A1A1A',
    tint: '#4CAF50',
  },
  dark: {
    // Primary colors
    primary: '#4CAF50',
    primaryLight: '#81C784',
    primaryDark: '#2E7D32',

    // Accent colors
    accent: '#90EE90',
    warning: '#FFB74D',
    error: '#EF5350',
    success: '#81C784',

    // Background colors
    background: '#142210',
    backgroundCard: '#1F2E1A',
    backgroundOverlay: 'rgba(0, 0, 0, 0.7)',

    // Text colors
    text: '#E0E0E0',
    textSecondary: '#B0BEC5',
    textLight: '#757575',

    // Border colors
    border: '#37474F',
    borderLight: '#263238',

    // Status colors
    healthy: '#81C784',
    diseased: '#EF5350',
    inProgress: '#FFB74D',

    // Tab colors
    tabIconDefault: '#757575',
    tabIconSelected: '#4CAF50',

    icon: '#E0E0E0',
    tint: '#4CAF50',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const FontWeights = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
