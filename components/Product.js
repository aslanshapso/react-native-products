import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


export default class Product extends Component {
    render() {
        return (
            <View key={this.props.keyval} style={styles.product}>
              <Text style={styles.productText}>{this.props.val.product}</Text>
                <Text style={styles.productText}>{this.props.val.date}</Text>
                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.productDelete}>
                    <Text style={styles.productDeleteText}>D</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    product: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth:2,
        borderBottomColor: '#ededed'
    },
    productText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: 'green'
    },
    productDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
         width: 50,
    height: 50,
    borderRadius: 20/2,
    },
    productDeleteText: {
        color: 'white'
    },
    
});