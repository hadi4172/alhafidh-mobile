import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';

import { surahInfo, getSurahsContainingTheseLines, convertFromLines } from "../../Data/quranStats";
import NumberedCheckBox from "../../Components/NumberedCheckbox"
import HifdhInformator from "../../Data/hifdhInformator";
import { Row, Grid, Col } from "../../ImportIndex/index";
import CustomHeader from "../../Components/CustomHeader"
import RecyclerList from "../../Components/RecyclerList";

const { width, height } = Dimensions.get('window');

function OrderSelectScreen(props) {
    let { navigation, route } = props;
    let { screen, nextScreenName } = route.params;

    let storeVariableNameChecked = screen === "OrderFamilier" ? "familiar" : "toMemorize";
    let storeVariableNameOrder = screen === "OrderFamilier" ? "orderedFamiliarSurahs" : "orderedToMemorizeSurahs";

    let selectCheckedSurahs = getSurahsContainingTheseLines(useSelector(state => state[storeVariableNameChecked].value)[3]).map(s => s + 1);

    if (storeVariableNameChecked === "familiar") {
        let selectIncludingToMemorizeSurahs = getSurahsContainingTheseLines(useSelector(state => state["toMemorize"].value)[3]).map(e => e + 1);
        selectCheckedSurahs = selectCheckedSurahs.filter(s => selectIncludingToMemorizeSurahs.includes(s));
    } else if (storeVariableNameChecked === "toMemorize") {
        let selectOrderedFamiliarSurahs = useSelector(state => state["orderedFamiliarSurahs"].value);
        let selectMemorizedSurahs = useSelector(state => state["memorized"].value)[1];
        selectCheckedSurahs = selectCheckedSurahs.filter(s => selectOrderedFamiliarSurahs[s - 1] === 0 && !selectMemorizedSurahs.includes(s));
    }

    let selectOrderedSurahs = useSelector(state => state[storeVariableNameOrder].value);
    let dispatch = useDispatch();

    let surahsInList = surahInfo.filter(x => selectCheckedSurahs.indexOf(x.id) !== -1);
    let idOfSurahsInList = surahsInList.map(s => s.id);

    const [numberedBoxes, setNumberedBoxes] = useState(selectOrderedSurahs.map((n, i) => idOfSurahsInList.includes(i + 1) ? n : 0));

    // console.log(`REFRESHED`, `selectOrderedSurahs: `, selectOrderedSurahs.filter(e => e != 0), `numberedBoxes :`, numberedBoxes.filter(e => e != 0));

    useEffect(() => {
        setNumberedBoxes(numberedBoxes => {
            let sortedArray = numberedBoxes.slice(0).sort((a, b) => a - b).filter(e => e != 0);
            let missingValue = -1;

            for (let i = 1, length = sortedArray.length + 1; i < length; i++) {
                if (sortedArray[i - 1] !== i) {
                    missingValue = i;
                    break;
                }
            }
            if (missingValue === -1) return numberedBoxes;
            return numberedBoxes.map(e => (e !== 0 && e > missingValue) ? e - 1 : e);
        });

    }, [numberedBoxes]);

    useEffect(() => {
        if(surahsInList.length === 0) navigation.navigate(nextScreenName);
    },[surahsInList]);

    const getFullOrderedNumberBoxArray = (reverse = false) => {
        let emptyOrderBoxes = new Array(114).fill(0);
        for (let i = 0, length = surahsInList.length; i < length; i++) {
            emptyOrderBoxes[surahsInList[i].id - 1] = !reverse ? i + 1 : (surahsInList.length - i);
        }
        return emptyOrderBoxes;
    }

    return (
        <View style={[styles.showBorder, { flex: 1 }]}>
            <View style={[styles.showBorder, { flex: 0 }]}>
                <CustomHeader
                    title={screen}
                    innerText={`Sélectionnez l’ordre de mémorisation des parties ${screen !== "OrderFamilier" ?"non":""} familières`}
                    navigation={navigation}
                    nextScreenName={nextScreenName}
                    backOnPress={() => { dispatch({ type: `${storeVariableNameOrder}/set`, payload: numberedBoxes }) }}
                    nextOnPress={() => { dispatch({ type: `${storeVariableNameOrder}/set`, payload: numberedBoxes }) }}
                />
            </View>
            <Grid style={[styles.showBorder, { flex: 1 }]}>
                <Row style={[styles.showBorder, { flex: 0 }]}>
                    <Col style={[{ alignItems: 'flex-end' }]}>
                        <Button style={styles.btn}
                            contentStyle={styles.btnIn}
                            // theme={{ roundness: 115 }}
                            color="green"
                            // labelStyle={styles.btnTxt}
                            uppercase={false}
                            mode="contained"
                            onPress={() => {
                                setNumberedBoxes(getFullOrderedNumberBoxArray());
                            }
                            }>
                            <Text adjustsFontSizeToFit numberOfLines={1}>
                                Baqara → Nas
                            </Text>
                        </Button>
                    </Col>
                    <Col style={[{ alignItems: 'flex-start' }]}>
                        <Button style={styles.btn}
                            contentStyle={styles.btnIn}
                            // theme={{ roundness: 115 }}
                            color="green"
                            // labelStyle={styles.btnTxt}
                            uppercase={false}
                            mode="contained"
                            onPress={() => {
                                setNumberedBoxes(getFullOrderedNumberBoxArray(true));
                            }
                            }>
                            <Text adjustsFontSizeToFit numberOfLines={1}>
                                Nas → Baqara
                            </Text>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <View style={[{ flex: 1 }, styles.showBorder]}>
                        <RecyclerList
                            data={surahsInList}
                            width={width}
                            height={70}
                            rerenderWith={numberedBoxes}
                            renderer={(item) => (
                                <NumberedCheckBox
                                    id={item.id.toString()}
                                    iconRight={true}
                                    isChecked={numberedBoxes[item.id - 1] !== 0}
                                    checkedNumber={numberedBoxes[item.id - 1] !== 0 ? numberedBoxes[item.id - 1] : Math.max(...numberedBoxes) + 1}
                                    setCheckedBoxes={setNumberedBoxes}
                                    title={item.name}
                                    textStyle={{ fontSize: 23 }}
                                />
                            )}
                        />
                    </View>
                </Row>
            </Grid>
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
    btn: {
        margin: 7,
        // width: width * 0.7,
        height: height * 0.07
    },
    btnTxt: {
        fontSize: height * 0.025
    },
    btnIn: {
        // width: width * 0.7,
        height: height * 0.07
    }
});

export default OrderSelectScreen;