import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import { Grid, Row } from '../../ImportIndex';


let { width, height } = Dimensions.get('window');

function I5Screen({ navigation }) {
    let dispatch = useDispatch();

    let isFirstStart = useSelector(state => state.firstStart.value);
    let isNormalOrder = useSelector(state => state.order.value);

    return (
        <Grid>
            <Row size={20} style={styles.showBorder}>
                <Text style={styles.indication}>
                    Vous pourrez modifier ces paramètres plus tard
                </Text>
            </Row>
            <Row size={40} style={[styles.centerContentX, styles.centerContentY, styles.showBorder, { flexDirection: "column" }]}>
                <Text style={[styles.question]}>Dans quel ordre souhaitez vous mémoriser ?</Text>
            </Row>
            <Row size={60} style={[styles.centerContentX, styles.centerContentY, styles.showBorder, { flexDirection: "column" }]}>
                <Button style={[styles.btn, !isFirstStart ? { opacity: isNormalOrder ? 1 : 0.4 } : {}]}
                    contentStyle={styles.btnIn}
                    theme={{ roundness: 115 }}
                    color="green"
                    labelStyle={styles.btnTxt}
                    uppercase={false}
                    mode="contained"
                    onPress={() => {
                        dispatch({ type: `order/set`, payload: true });
                        navigation.navigate('I6');
                    }
                    }>
                    Ordre du Mushaf
                    </Button>
                <Button style={[styles.btn, !isFirstStart ? { opacity: !isNormalOrder ? 1 : 0.4 } : {}]}
                    contentStyle={styles.btnIn}
                    theme={{ roundness: 115 }}
                    color="green"
                    labelStyle={styles.btnTxt}
                    uppercase={false}
                    mode="contained"
                    onPress={() => {
                        dispatch({ type: `order/set`, payload: false });
                        navigation.navigate('I6');
                    }
                    }>
                    Ordre inverse du Mushaf
                    </Button>
                {!isFirstStart && (
                    <Button style={[styles.btn,{width:"40%", justifyContent:"center", alignSelf:"center", marginTop:10}, styles.showBorder]}
                        contentStyle={{height:"100%"}}
                        theme={{ roundness: 115 }}
                        color="green"
                        labelStyle={styles.btnTxt}
                        uppercase={false}
                        // mode="contained"
                        onPress={() => {
                            navigation.navigate('I6');
                        }
                        }>
                        Suivant
                    </Button>
                )}
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
        width: "80%",
        textAlign: "center",
        fontSize: height * 0.04,
        color: "#333333"
    },
    btnGroup: {
        // borderWidth:1,
        height: height * 0.6,
        justifyContent: "center"
    },
    btn: {
        margin: 7,
        width: width * 0.75,
        height: height * 0.1
    },
    btnTxt: {
        fontSize: height * 0.027
    },
    btnIn: {
        width: width * 0.7,
        height: height * 0.1
    }
});

export default I5Screen;