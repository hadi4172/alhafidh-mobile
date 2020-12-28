import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text, Platform } from 'react-native';
import { Grid, Row, Col } from '../ImportIndex';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const { width, height } = Dimensions.get('window');

function TodoRectangle(props) {
    let { isRevision } = props;

    const [fill, setFill] = useState(0);

    let color = isRevision ? "#0294e3" : "lightgreen";
    let borderColor = isRevision ? "#0173B1" : "limegreen";
    let textColor = isRevision ? "white" : "#004d00";
    let title = isRevision ? "Révision" : "Mémorisation";
    let circularProgressColors = isRevision ? ["#0173B1", "#b3e4ff"] : ["lightseagreen", "#ccffcc"];
    let denominator = 8;

    return (
        <View style={[{ backgroundColor: color, borderColor: borderColor }, styles.container]}>
            <Grid style={[styles.showBorder]}>
                <Col style={[styles.showBorder, { paddingLeft: 10, paddingTop: 7 }]}>
                    <TouchableOpacity style={{ height: "100%" }} onPress={() => {
                        if (Math.round(fill - 100 / denominator) >= 0)
                            setFill(fill - 100 / denominator);
                    }}>
                        <Text style={[{ fontSize: 21, fontWeight: "bold", marginBottom: 3, color:textColor }]}>{title}</Text>
                        <Text style={{ fontSize: 16, color:textColor }}>Page {Math.round(Math.random() * 600)}</Text>
                        <Text style={{ fontSize: 16, color:textColor }}>Ligne 5-15</Text>
                    </TouchableOpacity>
                </Col>

                <Col style={[styles.showBorder, styles.centerContentY, { width: 125, alignItems: "center" }]}>
                    <TouchableOpacity style={{ borderWidth: 2, borderColor: borderColor, borderRadius: 1000 }} onPress={() => {
                        if (fill + 100 / denominator < 99)
                            setFill(fill + 100 / denominator);
                        else {
                            setFill(fill + 100 / denominator);
                            setTimeout(() => {
                                setFill(0);
                            }, 400);
                        }
                    }}>
                        <AnimatedCircularProgress
                            size={127}
                            width={17}
                            backgroundWidth={17}
                            lineCap={Platform.OS === "ios" ? "round" : "butt"}
                            fill={fill}
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
                                    <Text style={{
                                        fontSize: 19,
                                        fontWeight: "bold",
                                        color:textColor
                                    }}>
                                        {Math.round(progressFill / 100 * denominator)}/{denominator}
                                    </Text>
                                </View>)}
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