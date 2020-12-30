import React, { useState, useEffect, memo } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox as ElementCheckBox } from 'react-native-elements' //'native-base';
import { FlatList } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');


function Checkbox(props) {
    let { isChecked, id, onPress, dispatcher, type, screen } = props;
    const [toggleCheckBox, setToggleCheckBox] = useState(isChecked);


    useEffect(() => {
        setToggleCheckBox(isChecked);
    }, [isChecked])


    return (
        <ElementCheckBox checked={toggleCheckBox} size={40} onPress={() => {
            setToggleCheckBox(!toggleCheckBox);
            if (typeof onPress === "undefined") {
                dispatcher({ type: `${screen}/toggle`, payload: [type, parseInt(id)] })
                dispatcher({ type: `${screen}/convert`, payload: type })
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

    let selectCurrentState = useSelector(state => state[screen].value)[currentType].map(x => x + "");
    let dispatch = useDispatch();

    let toggleAllArray = useSelector(state => state.toggleAllCheckbox.value).slice(0);
    let toggleAllIsChecked = toggleAllArray[currentScreen];

    const returnIfChecked = (x) => {
        let isHere = selectCurrentState.indexOf(x) !== -1;
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
                        onPress={(isNotChecked) => {
                            toggleAllArray[currentScreen] = !toggleAllIsChecked;
                            dispatch({ type: `toggleAllCheckbox/set`, payload: toggleAllArray });

                            if (!isNotChecked) {
                                dispatch({ type: `${screen}/set`, payload: [range(1, 30), range(1, 114), range(1, 604)] })
                            } else {
                                dispatch({ type: `${screen}/set`, payload: [[], [], []] })
                            }
                        }} />
                    <Text style={styles.names}>Toggle All</Text>
                </View>
            </View>

            <FlatList
                data={data}
                // extraData={checked}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.container, styles.showBorder]}>
                        <View style={[styles.container2, data.length === 114 ? { width: "84%" } : {}, styles.showBorder]}>
                            <Checkbox
                                id={item.id.toString()}
                                screen={screen}
                                type={currentType}
                                dispatcher={dispatch}
                                isChecked={returnIfChecked(item.id.toString())}
                            />
                            <Text style={data.length > 150 ? styles.names_small : styles.names}>{item.name}</Text>
                        </View>
                    </View>
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
        width: "71%",
        marginBottom: 0,
        flexDirection: "row",
        // borderWidth: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    names: {
        marginLeft: 30,
        fontSize: 25
    },
    names_small: {
        marginLeft: 30,
        fontSize: 18
    }

});

export default memo(CheckboxFlatList);