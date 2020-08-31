import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

function I0Screen({ navigation }) {
    return (
        <View style={styles.container} >
            <View style={{ height: height * 0.06/*, borderWidth: 1 ,borderColor: "red"*/ }}></View>
            <Image
                style={styles.logo}
                source={require("../assets/Quran1.png")}
            />
            <Button style={styles.btn}
                dark
                contentStyle={styles.btnIn}
                theme={{ roundness: 180 }}
                color="darkgoldenrod"
                labelStyle={styles.btnTxt}
                uppercase={false}
                mode="contained"
                onPress={() => navigation.navigate('I1')}>
                Bismillah
            </Button>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000e21",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 1,
        height: width * 1,
        // borderWidth: 1,
        // borderColor: "green"
    },
    btn: {
        marginTop: height * 0.13,
        width: width * 0.7,
        height: height * 0.1
    },
    btnTxt: {
        fontSize: height * 0.04
    },
    btnIn: {
        width: width * 0.7,
        height: height * 0.1
    }
});

export default I0Screen;