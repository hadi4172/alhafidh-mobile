import React, { useLayoutEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CheckboxesScreen from '../Screens/Intro/CheckboxesScreen';


const Tab = createMaterialTopTabNavigator();

function PartsTopTabNavigator(props) {
  let { navigation, route } = props;
  let { screen } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Juz'" component={CheckboxesScreen} initialParams={{ type: "Juz'", screen: screen}} />
      <Tab.Screen name="Surah" component={CheckboxesScreen} initialParams={{ type: "Surah", screen: screen }} />
      <Tab.Screen name="Page" component={CheckboxesScreen} initialParams={{ type: "Page", screen: screen }} />
    </Tab.Navigator>
  );
}
export default PartsTopTabNavigator;