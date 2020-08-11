import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import InstallationScreen from '../Screens/Installation';
import A0Screen from '../Screens/A0';

const Stack = createStackNavigator();

function InitialConfigurationStack() {
    return (
        <Stack.Navigator initialRouteName="InstallationScreen" screenOptions={{headerShown: false}}>
          <Stack.Screen name="InstallationScreen" component={InstallationScreen} />
          <Stack.Screen name="A0" component={A0Screen} />
        </Stack.Navigator>
    );
  }

export default InitialConfigurationStack;