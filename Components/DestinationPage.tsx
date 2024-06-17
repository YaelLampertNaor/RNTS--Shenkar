import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { DestinationContext } from '../Context/DestinationContextProvider';
import FlatListex1 from './FlatListex1';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

export default function DestinationPage() {
  const { currentDest } = useContext<any>(DestinationContext);
  const [currentLocation, setCurrentLocation] = useState<any>({});
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
    console.log("Current Dest ==> ", currentDest)
    console.log(currentLocation)
  }, []);

  let text = 'Pending approval...';
  if (errorMsg) {
    text = errorMsg;
  } else if (currentLocation) {
    text = JSON.stringify(currentLocation);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainView}>
          <Text style={styles.title}>{currentDest.destination_name}</Text>
          <Image source={{ uri: currentDest.main_img }} style={styles.image} />
          <Text>{currentDest.capital}</Text>
          <MapView style={styles.map} showsUserLocation={true} region={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude, latitudeDelta: 0.0008, longitudeDelta: 0.0011 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 35
  },
  image: {
    height: 250,
    width: 250
  },
  title: {
    fontSize: 25,
    color: 'green'
  },
  map: {
    height: 500,
    width: 350,
    margin: 10
  }
})