import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import TodoScreen from "../Screens/Menu/TodoScreen";
import { Portal } from 'react-native-paper';
import OverviewBar from '../Components/OverviewBar';
import { Grid, Row } from '../ImportIndex';

const Stack = createStackNavigator();

function TodoStackNavigator() {

    return (
        <>
            <View style={{ height: "5%" }}></View>
            <View style={[{ alignItems: "center" }, styles.showBorder]}>
                <OverviewBar automatic />
            </View>
            <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }} >
                <Stack.Screen name={`Todo`} component={TodoScreen} initialParams={{isNextDay:false}}/>
            </Stack.Navigator>
        </>
    );
}

export default TodoStackNavigator;

const styles = StyleSheet.create({
    showBorder: {
        // borderColor: 'black',
        // borderStyle: 'dotted',
        // borderWidth: 1,
        // margin: 1
    }
});