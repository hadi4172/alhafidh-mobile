import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Grid, Row } from '../../ImportIndex';

const { width, height } = Dimensions.get('window');

function T0Screen(props) {
    let { navigation } = props;
    return (
        <Grid>
            <Row size={5}>

            </Row>
            <Row size={75} style={[styles.centerContentX, styles.centerContentY, styles.showBorder]}>
                <Text style={[styles.question]}>Configuration terminée ! Nous allons maintenant vous expliquer le fonctionnement de l’application.</Text>
            </Row>
            <Row size={25} style={[styles.centerContentX, styles.centerContentY, styles.showBorder]}>
                <Button style={styles.btn}
                    contentStyle={styles.btnIn}
                    theme={{ roundness: 115 }}
                    color="green"
                    labelStyle={styles.btnTxt}
                    uppercase={false}
                    // mode="contained"
                    onPress={() => {
                        navigation.navigate('SwiperMainTutorial');
                    }
                    }>
                    Suivant
                </Button>
            </Row>
        </Grid>
    );
}

const styles = StyleSheet.create({
    showBorder: {
        // borderColor: 'black',
        // borderStyle: 'dotted',
        // borderWidth: 1,
        // margin: 1
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
        fontSize: 17
    },
    btnIn: {
        // width: width * 0.7,
        height: height * 0.1
    }
});

export default T0Screen;