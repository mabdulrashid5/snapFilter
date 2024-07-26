import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Platform } from 'react-native';
import { DeepARView } from 'react-native-deepar';
import { DEEPAR_API_KEY_IOS, DEEPAR_API_KEY_ANDROID } from '@env';

const filters = [
  { id: 1, name: 'Filter 1', path: 'assets/BurningEffect/burning_effect.deepar', thumbnail: './assets/filterFive.png' },
  { id: 2, name: 'Filter 2', path: 'assets/EmotionMeter/Emotion_Meter.deepar', thumbnail: './assets/filterEleven.png' },
  { id: 3, name: 'Filter 3', path: 'assets/FlowerFace/flower_face.deepar', thumbnail: './assets/filterEight.png' }
];

const CameraScreen = ({ navigation }) => {
  const deepARRef = useRef(null);
  const [currentFilter, setCurrentFilter] = useState(filters[0].path);

  const takeScreenshot = async () => {
    if (deepARRef.current) {
      const screenshot = await deepARRef.current.takeScreenshot();
      console.log(screenshot); // Handle screenshot (e.g., save or display it)
      // Navigate to FilterScreen with screenshot URI if needed
      navigation.navigate('FilterScreen', { uri: screenshot.uri });
    }
  };

  const applyFilter = (filterPath) => {
    if (deepARRef.current) {
      deepARRef.current.switchEffect(filterPath);
      setCurrentFilter(filterPath);
    }
  };

  const apiKey = Platform.OS === 'ios' ? DEEPAR_API_KEY_IOS : DEEPAR_API_KEY_ANDROID;

  return (
    <View style={styles.container}>
      <DeepARView
        ref={deepARRef}
        style={styles.preview}
        apiKey={apiKey}
        onInitialized={() => applyFilter(currentFilter)}
        onError={(error) => console.log('DeepAR Error:', error)}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScrollView}
        contentContainerStyle={styles.filterScrollContent}>
        {filters.map((filter) => (
          <TouchableOpacity key={filter.id} onPress={() => applyFilter(filter.path)}>
            <Image source={{ uri: filter.thumbnail }} style={styles.filterThumbnail} />
            <Text style={styles.filterName}>{filter.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.captureContainer}>
        <TouchableOpacity onPress={takeScreenshot} style={styles.capture}>
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  filterScrollView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
  },
  filterScrollContent: {
    alignItems: 'center',
  },
  filterThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  filterName: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
});

export default CameraScreen;
