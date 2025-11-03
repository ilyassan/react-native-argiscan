import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [currentPage, setCurrentPage] = useState(0);

  const features = [
    {
      icon: 'flask' as const,
      title: 'Intelligent Diagnosis',
      description: 'Snap a photo of your plant and get an instant diagnosis.',
    },
    {
      icon: 'thermometer' as const,
      title: 'Climate-Adapted Recommendations',
      description: 'Get treatment advice tailored to your location and weather.',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800' }}
          style={styles.heroImage}
          imageStyle={styles.heroImageStyle}
        >
          <View style={styles.logoContainer}>
            <View style={[styles.logoBadge, { backgroundColor: colors.primary }]}>
              <Ionicons name="leaf" size={32} color="#FFFFFF" />
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            Smarter Farming, Healthier Harvests
          </Text>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Your pocket-sized agronomist. Instantly diagnose crop diseases, get tailored
            treatment plans, and connect with a community of experts.
          </Text>

          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <Card key={index} style={styles.featureCard} variant="outlined">
                <View style={[styles.iconCircle, { backgroundColor: colors.primary + '20' }]}>
                  <Ionicons name={feature.icon} size={24} color={colors.primary} />
                </View>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  {feature.title}
                </Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  {feature.description}
                </Text>
              </Card>
            ))}
          </View>

          <View style={styles.paginationContainer}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor: index === 0 ? colors.primary : colors.border,
                  },
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Get Started"
              onPress={() => router.push('/(tabs)')}
              fullWidth
            />
            <View style={styles.signInContainer}>
              <Text style={[styles.signInText, { color: colors.textSecondary }]}>
                Already have an account?{' '}
              </Text>
              <Text style={[styles.signInLink, { color: colors.primary }]}>
                Sign In
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroImage: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
  },
  heroImageStyle: {
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  logoContainer: {
    padding: Spacing.md,
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: FontSizes.base,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  featuresContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  featureCard: {
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  featureTitle: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  featureDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
  },
  buttonContainer: {
    gap: Spacing.md,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: FontSizes.sm,
  },
  signInLink: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
  },
});
