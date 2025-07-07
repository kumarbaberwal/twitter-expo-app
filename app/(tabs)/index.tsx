import SignOutButton from '@/components/SignOutButton';
import { useUserSync } from "@/hooks/useUserSync";
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    useUserSync();
    return (
        <SafeAreaView className='flex-1'>
            <Text>index</Text>
            <SignOutButton />
        </SafeAreaView>
    );
}