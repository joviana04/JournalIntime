import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { AuthContext } from '../outils/authContext'

export default function Register({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Sèvi ak fonksyon register ki soti nan AuthContext
  const { register } = useContext(AuthContext)

  const handleRegister = async () => {
    // Validason vid yo
    if (!email.trim() || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.')
      return
    }

    // Validation du foma email
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide.')
      return
    }

    // validasyon longe mo de passe
    if (password.length < 8) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères.')
      return
    }

    // konfimayson mo de passe
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.')
      return
    }

    // Ekzekisyon enskripsyon nan AuthContext
    const success = await register(email, password)
    if (success) {
      Alert.alert('Succès', 'Votre compte a été créé avec succès !', [
        { text: 'Se connecter', onPress: () => navigation.navigate('Login') }
      ])
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-add-outline" size={60} color="#2980B9" />
        <Text style={styles.title}>Créer un compte ✨</Text>
        <Text style={styles.subtitle}>Inscrivez-vous pour sécuriser votre journal</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Ionicons name="mail-outline" size={20} color="#7F8C8D" style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Adresse email" placeholderTextColor="#95A5A6"
            keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail}/>
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="lock-closed-outline" size={20} color="#7F8C8D" style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Mot de passe" placeholderTextColor="#95A5A6"
            secureTextEntry={!showPassword} value={password} onChangeText={setPassword}/>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#7F8C8D" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#7F8C8D" style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Confirmer le mot de passe" placeholderTextColor="#95A5A6"
            secureTextEntry={!showPassword} value={confirmPassword} onChangeText={setConfirmPassword}/>
        </View>

        <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8} onPress={handleRegister}>
          <Text style={styles.btnPrimaryText}>S'inscrire</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}> Déjà un compte ? <Text style={styles.linkBold}>Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flexGrow: 1,
    backgroundColor: '#F4F6F9',
    padding: 24, justifyContent: 'center'
  },
  header:{
    alignItems: 'center',
    marginBottom: 30
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 10
  },
  subtitle:{
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
    textAlign: 'center'
  },
  form:{
    width: '100%'
  },
  inputGroup:{
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
  input:{ flex: 1,
    fontSize: 15,
    color: '#2C3E50'
  },
  btnPrimary:{
    backgroundColor: '#2980B9',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4
  },
  btnPrimaryText:{
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  linkBtn:{
    marginTop: 20,
    alignItems: 'center'
    },
  linkText:{
    color: '#7F8C8D',
    fontSize: 14 },
  linkBold:{
    color: '#2980B9',
    fontWeight: 'bold'
  }
})