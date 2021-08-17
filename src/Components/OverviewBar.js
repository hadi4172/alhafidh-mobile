import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { ProgressBar, Title } from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import { Grid, Row, Col } from '../ImportIndex';
import { useSelector } from 'react-redux';
import moment from "moment";
import 'moment-precise-range-plugin';


const { width, height } = Dimensions.get('window');

function OverviewBar(props) {
    let { name, remainingTimeTillFinishString, toMemorizeGoalString, pictureSource, percentageFinished, automatic } = props;

    let initialDate = (new Date()).setHours(0, 0, 0, 0);
    let finishDaysRemaining = useSelector(state => state.finishTimeRemaining.value);
    let stringDiffTillFinish = moment.preciseDiff(initialDate, initialDate + finishDaysRemaining * (1000 * 60 * 60 * 24) );

    // console.log(`finishTimestampRemaining:`,finishTimestampRemaining);

    let imageDefined = typeof pictureSource !== 'undefined';
    let imagePath = "root/assets/Circular1.png" ; //pictureSource;  //TODO Regler problème require

    let autoName = useSelector(state => state.profileName.value);
    let autoPercentage = useSelector(state => state.percentageFinished.value);
    let autoIsRevisionMode = useSelector(state => state.revisionMode.value);

    if(automatic){
        if(typeof name === "undefined") name = autoName
        if(typeof remainingTimeTillFinishString === "undefined") remainingTimeTillFinishString = stringDiffTillFinish;
        if(typeof toMemorizeGoalString === "undefined") toMemorizeGoalString = !autoIsRevisionMode ? "Tout le Coran" : "Révision";         //TODO Déduire le string a partir des données state.toMemorize.value (ex: "342 pages")
        if(typeof percentageFinished === "undefined") percentageFinished = autoPercentage
    }
    

    return (
        <View style={[styles.container, styles.showBorder]}>
            <Grid>
                <Row size={85}>
                    <Col style={[{ width: 95 }]} >
                        <Avatar rounded
                            size={80}
                            icon={{ name: 'user', type: 'font-awesome-5', color: imageDefined ? "transparent" : "gainsboro" }}
                            source={imageDefined ? require(imagePath) : undefined}
                            overlayContainerStyle={{ backgroundColor: imageDefined ? "transparent" : 'darkslategrey', opacity: 0.7 }}
                            containerStyle={{ marginLeft: 5, marginTop: 5 }}
                        />
                    </Col>
                    <Col>
                        <Title numberOfLines={1}>{name}</Title>
                        <Text style={[styles.text]}>Objectif : {toMemorizeGoalString}</Text>
                        <Text style={[styles.text]}>{!autoIsRevisionMode ?`Temps restant : ${remainingTimeTillFinishString}`:""}</Text>
                    </Col>
                </Row>
                <Row style={[{ flexDirection: "column" }]} size={15}>
                    <ProgressBar progress={percentageFinished/100} color={"orange"} style={styles.progressBar} />
                </Row>
            </Grid>
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
    text: {
        fontSize: 12
    },
    container: {
        width: "97%",
        height: 115
    },
    centerContentX: {
        flexDirection: "column",
        alignItems: "center"
    },
    progressBar: {
        borderWidth: 1,
        borderColor: "#cc8500",
        backgroundColor: "floralwhite",
        height: 8,
        borderRadius: 20
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

export default OverviewBar;