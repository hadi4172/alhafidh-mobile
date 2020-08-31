import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

function myComponent(props) {
    let { date, isLongPeriod, pagesToReview, pagesToMemorize } = props;
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
    question: {
        // marginTop: height * 0.13,
        // flex: 1,
        width: "90%",
        textAlign: "center",
        fontSize: height * 0.035,
        color: "#333333"
    },
    btnGroup: {
        // borderWidth:1,
        height: height * 0.6,
        justifyContent: "center"
    },
    btn: {
        margin: 7,
        // width: width * 0.7,
        height: height * 0.1
    },
    btnTxt: {
        fontSize: height * 0.025
    },
    btnIn: {
        // width: width * 0.7,
        height: height * 0.1
    }
});

export default myComponent;