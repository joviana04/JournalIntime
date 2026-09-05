import React, { useCallback, useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native'
import { AuthContext } from '../outils/authContext'

export default function Home({ navigation }) {
  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState('')

  const { user } = useContext(AuthContext)

  const displayName = user?.username || user?.email?.split('@')[0] || 'Utilisateur'

  const STORAGE_KEY = user ? `JOURNAL_ENTRIES_${user.email}` : 'JOURNAL_ENTRIES'

  useFocusEffect(
    useCallback(() => {
      loadDatas()
    }, [user])
  )

  const loadDatas = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY)
      if (data) {
        setDatas(JSON.parse(data))
      } else {
        setDatas([])
      }
    } catch (e) {
      console.log('Erreur de chargement:', e)
    }
  }

  const deleteData = (id) => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cette pensée ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          const filtered = datas.filter((item) => item.id !== id)
          setDatas(filtered)
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
        }
      }
    ])
  }

  const filteredDatas = datas.filter((item) => {
    const query = (search || '').toLowerCase()
    const title = (item.title || '').toLowerCase()
    const content = (item.content || '').toLowerCase()
    const mood = (item.mood || '').toLowerCase()
    const date = (item.date || '').toLowerCase()

    return title.includes(query) || content.includes(query) || mood.includes(query) || date.includes(query)
  })

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header Centré */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Journal</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Bonjour, {displayName}😊</Text>
        <Text style={styles.welcomeSubtitle}>Comment vous sentez-vous aujourd'hui ?</Text>
      </View>
        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#95A5A6" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Rechercher une pensee..."
            placeholderTextColor="#95A5A6"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Liste des pensées */}
        <FlatList
          data={filteredDatas}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Detail', { entry: item })}
            >
              <View style={styles.cardBody}>
                <View style={styles.titleRow}>
                  <Text style={styles.cardTitle}>{item.title}</Text>

                  <View style={styles.rightIcons}>{item.mood ? (
                      <View style={styles.moodBox}>
                        <Text style={styles.moodEmoji}>{item.mood}</Text>
                      </View>
                    ) : null}

                    <TouchableOpacity
                      style={styles.btnDelete} onPress={() => deleteData(item.id)}>
                      <Ionicons name="trash-outline" size={18} color="#E74C3C" />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.cardDate}>{item.date}</Text>
                <Text numberOfLines={2} style={styles.cardContent}>{item.content}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="journal-outline" size={50} color="#BDC3C7" />
              <Text style={styles.emptyText}>Aucune pensée trouvée.</Text>
            </View>
          }
        />

        {/* Bouton Ajouter */}
        <TouchableOpacity style={styles.btnAdd} activeOpacity={0.8}
        onPress={() => navigation.navigate('AddEntry')}>
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    backgroundColor: '#FFFFFF'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000'
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#F4F6F9'
  },
  welcomeContainer: {
    marginBottom: 16,
    paddingHorizontal: 2
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50'
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 3
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    height: 48,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3
  },
  searchIcon: {
    marginRight: 10
  },
  searchBar: {
    flex: 1,
    fontSize: 15,
    color: '#2C3E50'
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 5
  },
  cardBody: {
    flex: 1
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 8
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  moodBox: {
    backgroundColor: '#EBF5FB',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10
  },
  moodEmoji: {
    fontSize: 16
  },
  btnDelete: {
    backgroundColor: '#FCEAE8',
    padding: 8,
    borderRadius: 10
  },
  cardDate: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 8,
    fontWeight: '500'
  },
  cardContent: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80
  },
  emptyText: {
    textAlign: 'center',
    color: '#95A5A6',
    marginTop: 10,
    fontSize: 15
  },
  btnAdd: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    backgroundColor: '#2980B9',
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#2980B9',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  }
})