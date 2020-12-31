/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

const ViewTypes = {
    FULL: 0
};

let containerCount = 0;

/***
 * To test out just copy this component and render in you root component
 */
export default class RecyclerList extends React.Component {
    constructor(props) {    //props : data (array d'objects), width, height, renderer (fonction retournant un objet JSX) 
        super(props);

        //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
        //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
        let dataProvider = new DataProvider((r1, r2) => {
            return r1.id !== r2.id;
        });

        //Create the layout provider
        //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
        //Second: Given a type and object set the exact height and width for that type on given object, if you're using non deterministic rendering provide close estimates
        //If you need data based check you can access your data provider here
        //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
        //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
        this._layoutProvider = new LayoutProvider(
            index => {
                return ViewTypes.FULL;
            },
            (type, dim) => {
                switch (type) {
                    case ViewTypes.FULL:
                        dim.width = this.props.width;
                        dim.height = this.props.height;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);

        //Since component should always render once data has changed, make data provider part of the state
        // Mettre l'array de données à l'intérieur de clone with rows
        this.state = {
            dataProvider: dataProvider.cloneWithRows(this.props.data)
        };
    }

    //Given type and data return the view component
    _rowRenderer(type, data) {
        //You can return any view here, CellContainer has no special significance
        return this.props.renderer(type, data);
        // switch (type) {
        //     case ViewTypes.FULL:
        //         return (
        //             <CellContainer style={styles.container}>
        //                 <Text>Data: {data}</Text>
        //             </CellContainer>
        //         );
        //     default:
        //         return null;
        // }
    }

    render() {
        return <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />;
    }
}
