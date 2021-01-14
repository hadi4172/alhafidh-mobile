import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text, Platform } from 'react-native';
import { Grid, Row, Col } from '../ImportIndex';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Icon } from 'react-native-elements'

const { width, height } = Dimensions.get('window');

function TodoRectangle(props) {
    let { isRevision, type, value, hasFinished, hasStarted } = props;

    const [fill, setFill] = useState(0);
    const [oldFill, setOldFill] = useState(0);

    let color = isRevision ? "#0294e3" : "lightgreen";
    let borderColor = isRevision ? "#0173B1" : "limegreen";
    let textColor = isRevision ? "white" : "#004d00";
    let title = isRevision ? "Révision" : "Mémorisation";
    let circularProgressColors = isRevision ? ["#0173B1", "#b3e4ff"] : ["lightseagreen", "#ccffcc"];
    let denominator;

    let isFull = Math.round(fill) === 100;
    let wasFull = Math.round(oldFill) === 100;

    let isNotEmpty = Math.round(fill) > 0;
    let wasNotEmpty = Math.round(oldFill) > 0;

    useEffect(() => {
        if (!wasFull && isFull) { setOldFill(fill); hasFinished(state => state + 1); }
        if (wasFull && !isFull) { setOldFill(fill); hasFinished(state => state - 1); }
        if (!wasNotEmpty && isNotEmpty) hasStarted(state => state + 1);
        if (wasNotEmpty && !isNotEmpty) hasStarted(state => state - 1);
    }, [fill]);

    let firstLineString,
        secondLineString = "";

    switch (type) {
        case "juz'":
            denominator = value.length;
            firstLineString = `Juz'${denominator > 1 ? "s" : ""} ${value.join(", ")}`;
            break;
        case "page":
            denominator = value.length;
            firstLineString = `Page${denominator > 1 ? "s" : ""} ${value.join(", ")}`;
            break;
        case "line":
            denominator = value[2] - value[1] + 1;
            firstLineString = `Page ${value[0]}`;
            secondLineString = `Line${denominator > 1 ? `s ${value[1]}-${value[2]}` : `${value[1]}`}`;
            break;

        default:
            break;
    }

    return (
        <View style={[{ backgroundColor: color, borderColor: borderColor, opacity: isFull ? 0.3 : 1 }, styles.container]}>
            <Grid style={[styles.showBorder]}>
                <Col style={[styles.showBorder, { paddingLeft: 10, paddingTop: 7 }]}>
                    <TouchableOpacity style={{ height: "100%" }} onPress={() => {
                        if (Math.round(fill - 100 / denominator) >= 0) {
                            setFill(fill - 100 / denominator);
                            setOldFill(fill);
                        }
                    }}>
                        <Text style={[{ fontSize: 21, fontWeight: "bold", marginBottom: 3, color: textColor }]}>{title}</Text>
                        <Text style={{ fontSize: 16, color: textColor }}>{firstLineString}</Text>
                        <Text style={{ fontSize: 16, color: textColor }}>{secondLineString}</Text>
                    </TouchableOpacity>
                </Col>

                <Col style={[styles.showBorder, styles.centerContentY, { width: 125, alignItems: "center" }]}>
                    <TouchableOpacity style={{ borderWidth: 2, borderColor: borderColor, borderRadius: 1000 }} onPress={() => {
                        if (Math.round(fill + 100 / denominator) <= 100) {
                            setFill(fill + 100 / denominator);
                            setOldFill(fill);
                        }
                    }}>
                        <AnimatedCircularProgress
                            size={127}
                            width={17}
                            backgroundWidth={17}
                            lineCap={Platform.OS === "ios" ? "round" : "butt"}
                            fill={Math.round(fill)}
                            // arcSweepAngle={240}
                            // rotation={240}
                            style={{ margin: 0, borderWidth: 4, borderColor: "white", borderRadius: 1000 }}
                            tintColor={circularProgressColors[0]}
                            backgroundColor={circularProgressColors[1]}>
                            {(progressFill) => (
                                <View
                                    style={[{
                                        width: "100%",
                                        height: "100%",
                                        borderWidth: 4,
                                        borderColor: "white",
                                        borderRadius: 1000,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }]}>
                                    {
                                        isFull ?
                                            (
                                                <Icon
                                                    name='check'
                                                    type='font-awesome-5'
                                                    color={textColor}
                                                    size={30}
                                                />
                                            ) :
                                            (
                                                <Text style={{
                                                    fontSize: 19,
                                                    fontWeight: "bold",
                                                    color: textColor
                                                }}>
                                                    {Math.round(progressFill / 100 * denominator)}/{denominator}
                                                </Text>
                                            )
                                    }
                                </View>
                            )
                            }
                        </AnimatedCircularProgress>
                    </TouchableOpacity>
                </Col>
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
    container: {
        width: "95%",
        height: 130,
        borderWidth: 3,
        borderRadius: 20,
        margin: 5
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
    }
});

export default TodoRectangle;