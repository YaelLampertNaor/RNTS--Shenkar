import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { DestinationContext } from '../Context/DestinationContextProvider';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

export default function DestinationPage() {
  const { currentDest, allDest } = useContext<any>(DestinationContext);
  const [allCoords, setAllCoords] = useState<any>([])
  const [currentLocation, setCurrentLocation] = useState<any>();
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => { GetLocation() }, []);

  async function GetLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // setCurrentLocation(location);
    console.log("Current Dest ==> ", currentDest)
    console.log("Current User Location ==> ", location)
    setCurrentLocation(location);
  };

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
          <Text style={styles.desc}>{currentDest.desc}</Text>
          <MapView style={styles.map} showsUserLocation={true} region={{ latitude: currentDest.latitude, longitude: currentDest.longitude, latitudeDelta: 0.0008, longitudeDelta: 0.9 }}>
            {/* ---------------- PolyLine Use ---------------- */}
            <Polyline
              coordinates={[
                { latitude: currentDest.latitude, longitude: currentDest.longitude },
                { latitude: currentLocation?.coords?.latitude, longitude: currentLocation?.coords?.longitude },
              ]}
              strokeColor="red"
              strokeWidth={2}
            />
            <Polyline
              coordinates={[
                { latitude: 19.439229372586095, longitude: -99.1408783069147 },
                { latitude: 41.897489360711695, longitude: 12.478808132167675 },
                { latitude: -6.1821571523387755, longitude: 35.74516618314787 },
                { latitude: 21.028342769016483, longitude: 105.83661962650451 },
                { latitude: currentLocation?.coords?.latitude, longitude: currentLocation?.coords?.longitude },
              ]}
              strokeColor="blue"
              strokeWidth={2}
            />
            {/* ---------------- Marker Use ---------------- */}
            <Marker coordinate={{ latitude: currentDest.latitude, longitude: currentDest.longitude }} title={currentDest.capital} pinColor={"pink"} />
            <Marker coordinate={{ latitude: currentLocation?.coords?.latitude, longitude: currentLocation?.coords?.longitude }} title="You are here" pinColor={"purple"} />

          </MapView>
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
  desc: {
    padding: 15
  },
  map: {
    height: 500,
    width: 350,
    margin: 10
  }
})