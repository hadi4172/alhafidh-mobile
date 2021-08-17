import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import ExplainingScreen from "../Screens/Other/ExplainingScreen";
import I0Screen from '../Screens/Intro/Intro0';
import I1Screen from '../Screens/Intro/Intro1';
import I3Screen from '../Screens/Intro/Intro3';
import I4Screen from '../Screens/Intro/Intro4';
import I5Screen from '../Screens/Intro/Intro5';
import I6Screen from '../Screens/Intro/Intro6';
import T0Screen from '../Screens/Tutorial/Tutorial0';
import OrderSelectScreen from '../Screens/Intro/OrderSelectScreen';
import { useSelector } from 'react-redux';
import PartsTopTabNavigator from './TopTabBar';
import SwiperMainTutorial from './SwiperMainTutorial';
import MainTabbar from './MainTabbar';

const Stack = createStackNavigator();

function InitialConfigurationStack() {

  const checkBoxesScreenHeader = (navigation, nextScreen, showHeaderTitle = true) => {
    return {
      headerShown: true,
      headerBackTitle: "Retour",
      headerTitleStyle: !showHeaderTitle ? { color: 'transparent' } : null,
      headerRight: () => (
        <TouchableOpacity style={{ height: "100%", justifyContent: "center" }} onPress={() =>
          navigation.navigate(nextScreen)
        }>
          <Text style={{ color: "#007AFF", fontSize: 17 }}>
            {`Continuer    `}
          </Text>
        </TouchableOpacity>
      ),
    }
  }

  let isFirstStart = useSelector(state => state.firstStart.value);
  let isRevisionMode = useSelector(state => state.revisionMode.value);

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
        name="ExplainingMémorisé"
        component={ExplainingScreen}
        options={({ navigation }) => (checkBoxesScreenHeader(navigation, "Mémorisé", false))}
        initialParams={{
          textToDisplay: `Sélectionnez les parties que vous êtes capable de réciter sans aucune difficulté actuellement`,
          destination: `Mémorisé`, inverse: true, isWhite: true
        }}
      />

      <Stack.Screen
        name="Mémorisé"
        component={PartsTopTabNavigator}
        initialParams={{ screen: "memorized" }}
        options={({ navigation }) => (checkBoxesScreenHeader(navigation, !isRevisionMode ? "ExplainingFamilier" : isFirstStart ? "T0" : "Menu"))} />

      <Stack.Screen
        name="ExplainingFamilier"
        component={ExplainingScreen}
        options={({ navigation }) => (checkBoxesScreenHeader(navigation, "Familier", false))}
        initialParams={{
          textToDisplay: `Sélectionnez les parties auquel vous êtes familier. \n (Ce que vous avez mémorisé dans` +
            ` le passé et oublié ou ce que vous lisez ou écoutez régulièrement)`,
          destination: `Familier`, inverse: true, isWhite: true
        }}
      />

      <Stack.Screen
        name="Familier"
        component={PartsTopTabNavigator}
        initialParams={{ screen: "familiar" }}
        options={({ navigation }) => (checkBoxesScreenHeader(navigation, "ExplainingObjectif"))} />

      <Stack.Screen
        name="ExplainingObjectif"
        component={ExplainingScreen}
        options={({ navigation }) => (checkBoxesScreenHeader(navigation, "Objectif", false))}
        initialParams={{
          textToDisplay: `Sélectionnez les parties auquel vous avez l'ambition d'apprendre`,
          destination: `Objectif`, inverse: true, isWhite: true
        }}
      />

      <Stack.Screen
        name="Objectif"
        component={PartsTopTabNavigator}
        initialParams={{ screen: "toMemorize" }}
        options={({ navigation }) => (checkBoxesScreenHeader(navigation, "OrderFamilier"))}
      />

      <Stack.Screen
        name="OrderFamilier"
        component={OrderSelectScreen}
        initialParams={{ screen: "OrderFamilier", nextScreenName: "OrderToMemorize" }}
      />

      <Stack.Screen
        name="OrderToMemorize"
        component={OrderSelectScreen}
        initialParams={{ screen: "OrderToMemorize", nextScreenName: "I3" }}
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
        name="I6"
        component={I6Screen}
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

const styles = StyleSheet.create({
  showBorder: {
    borderColor: 'black',
    borderStyle: 'dotted',
    borderWidth: 1,
    margin: 1
  }
});