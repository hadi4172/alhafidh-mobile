import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

function AverageHifdhBox(props) {
    let { size, date, isLongPeriod, pagesToReview, pagesToMemorize } = props;
    return (
        <View style={[{width: size, height:size, backgroundColor:"gainsboro", margin:2}, styles.showBorder, styles.centerAll]}>
            <Text style={[{marginBottom:5, textAlign: "center", fontSize:19}]}>{date}</Text>
            <Text style={{backgroundColor:"gold"}}> à réviser </Text>
            <Text><Text style={[styles.bold/*, {color:"cornflowerblue"}*/]}>{pagesToReview}</Text> p/jour</Text>
            <Text style={[{marginTop:5, backgroundColor:"goldenrod"}]}> à apprendre </Text>
            <Text><Text style={[styles.bold/*, {color:"cornflowerblue"}*/]}>{pagesToMemorize}</Text>{isLongPeriod ? "p/sem" : "p/jour"}</Text>
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
        fontSize:15
    },
    centerAll:{
        alignItems: "center",
        justifyContent: "center"
    }
});

export default AverageHifdhBox;