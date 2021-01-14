import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { SearchBar, Divider } from 'react-native-elements';

import { surahInfo } from "../../Data/quranStats";

const { width, height } = Dimensions.get('window');
function MushafDrawerContent(props) {
    let { } = props;

    const [search, setSearch] = useState("");

    const updateSearch = (value) => {
        setSearch(value)
    }

    const filterSurahs = () => {
        let toRender = [];
        for (const surah of surahInfo) if(search === "" || `${surah.id}${surah.name}`.includes(search)) toRender.push(surah);
        return toRender;
    }

    return (
        <View style={{ flex: 1 }}>
            <SearchBar
                lightTheme={true}
                platform={"ios"}
                placeholder="Search..."
                onChangeText={updateSearch}
                value={search}
                inputContainerStyle={{opacity:0.75}}
                containerStyle={{ backgroundColor: "forestgreen", marginTop:20}}
                cancelButtonProps={{color:"rgba(255, 255, 255, 0.6)"}}
            />
            <DrawerContentScrollView>
                <View style={{marginBottom:-15}}/>
                {filterSurahs().map((x) => (
                    <DrawerItem
                        key={x.id}
                        label={`${x.id}.   ${x.name}`}
                        onPress={() => { }}
                        labelStyle={[{ color: "white", fontSize: 22, fontWeight: "bold", width:300}]}
                        style={[{ marginVertical: -3}, styles.showBorder]}
                    />
                ))}
                <View style={{height:12}}/>
            </DrawerContentScrollView>

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

export default MushafDrawerContent;