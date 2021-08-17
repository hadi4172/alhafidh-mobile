import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import reduxStore from "./Redux/reduxStore";
import InitialConfigurationStack from "./Navigation/InitialConfigurationStack";

export default function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <PaperProvider>
        <NavigationContainer>
          <InitialConfigurationStack />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
