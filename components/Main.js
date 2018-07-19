import React, { Component, AsyncStorage } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Product from './Product';
import AddProduct from './AddProduct';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productArray: [],
      productText: '',
    };
  }


  componentWillMount() {
    this._retrieveData();
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('productArray');
      if (value !== null) {
        // We have data!!
        console.log(value);
         this.setState({ productArray: value });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    let products = this.state.productArray.map((val, key) => {
      return (
        <Product
          key={key}
          keyval={key}
          val={val}
          deleteMethod={() => this.deleteProduct(key)}
        />
      );
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}> My Store</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>{products}</ScrollView>
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            placeholder=">product"
            onChangeText={productText => this.setState({ productText })}
            value={this.state.productText}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View>
        <AddProduct addProduct={() => this.addProduct() }/>
      </View>
    );
  }
  addProduct() {
    if (this.state.productText) {
      var d = new Date();
      this.state.productArray.push({
        date:  + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(),
        product: this.state.productText,
      });
     
      this.setState({ productArray: this.state.productArray });
      this.setState({ productText: '' });
       this._storeProduct();
    }
   
  }
   _storeProduct = async (data) => {
    try {
      await AsyncStorage.setItem('productArray', this.state.productArray);
    } catch (error) {
      // Error saving data
    }
  };
  deleteProduct(key) {
    this.state.productArray.splice(key, 1);
    this.setState({ productArray: this.state.productArray });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#87CEEB',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    margin: 5,
    padding: 10,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
  
});
