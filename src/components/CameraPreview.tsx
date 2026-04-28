import React, { useRef, useCallback } from 'react';
import { View, Text, StyleSheet, UIManager, findNodeHandle } from 'react-native';

interface CameraPreviewProps {
  onTorchChange?: (enabled: boolean) => void;
}

// Problème 3 : UIManager.dispatchViewManagerCommand legacy
const CameraPreview: React.FC<CameraPreviewProps> = ({ onTorchChange }) => {
  const cameraRef = useRef<View>(null);

  const toggleTorch = useCallback(() => {
    // ❌ UIManager.dispatchViewManagerCommand n'est pas compatible Fabric
    // Dans la New Architecture, il faut utiliser l'API native directement
    const node = findNodeHandle(cameraRef.current);
    if (node) {
      UIManager.dispatchViewManagerCommand(
        node,
        // Commande native "toggleTorch" du module Camera legacy
        UIManager.getViewManagerConfig('RCTCamera').Commands.toggleTorch,
        [true]
      );
      console.log('[CameraPreview] Torche activée via UIManager legacy');
      onTorchChange?.(true);
    }
  }, [onTorchChange]);

  return (
    <View style={styles.container}>
      <View
        ref={cameraRef}
        style={styles.preview}
        // ❌ Propriétés spécifiques au module natif legacy (non compatibles Fabric)
      >
        <Text style={styles.placeholder}>📷 Aperçu caméra</Text>
        <Text style={styles.hint}>
          (Module natif via l'ancien Bridge)
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
