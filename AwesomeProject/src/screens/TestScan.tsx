import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';

const TestScan = () => {
    const [scanning, setScanning] = useState(false);
    const [barcode, setBarcode] = useState('');
  
    const cameraRef = useRef<RNCamera | null>(null);
  
    const handleBarcodeRead = (event: BarCodeReadEvent) => {
      setScanning(false);
      setBarcode(event.data);
    };
  
    const startScanning = () => {
      setScanning(true);
      setBarcode('');
    };
  return (
    <View style={styles.container}>
    <RNCamera
      ref={cameraRef}
      style={styles.cameraPreview}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.auto}
      captureAudio={false}
      onBarCodeRead={handleBarcodeRead}
      barCodeTypes={[RNCamera.Constants.BarCodeType.ean13]}
    />
    <View style={styles.overlay}>
      {!scanning && (
        <TouchableOpacity style={styles.scanButton} onPress={startScanning}>
          <Text style={styles.scanButtonText}>Scan</Text>
        </TouchableOpacity>
      )}
    </View>
    {scanning && (
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Barcode: {barcode}</Text>
      </View>
    )}
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cameraPreview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scanButton: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    scanButtonText: {
      color: '#FFF',
      fontSize: 18,
    },
    dataContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 10,
      borderRadius: 10,
    },
    dataText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });
export default TestScan