import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import InitialConfigurationStack from "./Navigation/InitialConfigurationStack";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <InitialConfigurationStack/>
      </NavigationContainer>
    </PaperProvider>
  );
}
