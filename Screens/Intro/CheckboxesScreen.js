import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import CheckboxFlatList from '../../Components/CheckboxFlatList';
import { surahInfo } from "../../Data/quranStats";

import { useSelector } from 'react-redux'; //pour tester

function CheckboxesScreen(props) {
    useIsFocused();
    
    let { route } = props;
    let { type, screen } = route.params;

    
    const sendData = () => {
        switch (type) {
            case "Juz'": return objectMaker("Juz'", 30);
            case "Surah": return surahInfo;
            case "Page": return objectMaker("Page", 604);
            default: return [];
        }
    }

    return (
        <View style={styles.container} >
            <CheckboxFlatList data={sendData()} screen={screen} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

function objectMaker(name, size) {
    let data = [];
    for (let i = 1; i < size + 1; i++) {
        data.push({ 'id': i, "name": `${name} ${i}` });
    }
    return data;
}

export default CheckboxesScreen;