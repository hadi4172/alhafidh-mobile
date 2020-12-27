import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

function PartStatus(props) {
    let { } = props;
    return (
        <View style={[styles.showBorder, styles.container, styles.centerContentX]}>
            <Text style={[styles.text]}>Juz' 21</Text>

            <View style={[styles.progressBarContainer, styles.centerContentX, styles.centerContentY]}>
                <ProgressBar width={"90%"} progress={Math.random()} color={"#3CB371"} style={styles.stateBar} />
                <Text style={[styles.progressBarInnerText]}>2/3</Text>
            </View>

            <View style={[styles.progressBarContainer, styles.centerContentX, styles.centerContentY]}>
                <ProgressBar width={"90%"} progress={Math.random()} color={"#4169E1"} style={styles.progressionBar} />
                <Text style={[styles.progressBarInnerText]}>15/30</Text>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    showBorder: {
        // borderColor: 'black',
        // borderStyle: 'dotted',
        // borderWidth: 1,
        // margin: 1
    },
    text: {
        fontSize: 18
    },
    progressBarInnerText: {
        position: "absolute",
        color: "black",
        fontSize: 12
    },
    progressBarContainer: {
        width: "100%",
        height: 18,
        margin: 4
    },
    container: {
        width: 95,
        height: 95,
        margin: 3,
    },
    centerContentX: {
        flexDirection: "column",
        alignItems: "center"
    },
    stateBar: {
        borderWidth: 1,
        borderColor: "#006400",
        backgroundColor: "floralwhite",
        height: 18,
        borderRadius: 3
    },
    progressionBar: {
        borderWidth: 1,
        borderColor: "#191970",
        backgroundColor: "floralwhite",
        height: 18,
        borderRadius: 3
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

export default PartStatus;