import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';

import BackTouchable from '../../components/backTouchable';
import api from '../../services/api';
import { Item, Point, PointParams } from '../../types';
import styles from './styles';

const Points: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as PointParams;

  useEffect(() => {
    async function loadData() {
      const req = await api.get<Item[]>('items');
      setItems(req.data);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Oooops!', 'Precisamos de sua permissão para obter a localização.');
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;
      setInitialPosition([latitude, longitude]);
    }
    loadPosition();
  }, []);

  useEffect(() => {
    async function loadPoints() {
      const req = await api.get<Point[]>('points', {
        params: {
          city: routeParams.city,
          uf: routeParams.uf,
          items: selectedItems,
        },
      });
      setPoints(req.data);
    }
    if (selectedItems.length > 0) loadPoints();
  }, [routeParams.city, routeParams.uf, selectedItems]);

  const handleNavigateToDetail = (id: number) => navigation.navigate('Detail', { point_id: id });

  const handleSelectItem = (id: number) => {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <BackTouchable />

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => {
                const latitude = Number(point.latitude);
                const longitude = Number(point.longitude);
                return (
                  <Marker
                    key={String(point.id)}
                    coordinate={{ latitude, longitude }}
                    style={styles.mapMarker}
                    onPress={() => handleNavigateToDetail(Number(point.id))}
                  >
                    <View style={styles.mapMarkerContainer}>
                      <Image
                        style={styles.mapMarkerImage}
                        source={{
                          uri: point.image,
                        }}
                      />
                      <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                    </View>
                  </Marker>
                );
              })}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={{ paddingHorizontal: 20 }}>
          {items.map((item) => (
            <TouchableOpacity
              key={String(item.id)}
              style={[styles.item, selectedItems.includes(item.id) ? styles.selectedItem : {}]}
              activeOpacity={0.6}
              onPress={() => handleSelectItem(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Points;
