import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ActivityIndicator, View } from 'react-native'
import React, { useContext } from 'react'
import Splash from '../screens/splash'
import BottomTabs from '../screens/tabs'
import Register from '../screens/register'
import Login from '../screens/login'
import AddEntry from '../screens/addEntry'
import Details from '../screens/details'
import { AuthContext } from '../outils/authContext'

const Stack = createNativeStackNavigator()

export default function Routes() {
    const { user, isLoading } = useContext(AuthContext)

  // Verifikasyon si itilizatè a te deja konekte
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F6F9' }}>
                <ActivityIndicator size="large" color="#2980B9" />
            </View>
        )
    }

    return (
        <Stack.Navigator>
        {user ? (
        // Si itilizate a konekte (user != null)
            <>
            <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={Details} options={{ title: 'Détail de la Pensée', headerBackTitle: 'Retour' }} />
            <Stack.Screen name="AddEntry" component={AddEntry} options={{ title: 'Nouvelle pensée' }} />
            </>
        ) : (
        // Si itilizate a dekonekte (user == null)
            <>
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </>
        )}
    </Stack.Navigator>
    )
}