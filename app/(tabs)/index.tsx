import PostComposer from "@/components/PostComposer";
import PostsList from "@/components/PostsList";
import SignOutButton from "@/components/SignOutButton";
import { useUserSync } from "@/hooks/useUserSync";
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    useUserSync();
    return (
        <SafeAreaView className='flex-1 bg-white'>

            {/* Header */}

            <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
                <Ionicons name="logo-twitter" size={24} color={"#1DA1F2"} />
                <Text className="text-xl font-bold text-gray-900">Home</Text>
                <SignOutButton />
            </View>

            {/* Submit Post */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1"
                contentContainerStyle={{
                    paddingBottom: 80
                }}
            >
                <PostComposer />
                <PostsList />
            </ScrollView>
        </SafeAreaView>
    );
}