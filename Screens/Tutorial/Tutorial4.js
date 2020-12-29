import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { Grid, Row } from '../../ImportIndex';
import PartStatus from '../../Components/PartStatus';

const { width, height } = Dimensions.get('window');

function T4Screen(props) {
    let { navigation, scroll } = props;

    const showPartStatus = () => {
        let components = [];
        for (let i = 0; i < 3; i++) components.push(
            <PartStatus
                key={i.toString()}
                title={`Juz' ${[21, 22, 23][i]}`}
                principalNumerator={[2, 2, 11][i]}
                principalDenominator={[3, 7, 15][i]}
                secondaryNumerator={[15, 28, 30][i]}
            />)
        return components
    }

    return (
        <Grid>
            <Row size={10} style={[styles.centerContentX, styles.centerContentY, styles.showBorder]}>
            </Row>
            <Row size={50} style={[styles.centerContentX, styles.showBorder]}>
                <Title style={{ fontSize: 23 }}>Jauges</Title>
                <Text style={{ fontSize: 10 }}></Text>
                <Text style={[styles.question]}>Passé 30 jours sans que la jauge verte se vide, la partie passe dans l’ensemble Qadim.
                À ce stade, la jauge verte restera stable à 15 points max et l’utilisateur restaurera 1 point à la révision.
                  </Text>
            </Row>
            <Row size={30} style={[styles.centerContentX, styles.centerContentY, styles.showBorder]}>
                <View style={[styles.rowDirection]}>
                    {showPartStatus()}
                </View>
            </Row>
            <Row size={20} style={[styles.centerContentX, styles.showBorder]}>
                <Button style={styles.btn}
                    contentStyle={styles.btnIn}
                    theme={{ roundness: 115 }}
                    color="green"
                    labelStyle={styles.btnTxt}
                    uppercase={false}
                    // mode="contained"
                    onPress={() => {
                        scroll();
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
        fontSize: 19,
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

export default T4Screen;