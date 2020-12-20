import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

function AverageHifdhBox(props) {
    let { size, date, isLongPeriod, pagesToReview, pagesToMemorize } = props;
    let isStillMemorizing = /\d/.test(date);
    return (
        <View style={[{ width: size, height: size, borderRadius: 20, backgroundColor: isStillMemorizing ? "lightblue" : "#1E90FF", margin: 2 }, styles.showBorder, styles.centerAll]}>
            <View style={{ width: "100%", backgroundColor: isStillMemorizing ? "rgba(70, 130, 180, 0.3)" : "rgba(70, 130, 180, 0)", borderTopEndRadius: isStillMemorizing ? 20 : 0, borderTopStartRadius: isStillMemorizing ? 20 : 0, marginBottom: 0, marginTop: 0 }}>
                <Text style={[{ marginBottom: 5, textAlign: "center", fontSize: 19, color: isStillMemorizing ? "black" : "white" }]}>{date}</Text>
            </View>
            {!isStillMemorizing && (
                <View>
                    <Text style={[{ marginTop: 2 }]}></Text>
                </View>
            )}
            <View style={{ backgroundColor: "rgba(240, 255, 240, 0.3)", marginBottom: 2, borderRadius: 10, width: "100%", height: "30%" }}>
                <Text style={{ color: isStillMemorizing ? "black" : "white", textAlign: "center" }}> à réviser </Text>
                <Text style={{ color: isStillMemorizing ? "black" : "white", textAlign: "center" }}><Text style={[styles.bold, { /*fontSize: 17,*/ color: isStillMemorizing ? "black" : "white" }/*, {color:"cornflowerblue"}*/]}>{pagesToReview}</Text> p/jour</Text>
            </View>
            {isStillMemorizing && (
                <View style={{ backgroundColor: "rgba(255, 240, 245, 0.3)", borderRadius: 10, width: "100%" }}>
                    <Text style={[{ marginTop: 0, textAlign: "center" }]}> à apprendre </Text>
                    <Text style={{ textAlign: "center" }} ><Text style={[styles.bold, {/*fontSize: 19*/ }/*, {color:"cornflowerblue"}*/]}>{pagesToMemorize}</Text>{isLongPeriod ? " p/sem" : " p/jour"}</Text>
                </View>
            )}

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
    },
    bold: {
        fontWeight: "bold",
        fontSize: 15
    },
    centerAll: {
        alignItems: "center",
        justifyContent: "center"
    }
});

export default AverageHifdhBox;