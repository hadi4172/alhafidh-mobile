import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import moment from "moment";
import 'moment-precise-range-plugin';
import AverageHifdhBox from "../Components/AverageHifdhBox";
import HRGetter from "../Data/hifdhAndRevisionGetter";
import { Row, Grid } from "../ImportIndex/index";

const { width, height } = Dimensions.get('window');

function I4Screen(props) {
    let { navigation } = props,
        daysToFinish = useSelector(state => state.finishDate.value),
        memorized = useSelector(state => state.memorized.value)[2].length,
        toMemorize = useSelector(state => state.toMemorize.value)[2].length,
        myHRGetter = new HRGetter(toMemorize, daysToFinish, memorized),
        today = (new Date()).setHours(0, 0, 0, 0),
        oneThirdFinishDate = new Date(+today + Math.round(daysToFinish * (1 / 3) * 86400000)),
        twoThirdFinishDate = new Date(+today + Math.round(daysToFinish * (2 / 3) * 86400000)),
        finishDate = new Date(+today + daysToFinish * 86400000),
        displayedDate = moment.preciseDiff(today, moment(today).add(daysToFinish, "days")).replace(/[0-9]{0,2} hour.*/ig, ''),
        dateArg0 = moment(today).format('MMM Do YY'),
        dateArg1 = moment(oneThirdFinishDate).format('MMM Do YY'),
        dateArg2 = moment(twoThirdFinishDate).format('MMM Do YY'),
        dateArg3 = moment(finishDate).format('MMM Do YY'),
        isLongPeriod = daysToFinish > 28,
        avgH0 = myHRGetter.getAverageMemorization(0,daysToFinish * (1 / 3),isLongPeriod),
        avgH1 = myHRGetter.getAverageMemorization(daysToFinish * (1 / 3), daysToFinish * (2 / 3),isLongPeriod),
        avgH2 = myHRGetter.getAverageMemorization(daysToFinish * (2 / 3), daysToFinish,isLongPeriod),
        avgH3 = myHRGetter.getAverageMemorization(daysToFinish+100,daysToFinish+300,isLongPeriod),
        avgR0 = myHRGetter.getAverageRevision(0,daysToFinish * (1 / 3)),
        avgR1 = myHRGetter.getAverageRevision(daysToFinish * (1 / 3), daysToFinish * (2 / 3)),
        avgR2 = myHRGetter.getAverageRevision(daysToFinish * (2 / 3), daysToFinish),
        avgR3 = myHRGetter.getAverageRevision(daysToFinish+100,daysToFinish+300);
        // console.log(`daysToFinish * (1 / 3):`,daysToFinish * (1 / 3));

    return (
        <Grid style={[styles.showBorder]}>
            <Row size={27.5} style={[styles.showBorder, { alignItems: "flex-end" }, styles.centerContentY]}>
                <Text style={[styles.question, styles.showBorder]}>
                    Voici le nombre de page <Text style={{ textDecorationLine: 'underline' }}>moyen</Text> à apprendre et reviser pour terminer dans une durée de {displayedDate}. Cela vous convient-il ?
                </Text>
            </Row>
            <Row size={57.5} style={[styles.showBorder, styles.centerContentX, styles.centerContentY]}>
                <View style={[{ height: width * 0.88, width: width * 0.88 }, styles.flexWrap, styles.showBorder, styles.rowDirection]}>
                    <AverageHifdhBox size={width * 0.42} date={dateArg0 + " - " + dateArg1} isLongPeriod={isLongPeriod} pagesToReview={avgR0} pagesToMemorize={avgH0} />
                    <AverageHifdhBox size={width * 0.42} date={dateArg1 + " - " + dateArg2} isLongPeriod={isLongPeriod} pagesToReview={avgR1} pagesToMemorize={avgH1} />
                    <AverageHifdhBox size={width * 0.42} date={dateArg2 + " - " + dateArg3} isLongPeriod={isLongPeriod} pagesToReview={avgR2} pagesToMemorize={avgH2} />
                    <AverageHifdhBox size={width * 0.42} date={"After completion"}          isLongPeriod={isLongPeriod} pagesToReview={avgR3} pagesToMemorize={avgH3} />
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
        </Grid >
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