import { useSignOut } from '@/hooks/useSignOut';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function SignOutButton() {
    const { handleSignOut } = useSignOut();

    return (
        <TouchableOpacity onPress={() => handleSignOut()}>
            <Feather name='log-out' size={24} color={"#E0245E"} />
        </TouchableOpacity>
    )
}