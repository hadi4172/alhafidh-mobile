import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import moment from "moment";
import 'moment-precise-range-plugin';
import AverageHifdhBox from "../Components/AverageHifdhBox";
import HRGetter from "../Data/hifdhAndRevisionGetter";
import { Row, Grid } from "../ImportIndex/index";
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

function I4Screen(props) {
    let { navigation } = props,
        daysToFinish = useSelector(state => state.finishDate.value),
        memorized = useSelector(state => state.memorized.value)[2].length,
        toMemorize = useSelector(state => state.toMemorize.value)[2].length,
        myHRGetter = new HRGetter(toMemorize, daysToFinish, memorized),
        today = (new Date()).setHours(0, 0, 0, 0),
        displayedDate = moment.preciseDiff(today, moment(today).add(daysToFinish, "days")).replace(/[0-9]{0,2} hour.*/ig, ''),
        numberOfBoxes = 4,
        isLongPeriod = daysToFinish > (7*numberOfBoxes);

    const getTextDateIntervalArray = (numOfBoxesBeforeCompletion) => {
        let dateIntervals = [];
        dateIntervals.push(moment(today).format('MMM Do YY'));
        for (let i = 1; i <= numOfBoxesBeforeCompletion; i++) {
            dateIntervals.push(moment(new Date(+today + Math.round(daysToFinish * (i / numOfBoxesBeforeCompletion) * 86400000))).format('MMM Do YY'));
        }
        return dateIntervals;
    }

    const getAvgHifdhPerBoxArray = (numOfBoxes) => {
        let avgHifdh = [];
        for (let i = 0; i < numOfBoxes; i++) {
            avgHifdh.push(myHRGetter.getAverageMemorization(daysToFinish * (i / (numOfBoxes-1)), daysToFinish * (i + 1 / (numOfBoxes-1)), isLongPeriod));
        }
        avgHifdh.push(myHRGetter.getAverageMemorization(daysToFinish + 100, daysToFinish + 300, isLongPeriod));
        console.log(`avgHifdh:`,avgHifdh);
        return avgHifdh;
    }

    const getAverageRevisionPerBoxArray = (numOfBoxes) => {
        let avgRev = [];
        for (let i = 0; i < numOfBoxes; i++) {
            avgRev.push(myHRGetter.getAverageRevision(daysToFinish * (i / (numOfBoxes-1)), daysToFinish * (i + 1 / (numOfBoxes-1))));
        }
        avgRev.push(myHRGetter.getAverageRevision(daysToFinish + 100, daysToFinish + 300));
        return avgRev;
    }

    const renderAvgHifdhBoxes = (numOfBoxes) => {
        let avgHifdhBoxes = [];
        let txtDateIntervals = getTextDateIntervalArray(numOfBoxes - 1);
        let avgHifdhPerBox = getAvgHifdhPerBoxArray(numOfBoxes);
        let avgRevPerBox = getAverageRevisionPerBoxArray(numOfBoxes);
        for (let i = 0; i < numOfBoxes - 1; i++) {
            avgHifdhBoxes.push(
                <AverageHifdhBox
                    key={i}
                    size={width * 0.42}
                    date={txtDateIntervals[i] + " - " + txtDateIntervals[i + 1]}
                    isLongPeriod={isLongPeriod}
                    pagesToReview={avgRevPerBox[i]}
                    pagesToMemorize={avgHifdhPerBox[i]}
                />
            )
        }
        avgHifdhBoxes.push(
            <AverageHifdhBox
                key={numOfBoxes}
                size={width * 0.42}
                date={"After completion"}
                isLongPeriod={isLongPeriod}
                pagesToReview={avgRevPerBox[numOfBoxes - 1]}
                pagesToMemorize={avgHifdhPerBox[numOfBoxes - 1]}
            />
        )
        return avgHifdhBoxes;
    }

    return (
        <Grid style={[styles.showBorder]}>
            <Row size={27.5} style={[styles.showBorder, { alignItems: "flex-end" }, styles.centerContentY]}>
                <Text style={[styles.question, styles.showBorder]}>
                    Voici le nombre de page <Text style={{ textDecorationLine: 'underline' }}>moyen</Text> à apprendre et reviser pour terminer dans une durée de {displayedDate}. Cela vous convient-il ?
                </Text>
            </Row>
            <Row size={72.5} style={[styles.showBorder, styles.centerContentX, styles.centerContentY]}>
                <ScrollView>
                    <Grid>
                        <Row size={80} style={[styles.centerContentY]}>
                            <View style={[{ width: width * 0.88 }, styles.flexWrap, styles.showBorder, styles.rowDirection]}>
                                {renderAvgHifdhBoxes(numberOfBoxes)}
                            </View>
                        </Row>
                        <Row size={15} style={[styles.showBorder, styles.centerContentX, styles.centerContentY]}>
                                <Button style={styles.btn}
                                    contentStyle={styles.btnIn}
                                    theme={{ roundness: 115 }}
                                    color="green"
                                    labelStyle={styles.btnTxt}
                                    uppercase={false}
                                    // mode="contained"
                                    onPress={() => {
                                        navigation.navigate('I3');
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
                            </Row>
                    </Grid>
                </ScrollView>
            </Row >
        </Grid >
    );
}

const styles = StyleSheet.create({
    showBorder: {
        borderColor: 'black',
        borderStyle: 'dotted',
        borderWidth: 1,
        margin: 1
    },
    container: {
    },
    centerContentX: {
        alignItems: "center"
    },
    centerContentY: {
        justifyContent: "center"
    },
    rowDirection: {
        flexDirection: "row"
    },
    columnDirection: {
        flexDirection: "column"
    },
    flexWrap: {
        flexWrap: "wrap"
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
        width: "82%",
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

export default I4Screen;