import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { supabase } from './services/supabase'

export default function MapScreen() {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSites()
  }, [])

  async function fetchSites() {
    const { data, error } = await supabase
      .from('dive_sites')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setSites(data)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🤿</Text>
        <Text style={styles.title}>Sites de plongée</Text>
      </View>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>🌍</Text>
        <Text style={styles.mapLabel}>Carte interactive</Text>
        <Text style={styles.mapSub}>Mapbox sera intégré prochainement</Text>
      </View>
      <View style={styles.bottomSheet}>
        <Text style={styles.sectionTitle}>
          {loading ? 'Chargement...' : `${sites.length} sites disponibles`}
        </Text>
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
          ListEmptyComponent={
            !loading && (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>Aucun site pour l'instant</Text>
                <Text style={styles.emptySub}>Soyez le premier à en ajouter un !</Text>
              </View>
            )
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001B48' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, gap: 10 },
  logo: { fontSize: 24 },
  title: { color: 'white', fontSize: 20, fontWeight: '600' },
  mapPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0d2d5e', margin: 16, borderRadius: 20 },
  mapText: { fontSize: 64 },
  mapLabel: { color: 'white', fontSize: 18, fontWeight: '500', marginTop: 12 },
  mapSub: { color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 4 },
  bottomSheet: { backgroundColor: '#001B48', padding: 16, maxHeight: '45%', borderTopWidth: 0.5, borderTopColor: 'rgba(0,224,255,0.2)' },
  sectionTitle: { color: 'white', fontSize: 16, fontWeight: '600', marginBottom: 12 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 12, marginBottom: 8 },
  siteName: { color: 'white', fontSize: 14, fontWeight: '500' },
  siteInfo: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },
  badge: { fontSize: 11, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  validated: { color: '#00E0FF', backgroundColor: 'rgba(0,224,255,0.1)' },
  provisional: { color: '#FFA500', backgroundColor: 'rgba(255,165,0,0.1)' },
  empty: { alignItems: 'center', paddingVertical: 32 },
  emptyText: { color: 'white', fontSize: 16, fontWeight: '500' },
  emptySub: { color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 4 },
})