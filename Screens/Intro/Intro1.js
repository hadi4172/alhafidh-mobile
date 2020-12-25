import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

function I1Screen({navigation}) {
    return (
        <View style={styles.container} >
            <Text style={styles.indication}>
                Vous pourrez modifier ces paramètres plus tard
            </Text>
            <Text style={styles.question}>
                Voulez vous utiliser cette application pour apprendre le Coran et le réviser, ou seulement le réviser ?
            </Text>
            <View style={styles.btnGroup}>
                <Button style={styles.btn}
                    contentStyle={styles.btnIn}
                    theme={{ roundness: 115 }}
                    color="green"
                    labelStyle={styles.btnTxt}
                    uppercase={false}
                    mode="contained"
                    onPress={() => navigation.navigate('Mémorisé')}>
                    Apprendre et réviser
            </Button>
                <Button style={styles.btn}
                    contentStyle={styles.btnIn}
                    theme={{ roundness: 115 }}
                    color="green"
                    labelStyle={styles.btnTxt}
                    uppercase={false}
                    mode="contained"
                    onPress={() => navigation.navigate('I0Screen')}>
                    Seulement réviser
            </Button>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    indication: {
        marginTop: 40,
        width: width * 0.93,
        textAlign: "center",
        fontSize: height * 0.02,
        color: "slategrey"
    },
    question: {
        marginTop: height * 0.13,
        width: width * 0.9,
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
        marginTop: height * 0.1 / 3,
        width: width * 0.7,
        height: height * 0.1
    },
    btnTxt: {
        fontSize: height * 0.025
    },
    btnIn: {
        width: width * 0.7,
        height: height * 0.1
    }
});

export default I1Screen;