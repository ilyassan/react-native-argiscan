import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import { mockStats, mockDiagnosisHistory } from '@/constants/mockData';

export default function HistoryScreen() {
  const colors = Colors.dark;
  const [selectedCrop, setSelectedCrop] = useState('All');

  const cropTypes = ['All', 'Tomato', 'Corn', 'Potato'];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Treated':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Pending':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Diagnosis History
          </Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Total Diagnoses
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {mockStats.totalDiagnoses}
            </Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statLabel, { color: colors.healthy }]}>
              Healthy Plants
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {mockStats.healthyPlants}
            </Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statLabel, { color: colors.diseased }]}>
              Diseased Plants
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {mockStats.diseasedPlants}
            </Text>
          </Card>
        </View>

        <Card style={styles.healthCard} variant="elevated">
          <View style={styles.healthHeader}>
            <Text style={[styles.healthTitle, { color: colors.text }]}>
              Crop Health Over Time
            </Text>
            <Text style={[styles.healthTrend, { color: colors.healthy }]}>
              {mockStats.healthTrend}
            </Text>
          </View>
          <Text style={[styles.healthPercentage, { color: colors.text }]}>
            {mockStats.healthPercentage}% Healthy
          </Text>
          <Text style={[styles.healthPeriod, { color: colors.textSecondary }]}>
            Last 30 Days
          </Text>
          <View style={styles.chartPlaceholder}>
            <Ionicons name="stats-chart" size={48} color={colors.border} />
          </View>
        </Card>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {cropTypes.map((crop) => (
            <TouchableOpacity
              key={crop}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    selectedCrop === crop ? colors.primary : colors.backgroundCard,
                },
              ]}
              onPress={() => setSelectedCrop(crop)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  {
                    color: selectedCrop === crop ? '#FFFFFF' : colors.text,
                  },
                ]}
              >
                {crop}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.historyList}>
          {mockDiagnosisHistory.map((item) => (
            <Card key={item.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <View style={styles.historyInfo}>
                  <Text style={[styles.historyPlant, { color: colors.text }]}>
                    {item.plantName} - {item.location}
                  </Text>
                  <Text style={[styles.historyDisease, { color: colors.diseased }]}>
                    {item.disease}
                  </Text>
                  <Text style={[styles.historyDate, { color: colors.textLight }]}>
                    {item.date}
                  </Text>
                </View>
                <View style={styles.historyActions}>
                  <Badge text={item.status} variant={getStatusVariant(item.status)} />
                  <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
                </View>
              </View>

              <View style={styles.historyImages}>
                <View style={styles.imageSection}>
                  <Text style={[styles.imageLabel, { color: colors.textSecondary }]}>
                    Before
                  </Text>
                  <Image
                    source={{ uri: item.beforeImage }}
                    style={styles.historyImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.imageSection}>
                  <Text style={[styles.imageLabel, { color: colors.textSecondary }]}>
                    After
                  </Text>
                  {item.afterImage ? (
                    <Image
                      source={{ uri: item.afterImage }}
                      style={styles.historyImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={[
                        styles.historyImage,
                        styles.placeholderImage,
                        { backgroundColor: colors.border },
                      ]}
                    >
                      <Ionicons name="image" size={32} color={colors.textLight} />
                    </View>
                  )}
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  menuButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  filterButton: {
    padding: Spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    padding: Spacing.md,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
  },
  healthCard: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    padding: Spacing.md,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  healthTitle: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.medium,
  },
  healthTrend: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
  },
  healthPercentage: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs / 2,
  },
  healthPeriod: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.md,
  },
  chartPlaceholder: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    marginBottom: Spacing.md,
  },
  filterContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  filterChipText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  historyList: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 100,
    gap: Spacing.md,
  },
  historyCard: {
    overflow: 'hidden',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  historyInfo: {
    flex: 1,
  },
  historyPlant: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs / 2,
  },
  historyDisease: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs / 2,
  },
  historyDate: {
    fontSize: FontSizes.xs,
  },
  historyActions: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  historyImages: {
    flexDirection: 'row',
    gap: 2,
  },
  imageSection: {
    flex: 1,
  },
  imageLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  historyImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: BorderRadius.md,
  },
  placeholderImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.xl + 60,
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
