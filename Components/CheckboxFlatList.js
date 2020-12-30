import React, { useState, useEffect, memo } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox as ElementCheckBox } from 'react-native-elements' //'native-base';
import { FlatList } from 'react-native-gesture-handler';

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
            checkedColor={isDisabled ? "firebrick" : undefined}
            uncheckedColor={isDisabled ? "firebrick" : undefined}
            iconRight={iconRight}
            textStyle={[textStyle, styles.showBorder, { marginRight: "auto" }]}
            containerStyle={[{ flex: 1 }, styles.showBorder]}
            size={40}
            style={[]}
            onPress={() => {
                setToggleCheckBox(!toggleCheckBox);
                if (typeof onPress === "undefined") {
                    dispatcher({ type: `${screen}/toggle`, payload: [type, parseInt(id)] })
                    dispatcher({ type: `${screen}/convert`, payload: type })

                    if (screen === "memorized") {
                        if (!toggleCheckBox) {
                            dispatcher({ type: `familiar/forceCheckbox`, payload: [type, parseInt(id), false] })
                            dispatcher({ type: `familiar/convert`, payload: type })
                        }

                        dispatcher({ type: `toMemorize/forceCheckbox`, payload: [type, parseInt(id), !toggleCheckBox] })
                        dispatcher({ type: `toMemorize/convert`, payload: type })

                    }
                } else onPress(toggleCheckBox);
                // console.log(`listStateCB:`,listState);
            }} />
    );
};


function CheckboxFlatList(props) {
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

    let selectCurrentState = useSelector(state => state[screen].value)[currentType].map(x => x.toString());
    let selectMemorizedState = useSelector(state => state.memorized.value).map(x => x.map(y => y.toString()));

    let dispatch = useDispatch();

    let toggleAllArray = useSelector(state => state.toggleAllCheckbox.value).slice(0);
    let toggleAllIsChecked = toggleAllArray[currentScreen];

    const returnIfChecked = (x) => {
        let isHere = selectCurrentState.indexOf(x) !== -1;
        return isHere;
    }

    const returnIfDisabled = (x) => {
        let isHere = selectMemorizedState[currentType].indexOf(x) !== -1;
        return isHere;
    }

    const range = (start, count) => {
        return Array.apply(0, Array(count))
            .map((element, index) => index + start);
    }

    return (
        <View style={[{ flex: 1 }]}>

            <View style={[styles.container, styles.showBorder]}>
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
                                        dispatch({ type: `${screen}/set`, payload: [range(1, 30), range(1, 114), range(1, 604)] });
                                        dispatch({ type: `familiar/set`, payload: [[], [], []] });
                                        dispatch({ type: `toMemorize/set`, payload: [range(1, 30), range(1, 114), range(1, 604)] });
                                        break;
                                    case 1:
                                        dispatch({
                                            type: `${screen}/set`, payload: [
                                                range(1, 30).filter(n => !selectMemorizedState[0].includes(n.toString())),
                                                range(1, 114).filter(n => !selectMemorizedState[1].includes(n.toString())),
                                                range(1, 604).filter(n => !selectMemorizedState[2].includes(n.toString()))
                                            ]
                                        });
                                        break;
                                    case 2:
                                        dispatch({
                                            type: `${screen}/set`, payload: [
                                                [...new Set(range(1, 30).concat(selectMemorizedState[0]))],
                                                [...new Set(range(1, 114).concat(selectMemorizedState[1]))],
                                                [...new Set(range(1, 604).concat(selectMemorizedState[2]))]
                                            ]
                                        });
                                        break;

                                    default:
                                        break;
                                }
                            } else {
                                switch (currentScreen) {
                                    case 0:
                                        dispatch({ type: `${screen}/set`, payload: [[], [], []] });
                                        break;
                                    case 1:
                                        dispatch({ type: `${screen}/set`, payload: [[], [], []] });
                                        break;
                                    case 2:
                                        dispatch({
                                            type: `${screen}/set`, payload: [selectMemorizedState[0], selectMemorizedState[1], selectMemorizedState[2]]
                                        });
                                        break;

                                    default:
                                        break;
                                }
                            }
                        }} />
                </View>
            </View>

            <FlatList
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
            />
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

export default memo(CheckboxFlatList);