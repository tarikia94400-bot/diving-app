import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import MapView, { Marker, UrlTile } from 'react-native-maps'
import { supabase } from '../services/supabase'

export default function MapScreen() {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSite, setSelectedSite] = useState(null)

  useEffect(() => {
    fetchSites()
  }, [])

  async function fetchSites() {
    const { data, error } = await supabase
      .from('dive_sites')
      .select('*')
    if (!error && data) setSites(data)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🤿</Text>
        <Text style={styles.title}>Diving App</Text>
        <Text style={styles.count}>{sites.length} sites</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20,
          longitude: 0,
          latitudeDelta: 100,
          longitudeDelta: 100,
        }}
        mapType="none"
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        {sites.map(site => (
          <Marker
            key={site.id}
            coordinate={{ latitude: site.lat, longitude: site.lng }}
            title={site.name}
            description={`${site.type} · ${site.depth_max}m`}
            onPress={() => setSelectedSite(site)}
            pinColor={site.status === 'validated' ? '#00E0FF' : '#FFA500'}
          />
        ))}
      </MapView>

      <View style={styles.bottomSheet}>
        {selectedSite ? (
          <View>
            <Text style={styles.sectionTitle}>{selectedSite.name}</Text>
            <Text style={styles.siteInfo}>{selectedSite.type} · {selectedSite.depth_max}m</Text>
            <Text style={styles.siteDesc}>{selectedSite.description}</Text>
            <TouchableOpacity onPress={() => setSelectedSite(null)} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>
              {loading ? 'Chargement...' : `${sites.length} sites mondiaux`}
            </Text>
            <FlatList
              data={sites.slice(0, 8)}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.card}
                  onPress={() => setSelectedSite(item)}
                >
                  <View>
                    <Text style={styles.siteName}>{item.name}</Text>
                    <Text style={styles.siteInfo}>{item.type} · {item.depth_max}m</Text>
                  </View>
                  <Text style={[styles.badge, item.status === 'validated' ? styles.validated : styles.provisional]}>
                    {item.status === 'validated' ? 'Validé' : '⏳'}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001B48' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, gap: 10, backgroundColor: '#001B48' },
  logo: { fontSize: 24 },
  title: { color: 'white', fontSize: 20, fontWeight: '600', flex: 1 },
  count: { color: '#00E0FF', fontSize: 14, fontWeight: '600' },
  map: { flex: 1 },
  bottomSheet: { backgroundColor: '#001B48', padding: 16, maxHeight: '35%', borderTopWidth: 0.5, borderTopColor: 'rgba(0,224,255,0.2)' },
  sectionTitle: { color: 'white', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  siteInfo: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },
  siteDesc: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 8 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 12, marginBottom: 8 },
  siteName: { color: 'white', fontSize: 14, fontWeight: '500' },
  badge: { fontSize: 11, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  validated: { color: '#00E0FF', backgroundColor: 'rgba(0,224,255,0.1)' },
  provisional: { color: '#FFA500', backgroundColor: 'rgba(255,165,0,0.1)' },
  closeBtn: { backgroundColor: 'rgba(0,224,255,0.15)', borderRadius: 10, padding: 10, alignItems: 'center', marginTop: 12 },
  closeBtnText: { color: '#00E0FF', fontWeight: '600' },
})