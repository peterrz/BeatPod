/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Text, View, SafeAreaView, Dimensions, ScrollView, ImageBackground, StatusBar} from 'react-native';
import Hlist from './Hlist';
import SlideList from './SlideList';

import Banner from './Banner';
import Carousel from '../components/Carousel';

import AsyncStorage from '@react-native-community/async-storage';
// ================ Const ================//
const showfiles = "http://95.217.79.12:2000/uploads/";
const WINDOW_WIDTH = Dimensions.get('window').width;

export class HomeP extends React.Component {
 


  async componentDidMount() {
    const url = "http://95.217.79.12:2000/LastAdd";
    const response = await fetch(url);
    const data = await response.json();
  
    this.setState({ person:  data, banner:data[1].image1 });
 
    console.log(  await AsyncStorage.getItem('@_id'));
    try {
      const value = await AsyncStorage.getItem('@_id');
      if(value == null) {
        // value previously stored
        await AsyncStorage.setItem('@_id', this.state.person[0]._id);
      
      }
    } catch(e) {
      // error reading value
    }
   
  }

  //============ Slider =============//

  constructor(props) {
    super(props);
    this.state = {
      datasource: '',
      activeIndex: 0,
      carouselItems: [
        {
          title: "Item 1",
        },
        {
          title: "Item 2",
        },
        {
          title: "Item 3",
        },
        {
          title: "Item 4",
        },
        {
          title: "Item 5",
        },
      ]
    }
  }
  //============ Slider, SerachBar and other Components =============//

  _renderItem({ item, index, Searchbar }) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
        <View style={{
          backgroundColor: '#0A0815',
          height: 180,
          width: '100%',
          flexDirection: 'row',
          borderRadius: 15,
        }}>
          <ImageBackground source={image1}
            imageStyle={{ borderRadius: 15 }}
            style={{
              padding: 15,
              flexDirection: 'row',
              resizeMode: "contain",
              flex: 1,
              alignItems: "flex-end",
            }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff', textShadowColor: '#000', textShadowRadius: 20, }}>{item.title}</Text>
          </ImageBackground>
        </View>
      </View>
    )
  }

  //============ bottom navigation =============//
  render() {
    console.disableYellowBox = true;
 
    return (
      <SafeAreaView style={{  backgroundColor: '#0A0815' }}>
        <StatusBar
          hidden={false}
          backgroundColor={'#0A0815'}
        />
        <ScrollView>
          <View style={{ }}>
            <Carousel data={this.state.person} navigation={this.props.navigate}/>
          </View>
          <View >
              <Hlist data={this.state.person} navigation={this.props.navigate}/>
          </View>
            <Banner data={this.state.banner} navigation={this.props.navigate}/>
            <View style={{ }}>
              <SlideList data={this.state.person} navigation={this.props.navigate} />
            </View>
        </ScrollView>
      </SafeAreaView>

    );
  }
}

export default HomeP
