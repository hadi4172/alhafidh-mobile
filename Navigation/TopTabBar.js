import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CheckboxesScreen from '../Screens/CheckboxesScreen';
const Tab = createMaterialTopTabNavigator();

function TopTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Juz'" component={HomeScreen} />
      <Tab.Screen name="Sourate" component={SettingsScreen} />
      <Tab.Screen name="Page" component={SettingsScreen} />
    </Tab.Navigator>
  );
}