import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import { supabase } from '../services/supabase'

export default function ReviewScreen({ route, navigation }) {
  const { site } = route.params
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  async function submitReview() {
    if (rating === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner une note')
      return
    }
    if (comment.length < 10) {
      Alert.alert('Erreur', 'Le commentaire doit faire au moins 10 caractères')
      return
    }
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('reviews').insert({
      site_id: site.id,
      user_id: user.id,
      rating,
      comment,
    })
    setLoading(false)
    if (error) {
      Alert.alert('Erreur', 'Impossible de publier votre avis')
      return
    }
    Alert.alert('Succès', 'Votre avis a été publié !', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Noter {site.name}</Text>

      <Text style={styles.label}>Votre note</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={[styles.star, star <= rating && styles.starActive]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Votre commentaire</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Décrivez votre expérience (min. 10 caractères)"
        placeholderTextColor="rgba(255,255,255,0.3)"
        value={comment}
        onChangeText={setComment}
        color="white"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={submitReview}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Publication...' : 'Publier mon avis'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001B48',
    padding: 24,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 32,
    marginTop: 16,
  },
  label: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 28,
    gap: 8,
  },
  star: {
    fontSize: 40,
    color: 'rgba(255,255,255,0.2)',
  },
  starActive: {
    color: '#00E0FF',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    marginBottom: 28,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.15)',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#00E0FF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#001B48',
    fontSize: 16,
    fontWeight: '600',
  },
})