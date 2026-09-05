import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
        navigation.navigate('Login')
        }, 2000)

        return () => clearTimeout(timer)
    }, [navigation])

    return (
        <View style={styles.container}>
            <Ionicons name="journal-sharp" size={90} color="#FFF" />
            <Text style={styles.title}>Journal Intime</Text>
            <Text style={styles.subtitle}>Projet Final React Native</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2980B9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 15
    },
    subtitle: {
        fontSize: 14,
        color: '#EBF5FB',
        marginTop: 5
    }
})