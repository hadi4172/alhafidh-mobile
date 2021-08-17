import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

const { width,height } = Dimensions.get('window');

function myComponent(props) {
    let {  } = props;
    return (
        <View>
        </View >
    );
}

const styles = StyleSheet.create({
    showBorder: {
        borderColor: 'black',
        borderStyle: 'dotted',
        borderWidth: 1,
        margin: 1
    },
    container: {
    },
    fitContent:{
        flex:0,
        height:"auto"
    },
    centerContentX: {
        flexDirection: "column",
        alignItems: "center"
    },
    centerContentY: {
        justifyContent: "center"
    },
    rowDirection: {
        flexDirection: "row"
    },
    indication: {
        marginTop: 40,
        flex: 1,
        width: "93%",
        textAlign: "center",
        fontSize: height * 0.02,
        color: "slategrey"
    },
});

export default myComponent;