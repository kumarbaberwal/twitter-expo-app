import { useAuth } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
    const insets = useSafeAreaInsets();
    const { isSignedIn } = useAuth();
    if (!isSignedIn) {
        return <Redirect href={'/(auth)'} />
    }
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#1DA1F2",
                tabBarInactiveTintColor: "#657786",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderTopColor: "#E1E8ED",
                    height: 50 + insets.bottom,
                    paddingTop: 8,
                },
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "500",
                }
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: "",
                    tabBarIcon: ({ size, color }) => <Feather name='home' size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: "",
                    tabBarIcon: ({ size, color }) => <Feather name='search' size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name='notifications'
                options={{
                    title: "",
                    tabBarIcon: ({ size, color }) => <Feather name='bell' size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name='messages'
                options={{
                    title: "",
                    tabBarIcon: ({ size, color }) => <Feather name='mail' size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: "",
                    tabBarIcon: ({ size, color }) => <Feather name='user' size={size} color={color} />
                }}
            />
        </Tabs>
    )
}