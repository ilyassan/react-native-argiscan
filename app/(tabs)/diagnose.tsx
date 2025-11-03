import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import ScanningAnimation from '@/components/ui/ScanningAnimation';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function DiagnoseScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (capturedImage && isScanning) {
      // Simulate AI processing for 4 seconds
      const timer = setTimeout(() => {
        setIsScanning(false);
        // Navigate to results with the image
        router.push({
          pathname: '/diagnosis-result',
          params: { imageUri: capturedImage },
        } as any);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [capturedImage, isScanning]);

  if (!permission) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header
          title="Camera Permission"
          showBackButton
          onBackPress={() => router.back()}
        />
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={80} color={colors.textLight} />
          <Text style={[styles.permissionTitle, { color: colors.text }]}>
            Camera Access Required
          </Text>
          <Text style={[styles.permissionText, { color: colors.textSecondary }]}>
            We need access to your camera to diagnose plant diseases
          </Text>
          <Button
            title="Grant Permission"
            onPress={requestPermission}
            style={styles.permissionButton}
          />
        </View>
      </View>
    );
  }

  const toggleFlash = () => {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        if (photo?.uri) {
          setCapturedImage(photo.uri);
          setIsScanning(true);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to capture photo');
      }
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
        setIsScanning(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsScanning(false);
  };

  if (isScanning && capturedImage) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header
          title="Analyzing Plant..."
          showBackButton
          onBackPress={handleRetake}
        />
        <View style={styles.scanningContainer}>
          <ScanningAnimation imageUri={capturedImage} />
          <View style={styles.scanningTextContainer}>
            <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
            <Text style={[styles.scanningTitle, { color: colors.text }]}>
              Analyzing your plant...
            </Text>
            <Text style={[styles.scanningText, { color: colors.textSecondary }]}>
              Our AI is identifying the plant and checking for diseases
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Diagnose Plant Disease"
        showBackButton={false}
      />

      <View style={styles.instructionContainer}>
        <Text style={[styles.instructionText, { color: colors.textSecondary }]}>
          Position the leaf in the center of the frame. Ensure the image is clear and well-lit.
        </Text>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.cameraView}
          facing={facing}
          flash={flash}
        >
          <View style={styles.overlay}>
            <View style={styles.guidanceFrame} />
          </View>
        </CameraView>
      </View>

      <View style={[styles.controlsContainer, { backgroundColor: colors.background }]}>
        <View style={styles.topControls}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              { backgroundColor: flash === 'on' ? colors.primary : colors.backgroundCard },
            ]}
            onPress={toggleFlash}
          >
            <Ionicons
              name={flash === 'on' ? 'flash' : 'flash-off'}
              size={24}
              color={flash === 'on' ? '#FFFFFF' : colors.text}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.captureButton, { backgroundColor: colors.warning }]}
            onPress={handleCapture}
          >
            <Ionicons name="camera" size={40} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: colors.backgroundCard }]}
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.galleryButtonContainer}>
          <TouchableOpacity style={styles.galleryButton} onPress={handlePickImage}>
            <Ionicons name="images" size={20} color={colors.text} />
            <Text style={[styles.galleryText, { color: colors.text }]}>
              From Gallery
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  permissionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: FontSizes.base,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  permissionButton: {
    minWidth: 200,
  },
  instructionContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  instructionText: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  cameraContainer: {
    flex: 1,
    padding: Spacing.md,
  },
  cameraView: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guidanceFrame: {
    width: '85%',
    height: '75%',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderRadius: BorderRadius.lg,
  },
  scanningContainer: {
    flex: 1,
    padding: Spacing.md,
  },
  scanningTextContainer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  spinner: {
    marginBottom: Spacing.md,
  },
  scanningTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  scanningText: {
    fontSize: FontSizes.base,
    textAlign: 'center',
    lineHeight: 22,
  },
  controlsContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  topControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryButtonContainer: {
    alignItems: 'center',
  },
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  galleryText: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.medium,
  },
});
