import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { DeepARView } from 'react-native-deepar';
import { DEEPAR_API_KEY_IOS, DEEPAR_API_KEY_ANDROID } from '@env';

const filters = [
  "assets/BurningEffect/burning_effect.deepar",
  "assets/EmotionMeter/Emotion_Meter.deepar",
  "assets/FlowerFace/flower_face.deepar"
];

const FilterScreen = ({ route }) => {
  const { uri } = route.params;
  const deepARRef = useRef(null);
  const [currentFilter, setCurrentFilter] = useState(0);

  useEffect(() => {
    if (deepARRef.current) {
      deepARRef.current.switchEffect(filters[currentFilter]);
    }
  }, [currentFilter]);

  const nextFilter = () => {
    setCurrentFilter((prev) => (prev + 1) % filters.length);
  };

  const apiKey = Platform.OS === 'ios' ? DEEPAR_API_KEY_IOS : DEEPAR_API_KEY_ANDROID;

  return (
    <View style={styles.container}>
      <DeepARView
        ref={deepARRef}
        style={styles.preview}
        apiKey={apiKey}
        onInitialized={() => deepARRef.current.switchEffect(filters[currentFilter])}
        onError={(error) => console.log('DeepAR Error:', error)}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={nextFilter} style={styles.filterButton}>
          <Text style={{ fontSize: 14 }}> NEXT FILTER </Text>
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
  filterContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterButton: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default FilterScreen;
