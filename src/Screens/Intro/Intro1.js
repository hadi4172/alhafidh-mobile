import React from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { configureRevisionMode, configureNormalMode } from "../../Utils/utils";

const { width, height } = Dimensions.get('window');

function I1Screen({ navigation }) {
    let dispatch = useDispatch();
    let isRevisionMode = useSelector(state => state.revisionMode.value);
    let isFirstStart = useSelector(state => state.firstStart.value);

    return (
        <View style={[styles.container, styles.showBorder]} >
            <Text style={[styles.indication]}>
                Vous pourrez modifier ces paramètres plus tard
            </Text>
            <Text style={styles.question}>
                Voulez vous utiliser cette application pour apprendre le Coran et le réviser, ou seulement le réviser ?
            </Text>
            <View style={[styles.btnGroup, styles.showBorder]}>
                <Button style={[styles.btn, !isFirstStart ? { opacity: !isRevisionMode ? 1 : 0.4 } : {}]}
                    contentStyle={styles.btnIn}
                    theme={{ roundness: 115 }}
                    color="green"
                    labelStyle={styles.btnTxt}
                    uppercase={false}
                    mode="contained"
                    onPress={() => {
                        if (!isFirstStart && isRevisionMode || isFirstStart) {
                            navigation.navigate('ExplainingMémorisé');
                            dispatch({ type: `revisionMode/set`, payload: false });
                            configureNormalMode(dispatch);
                        }
                    }}>
                    Apprendre et réviser
            </Button>
                <Button style={[styles.btn, !isFirstStart ? { opacity: isRevisionMode ? 1 : 0.4 } : {}]}
                    contentStyle={styles.btnIn}
                    theme={{ roundness: 115 }}
                    color="green"
                    labelStyle={styles.btnTxt}
                    uppercase={false}
                    mode="contained"
                    onPress={() => {
                        if (!isFirstStart && !isRevisionMode || isFirstStart) {
                            navigation.navigate('ExplainingMémorisé');
                            dispatch({ type: `revisionMode/set`, payload: true });
                            configureRevisionMode(dispatch)
                        }
                    }}>
                    Seulement réviser
            </Button>
                {!isFirstStart && (
                    // <TouchableOpacity style={[styles.btn, styles.showBorder, {justifyContent:"center", alignItems:"center"}]} onPress={() => {
                    //     navigation.navigate('Mémorisé');
                    // }}>
                    //     <Text style={[{color:"green", fontSize:16}]}>
                    //         Suivant
                    //     </Text>
                    // </TouchableOpacity>
                    <Button style={[styles.btn,{width:"50%", justifyContent:"center", alignSelf:"center"}, styles.showBorder]}
                        contentStyle={{height:"100%"}}
                        theme={{ roundness: 115 }}
                        color="green"
                        labelStyle={styles.btnTxt}
                        uppercase={false}
                        // mode="contained"
                        onPress={() => {
                            navigation.navigate('ExplainingMémorisé');
                        }
                        }>
                        Suivant
                    </Button>
                )}
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
        marginTop: height * 0.16,
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
        height: height * 0.1,
        width: width * 0.7
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