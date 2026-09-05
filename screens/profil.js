import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { AuthContext } from '../outils/authContext'

export default function ProfilScreen() {
    const { user, logout } = useContext(AuthContext)

    const handleLogout = () => {
        Alert.alert('Déconnexion', 'Voulez-vous vraiment vous déconnecter ?', [
        { text: 'Annuler', style: 'cancel' },
        {
            text: 'Déconnexion',
            style: 'destructive',
            onPress: () => logout() // Rele fonksyon logout soti nan AuthContext
        }
        ])
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
            <Ionicons name="person-circle-outline" size={90} color="#2980B9" />
            <Text style={styles.userName}> {user?.username || user?.email?.split('@')[0] || 'Mon Profil'} 🌸</Text>
            <Text style={styles.userSub}>{user?.email || 'Journal Intime Sécurisé'}</Text>
            </View>

            <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={22} color="#FFF" />
                <Text style={styles.logoutText}>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F9',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 40
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginTop: 10
    },
    userSub: {
        fontSize: 14,
        color: '#7F8C8D',
        marginTop: 4
    },
    logoutBtn: {
        flexDirection: 'row',
        backgroundColor: '#E74C3C',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        gap: 10,
        elevation: 3,
        shadowColor: '#E74C3C',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    logoutText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
})