import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';

export default function ProfileScreen() {
  const colors = Colors.dark;

  const menuItems = [
    { icon: 'person-outline', title: 'Edit Profile', subtitle: 'Update your information' },
    { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Manage alerts and reminders' },
    { icon: 'location-outline', title: 'My Farms', subtitle: 'Manage your farm locations' },
    { icon: 'settings-outline', title: 'Settings', subtitle: 'App preferences' },
    { icon: 'help-circle-outline', title: 'Help & Support', subtitle: 'Get assistance' },
    { icon: 'information-circle-outline', title: 'About', subtitle: 'App version and info' },
  ];

  const stats = [
    { label: 'Diagnoses', value: '24', icon: 'scan' },
    { label: 'Treatments', value: '18', icon: 'medical' },
    { label: 'Days Active', value: '45', icon: 'calendar' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <Card style={styles.profileCard} variant="elevated">
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>FJ</Text>
            </View>
            <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.backgroundCard }]}>
              <Ionicons name="camera" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.userName, { color: colors.text }]}>Farmer John</Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            farmer.john@agrosense.com
          </Text>

          <View style={[styles.statsContainer, { borderTopColor: colors.border }]}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Ionicons name={stat.icon as any} size={20} color={colors.primary} />
                <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index}>
              <Card style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <View style={[styles.menuIcon, { backgroundColor: colors.primary + '20' }]}>
                    <Ionicons name={item.icon as any} size={24} color={colors.primary} />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={[styles.menuTitle, { color: colors.text }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>
                      {item.subtitle}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title="Sign Out"
          variant="outline"
          onPress={() => {}}
          fullWidth
          style={styles.signOutButton}
        />

        <Text style={[styles.versionText, { color: colors.textLight }]}>
          Version 1.0.0
        </Text>
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
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
  },
  profileCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs / 2,
  },
  userEmail: {
    fontSize: FontSizes.base,
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
  },
  statItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  statLabel: {
    fontSize: FontSizes.xs,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.md,
  },
  menuItem: {
    marginBottom: Spacing.sm,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.xs / 2,
  },
  menuSubtitle: {
    fontSize: FontSizes.sm,
  },
  signOutButton: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  versionText: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
});
