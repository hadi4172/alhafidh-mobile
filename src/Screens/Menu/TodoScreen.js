import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';
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
    const [startedRectangles, setStartedRectangles] = useState(0);

    let hasFinishedDailyTasks = finishedRectangles === numberOfRectangles;
    if (hasFinishedDailyTasks) isNextDay = false;

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (startedRectangles === 0) {
                    // If we don't have unsaved changes, then we don't need to do anything
                    return;
                }

                // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                Alert.alert(
                    'Annuler changements?',
                    `Vous avez pris de l'avance sur ce jour. Voulez vous quand même revenir au jour précédent et enlever votre avance ?`,
                    [
                        { text: "Non", style: 'cancel', onPress: () => { } },
                        {
                            text: 'Oui',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: () => navigation.dispatch(e.data.action),
                        },
                    ]
                );
            }),
        [navigation, startedRectangles]
    );

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
                        <TodoRectangle isRevision={true} type={"juz'"} value={[25]} hasFinished={setFinishedRectangles} hasStarted={setStartedRectangles} />
                        <TodoRectangle isRevision={false} type={"page"} value={[400, 401, 402]} hasFinished={setFinishedRectangles} hasStarted={setStartedRectangles} />
                        <TodoRectangle isRevision={false} type={"line"} value={[403, 1, 7]} hasFinished={setFinishedRectangles} hasStarted={setStartedRectangles} />
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