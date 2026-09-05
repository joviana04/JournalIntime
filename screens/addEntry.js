import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from '@expo/vector-icons/Ionicons'
import { AuthContext } from '../outils/authContext'

const MOODS = [
    { label: 'Heureuse', emoji: '😄' },
    { label: 'Bien', emoji: '😊' },
    { label: 'Neutre', emoji: '😐' },
    { label: 'Triste', emoji: '😔' },
    { label: 'En colère', emoji: '😡' },
    { label: 'Amoureuse', emoji: '❤️' }
]

export default function AddEntry({ navigation, route }) {
    const entryToEdit = route?.params?.entryToEdit

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [selectedMood, setSelectedMood] = useState('😊')

    const { user } = useContext(AuthContext)

    // Menm kle storage ki nan HomeScreen an
    const STORAGE_KEY = user ? `JOURNAL_ENTRIES_${user.email}` : 'JOURNAL_ENTRIES'

    useEffect(() => {
        if (entryToEdit) {
            setTitle(entryToEdit.title || '')
            setContent(entryToEdit.content || '')
            setSelectedMood(entryToEdit.mood || '😊')
        }
    }, [entryToEdit])

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Erreur', 'Veuillez remplir le titre et le contenu.')
            return
        }

        try {
            const existingData = await AsyncStorage.getItem(STORAGE_KEY)
            let datas = existingData ? JSON.parse(existingData) : []

        if (entryToEdit) {
             // si se yon modifikasyon
            datas = datas.map((item) => item.id === entryToEdit.id
            ? { ...item, title: title.trim(), content: content.trim(), mood: selectedMood }
            : item
            )
        } else {
        // SI SE YON NOUVO PANSE
        const now = new Date()
        const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' }
        const dateFormatted = now.toLocaleDateString('fr-FR', optionsDate)
        const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        const newEntry = {
            id: Date.now().toString(),
            title: title.trim(),
            content: content.trim(),
            mood: selectedMood,
            date: `${dateFormatted} · ${timeFormatted}`,
            createdAt: now.toISOString()
        }

        datas = [newEntry, ...datas]
        }

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(datas))
        navigation.goBack()
        } catch (e) {
        console.log('Erreur sauvegarde:', e)
    }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerTitle}>{entryToEdit ? 'Modifier la pensee' : 'Nouvelle pensee'}</Text>

            <TextInput style={styles.inputTitle} placeholder="Titre de votre pensee..." placeholderTextColor="#95A5A6"
            value={title} onChangeText={setTitle}
        />

        <Text style={styles.sectionLabel}>Comment te sens-tu ?</Text>

        <View style={styles.moodContainer}>
            {MOODS.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.moodButton, selectedMood === item.emoji && styles.selectedMoodButton]}
            onPress={() => setSelectedMood(item.emoji)}>
            <Text style={styles.moodEmoji}>{item.emoji}</Text>
            </TouchableOpacity>
            ))}
        </View>

        <TextInput style={styles.inputContent} placeholder="Ecris ce que tu ressens..." placeholderTextColor="#95A5A6"
        multiline numberOfLines={6} textAlignVertical="top" value={content} onChangeText={setContent}
        />

        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={handleSave}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#FFF" />
            <Text style={styles.saveBtnText}>{entryToEdit ? 'Mettre à jour' : 'Enregistrer'}</Text>
        </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F9',
        padding: 20
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 20
    },
    inputTitle: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: '#2C3E50',
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4
    },
    sectionLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#7F8C8D',
        marginBottom: 10
    },
    moodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    moodButton: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 25,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4
    },
    selectedMoodButton: {
        backgroundColor: '#EBF5FB',
        borderWidth: 2,
        borderColor: '#2980B9'
    },
    moodEmoji: {
        fontSize: 24
    },
    inputContent: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 14,
        fontSize: 15,
        color: '#2C3E50',
        height: 150,
        marginBottom: 25,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4
    },
    saveBtn: {
        backgroundColor: '#2980B9',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 14,
        gap: 8,
        elevation: 4
    },
    saveBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    }
})