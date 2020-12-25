import React, {useRef} from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import T1Screen from '../Screens/Tutorial/Tutorial1';
import T2Screen from '../Screens/Tutorial/Tutorial2';
import T3Screen from '../Screens/Tutorial/Tutorial3';
import T4Screen from '../Screens/Tutorial/Tutorial4';
import T5Screen from '../Screens/Tutorial/Tutorial5';
import T6Screen from '../Screens/Tutorial/Tutorial6';

import Swiper from 'react-native-swiper'

const { width, height } = Dimensions.get('window');

function SwiperMainTutorial(props) {
    let { navigation } = props;

    const swiper = useRef(null);

    const scrollToNext = () => {
        swiper.current.scrollBy(1);
    }

    return (
        <View style={{ flex: 1 }}>
            <Swiper ref={swiper} loop={false} bounces={true}>
                <T1Screen navigation={navigation} scroll={scrollToNext} />
                <T2Screen navigation={navigation} scroll={scrollToNext} />
                <T3Screen navigation={navigation} scroll={scrollToNext} />
                <T4Screen navigation={navigation} scroll={scrollToNext} />
                <T5Screen navigation={navigation} scroll={scrollToNext} />
                <T6Screen navigation={navigation} scroll={scrollToNext} />
            </Swiper>
        </View>
    );
}

const styles = StyleSheet.create({
    showBorder: {
        borderColor: 'black',
        borderStyle: 'dotted',
        borderWidth: 1,
        margin: 1
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
        fontSize: height * 0.025
    },
    btnIn: {
        // width: width * 0.7,
        height: height * 0.1
    }
});

export default SwiperMainTutorial;