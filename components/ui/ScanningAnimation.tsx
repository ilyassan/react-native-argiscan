import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Colors, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');

interface ScanningAnimationProps {
  imageUri: string;
}

export default function ScanningAnimation({ imageUri }: ScanningAnimationProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const scanPosition = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Scanning line animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanPosition, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanPosition, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = scanPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={[styles.overlay, { backgroundColor: colors.primary + '40' }]}>
        <Animated.View
          style={[
            styles.scanLine,
            {
              backgroundColor: colors.primary,
              opacity: opacity,
              transform: [{ translateY }],
            },
          ]}
        />

        {/* Corner frames */}
        <View style={styles.corners}>
          <View style={[styles.cornerTopLeft, { borderColor: colors.primary }]} />
          <View style={[styles.cornerTopRight, { borderColor: colors.primary }]} />
          <View style={[styles.cornerBottomLeft, { borderColor: colors.primary }]} />
          <View style={[styles.cornerBottomRight, { borderColor: colors.primary }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 3,
    left: 0,
  },
  corners: {
    ...StyleSheet.absoluteFillObject,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
});
