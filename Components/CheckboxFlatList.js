import React, { useState, useEffect, memo } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox as ElementCheckBox } from 'react-native-elements' //'native-base';
import { FlatList } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');


function Checkbox(props) {
    let { isChecked, id, onPress, dispatcher, type } = props;
    const [toggleCheckBox, setToggleCheckBox] = useState(isChecked);


    useEffect(() => {
        setToggleCheckBox(isChecked);
    }, [isChecked])


    return (
        <ElementCheckBox checked={toggleCheckBox} size={40} onPress={() => {
            setToggleCheckBox(!toggleCheckBox);
            dispatcher({ type: "toMemorize/toggle", payload: [type, parseInt(id)] })
            dispatcher({ type: "toMemorize/convert", payload: type })
            onPress();
            // console.log(`listStateCB:`,listState);
        }} />
    );
};


function CheckboxFlatList(props) {
    let { data } = props;

    let currentType = (() => {
        switch (data.length) {
            case 30: return 0
            case 114: return 1
            case 604: return 2
            default: return null
        }
    })();
    let selectCurrentState = useSelector(state => state.toMemorize.value)[currentType].map(x => x = x + "");
    let dispatch = useDispatch();

    const returnIfChecked = (x) => {
        let isHere = selectCurrentState.indexOf(x) !== -1;
        return isHere;
    }

    return (
        <View>
            <FlatList
                data={data}
                // extraData={checked}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={[styles.container2, data.length === 114 ? { width: "84%" } : {}]}>
                            <Checkbox
                                id={item.id.toString()}
                                type={currentType}
                                dispatcher={dispatch}
                                isChecked={returnIfChecked(item.id.toString())}
                                onPress={() => { }} />
                            <Text style={data.length > 150 ? styles.names_small : styles.names}>{item.name}</Text>
                        </View>
                    </View>
                )}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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