import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { AuthContext } from '../outils/authContext'

export default function Settings() {
  const { user, logout } = useContext(AuthContext)

  // Rekipere non an oswa pran pati anvan '@' nan imel la
  const displayName = user?.username || user?.email?.split('@')[0] || 'Utilisateur'

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Se déconnecter', style: 'destructive', onPress: logout }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle-outline" size={90} color="#2980B9" />
        <Text style={styles.username}>Bienvenue, {displayName} 🌸</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" style={styles.btnIcon} />
        <Text style={styles.btnText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F4F6F9'
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 10
  },
  email: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E74C3C',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  btnIcon: {
    marginRight: 8
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
})