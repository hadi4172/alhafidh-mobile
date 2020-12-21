import React, { useLayoutEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TodoScreen from "../Screens/TodoScreen";
import MushafScreen from "../Screens/MushafScreen";
import GaugesScreen from "../Screens/GaugesScreen";
import ProfileScreen from "../Screens/ProfileScreen";


const Tab = createMaterialBottomTabNavigator();

function MainTabbar() {
    let hasFinishedTodayGoal = true;
    return (
        <Tab.Navigator initialRouteName="Feed" activeColor="white" /* barStyle={{backgroundColor:"forestgreen"}} */>
            <Tab.Screen
                name="Todo"
                component={TodoScreen}
                options={{
                    tabBarBadge: hasFinishedTodayGoal ? false : "",
                    tabBarColor: "steelblue",
                    tabBarLabel: 'Todo',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="format-list-checks" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Mushaf"
                component={MushafScreen}
                options={{
                    tabBarColor: "forestgreen",
                    tabBarLabel: "Mus'haf",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="book-open-variant" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Gauges"
                component={GaugesScreen}
                options={{
                    tabBarColor: "firebrick",
                    tabBarLabel: 'Gauges',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="finance" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarColor: "darkgoldenrod",
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


export default MainTabbar;