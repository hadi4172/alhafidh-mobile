import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Grid, Row } from '../../ImportIndex';
import TodoRectangle from "../../Components/TodoRectangle";
const { width, height } = Dimensions.get('window');

function T1Screen(props) {
    let { navigation, scroll } = props;
    return (
        <Grid>
            <Row size={10} style={[styles.showBorder]}>

            </Row>
            <Row size={20} style={[styles.centerContentX, styles.centerContentY, styles.showBorder]}>
                <Text style={[styles.question]}>Chaque jour, vous aurez une partie à apprendre/réviser que vous cocherez quand vous aurez terminé .</Text>
            </Row>
            <Row size={60} style={[styles.centerContentX, styles.centerContentY, styles.showBorder]}>
                <TodoRectangle isRevision={true} type={"juz'"} value={[25]} />
                <TodoRectangle isRevision={false} type={"line"} value={[403,1,13]} />
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
        fontSize: 20,
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

export default T1Screen;