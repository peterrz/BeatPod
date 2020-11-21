
import React from 'react';
import { Text, View, Dimensions, Image, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image'

const WINDOW_WIDTH = Dimensions.get('window').width;

const url = "http://95.217.79.12:2000/uploads";
export class Banner extends React.Component {

  constructor(props) {
    super(props);
   
  }

  async componentDidMount() {
    
  }
    //next update
    // const url = "http://95.217.79.12:2000/MainList";
    // const response = await fetch(url);
    // const data = await response.json();
    // const showfiles = "http://95.217.79.12:2000/uploads/";
    // this.setState({ person: showfiles + data[3].AlbumArt });


  render() {
   
    return (
      <View style={styles.viewStyle}>
        <FastImage style={styles.imageStyle}
          source={{ uri: url+this.props.data }} />
      </View>
    );
  }
}
export default Banner

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  imageStyle: {
    width: '100%',
    height: 130,
    borderRadius: 10,
  },
  textStyle: {
    marginTop: 10,
    fontSize: 12,
    color: '#fff'
  },
});