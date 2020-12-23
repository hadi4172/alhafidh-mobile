import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { ListItem, Icon } from "react-native-elements";
import { Grid, Row } from '../ImportIndex';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

function ProfileScreen(props) {
    let { navigation } = props;

    const iconProperties = {
        type: "font-awesome-5",
        color: "lightgrey"
    }

    const list = [{
        title: "Hadiths sur le Coran",
        icon: "scroll",
        ...iconProperties,
        action:()=>{}
    }, {
        title: "Compteur de Hasanats",
        icon: "calculator",
        ...iconProperties,
        action:()=>{}
    }, {
        title: "Signaler un bug",
        icon: "bug",
        ...iconProperties,
        action:()=>{}
    }, {
        title: "Nous contacter",
        icon: "envelope-open-text",
        ...iconProperties,
        action:()=>{}
    }, {
        title: "Crédit",
        icon: "heart",
        ...iconProperties,
        action:()=>{}
    }, {
        title: "Tutoriel",
        icon: "question-circle",
        ...iconProperties,
        action: ()=>{
            navigation.navigate("SwiperMainTutorial");
        }
    }, {
        title: "Paramètres",
        icon: "sliders-h",
        ...iconProperties,
        action:()=>{}
    }];

    const renderList = () => {
        return (
            list.map((item, i) => (
                <ListItem key={i} bottomDivider onPress={item.action}>
                    <Icon name={item.icon} type={item.type} color={item.color} size={20} solid={true}/>
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ height: 30 }}></View>
                {renderList()}
            </ScrollView>
        </View>
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
    question: {
        // marginTop: height * 0.13,
        // flex: 1,
        width: "90%",
        textAlign: "center",
        fontSize: height * 0.035,
        color: "#333333"
    },
    btnGroup: {
        // borderWidth:1,
        height: height * 0.6,
        justifyContent: "center"
    },
    btn: {
        margin: 7,
        // width: width * 0.7,
        height: height * 0.1
    },
    btnTxt: {
        fontSize: 17
    },
    btnIn: {
        // width: width * 0.7,
        height: height * 0.1
    }
});

export default ProfileScreen;