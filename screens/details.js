import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function DetailScreen({ route, navigation }) {
    const entry = route?.params?.entry

    if (!entry) {
        return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucune donnée trouvée.</Text>
        </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
        <View style={styles.card}>
        <View style={styles.header}>
            <Text style={styles.title}>{entry.title}</Text>
            {entry.mood ? <Text style={styles.moodBadge}>{entry.mood}</Text> : null}
        </View>

        <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={16} color="#95A5A6" />
            <Text style={styles.dateText}>{entry.date}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.content}>{entry.content}</Text>

        {/* Bouton pou edite panse sa a direkteman */}
        <TouchableOpacity style={styles.editButton} activeOpacity={0.8}
        onPress={() => navigation.navigate('AddEntry', { entryToEdit: entry })}>
            <Ionicons name="pencil-outline" size={18} color="#2980B9" />
            <Text style={styles.editButtonText}>Modifier cette pensée</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F4F6F9'
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        elevation: 3,
        shadowColor: '#2C3E50',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C3E50',
        flex: 1,
        marginRight: 10
    },
    moodBadge: {
        fontSize: 26,
        backgroundColor: '#EBF5FB',
        padding: 6,
        borderRadius: 12
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 6
    },
    dateText: {
        color: '#95A5A6',
        fontSize: 13,
        fontWeight: '500'
    },
    divider: {
        height: 1,
        backgroundColor: '#ECF0F1',
        marginVertical: 15
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: '#2C3E50'
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        paddingVertical: 10,
        backgroundColor: '#EBF5FB',
        borderRadius: 10,
        gap: 8
    },
    editButtonText: {
        color: '#2980B9',
        fontWeight: '600',
        fontSize: 15
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F6F9'
    },
    emptyText: {
        color: '#95A5A6',
        fontSize: 16
    }
})