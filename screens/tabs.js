import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './home'
import Profile from './settings'
import Ionicons from '@expo/vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({headerShown: false,
        tabBarActiveTintColor: '#2980B9', tabBarInactiveTintColor: '#7F8C8D',
        tabBarStyle: {
            backgroundColor: '#ffff',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            height: 75,
            paddingBottom: 25,
            paddingTop: 8,
            borderTopWidth: 1,
            borderTopColor: '#F0F0F0'
        },
            tabBarIcon: ({ focused, color, size }) => {
                let iconName
                if (route.name === 'Home') {iconName = focused ? 'journal' : 'journal-outline'
                } else if (route.name === 'Profile') {iconName = focused ? 'person' : 'person-outline'
                }
                return <Ionicons name={iconName} color={color} size={size} />
            },
        })}
    >
        <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Mes pensees' }}/>
        <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Profil' }}/>
    </Tab.Navigator>
    )
}

export default BottomTabs