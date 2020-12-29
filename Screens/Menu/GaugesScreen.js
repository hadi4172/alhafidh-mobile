import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Grid, Row } from '../../ImportIndex';
import OverviewBar from '../../Components/OverviewBar';
import PartStatus from '../../Components/PartStatus';

const { width, height } = Dimensions.get('window');

function GaugeScreen(props) {
    let { navigation } = props;

    const showPartStatus = () => {
        const randomRange = (min, max) => {
            return ~~(Math.random() * (max - min + 1)) + min;
        }

        let components = [];
        for (let i = 0; i < 30; i++) {
            let secondaryNumerator = randomRange(1, 30);
            let principalDenominator = secondaryNumerator === 30 ? 15 : randomRange(2, 7);
            let principalNumerator = randomRange(0, principalDenominator);

            if (principalNumerator === 0) {
                if (secondaryNumerator === 30) {
                    secondaryNumerator = 20;
                    principalDenominator = 7;
                    principalNumerator = 3;
                } else {
                    if (secondaryNumerator > 10) secondaryNumerator -= 10;
                    else secondaryNumerator = 0
                }
            }
            components.push(
                <PartStatus
                    key={i.toString()}
                    title={`Juz' ${i + 1}`}
                    principalNumerator={principalNumerator}
                    principalDenominator={principalDenominator}
                    secondaryNumerator={secondaryNumerator}
                />
            )
        }
        return components
    }

    return (
        <Grid>
            <Row size={5}>

            </Row>
            <Row size={95} style={[styles.centerContentX]}>
                <OverviewBar automatic percentageFinished={70} />
                <ScrollView>
                    <View style={[styles.jaugesScrollView, styles.rowDirection, styles.showBorder]}>
                        {showPartStatus()}
                    </View>
                </ScrollView>
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
    jaugesScrollView: {
        width: "100%",
        flexWrap: 'wrap',
        justifyContent: "center",
        marginTop: 10
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
        fontSize: 17
    },
    btnIn: {
        // width: width * 0.7,
        height: height * 0.1
    }
});

export default GaugeScreen;