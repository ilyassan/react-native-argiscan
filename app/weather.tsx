import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { mockWeatherData, mockAlerts } from '@/constants/mockData';

export default function WeatherScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getWeatherIcon = (icon: string) => {
    const iconMap: Record<string, any> = {
      sunny: 'sunny',
      'partly-cloudy': 'partly-sunny',
      cloudy: 'cloud',
      rainy: 'rainy',
    };
    return iconMap[icon] || 'sunny';
  };

  const getWeatherIconColor = (icon: string) => {
    const colorMap: Record<string, string> = {
      sunny: '#FDB813',
      'partly-cloudy': '#95A5A6',
      cloudy: '#7F8C8D',
      rainy: '#3498DB',
    };
    return colorMap[icon] || '#FDB813';
  };

  const getAlertStyles = (type: string) => {
    if (type === 'warning') {
      return {
        backgroundColor: colorScheme === 'light' ? 'rgba(255, 152, 0, 0.15)' : 'rgba(255, 183, 77, 0.15)',
        iconColor: colors.warning,
        textColor: colorScheme === 'light' ? '#E65100' : '#FFB74D',
      };
    }
    return {
      backgroundColor: colorScheme === 'light' ? 'rgba(244, 67, 54, 0.15)' : 'rgba(239, 83, 80, 0.15)',
      iconColor: colors.diseased,
      textColor: colorScheme === 'light' ? '#C62828' : '#EF5350',
    };
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Weather & Alerts"
        showBackButton
        onBackPress={() => router.back()}
        rightElement={
          <TouchableOpacity style={styles.changeButton}>
            <Text style={[styles.changeText, { color: colors.primary }]} numberOfLines={1}>
              Change
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.currentWeatherCard} variant="elevated">
          <View style={styles.weatherIconContainer}>
            <Ionicons
              name={getWeatherIcon(mockWeatherData.current.icon)}
              size={80}
              color={getWeatherIconColor(mockWeatherData.current.icon)}
            />
          </View>
          <View style={styles.currentWeatherInfo}>
            <Text style={[styles.temperature, { color: colors.text }]}>
              {mockWeatherData.current.temperature}°C
            </Text>
            <Text style={[styles.condition, { color: colors.text }]}>
              {mockWeatherData.current.condition}
            </Text>
            <Text style={[styles.details, { color: colors.textSecondary }]}>
              Humidity: {mockWeatherData.current.humidity}% | Wind: {mockWeatherData.current.wind} km/h
            </Text>
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Hourly Forecast
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hourlyForecast}
        >
          {mockWeatherData.hourly.map((hour, index) => (
            <Card key={index} style={styles.hourlyCard}>
              <Text style={[styles.hourlyTime, { color: colors.text }]}>
                {hour.time}
              </Text>
              <Ionicons
                name={getWeatherIcon(hour.icon)}
                size={32}
                color={getWeatherIconColor(hour.icon)}
                style={styles.hourlyIcon}
              />
              <Text style={[styles.hourlyTemp, { color: colors.text }]}>
                {hour.temperature}°
              </Text>
            </Card>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Daily Forecast
        </Text>

        {mockWeatherData.daily.map((day, index) => (
          <Card key={index} style={styles.dailyCard}>
            <Text style={[styles.dayName, { color: colors.text }]}>
              {day.day}
            </Text>
            <Ionicons
              name={getWeatherIcon(day.icon)}
              size={28}
              color={getWeatherIconColor(day.icon)}
            />
            <View style={styles.tempRange}>
              <Text style={[styles.highTemp, { color: colors.text }]}>
                {day.high}°
              </Text>
              <Text style={[styles.lowTemp, { color: colors.textLight }]}>
                {day.low}°
              </Text>
            </View>
          </Card>
        ))}

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Disease Risk Alerts
        </Text>

        {mockAlerts.map((alert) => {
          const alertStyles = getAlertStyles(alert.type);
          const cardStyle = {
            ...styles.alertCard,
            backgroundColor: alertStyles.backgroundColor,
          };
          return (
            <Card
              key={alert.id}
              style={cardStyle}
            >
              <View style={styles.alertIcon}>
                <Ionicons
                  name={alert.icon === 'warning' ? 'warning' : 'bug'}
                  size={32}
                  color={alertStyles.iconColor}
                />
              </View>
              <View style={styles.alertContent}>
                <Text style={[styles.alertTitle, { color: alertStyles.textColor }]}>
                  {alert.title}
                </Text>
                <Text style={[styles.alertDescription, { color: alertStyles.textColor }]}>
                  {alert.description}
                </Text>
                <TouchableOpacity style={styles.alertAction}>
                  <Text style={[styles.alertActionText, { color: colors.primary }]}>
                    {alert.action}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  changeButton: {
    paddingHorizontal: Spacing.xs,
  },
  changeText: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.bold,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  currentWeatherCard: {
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  weatherIconContainer: {
    marginBottom: Spacing.md,
  },
  currentWeatherInfo: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: FontSizes.huge,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  condition: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.xs,
  },
  details: {
    fontSize: FontSizes.base,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  hourlyForecast: {
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  hourlyCard: {
    width: 80,
    alignItems: 'center',
    padding: Spacing.md,
  },
  hourlyTime: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.sm,
  },
  hourlyIcon: {
    marginVertical: Spacing.sm,
  },
  hourlyTemp: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  dailyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  dayName: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.medium,
    width: 80,
  },
  tempRange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    width: 80,
    justifyContent: 'flex-end',
  },
  highTemp: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.medium,
  },
  lowTemp: {
    fontSize: FontSizes.base,
  },
  alertCard: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  alertIcon: {
    marginRight: Spacing.md,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  alertDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  alertAction: {
    alignSelf: 'flex-start',
  },
  alertActionText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
  },
});
