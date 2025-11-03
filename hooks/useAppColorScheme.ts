import { useTheme } from '@/contexts/ThemeContext';

export function useAppColorScheme() {
  const { colorScheme } = useTheme();
  return colorScheme;
}
