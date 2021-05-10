import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Grid, Row, Col } from '../ImportIndex';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import iosTheme from '../native-base-theme/variables/platform';

const { width, height } = Dimensions.get('window');

function CustomHeader(props) {
    let { innerContent, title, innerText, navigation, nextScreenName, backOnPress = () => { }, nextOnPress = () => { } } = props;
    return (
        <StyleProvider style={getTheme(iosTheme)}>
            <Container style={{ height: 'auto', flex: 0 }}>
                <Header span style={{ height: 'auto', flex: 0 }}>
                    <Grid style={[{ minHeight: 10 }, styles.showBorder]}>
                        <Row style={[styles.showBorder, { flex: 0 }]}>
                            <Left style={[styles.showBorder, { flex: 0 }]}>

                                <Button transparent style={[styles.showBorder]} onPress={() => { backOnPress(); navigation.goBack(); }}>
                                    {
                                        Platform.OS === "android" &&
                                        <TouchableOpacity onPress={() => { backOnPress(); navigation.goBack(); }} style={[styles.showBorder, { flexDirection: "column" }]}>
                                            <Icon style={[styles.showBorder, { fontSize: 26 }]} name="arrow-back" type="MaterialIcons" />
                                        </TouchableOpacity>
                                    }
                                    {
                                        Platform.OS === "ios" &&
                                        (<>
                                            <Icon style={[styles.showBorder, { fontSize: 26 }]} name="arrow-back-ios" type="MaterialIcons" />
                                            <Text style={{ marginLeft: -10, fontSize: 17 }}>Retour</Text>
                                        </>)
                                    }

                                </Button>

                            </Left>
                            <Body style={[styles.showBorder, Platform.OS === "android" ? { flexDirection: "column", alignItems: "flex-start" } : {}]}>
                                {title && (<Title style={[styles.showBorder, {
                                    ...(Platform.OS === "android" ? { marginVertical: "auto", marginLeft: 3 } : { margin: "auto" }),
                                    color: "black"
                                }]}>{title}</Title>)}
                            </Body>
                            <Right style={[styles.showBorder, { flex: 0 }]}>
                                <Button transparent style={[styles.showBorder, { paddingLeft: -10 }]}>
                                    <TouchableOpacity onPress={() => { nextOnPress(); navigation.navigate(nextScreenName); }}>
                                        <Text style={{ fontSize: 17, marginLeft: -10 }}>Continuer</Text>
                                    </TouchableOpacity>
                                </Button>
                            </Right>
                        </Row>
                        {(innerText || innerContent) && (
                            <Row style={[styles.centerContentX, styles.showBorder, { height: 'auto', flex: 0, paddingBottom: 10 }]}>
                                {innerText && (<Text>{innerText}</Text>)}
                                {innerContent && innerContent()}
                            </Row>
                        )}
                    </Grid>

                </Header>
            </Container>
        </StyleProvider >
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

export default CustomHeader;