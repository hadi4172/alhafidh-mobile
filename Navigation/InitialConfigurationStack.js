import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import I0Screen from '../Screens/I0';
import I1Screen from '../Screens/I1';
import I3Screen from '../Screens/I3';
import I4Screen from '../Screens/I4';
import { Button } from 'react-native-paper';
import PartsTopTabNavigator from './TopTabBar';

const Stack = createStackNavigator();

function InitialConfigurationStack() {
  return (
    <Stack.Navigator initialRouteName="Mémorisé" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="I0Screen"
        component={I0Screen}
      />

      <Stack.Screen
        name="I1"
        component={I1Screen}
      />

      <Stack.Screen
        name="Mémorisé"
        component={PartsTopTabNavigator}
        initialParams={{ screen: "memorized" }}
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
        component={PartsTopTabNavigator}
        initialParams={{ screen: "familiar" }}
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
                navigation.navigate('Objectif')
              }>
              Continuer
            </Button>
          ),
        })} />

      <Stack.Screen
        name="Objectif"
        component={PartsTopTabNavigator}
        initialParams={{ screen: "toMemorize" }}
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
                navigation.navigate('I3')
              }>
              Continuer
            </Button>
          ),
        })}
      />

      <Stack.Screen
        name="I3"
        component={I3Screen}
      />

      <Stack.Screen
        name="I4"
        component={I4Screen}
      />

    </Stack.Navigator>
  );
}

export default InitialConfigurationStack;