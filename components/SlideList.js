
import React from 'react';
import { Text, View,FlatList, TouchableOpacity, Dimensions, Image, ScrollView, StyleSheet } from 'react-native';


const WINDOW_WIDTH = Dimensions.get('window').width;

const url = "http://95.217.79.12:2000/Uploads/";
export class slideList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: '',
    }
  }

  async componentDidMount() {
   
  };
//=====================Flat list============================


GetFlatListItem(id) {

  this.props.navigation.jumpTo('MusicPlayer', { tracklist: this.props.data.filter(d => d._id === id) });
  
  }
 //=============================================== 
  render() {
    if (this.props.data && this.props.data.length){
      var d= this.props.data.reverse();
      //var d= this.props.data; 
     
  }
    return (
      <View style={{padding:10}}>
          <Text style={styles.textTitleStyle}>TopSeries</Text>
          <FlatList data = {d}
                keyExtractor = {(item, index) => 'key' + index}
                horizontal
                
                scrollEnabled
                snapToAlignment = 'center'
                scrollEventThrottle = {16}
                decelerationRate = {"fast"}
                showsHorizontalScrollIndicator = {false}
                renderItem = {({item}) => 
           
    <ScrollView horizontal={true} >
           <TouchableOpacity  onPress={this.GetFlatListItem.bind(this, item._id)} >
    <View style={styles.viewStyle}>
        <Image style={styles.imageStyle}
              source={{ uri: url + item.AlbumArt }}/>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.textStyle}>{item.Name} </Text>
      </View> 
      </TouchableOpacity>
    </ScrollView>
  }
    />
    </View>
    );
  }
}
export default slideList

const styles = StyleSheet.create({
  textTitleStyle: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color:'#fff',
    marginTop: 10,
  },
  viewStyle: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    alignItems:'flex-start',
    width: 300,
    height: 200,

  },
  imageStyle: {
    width: '100%',
    height: '85%',
    borderRadius: 10,
  },
  textStyle: {
    marginTop: 10,
    fontSize: 12,
    color:'#fff'
  },
});