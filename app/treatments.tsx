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
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import { mockTreatments } from '@/constants/mockData';

export default function TreatmentsScreen() {
  const colors = Colors.dark;
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Natural', 'Chemical', 'Cultural'];

  const filteredTreatments =
    selectedFilter === 'All'
      ? mockTreatments
      : mockTreatments.filter((t) => t.type === selectedFilter);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Treatment Recommendations"
        showBackButton
        onBackPress={() => router.back()}
        rightElement={
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color={colors.text} />
          </TouchableOpacity>
        }
      />

      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    selectedFilter === filter ? colors.primary : 'transparent',
                  borderWidth: selectedFilter === filter ? 0 : 1,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: selectedFilter === filter ? '#FFFFFF' : colors.text,
                  },
                ]}
                numberOfLines={1}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredTreatments.map((treatment) => (
          <Card key={treatment.id} style={styles.treatmentCard}>
            <Image
              source={{ uri: treatment.imageUrl }}
              style={styles.treatmentImage}
              resizeMode="cover"
            />

            <View style={styles.treatmentContent}>
              {treatment.ecoFriendly && (
                <View style={styles.ecoFriendlyBadge}>
                  <Ionicons name="leaf" size={14} color={colors.success} />
                  <Text style={[styles.ecoFriendlyText, { color: colors.success }]}>
                    Eco-Friendly
                  </Text>
                </View>
              )}

              <Text style={[styles.treatmentName, { color: colors.text }]}>
                {treatment.name}
              </Text>

              <Text style={[styles.treatmentDescription, { color: colors.textSecondary }]}>
                {treatment.description}
              </Text>

              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Ionicons name="water" size={16} color={colors.textSecondary} />
                  <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                    {treatment.dosage}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time" size={16} color={colors.textSecondary} />
                  <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                    {treatment.frequency}
                  </Text>
                </View>
              </View>

              <Button
                title="More Info"
                variant="secondary"
                size="small"
                onPress={() => {}}
                style={styles.moreInfoButton}
              />
            </View>
          </Card>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
      >
        <Ionicons name="checkmark-done" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterWrapper: {
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  filterContent: {
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.sm * 1.2,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: 100,
  },
  treatmentCard: {
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    padding: 0,
  },
  treatmentImage: {
    width: '100%',
    height: 200,
  },
  treatmentContent: {
    padding: Spacing.md,
  },
  ecoFriendlyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  ecoFriendlyText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  treatmentName: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.sm,
  },
  treatmentDescription: {
    fontSize: FontSizes.base,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  detailsContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailText: {
    fontSize: FontSizes.base,
  },
  moreInfoButton: {
    alignSelf: 'flex-end',
  },
  fab: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.xl,
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
