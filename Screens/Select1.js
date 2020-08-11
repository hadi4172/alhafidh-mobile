import React from 'react';
import { Button } from 'react-native-paper';

function Select1Screen({navigation}) {
    return (
        <View style={styles.container} >
            <View style={{ height: height * 0.06/*, borderWidth: 1 ,borderColor: "red"*/ }}></View>
            <Image
                style={styles.logo}
                source={require("../assets/Circular1.png")}
            />
            <Button style={styles.btn}
                contentStyle={styles.btnIn}
                theme={{ roundness: 15 }}
                color="green"
                labelStyle={styles.btnTxt}
                uppercase={false}
                mode="contained"
                onPress={() => navigation.navigate('A0')}>
                Bismillah
            </Button>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.6,
        height: width * 0.6,
        // borderWidth: 1,
        // borderColor: "green"
    },
    btn: {
        marginTop: height * 0.13,
        width: width * 0.7,
        height: height * 0.1
    },
    btnTxt: {
        fontSize: height * 0.04
    },
    btnIn: {
        width: width * 0.7,
        height: height * 0.1
    }
});

export default Select1Screen;