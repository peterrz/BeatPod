import React, {Component} from 'react';
import Player from './Player';
//import {Player} from '../App'
import { Text, View, SafeAreaView, Dimensions, TouchableOpacity, FlatList, Alert, ActivityIndicator, Platform, Image, ListView, ScrollView, ImageBackground, Header, StatusBar, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
const url="http://95.217.79.12:2000/Uploads/";

var TrackDetails = [];
export default class App extends Component {
 
  constructor(props)
    {
   
      super(props);
      this.state = {
        isLoading: true,
              }
    }


//=====================================================
async componentDidMount() {

  var tracks;
  if(this.props.router.params=== undefined){
    try {
              const value = await AsyncStorage.getItem('@_id');
            
              if(value !== null) {
                // value previously stored
                const url = "http://95.217.79.12:2000/MainList/"+value;
               
                const response = await fetch(url).then(response => response.json())
                .then(responseJson => {
                 
                  tracks=responseJson;
                 
                })
                .catch(error => {
                  console.error(error);
                });
                
                
              }
            } catch(e) {
          
            }
            for (i = 0; i < tracks.songs.length; i++){
              var temp= tracks.songs[i].split('.').slice(0, -1).join('.');
              temp.replace('/', '');
          
             var obj = {
               'title':temp.split('/').pop(),
               'albumArtUrl': url+tracks.AlbumArt,
               'audioUrl': url+tracks.songs[i],
           }
          
           TrackDetails.push(obj);
          }
          this.setState({
            isLoading: false,
              });
         
  }
  else {
       tracks= this.props.router.params.tracklist;
     
     for (i = 0; i < tracks[0].songs.length; i++){
      var temp= tracks[0].songs[i].split('.').slice(0, -1).join('.');
      temp.replace('/', '');
   
     var obj = {
       'title':temp.split('/').pop(),
       'albumArtUrl': url+tracks[0].AlbumArt,
       'audioUrl': url+tracks[0].songs[i],
      }
    
      TrackDetails.push(obj);
        }
        this.setState({
          isLoading: false,
            });
}
  
 }


componentWillUnmount(){
 // clearInterval(this.interval);
  console.log("componentWillUnmount");
}

//===========================================

   
     Storeid = async () => {
      try {
        
       
        await AsyncStorage.setItem('@_id', this.props.router.params.tracklist[0]._id);
        
        
      } catch(e) {
        // error reading value
      }
     }
//===============================================================

render() {
  console.disableYellowBox = true;

  if (this.state.isLoading) {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <StatusBar
          hidden={false}
          backgroundColor={'#0A0815'}
        />

        <View style={{ flex: 11 }}>
          
          <ScrollView>
            <View >
              <View style={styles.MainContainer}>
                <ActivityIndicator />
              </View>
            </View>
          </ScrollView>
        </View>

      </SafeAreaView>

    );
  }
  else{
   
    if(this.props.router.params !==undefined){
    const tracks= this.props.router.params.tracklist;
    //Transfer json data to json array  
    
   for (i = 0; i < tracks[0].songs.length; i++){
    var temp= tracks[0].songs[i].split('.').slice(0, -1).join('.');
    temp.replace('/', '');
   
   var obj = {
     'title':temp.split('/').pop(),
     'albumArtUrl': url+tracks[0].AlbumArt,
     'audioUrl': url+tracks[0].songs[i],
    }
  
    TrackDetails.push(obj);
    
  }
  
       //store last id
        this.Storeid();
    }

    const TracksList=TrackDetails;
    TrackDetails=[];
    
  return <Player tracks={TracksList}/>
}
}
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#0A0815'
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
  viewFlexOne: {
    flex: 1,
    marginBottom: 15,
    marginTop: 10,
  },
  viewFlexTwo: {
    flex: 11,
  },
  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,

  },
  imageStyle: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginTop: 0,
  },
  viewStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    height: 100,
    marginTop: 10,
  },
  searachRow: {
    width: '80%'
  },
  FlatListItemStyle: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
    color: 'white'
  },
  flatListDiscriptionStyle: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 10,
    color: 'white',
    flex: 1,
    flexDirection: 'column',
    opacity: 0.6,
  },
});





































