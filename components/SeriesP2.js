/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Text, View, SafeAreaView, Dimensions, Image, ListView, ScrollView, ImageBackground, SearchBar, Header, StatusBar, StyleSheet} from 'react-native';
import SearchList from './SearchList';


// ================ Const ================//
const WINDOW_WIDTH = Dimensions.get('window').width;
const image1 = { uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB11bJoc.img?h=571&w=799&m=6&q=60&o=f&l=f&x=751&y=332" };

export class SeriesP extends React.Component {

 //============ bottom navigation =============//
    render() {
        return (
          <SafeAreaView style={ styles.safeAreaStyle}>
              <StatusBar 
              hidden= {false}
              backgroundColor={'#0A0815'}
              />
              <View style={{flex:11}}>
            <ScrollView>
              <View >
                <Text style={styles.textStyle}>Suggested Series</Text>
                <SearchList />
              </View>
            </ScrollView>
            </View>
           
           </SafeAreaView>
           
        );
    }
}
export default SeriesP

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor:'#0A0815'
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    margin: 15,
  },
  viewFlexOne: {
    flex: 1,
    marginBottom: 15,
    marginTop: 10,
  },
  viewFlexTwo: {
    flex: 11,
  },
});
