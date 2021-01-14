import React, {useState} from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Row } from '../../ImportIndex';
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

function I6Screen(props) {
    let { navigation } = props;

    let selectName = useSelector(state => state.profileName.value);

    const [text, setText] = useState(selectName !== "Utilisateur" ? selectName : "");

    let dispatch = useDispatch();
    let isFirstStart = useSelector(state => state.firstStart.value);

    return (
        <Grid>
            <Row size={15}>
            <Text style={[styles.indication]}>
                Vous pourrez modifier ces paramètres plus tard
            </Text>
            </Row>
            <Row size={75} style={[styles.centerContentX, styles.centerContentY, styles.showBorder]}>
                <Text style={[styles.question, { marginBottom: 80 }]}>Entrez votre nom</Text>
                <TextInput
                    style={{width:"70%", borderColor:"green", fontSize:18}}
                    mode={"outlined"}
                    numberOfLines={1}
                    theme={{ colors: { primary: "green"} }}
                    placeholder='Entrez votre nom'
                    value={text !== "" ? text : null}
                    onChangeText={text => setText(text)}
                />
            </Row>
            <Row size={25} style={[styles.centerContentX, styles.centerContentY, styles.showBorder]}>
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
                            dispatch({ type: `profileName/set`, payload: text !== "" ? text : "Utilisateur" });
                            if (isFirstStart) navigation.navigate('T0');
                            else navigation.navigate("Menu");
                        }
                        }>
                        {isFirstStart && text === "" ? "Passer" : "Continuer"}
                    </Button>
                </View>
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
        width: "90%",
        textAlign: "center",
        fontSize: 25,
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

export default I6Screen;