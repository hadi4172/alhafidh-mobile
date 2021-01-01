import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { FAB } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Grid, Row } from '../../ImportIndex';
import TodoRectangle from '../../Components/TodoRectangle';

const { width, height } = Dimensions.get('window');

function TodoScreen(props) {
    let { navigation, route } = props;
    let { isNextDay } = route.params;

    const numberOfRectangles = 3;
    const [finishedRectangles, setFinishedRectangles] = useState(0);

    let hasFinishedDailyTasks = finishedRectangles === numberOfRectangles;
    if (hasFinishedDailyTasks) isNextDay = false;

    return (
        <Grid>
            { isNextDay && (
                <Row size={5} style={[styles.nextDayUpperBar, styles.centerContentX, styles.centerContentY]}>
                    <Text style={{ color: "steelblue" }}>You are viewing the next day</Text>
                </Row>
            )
            }
            <Row size={95} style={[styles.centerContentX]}>
                <ScrollView style={[{ width: "100%" }]}>
                    <View style={[{ width: "100%", alignItems: "center", marginTop: 10 }, styles.showBorder]}>
                        <TodoRectangle hasFinished={setFinishedRectangles} isRevision={true} type={"juz'"} value={[25]} />
                        <TodoRectangle hasFinished={setFinishedRectangles} isRevision={false} type={"page"} value={[400, 401, 402]} />
                        <TodoRectangle hasFinished={setFinishedRectangles} isRevision={false} type={"line"} value={[403, 1, 7]} />
                    </View>
                </ScrollView>
            </Row>
            {
                (hasFinishedDailyTasks || isNextDay) && (
                    <FAB
                        style={{
                            position: 'absolute',
                            margin: 16,
                            right: 0,
                            bottom: 0,
                            backgroundColor: !isNextDay ? "skyblue" : "steelblue"
                        }}
                        label={!isNextDay ? "Voir prochain jour" : "Retour"}
                        icon={!isNextDay ? "plus" : "keyboard-return"}
                        onPress={() => {
                            if (!isNextDay) navigation.push("Todo", { isNextDay: true });
                            else navigation.goBack();
                        }}
                    />)
            }
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
    nextDayUpperBar: {
        backgroundColor: "lightblue",
        borderWidth: 3,
        borderColor: "lightcyan",
        marginHorizontal: 30,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30
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
    }
});

export default TodoScreen;