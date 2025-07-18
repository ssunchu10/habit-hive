import { Tabs } from 'expo-router';
import React from 'react';

export default function MainTabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard', headerShown: false }} />
      <Tabs.Screen name="create" options={{ title: 'Create', headerShown: false }} />
      <Tabs.Screen name="analytics" options={{ title: 'Analytics', headerShown: false }} />
    </Tabs>
  );
} 