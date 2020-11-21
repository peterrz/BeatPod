import React, { Component } from 'react'; // 1
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image
} from 'react-native';
import { MusicBarLoader } from 'react-native-indicator';
import SearchResults from './SearchResults';


function urlForQueryAndPage(key, value, pageNumber) {
   const data = {
       Name: 'uk',
       pretty: '1',
       encoding: 'json',
       listing_type: 'buy',
       action: 'search_listings',
       page: pageNumber,
   };
   data[key] = value;
   const querystring = Object.keys(data)
     .map(key => key + '=' + encodeURIComponent(data[key]))
     .join('&');
   return 'http://95.217.79.12:2000/MainList' + querystring;
}
export default class SearchPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         message: '',
         isLoading: false,
       };
    }
    _onSearchTextChanged = (event) => {
      console.log('_onSearchTextChanged');
      this.setState({ searchString: event.nativeEvent.text });
      console.log('Current: '+this.state.searchString+', Next: '+event.nativeEvent.text);
    };
    _executeQuery = (query) => {
      console.log(query);
      this.setState({ isLoading: true });
      fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error =>
         this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
       }));
    };
    _onSearchPressed = () => {
      const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
      this._executeQuery(query);
    };

    _handleResponse = (response) => {
      this.setState({ isLoading: false , message: '' });
      if (response.application_response_code.substr(0, 1) === '1') {
        this.props.navigator.push({
          title: 'Results',
          component: SearchResults,
          passProps: {listings: response.listings}
        });
      } else {
        this.setState({ message: 'Location not recognized; please try again.'});
      }
    };
   
   render() { 
      <Text style={styles.description}>{this.state.message}</Text>
     return (
       <View style={styles.container}>
            <View style={styles.flowRight}>
            <TextInput
               style={styles.searchInput}
               value={this.state.searchString}
               onChange={this._onSearchTextChanged}
               placeholder='Search via name or postcode'/>
            <Button
               onPress={this._onSearchPressed}
               color='#48BBEC'
               title='Go!'
               />
               {/* <MusicBarLoader /> */}
            </View>
         {/* <Text style={styles.description}>
           Search for houses to buy!
         </Text>
         <Text style={styles.description}>
           Search by place-name or postcode.
         </Text>
         <Image source={require('../assets/icon/searchVector.png')} style={styles.image}/> */}
       </View>
     );
   }
 } 


const styles = StyleSheet.create({
   description: {
     fontSize: 18,
     textAlign: 'center',
     color: '#656565',
     marginTop: 10,
   },
   container: {
      padding: 30,
      marginTop: 10,
      alignItems: 'center'
    },
    flowRight: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
    },
    searchInput: {
      height: 36,
      padding: 4,
      marginRight: 5,
      flexGrow: 1,
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#48BBEC',
      borderRadius: 8,
      color: 'grey',
    },
    image: {
      width: 20,
      height: 20,
      opacity: 0.5,
    },
 });