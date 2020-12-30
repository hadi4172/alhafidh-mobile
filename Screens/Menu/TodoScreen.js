import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Grid, Row } from '../../ImportIndex';
import OverviewBar from '../../Components/OverviewBar';
import TodoRectangle from '../../Components/TodoRectangle';

const { width, height } = Dimensions.get('window');

function TodoScreen(props) {
    let { navigation } = props;

    return (
        <Grid>
            <Row size={5}>

            </Row>
            <Row size={95} style={[styles.centerContentX]}>
                <OverviewBar automatic/>
                <ScrollView style={[{width:"100%"}]}>
                    <View style={[{ width: "100%", alignItems: "center", marginTop: 10 }, styles.showBorder]}>
                        <TodoRectangle isRevision={true} type={"juz'"} value={[25]}/>
                        <TodoRectangle isRevision={false} type={"page"} value={[400,401,402]}/>
                        <TodoRectangle isRevision={false} type={"line"} value={[403,1,7]}/>
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

export default TodoScreen;