import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  // Simulate registration success
  const handleRegister = () => {
    router.replace('/(main)/dashboard');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register Screen</Text>
      <Button title="Register (simulate)" onPress={handleRegister} />
    </View>
  );
} 