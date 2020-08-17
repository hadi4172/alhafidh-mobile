import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import InstallationScreen from '../Screens/Installation';
import A0Screen from '../Screens/A0';
import { Button } from 'react-native-paper';
import TopTabNavigator from './TopTabBar';

const Stack = createStackNavigator();

function InitialConfigurationStack() {
  return (
    <Stack.Navigator initialRouteName="InstallationScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="InstallationScreen"
        component={InstallationScreen}
      />

      <Stack.Screen
        name="A0"
        component={A0Screen}
      />

      <Stack.Screen
        name="Objectif"
        component={TopTabNavigator}
        options={({ navigation }) => ({
          headerShown: true,
          headerBackTitle: "Retour",
          headerRight: () => (
            <Button
              color="#007AFF"
              labelStyle={{ fontSize: 17 }}
              uppercase={false}
              mode="text"
              onPress={() =>
                navigation.navigate('Mémorisé')
              }>
              Continuer
            </Button>
          ),
        })}
      />

      <Stack.Screen
        name="Mémorisé"
        component={TopTabNavigator}
        options={({ navigation }) => ({
          headerShown: true,
          headerBackTitle: "Retour",
          headerRight: () => (
            <Button
              color="#007AFF"
              labelStyle={{ fontSize: 17 }}
              uppercase={false}
              mode="text"
              onPress={() =>
                navigation.navigate('Familier')
              }>
              Continuer
            </Button>
          ),
        })} />

      <Stack.Screen
        name="Familier"
        component={TopTabNavigator}
        options={({ navigation }) => ({
          headerShown: true,
          headerBackTitle: "Retour",
          headerRight: () => (
            <Button
              color="#007AFF"
              labelStyle={{ fontSize: 17 }}
              uppercase={false}
              mode="text"
              onPress={() =>
                navigation.navigate('InstallationScreen')
              }> 
              Continuer
            </Button>
          ),
        })} />
    </Stack.Navigator>
  );
}

export default InitialConfigurationStack;