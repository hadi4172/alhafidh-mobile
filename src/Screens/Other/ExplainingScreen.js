import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Grid, Row } from '../../ImportIndex';

const { width, height } = Dimensions.get('window');

function ExplainingScreen(props) {
    let { navigation, route } = props;
    let { textToDisplay, destination, inverse, isWhite } = route.params;
    
    const displayButtons = () => (
        <Row size={inverse ? 15 : 25} style={[styles.centerContentX, styles.centerContentY, styles.showBorder]}>
                <View style={styles.rowDirection}>
                    <Button style={styles.btn}
                        contentStyle={styles.btnIn}
                        theme={{ roundness: 115 }}
                        color="green"
                        labelStyle={styles.btnTxt}
                        uppercase={false}
                        // mode="contained"
                        onPress={() => {
                            navigation.goBack();
                        }
                        }>
                        Retour
                    </Button>
                    <Button style={styles.btn}
                        contentStyle={styles.btnIn}
                        theme={{ roundness: 115 }}
                        color="green"
                        labelStyle={styles.btnTxt}
                        uppercase={false}
                        // mode="contained"
                        onPress={() => {
                            navigation.navigate(destination);
                        }
                        }>
                        Continuer
                    </Button>
                </View>
            </Row>
    )
    return (
        <Grid style={[isWhite?{backgroundColor:"white"}:{}]}>
            <Row size={inverse? 1 : 5}>

            </Row>
            <Row size={inverse? 1000: 75} style={[styles.centerContentX, styles.centerContentY, styles.showBorder, {marginBottom:inverse?60:0}]}>
                <Text style={[styles.question]}>{textToDisplay}</Text>
            </Row>
            {!inverse && displayButtons()}
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
    question:{
        width: "90%",
        textAlign: "center",
        fontSize: height * 0.035,
        color: "#333333"
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

export default ExplainingScreen;