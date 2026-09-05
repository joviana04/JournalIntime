import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { AuthContext } from '../outils/authContext'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const { login } = useContext(AuthContext)

    const handleLogin = async () => {
    // Tcheke si gen yon chan ki vid
    if (!email.trim() || !password.trim()) {
        Alert.alert('Erreur', 'Veuillez remplir tous les champs.')
        return
    }

    // Rele fonksyon login nan AuthContext ak 2 paramet yo (email, password)
    await login(email, password)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Ionicons name="journal-outline" size={70} color="#2980B9" />
                <Text style={styles.title}>Journal Intime 🔒</Text>
                <Text style={styles.subtitle}>Connectez-vous pour accéder à vos pensées</Text>
            </View>

        <View style={styles.form}>
            <View style={styles.inputGroup}>
                <Ionicons name="mail-outline" size={20} color="#7F8C8D" style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Adresse email" placeholderTextColor="#95A5A6"
                keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={(text) => setEmail(text)}/>
        </View>

        <View style={styles.inputGroup}>
            <Ionicons name="lock-closed-outline" size={20} color="#7F8C8D" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Mot de passe" placeholderTextColor="#95A5A6"
            secureTextEntry={!showPassword} value={password} onChangeText={(text) => setPassword(text)}/>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#7F8C8D" />
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8} onPress={handleLogin}>
            <Text style={styles.btnPrimaryText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Pas encore de compte ? <Text style={styles.linkBold}>S'inscrire</Text></Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F4F6F9',
        padding: 24,
        justifyContent: 'center'
    },
    header: {
        alignItems: 'center',
        marginBottom: 35
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginTop: 12
    },
    subtitle: {
        fontSize: 14,
        color: '#7F8C8D',
        marginTop: 4,
        textAlign: 'center'
    },
    form: {
        width: '100%'
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 50,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4
    },
    inputIcon: {
        marginRight: 10
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#2C3E50'
    },
    btnPrimary: {
        backgroundColor: '#2980B9',
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        elevation: 4
    },
    btnPrimaryText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    linkBtn: {
        marginTop: 20,
        alignItems: 'center'
    },
    linkText: {
        color: '#7F8C8D',
        fontSize: 14
    },
    linkBold: {
        color: '#2980B9',
        fontWeight: 'bold'
    }
})