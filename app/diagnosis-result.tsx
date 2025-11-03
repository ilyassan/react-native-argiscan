import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import { mockDiseases } from '@/constants/mockData';

export default function DiagnosisResultScreen() {
  const colors = Colors.dark;
  const params = useLocalSearchParams();
  const imageUri = params.imageUri as string;

  const mainDisease = mockDiseases[0];
  const otherDiseases = mockDiseases.slice(1);

  // AI-style analysis response
  const aiAnalysis = {
    plantName: 'Tomato Plant (Solanum lycopersicum)',
    appearance: 'The image shows a tomato plant leaf with visible dark brown lesions and yellowing around the affected areas. The leaf structure appears weakened with some curling at the edges.',
    problems: [
      {
        name: 'Late Blight (Phytophthora infestans)',
        severity: 'High',
        confidence: 95,
        description: 'A serious fungal disease causing dark, water-soaked lesions on leaves and stems.',
      },
      {
        name: 'Nutrient Deficiency (Nitrogen)',
        severity: 'Medium',
        confidence: 65,
        description: 'Yellowing of lower leaves may indicate nitrogen deficiency.',
      },
    ],
    recommendations: [
      'Remove and destroy affected leaves immediately',
      'Apply copper-based fungicide every 7-10 days',
      'Improve air circulation around plants',
      'Water at the base to keep foliage dry',
      'Consider crop rotation for next season',
    ],
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return colors.diseased;
      case 'Medium':
        return colors.warning;
      case 'Low':
        return colors.healthy;
      default:
        return colors.text;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Diagnosis Results"
        showBackButton
        onBackPress={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.imageCard}>
          <Image
            source={{ uri: imageUri || 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400' }}
            style={styles.fullImage}
            resizeMode="cover"
          />
        </Card>

        <Card style={styles.aiCard} variant="elevated">
          <View style={[styles.aiHeader, { borderBottomColor: colors.border }]}>
            <Ionicons name="sparkles" size={24} color={colors.primary} />
            <Text style={[styles.aiTitle, { color: colors.primary }]}>AI Analysis</Text>
          </View>

          <View style={styles.aiSection}>
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
              Plant Identified
            </Text>
            <Text style={[styles.plantNameText, { color: colors.text }]}>
              {aiAnalysis.plantName}
            </Text>
          </View>

          <View style={styles.aiSection}>
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
              From the image it looks like
            </Text>
            <Text style={[styles.analysisText, { color: colors.text }]}>
              {aiAnalysis.appearance}
            </Text>
          </View>

          <View style={styles.aiSection}>
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
              Potential Problems Detected
            </Text>
            {aiAnalysis.problems.map((problem, index) => (
              <Card key={index} style={styles.problemCard}>
                <View style={styles.problemHeader}>
                  <View style={styles.problemTitleContainer}>
                    <Text style={[styles.problemName, { color: colors.text }]}>
                      {problem.name}
                    </Text>
                    <View style={styles.confidenceBadge}>
                      <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
                      <Text style={[styles.confidenceText, { color: colors.primary }]}>
                        {problem.confidence}% confidence
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.severityBadge,
                      { backgroundColor: getSeverityColor(problem.severity) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.severityText,
                        { color: getSeverityColor(problem.severity) },
                      ]}
                    >
                      {problem.severity}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.problemDescription, { color: colors.textSecondary }]}>
                  {problem.description}
                </Text>
              </Card>
            ))}
          </View>

          <View style={styles.aiSection}>
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
              Recommended Actions
            </Text>
            {aiAnalysis.recommendations.map((rec, index) => (
              <View key={index} style={styles.recommendationItem}>
                <Ionicons name="checkmark-circle-outline" size={20} color={colors.primary} />
                <Text style={[styles.recommendationText, { color: colors.text }]}>
                  {rec}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.actionButtons}>
          <Button
            title="View Treatment Plans"
            onPress={() => router.push('/treatments' as any)}
            fullWidth
          />
          <Button
            title="Save to History"
            variant="outline"
            onPress={() => {}}
            fullWidth
            style={styles.saveButton}
          />
        </View>

        <TouchableOpacity style={styles.reportLink}>
          <Text style={[styles.reportText, { color: colors.textSecondary }]}>
            Is this analysis incorrect?{' '}
            <Text style={{ color: colors.primary, fontWeight: FontWeights.semibold }}>
              Report feedback
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
  imageCard: {
    marginBottom: Spacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  fullImage: {
    width: '100%',
    height: 250,
  },
  aiCard: {
    marginBottom: Spacing.lg,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
  },
  aiTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  aiSection: {
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  plantNameText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  analysisText: {
    fontSize: FontSizes.base,
    lineHeight: 24,
  },
  problemCard: {
    marginBottom: Spacing.md,
  },
  problemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  problemTitleContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  problemName: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs / 2,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs / 2,
  },
  confidenceText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
  },
  severityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.full,
  },
  severityText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
    textTransform: 'uppercase',
  },
  problemDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  recommendationText: {
    flex: 1,
    fontSize: FontSizes.base,
    lineHeight: 22,
  },
  actionButtons: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  saveButton: {
    marginTop: 0,
  },
  reportLink: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  reportText: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
});
