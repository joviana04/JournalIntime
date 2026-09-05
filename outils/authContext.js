import React, { createContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Kle pou stoke enfòmasyon yo nan memwa telefon nan (AsyncStorage)
  const KEY_SESSION = "USER_SESSION"
  const KEY_REGISTERED_USERS = "REGISTERED_USERS"

  // Tcheke si yon itilizate te deja konekte nan aparey la
  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem(KEY_SESSION)
        if (storedUserData) {
          setUser(JSON.parse(storedUserData))
        }
      } catch (error) {
        console.log("Erreur chargement session:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadStoredUser()
  }, [])

  // Fonksyon Enskripsyon: Kreye yon nouvo itilizatè epi sove l nan AsyncStorage
  const register = async (email, password) => {
    try {
      if (!email || !password) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs")
        return false
      }

      // Netwaye imel la ak modpas la
      const cleanEmail = email.toLowerCase().trim()
      const cleanPassword = password.trim()

      // Rekipere lis itilizate ki deja anrejistre yo
      const existingUsers = await AsyncStorage.getItem(KEY_REGISTERED_USERS)
      const usersList = existingUsers ? JSON.parse(existingUsers) : []

      // Tcheke si imel la deja egziste nan lis la
      const userExists = usersList.some(
        (u) => u.email.toLowerCase().trim() === cleanEmail
      )

      if (userExists) {
        Alert.alert("Erreur", "Cet email est déjà utilisé par un autre utilisateur.")
        return false
      }

      // Kreye nouvo obje itilizate a
      const newUser = { id: Math.random().toString(), email: cleanEmail, password: cleanPassword }
      usersList.push(newUser)

      // Anrejistre nouvo lis la nan memwa lokal la
      await AsyncStorage.setItem(KEY_REGISTERED_USERS, JSON.stringify(usersList))
      return true
    } catch (error) {
      console.log("Erreur register:", error)
      Alert.alert("Erreur", "Impossible d'enregistrer l'utilisateur.")
      return false
    }
  }

  // Fonksyon Koneksyon
  const login = async (email, password) => {
    try {
      if (!email || !password) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs.")
        return false
      }

      const cleanEmail = email.toLowerCase().trim()
      const cleanPassword = password.trim()

      // Chache itilizatè ki anrejistre yo nan memwa
      const storedUsers = await AsyncStorage.getItem(KEY_REGISTERED_USERS)
      const usersList = storedUsers ? JSON.parse(storedUsers) : []

      // Chache si gen yon itilizatè ki matche ak imèl ak modpas la
      const userFound = usersList.find(
        (u) => u.email.toLowerCase().trim() === cleanEmail && u.password.trim() === cleanPassword
      )

      if (userFound) {
        await AsyncStorage.setItem(KEY_SESSION, JSON.stringify(userFound))
        setUser(userFound)
        return true
      } else {
        Alert.alert("Erreur", "Email ou mot de passe incorrect.")
        return false
      }
    } catch (error) {
      console.log("Erreur login:", error)
      Alert.alert("Erreur", "Une erreur est survenue lors de la connexion.")
      return false
    }
  }

  // Fonksyon Dekoneksyon
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(KEY_SESSION)
      setUser(null)
    } catch (e) {
      console.log("Erreur logout:", e)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider