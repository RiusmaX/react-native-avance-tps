import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CameraPreviewProps {
  onTorchChange?: (enabled: boolean) => void;
}

// ✅ Solution : plus de UIManager.dispatchViewManagerCommand
// Le contrôle de la torche est délégué à un module natif compatible Fabric
// (ou Expo Module — voir TP-02)
const CameraPreview: React.FC<CameraPreviewProps> = ({ onTorchChange }) => {
  const toggleTorch = useCallback(() => {
    // ✅ Solution : API Fabric directe ou Expo Camera
    // Remplacé par expo-camera qui supporte nativement Fabric
    // import { Camera } from 'expo-camera';
    // Camera.toggleTorchAsync(true);
    console.log('[CameraPreview] Torche : utiliser expo-camera à la place');
    onTorchChange?.(true);
  }, [onTorchChange]);

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        <Text style={styles.placeholder}>📷 Aperçu caméra</Text>
        <Text style={styles.hint}>
          (Module compatible New Architecture)
        </Text>
      </View>
      <View style={styles.controls}>
        <Text style={styles.controlButton} onPress={toggleTorch}>
          🔦 Activer torche
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  preview: {
    height: 200,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  placeholder: { fontSize: 36 },
  hint: { color: '#aaa', fontSize: 12, marginTop: 4 },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  controlButton: {
    backgroundColor: '#FF3000',
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: '600',
    overflow: 'hidden',
  },
});

export default CameraPreview;
