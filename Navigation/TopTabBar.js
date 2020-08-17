import React, { useLayoutEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CheckboxesScreen from '../Screens/CheckboxesScreen';


const Tab = createMaterialTopTabNavigator();

function TopTabNavigator(props) {
  let { navigation } = props;


  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Juz'" component={CheckboxesScreen} initialParams={{ type: "Juz'" }} />
      <Tab.Screen name="Surah" component={CheckboxesScreen} initialParams={{ type: "Surah" }} />
      <Tab.Screen name="Page" component={CheckboxesScreen} initialParams={{ type: "Page" }} />
    </Tab.Navigator>
  );
}
export default TopTabNavigator;