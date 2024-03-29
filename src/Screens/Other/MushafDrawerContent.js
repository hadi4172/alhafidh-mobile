import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { SearchBar, Divider, ButtonGroup } from 'react-native-elements';
import RecyclerList from "../../Components/RecyclerList";

import { surahInfo } from "../../Data/quranStats";

const { width, height } = Dimensions.get('window');
function MushafDrawerContent(props) {
    let { } = props;

    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(1);

    const modes = ["Juz'", 'Surah', 'Page'];

    const updateSearch = (value) => {
        setSearch(value)
    };

    const updateIndex = (index) => {
        setSelectedIndex(index);
    };

    const filterParts = (parts) => {
        let toRender = [];
        for (const part of parts) if (search === "" || `${part.id}${part.name}`.includes(search)) toRender.push(part);
        return toRender;
    }

    const getJuzsOrPagesList = () => {
        let mode = modes[selectedIndex];
        let modeList = [];
        for (let i = 1; i <= (mode === "Juz'" ? 30 : 604); i++) {
            modeList.push({ 'id': i, "name": `${mode} ${i}` });
        }
        return modeList;
    }

    return (
        <View style={{ flex: 1 }}>
            <SearchBar
                lightTheme={true}
                platform={"ios"}
                placeholder="Search..."
                onChangeText={updateSearch}
                value={search}
                placeholderTextColor={"white"}
                inputStyle={{color:"white"}}
                inputContainerStyle={{ opacity: 0.75, backgroundColor: "#196719"}}
                containerStyle={{ backgroundColor: "forestgreen", marginTop: 20 }}
                cancelButtonProps={{ color: "white" }}
            />
            <ButtonGroup
                onPress={updateIndex}
                selectedIndex={selectedIndex}
                buttons={modes}
                containerStyle={[styles.showBorder, { backgroundColor: "#196719", opacity: 0.75, borderWidth: 0 }]}
                buttonContainerStyle={{ borderWidth: 0 }}
                innerBorderStyle={{ width: 0 }}
                selectedButtonStyle={{ backgroundColor: "#28a428" }}
                textStyle={{ color: "white" }}
            />
            <View style={[{ flex:1 }, styles.showBorder]}>
                <RecyclerList
                    data={selectedIndex === 1 ? filterParts(surahInfo) : filterParts(getJuzsOrPagesList())}
                    width={300}
                    height={50}
                    rerenderWith={{selectedIndex: selectedIndex, search:search}}
                    renderer={(x) => (
                        <DrawerItem
                            key={x.id}
                            label={selectedIndex === 1 ? `${x.id}.   ${x.name}` : `${x.name}`}
                            onPress={() => { }}
                            labelStyle={[{ color: "white", fontSize: 22, fontWeight: "bold", width: 300 }]}
                            style={[{ marginVertical: -3 }, styles.showBorder]}
                        />
                    )}
                />
            </View>
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