import React, { useRef, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { GLView } from 'expo-gl'
import { Renderer } from 'expo-three'
import * as THREE from 'three'

export default function Globe3D({ sites = [], onSitePress }) {
  let timeout

  useEffect(() => {
    return () => clearTimeout(timeout)
  }, [])

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl
    
    const renderer = new Renderer({ gl })
    renderer.setSize(width, height)
    renderer.setClearColor(0x001B48, 1)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 3

    // Globe sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64)
    const material = new THREE.MeshBasicMaterial({
      color: 0x1a4a8a,
      wireframe: false,
    })
    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)

    // Wireframe overlay (lignes de longitude/latitude)
    const wireGeometry = new THREE.SphereGeometry(1.001, 32, 32)
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00E0FF,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    })
    const wireGlobe = new THREE.Mesh(wireGeometry, wireMaterial)
    scene.add(wireGlobe)

    // Lumière ambiante
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)

    // Marqueurs des sites
    sites.forEach(site => {
      const phi = (90 - site.lat) * (Math.PI / 180)
      const theta = (site.lng + 180) * (Math.PI / 180)
      
      const x = -Math.sin(phi) * Math.cos(theta) * 1.02
      const y = Math.cos(phi) * 1.02
      const z = Math.sin(phi) * Math.sin(theta) * 1.02

      const markerGeo = new THREE.SphereGeometry(0.015, 8, 8)
      const markerMat = new THREE.MeshBasicMaterial({
        color: site.status === 'validated' ? 0x00E0FF : 0xFFA500,
      })
      const marker = new THREE.Mesh(markerGeo, markerMat)
      marker.position.set(x, y, z)
      scene.add(marker)
    })

    // Animation - rotation du globe
    const render = () => {
      timeout = setTimeout(render, 16)
      globe.rotation.y += 0.002
      wireGlobe.rotation.y += 0.002
      renderer.render(scene, camera)
      gl.endFrameEXP()
    }
    render()
  }

  return (
    <View style={styles.container}>
      <GLView style={styles.gl} onContextCreate={onContextCreate} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001B48' },
  gl: { flex: 1 },
})