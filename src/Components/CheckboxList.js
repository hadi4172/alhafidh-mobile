import React, { useState, useEffect, memo } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox as ElementCheckBox } from 'react-native-elements'; 
import { FlatList } from 'react-native-gesture-handler';
import RecyclerList from "./RecyclerList";

import { convertFromJuzs, convertFromPages, convertFromSurahs } from "../Data/quranStats";
import { range, generateLines, bin2dec, dec2bin, flipByte } from "../Utils/utils";

const { width } = Dimensions.get('window');


function Checkbox(props) {
    let { isChecked, id, onPress, dispatcher, type, screen, title, textStyle, iconRight, isDisabled } = props;
    const [toggleCheckBox, setToggleCheckBox] = useState(isChecked);


    useEffect(() => {
        setToggleCheckBox(isChecked);
    }, [isChecked])


    return (
        <ElementCheckBox
            checked={toggleCheckBox}
            title={title}
            disabled={isDisabled}
            checkedColor={isDisabled ? "grey" : "#1980e6"}
            uncheckedColor={isDisabled ? "grey" : "#75b3f0"}
            iconRight={iconRight}
            textStyle={[textStyle, styles.showBorder, { marginRight: "auto" }]}
            containerStyle={[{ flex: 1 }, styles.showBorder]}
            size={40}
            style={[]}
            onPress={() => {
                setToggleCheckBox(!toggleCheckBox);
                if (typeof onPress === "undefined") {
                    dispatcher({ type: `${screen}/toggle`, payload: [type, parseInt(id)] })
                    dispatcher({ type: `${screen}/convert` })

                    if (screen === "memorized") {
                        if (!toggleCheckBox) {
                            dispatcher({ type: `familiar/forceCheckbox`, payload: [type, parseInt(id), false] })
                            dispatcher({ type: `familiar/convert` })
                        }

                        dispatcher({ type: `toMemorize/forceCheckbox`, payload: [type, parseInt(id), !toggleCheckBox] })
                        dispatcher({ type: `toMemorize/convert` })

                    }
                } else onPress(toggleCheckBox);
                // console.log(`listStateCB:`,listState);
            }} />
    );
};


