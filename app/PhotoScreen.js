import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { supabase } from '../services/supabase'

export default function PhotoScreen({ route, navigation }) {
  const { site } = route.params
  const [photos, setPhotos] = useState([])
  const [uploading, setUploading] = useState(false)

  async function pickImage() {
    if (photos.length >= 5) {
      Alert.alert('Maximum atteint', 'Vous pouvez ajouter maximum 5 photos')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      const compressed = await compressImage(result.assets[0].uri)
      setPhotos([...photos, compressed])
    }
  }

  async function compressImage(uri) {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1024 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    )
    return result
  }

  async function uploadPhotos() {
    if (photos.length === 0) {
      Alert.alert('Erreur', 'Ajoutez au moins une photo')
      return
    }
    setUploading(true)
    const { data: { user } } = await supabase.auth.getUser()

    for (const photo of photos) {
      const fileName = `${site.id}/${Date.now()}.jpg`
      const response = await fetch(photo.uri)
      const blob = await response.blob()
      const { data, error } = await supabase.storage
        .from('dive-photos')
        .upload(fileName, blob, { contentType: 'image/jpeg' })
      if (!error) {
        const { data: urlData } = supabase.storage
          .from('dive-photos')
          .getPublicUrl(fileName)
        await supabase.from('photos').insert({
          site_id: site.id,
          user_id: user.id,
          url: urlData.publicUrl,
          size_kb: Math.round(blob.size / 1024),
        })
      }
    }

    setUploading(false)
    Alert.alert('Succès', `${photos.length} photo(s) publiée(s) !`, [
      { text: 'OK', onPress: () => navigation.goBack() }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photos de {site.name}</Text>
      <Text style={styles.subtitle}>{photos.length}/5 photos sélectionnées</Text>

      <FlatList
        data={photos}
        keyExtractor={(_, i) => i.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.photo} />
        )}
        ListFooterComponent={
          photos.length < 5 && (
            <TouchableOpacity style={styles.addButton} onPress={pickImage}>
              <Text style={styles.addIcon}>+</Text>
              <Text style={styles.addText}>Ajouter une photo</Text>
            </TouchableOpacity>
          )
        }
      />

      <TouchableOpacity
        style={[styles.button, uploading && styles.buttonDisabled]}
        onPress={uploadPhotos}
        disabled={uploading}
      >
        {uploading ? (
          <ActivityIndicator color="#001B48" />
        ) : (
          <Text style={styles.buttonText}>Publier {photos.length} photo(s)</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001B48', padding: 24 },
  title: { color: 'white', fontSize: 22, fontWeight: '600', marginTop: 16, marginBottom: 4 },
  subtitle: { color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 24 },
  photo: { width: '48%', aspectRatio: 1, margin: '1%', borderRadius: 12 },
  addButton: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(0,224,255,0.3)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: { color: '#00E0FF', fontSize: 32, marginBottom: 8 },
  addText: { color: '#00E0FF', fontSize: 12 },
  button: {
    backgroundColor: '#00E0FF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#001B48', fontSize: 16, fontWeight: '600' },
})