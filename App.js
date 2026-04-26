import 'react-native-url-polyfill/auto'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { supabase } from './services/supabase'
import MapScreen from './app/MapScreen'
import ReviewScreen from './app/ReviewScreen'
import PhotoScreen from './app/PhotoScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function TabIcon({ label, active }) {
  const icons = { Carte: '🗺️', Ajouter: '➕', Profil: '👤', Favoris: '❤️' }
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>{icons[label]}</Text>
      <Text style={{ color: active ? '#00E0FF' : 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 2 }}>{label}</Text>
    </View>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000d24',
          borderTopColor: 'rgba(0,224,255,0.15)',
          height: 70,
          paddingBottom: 10,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Carte"
        component={MapScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Carte" active={focused} /> }}
      />
      <Tab.Screen
        name="Favoris"
        component={MapScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Favoris" active={focused} /> }}
      />
      <Tab.Screen
        name="Profil"
        component={MapScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Profil" active={focused} /> }}
      />
    </Tab.Navigator>
  )
}

function AuthScreen({ onLogin }) {
  return (
    <View style={styles.auth}>
      <Text style={styles.logo}>🤿</Text>
      <Text style={styles.appName}>Diving App</Text>
      <Text style={styles.tagline}>La communauté mondiale des plongeurs</Text>
      <TouchableOpacity style={styles.googleBtn} onPress={() => onLogin()}>
        <Text style={styles.googleText}>Se connecter avec Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.logo}>🤿</Text>
      </View>
    )
  }

  if (!session) {
    return <AuthScreen onLogin={() => {}} />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Photos" component={PhotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  auth: {
    flex: 1,
    backgroundColor: '#001B48',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  logo: { fontSize: 64, marginBottom: 16 },
  appName: { color: 'white', fontSize: 32, fontWeight: '600', marginBottom: 8 },
  tagline: { color: 'rgba(255,255,255,0.5)', fontSize: 14, textAlign: 'center', marginBottom: 48 },
  googleBtn: {
    backgroundColor: '#00E0FF',
    borderRadius: 14,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  googleText: { color: '#001B48', fontSize: 16, fontWeight: '600' },
  loading: { flex: 1, backgroundColor: '#001B48', alignItems: 'center', justifyContent: 'center' },
})