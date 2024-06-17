import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { tokenManagment } from '../microservices/auth/TokenManagment';
import { Video } from 'expo-av';

const NavigatePage = ({ route }) => {
  const { id } = route.params;
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await tokenManagment.get(`/api/decedent/route/${id}`);
        if (response.status === 200) {
          setRoutes(response.data);
        } else {
          Alert.alert('Error', 'Failed to fetch routes.');
        }
      } catch (error) {
        Alert.alert('Error', `Failed to fetch routes: ${error.message}`);
      }
    };

    fetchRoutes();
  }, [id]);

  const renderItem = ({ item }) => (
    <View style={styles.routeItem}>
      <Video
        style={styles.video}
        source={{ uri: item.url }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onError={(e) => {
          Alert.alert('Error', 'Failed to play video.');
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nawigacja</Text>
      <FlatList
        data={routes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.routesContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  routesContainer: {
    marginTop: 20,
  },
  routeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  video: {
    width: 350,
    height: 275,
    backgroundColor: '#000',
  },
});

export default NavigatePage;