function CheckboxList(props) {
    let { data, screen } = props;

    let currentType = (() => {
        switch (data.length) {
            case 30: return 0
            case 114: return 1
            case 604: return 2
            default: return null
        }
    })();

    let currentScreen = (() => {
        switch (screen) {
            case "memorized": return 0
            case "familiar": return 1
            case "toMemorize": return 2
            default: return null
        }
    })();

    let selectCurrentState = useSelector(state => state[screen].value)[currentType];
    let selectMemorizedState = useSelector(state => state.memorized.value);

    let dispatch = useDispatch();

    let toggleAllArray = useSelector(state => state.toggleAllCheckbox.value).slice(0);
    let toggleAllIsChecked = toggleAllArray[currentScreen];

    const returnIfChecked = (x) => {
        let isHere = selectCurrentState.indexOf(x) !== -1;
        return isHere;
    }

    const returnIfDisabled = (x , type = currentType) => {
        let convertFrom = [convertFromJuzs, convertFromSurahs, convertFromPages];
        let correspondingLines = convertFrom[type]([x - (type !== 2 ? 1 : 0)])[2];
        // if(x === 2) console.log(`${currentType} : correspondingLines:`,correspondingLines.slice(0,55));
        let isDisabled = false;
        for (let i = 0, length = selectMemorizedState[3].length; i < length; i++) {
            if (bin2dec(correspondingLines[i]) !== 0b000000000000000) {
                if (dec2bin((bin2dec(correspondingLines[i]) ^ bin2dec(selectMemorizedState[3][i])) | bin2dec(flipByte(correspondingLines[i]))).includes("0")) {
                    // console.log(`currentType:${currentType} x:${x} i:${i}  correspondingLines[${i}]:${correspondingLines[i]}, selectMemorizedState[3][${i}]: ${selectMemorizedState[3][i]}  
                    // result:${dec2bin((bin2dec(correspondingLines[i]) ^ bin2dec(selectMemorizedState[3][i])) | bin2dec(flipByte(correspondingLines[i])))}`);
                    // console.log(`currentType:${currentType} x:${x} i:${i} result:${dec2bin(bin2dec((correspondingLines[i]) ^ bin2dec(selectMemorizedState[3][i])) | bin2dec(flipByte(correspondingLines[i])))}`);
                    isDisabled = true;
                }
            }
        }
        return isDisabled;
    }

    return (
        <View style={[{ flex: 1 }]}>

            <View style={[styles.container, styles.showBorder]} >
                <View style={[styles.container2, styles.showBorder]}>
                    <Checkbox
                        id={0}
                        screen={screen}
                        type={currentType}
                        dispatcher={dispatch}
                        isChecked={toggleAllIsChecked}
                        title={"Toggle All"}
                        iconRight={true}
                        textStyle={styles.names}
                        onPress={(isNotChecked) => {
                            toggleAllArray[currentScreen] = !toggleAllIsChecked;
                            dispatch({ type: `toggleAllCheckbox/set`, payload: toggleAllArray });

                            if (!isNotChecked) {
                                switch (currentScreen) {
                                    case 0:
                                        dispatch({ type: `${screen}/set`, payload: [range(1, 30), range(1, 114), range(1, 604), generateLines(true)] });
                                        dispatch({ type: `familiar/set`, payload: [[], [], [], generateLines(false)] });
                                        dispatch({ type: `toMemorize/set`, payload: [range(1, 30), range(1, 114), range(1, 604), generateLines(true)] });
                                        break;
                                    case 1:
                                        dispatch({
                                            type: `${screen}/set`, payload: [
                                                range(1, 30).filter(n => !returnIfDisabled(n, 0)),
                                                range(1, 114).filter(n => !returnIfDisabled(n, 1)),
                                                range(1, 604).filter(n => !returnIfDisabled(n, 2)),
                                                generateLines(true).map((x, i) => dec2bin(bin2dec(x) & ~bin2dec(selectMemorizedState[3][i])))
                                            ]
                                        });
                                        break;
                                    case 2:
                                        dispatch({
                                            type: `${screen}/set`, payload: [
                                                range(1, 30),
                                                range(1, 114),
                                                range(1, 604),
                                                generateLines(true).map((x, i) => dec2bin(bin2dec(x) | bin2dec(selectMemorizedState[3][i])))
                                            ]
                                        });
                                        break;

                                    default:
                                        break;
                                }
                            } else {
                                switch (currentScreen) {
                                    case 0:
                                        dispatch({ type: `${screen}/set`, payload: [[], [], [], generateLines(false)] });
                                        dispatch({ type: `toMemorize/set`, payload: [[], [], [], generateLines(false)] });
                                        break;
                                    case 1:
                                        dispatch({ type: `${screen}/set`, payload: [[], [], [], generateLines(false)] });
                                        break;
                                    case 2:
                                        dispatch({
                                            type: `${screen}/set`, payload: [selectMemorizedState[0], selectMemorizedState[1], selectMemorizedState[2], selectMemorizedState[3]]
                                        });
                                        break;

                                    default:
                                        break;
                                }
                            }
                        }} />
                </View>
            </View>

            <RecyclerList
                data={data}
                width={width}
                height={70}
                rerenderWith={selectCurrentState}
                renderer={(item) => (
                    <Checkbox
                        id={item.id.toString()}
                        screen={screen}
                        iconRight={true}
                        type={currentType}
                        dispatcher={dispatch}
                        isChecked={returnIfChecked(item.id)}
                        isDisabled={screen !== "memorized" ? returnIfDisabled(item.id) : false}
                        title={item.name}
                        textStyle={data.length > 150 ? styles.names_small : styles.names}
                    />
                )}
            />

            {/* <FlatList
                data={data}
                // extraData={checked}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (

                    <Checkbox
                        id={item.id.toString()}
                        screen={screen}
                        iconRight={true}
                        type={currentType}
                        dispatcher={dispatch}
                        isChecked={returnIfChecked(item.id.toString())}
                        isDisabled={screen !== "memorized" ? returnIfDisabled(item.id.toString()) : false}
                        title={item.name}
                        textStyle={data.length > 150 ? styles.names_small : styles.names}
                    />

                )}
            /> */}

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
        // flex: 1,
        // flexDirection: "row",
        width: width,
        // borderWidth: 1,
        alignItems: "flex-end"
    },
    container2: {
        width: "100%",
        marginBottom: 0,
        flexDirection: "row",
        // borderWidth: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    names: {
        // marginLeft: 30,
        fontSize: 25
    },
    names_small: {
        // marginLeft: 30,
        fontSize: 18
    }

});

export default memo(CheckboxList);
export {Checkbox};