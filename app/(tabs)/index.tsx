import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { mockStats, mockWeatherData } from '@/constants/mockData';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const quickActions = [
    {
      icon: 'camera' as const,
      title: 'Diagnose Plant',
      subtitle: 'Take a photo',
      color: colors.primary,
      route: '/diagnose' as const,
    },
    {
      icon: 'leaf' as const,
      title: 'My Crops',
      subtitle: 'Track health',
      color: colors.success,
      route: '/history' as const,
    },
    {
      icon: 'partly-sunny' as const,
      title: 'Weather',
      subtitle: 'View forecast',
      color: colors.warning,
      route: '/weather' as const,
    },
    {
      icon: 'flask' as const,
      title: 'Treatments',
      subtitle: 'Browse options',
      color: colors.accent,
      route: '/treatments' as const,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              Good Morning
            </Text>
            <Text style={[styles.userName, { color: colors.text }]}>Farmer John</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <Card style={styles.weatherCard} variant="elevated">
          <View style={styles.weatherContent}>
            <View style={styles.weatherLeft}>
              <Text style={[styles.weatherTemp, { color: colors.text }]}>
                {mockWeatherData.current.temperature}°C
              </Text>
              <Text style={[styles.weatherCondition, { color: colors.textSecondary }]}>
                {mockWeatherData.current.condition}
              </Text>
              <Text style={[styles.weatherDetails, { color: colors.textLight }]}>
                Humidity: {mockWeatherData.current.humidity}% | Wind: {mockWeatherData.current.wind} km/h
              </Text>
            </View>
            <View style={styles.weatherIcon}>
              <Ionicons name="sunny" size={60} color="#FDB813" />
            </View>
          </View>
        </Card>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {mockStats.totalDiagnoses}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Total Diagnoses
            </Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.healthy }]}>
              {mockStats.healthyPlants}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Healthy Plants
            </Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.diseased }]}>
              {mockStats.diseasedPlants}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Diseased Plants
            </Text>
          </Card>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>

        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => router.push(action.route as any)}
            >
              <Card style={styles.actionCardInner}>
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon} size={28} color={action.color} />
                </View>
                <Text style={[styles.actionTitle, { color: colors.text }]}>
                  {action.title}
                </Text>
                <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
                  {action.subtitle}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <Card style={styles.promoCard}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400' }}
            style={styles.promoBackground}
            imageStyle={styles.promoImage}
          >
            <View style={styles.promoOverlay}>
              <Text style={styles.promoTitle}>Expert Support Available</Text>
              <Text style={styles.promoText}>
                Connect with agricultural experts for personalized advice
              </Text>
              <Button
                title="Learn More"
                variant="secondary"
                size="small"
                onPress={() => {}}
                style={styles.promoButton}
              />
            </View>
          </ImageBackground>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs / 2,
  },
  userName: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherCard: {
    marginBottom: Spacing.lg,
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherLeft: {
    flex: 1,
  },
  weatherTemp: {
    fontSize: FontSizes.huge,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  weatherCondition: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.xs / 2,
  },
  weatherDetails: {
    fontSize: FontSizes.sm,
  },
  weatherIcon: {
    marginLeft: Spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  actionCard: {
    width: '47%',
  },
  actionCardInner: {
    alignItems: 'center',
    padding: Spacing.lg,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  actionTitle: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.xs / 2,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: FontSizes.xs,
    textAlign: 'center',
  },
  promoCard: {
    overflow: 'hidden',
    marginTop: Spacing.md,
  },
  promoBackground: {
    width: '100%',
    height: 180,
  },
  promoImage: {
    borderRadius: BorderRadius.lg,
  },
  promoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  promoTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  promoText: {
    fontSize: FontSizes.sm,
    color: '#FFFFFF',
    marginBottom: Spacing.md,
  },
  promoButton: {
    alignSelf: 'flex-start',
  },
});
