import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import { Grid, Row, Col } from '../ImportIndex';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const { width, height } = Dimensions.get('window');

function TodoRectangle(props) {
    let { isRevision } = props;

    const [fill, setFill] = useState(0);

    let color = isRevision ? "lightgray" : "lightgreen";
    let borderColor = isRevision ? "lightslategray" : "limegreen";
    let title =  isRevision ? "Révision" : "Mémorisation";
    let denominator = 8;

    return (
        <View style={[{ backgroundColor: color, borderColor: borderColor }, styles.container]}>
            <Grid style={[styles.showBorder]}>
                <Col style={[styles.showBorder, {paddingLeft:10, paddingTop:7}]}>
                    <Text style={[{fontSize:20, fontWeight:"bold", marginBottom:3}]}>{title}</Text>
                    <Text style={{fontSize:16}}>Page {Math.round(Math.random() * 600)}</Text>
                    <Text style={{fontSize:16}}>Ligne 5-15</Text>
                </Col>

                <Col style={[styles.showBorder, styles.centerContentY, { width: 125, alignItems: "center" }]}>
                    <TouchableOpacity onPress={() => {
                        if (fill + 100/denominator < 99)
                            setFill(fill + 100/denominator);
                        else {
                            setFill(fill + 100/denominator);
                            setTimeout(() => {
                                setFill(0);
                            },400);
                        }
                    }}>
                        <AnimatedCircularProgress
                            size={120}
                            width={16}
                            backgroundWidth={6}
                            lineCap={"round"}
                            fill={fill}
                            arcSweepAngle={240}
                            rotation={240}
                            style={{ marginTop: 20, marginRight:10 }}
                            tintColor="green"
                            backgroundColor="darkgrey">
                            { (fill) => ( <Text style={{fontSize:14}}> {Math.round(fill/100*denominator)}/{denominator} </Text> ) }
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
        borderWidth: 1,
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

export default TodoRectangle;