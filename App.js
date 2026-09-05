import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import AuthProvider from './outils/authContext'
import Routes from './routes'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes/>
        <StatusBar style = "auto"/>
      </NavigationContainer>
    </AuthProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


