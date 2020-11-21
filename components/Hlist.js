
import React, {Component} from 'react';
import { Text, View,FlatList,TouchableOpacity, SafeAreaView, Dimensions, Image, ListView, ScrollView, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
const WINDOW_WIDTH = Dimensions.get('window').width;

const url = "http://95.217.79.12:2000/Uploads/";
export default class Hlist extends Component {
  
  constructor(props)
  {
 
    super(props);
   
  }
//const Carousel = ({data}) => {
//===========Flat list============================


GetFlatListItem(id) {

this.props.navigation.jumpTo('MusicPlayer', { tracklist: this.props.data.filter(d => d._id === id) });

}


//===============================================
  render() {
    console.disableYellowBox = true;
 if (this.props.data && this.props.data.length){
      var d= this.props.data.slice(1, 9)

  }

    return (
     
        <View style={{ paddingRight: 10,paddingLeft:10, marginTop:30}} >
             <Text style={styles.textTitleStyle}>Last OSTs</Text>
            <FlatList data = {d}
            keyExtractor = {(item, index) => 'key' + index}
            horizontal
          //  pagingEnabled
          
            scrollEnabled
            snapToAlignment = 'center'
            scrollEventThrottle = {16}
            decelerationRate = {"fast"}
            showsHorizontalScrollIndicator = {false}
            renderItem = {({item}) => 
              //  return <CarouselItem item = {item}/>
    <TouchableOpacity  onPress={this.GetFlatListItem.bind(this, item._id)} >
   <View>
     
        <ScrollView horizontal={true} >
          <View style={styles.viewStyle}>
            <Image style={styles.imageStyle}
              source={{ uri: url + item.AlbumArt }} />
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.textStyle}> {item.Name} </Text>
          </View>
        </ScrollView>
      </View>
  </TouchableOpacity>
            }
            />  
        </View>

  
     
    )
  }
}

const styles = StyleSheet.create({
  textTitleStyle: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff'
  },
  viewStyle: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 15,
    alignItems: 'center',
    width: 90,
    
  },
  imageStyle: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  textStyle: {
    marginTop: 10,
    fontSize: 12,
    color: '#fff'
  },
});