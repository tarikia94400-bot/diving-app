import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { supabase } from '../services/supabase'

export default function MapScreen() {
  const [sites, setSites] = useState([])
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLocation()
    fetchSites()
  }, [])

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') return
    let loc = await Location.getCurrentPositionAsync({})
    setLocation(loc.coords)
  }

  async function fetchSites() {
    const { data, error } = await supabase
      .from('dive_sites')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setSites(data)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude || 43.2965,
          longitude: location?.longitude || 5.3698,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
        showsUserLocation={true}
      >
        {sites.map(site => (
          <Marker
            key={site.id}
            coordinate={{ latitude: site.lat, longitude: site.lng }}
            title={site.name}
            description={`${site.type} · ${site.depth_max}m`}
            pinColor="#00E0FF"
          />
        ))}
      </MapView>

      <View style={styles.bottomSheet}>
        <Text style={styles.title}>{sites.length} sites à proximité</Text>
        {loading ? (
          <Text style={styles.loading}>Chargement...</Text>
        ) : (
          <FlatList
            data={sites}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card}>
                <View>
                  <Text style={styles.siteName}>{item.name}</Text>
                  <Text style={styles.siteInfo}>{item.type} · {item.depth_max}m</Text>
                </View>
                <Text style={[styles.badge, item.status === 'validated' ? styles.validated : styles.provisional]}>
                  {item.status === 'validated' ? 'Validé' : 'Non vérifié'}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#001B48',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '40%',
  },
  title: { color: 'white', fontSize: 16, fontWeight: '600', marginBottom: 12 },
  loading: { color: 'rgba(255,255,255,0.5)', textAlign: 'center' },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  siteName: { color: 'white', fontSize: 14, fontWeight: '500' },
  siteInfo: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },
  badge: { fontSize: 11, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  validated: { color: '#00E0FF', backgroundColor: 'rgba(0,224,255,0.1)' },
  provisional: { color: '#FFA500', backgroundColor: 'rgba(255,165,0,0.1)' },
})