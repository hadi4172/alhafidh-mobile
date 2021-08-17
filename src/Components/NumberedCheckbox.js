import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { CheckBox as ElementCheckBox, Icon } from 'react-native-elements';
const { width, height } = Dimensions.get('window');

function NumberedCheckBox(props) {
    let { checkedNumber, isChecked, setCheckedBoxes, id, onPress, title, textStyle, iconRight, isDisabled } = props;

    const toggleCheckBox = () => {
        setCheckedBoxes(checkedBoxes => {
            let checkedBoxesClone = checkedBoxes.slice();
            if (checkedBoxesClone[parseInt(id) - 1] === 0) {
                checkedBoxesClone[parseInt(id) - 1] = checkedNumber;
            } else {
                checkedBoxesClone[parseInt(id) - 1] = 0;
            }
            return checkedBoxesClone;
        });
    }

    return (
        <ElementCheckBox
            checked={isChecked}
            title={title}
            disabled={isDisabled}
            uncheckedColor={isDisabled ? "grey" : "crimson"/* "#75b3f0" */}
            checkedIcon={
                <View style={[styles.numberedBoxContainer, styles.centerContentX, styles.centerContentY, styles.showBorder]}>
                    <Icon name='square' style={[styles.numberedCheckBox, styles.showBorder]} size={40} type='font-awesome' color={"crimson"} />
                    <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.numberedBoxText]}>{isChecked ? checkedNumber : ""}</Text>
                </View>
            }
            uncheckedIcon={"square-o"}
            iconRight={iconRight}
            textStyle={[textStyle, styles.showBorder, { marginRight: "auto" }]}
            containerStyle={[{ flex: 1 }, styles.showBorder]}
            size={40}
            style={[]}
            onPress={() => {
                toggleCheckBox();
                if (typeof onPress !== "undefined") onPress(checkedNumber);
            }} />


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
    numberedBoxText: {
        position: "absolute",
        color: "white",
        // fontSize: 19,
        fontWeight: "bold"
    },
    numberedBoxContainer: {
        height: 40,
        width: 40,
        marginRight: 4
    },
    numberedCheckBox: {

    },
    fitContent: {
        flex: 0,
        height: "auto"
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
});

export default NumberedCheckBox;