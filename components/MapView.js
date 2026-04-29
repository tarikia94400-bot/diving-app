import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

export default function DiveMap({ sites = [] }) {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission refusée')
        return
      }
      let loc = await Location.getCurrentPositionAsync({})
      setLocation(loc)
    })()
  }, [])

  const initialRegion = {
    latitude: location?.coords?.latitude || 43.2965,
    longitude: location?.coords?.longitude || 5.3698,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {sites.map((site) => (
          <Marker
            key={site.id}
            coordinate={{ latitude: site.lat, longitude: site.lng }}
            title={site.name}
            description={`${site.type} · ${site.depth_max}m`}
            pinColor="#00E0FF"
          />
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
})