import React, {useRef} from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import E1Screen from '../Screens/E1';
import E2Screen from '../Screens/E2';
import E3Screen from '../Screens/E3';
import E4Screen from '../Screens/E4';
import E5Screen from '../Screens/E5';

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
                <E1Screen navigation={navigation} scroll={scrollToNext} />
                <E2Screen navigation={navigation} scroll={scrollToNext} />
                <E3Screen navigation={navigation} scroll={scrollToNext} />
                <E4Screen navigation={navigation} scroll={scrollToNext} />
                <E5Screen navigation={navigation} scroll={scrollToNext} />
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