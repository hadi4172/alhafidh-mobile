import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import I0Screen from '../Screens/Intro/Intro0';
import I1Screen from '../Screens/Intro/Intro1';
import I3Screen from '../Screens/Intro/Intro3';
import I4Screen from '../Screens/Intro/Intro4';
import I5Screen from '../Screens/Intro/Intro5';
import T0Screen from '../Screens/Tutorial/Tutorial0';
import { Button } from 'react-native-paper';
import PartsTopTabNavigator from './TopTabBar';
import SwiperMainTutorial from './SwiperMainTutorial';
import MainTabbar from './MainTabbar';

const Stack = createStackNavigator();

function InitialConfigurationStack() {
  return (
    <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
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

      <Stack.Screen
        name="I5"
        component={I5Screen}
      />

      <Stack.Screen
        name="T0"
        component={T0Screen}
      />

      <Stack.Screen
        name="SwiperMainTutorial"
        component={SwiperMainTutorial}
      />

      <Stack.Screen
        name="Menu"
        component={MainTabbar}
      />

    </Stack.Navigator>
  );
}

export default InitialConfigurationStack;