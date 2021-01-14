import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import moment from "moment";
import 'moment-precise-range-plugin';
import { Col, Row, Grid, DateTimePicker } from "../../ImportIndex/index";

const { width, height } = Dimensions.get('window');

function I3Screen({ navigation }) {
    let initialDate = (new Date()).setHours(0, 0, 0, 0);

    let savedDaysRemaining = useSelector(state => state.finishTimeRemaining.value);
    let displayedDateInitialValue = savedDaysRemaining !== 0 ? "in " + moment.preciseDiff(initialDate,  initialDate + savedDaysRemaining * (1000 * 60 * 60 * 24)) : "";

    let [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    let [displayedDate, setDisplayedDate] = useState(displayedDateInitialValue);
    let [selectedDate, setSelectedDate] = useState(new Date());
    let [showContinue, setShowContinue] = useState(savedDaysRemaining !== 0 ? true : false);
    let dispatch = useDispatch();
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        if (date.getTime() < (+initialDate + 1000 * 60 * 60 * 24 * 1)) {         //fix a IOS bug
            date = new Date(+initialDate + 1000 * 60 * 60 * 24 * 30)
        }
        date.setHours(0, 0, 0, 0);

        setSelectedDate(date);
        if((+date - initialDate) % (1000 * 60 * 60 * 24) === 82800000 ) date = new Date(moment(date).add(1, "hours"));  //fix 23 hours
        setDisplayedDate("in " + moment.preciseDiff(initialDate, date.getTime()));
        dispatch({ type: `finishTimeRemaining/set`, payload: (+date - initialDate) / (1000 * 60 * 60 * 24) });
        if (!showContinue) setShowContinue(true);
        hideDatePicker();
    };

    return (
        <Grid>
            <Row size={20} style={styles.showBorder
            }>
                <Text style={styles.indication}>
                    Vous pourrez modifier ces paramètres plus tard
                </Text>
            </Row>
            <Row size={30} style={[styles.showBorder,
            styles.centerContentX, styles.centerContentY]}>
                <Text style={[styles.question, styles.showBorder]}>
                    Quand voulez vous avoir terminé la mémorisation de la partie sélectionnée ?
                </Text>
            </Row>
            <Row size={15} style={[styles.showBorder,
            styles.centerContentX, styles.centerContentY]}>
                <Text style={[styles.question, styles.showBorder]}>
                    {displayedDate}
                </Text>
            </Row>
            <Row size={35} style={[styles.showBorder,
            styles.centerContentX, styles.centerContentY]}>
                <Button style={styles.btn}
                    contentStyle={styles.btnIn}
                    theme={{ roundness: 115 }}
                    color="green"
                    labelStyle={styles.btnTxt}
                    uppercase={false}
                    mode="contained"
                    onPress={() => {
                        showDatePicker();
                    }
                    }>
                    Sélectionner une date
                </Button>
                {showContinue && (
                    <View style={styles.rowDirection}>
                        <Button style={styles.btn}
                            contentStyle={styles.btnIn}
                            theme={{ roundness: 115 }}
                            color="green"
                            labelStyle={styles.btnTxt}
                            uppercase={false}
                            // mode="contained"
                            onPress={() => {
                                navigation.navigate('Objectif');
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
                                navigation.navigate('I4');
                            }
                            }>
                            Continuer
                    </Button>
                    </View>
                )}
                <DateTimePicker
                    isVisible={isDatePickerVisible}
                    mode="date"
                    value={initialDate}
                    date={selectedDate}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)}
                />
            </Row>
        </Grid>
    );
}

const styles = StyleSheet.create({
    // showBorder: {
    //     borderColor: 'black',
    //     borderStyle: 'dotted',
    //     borderWidth: 1,
    //     margin: 1
    // },
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
        fontSize: height * 0.025
    },
    btnIn: {
        // width: width * 0.7,
        height: height * 0.1
    }
});

export default I3Screen;