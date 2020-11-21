/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Text, View, SafeAreaView, Dimensions, TouchableOpacity, FlatList, Alert, ActivityIndicator, Platform, Image, ListView, ScrollView, ImageBackground, Header, StatusBar, StyleSheet } from 'react-native';
import SearchList from './SearchList';
import { ListItem, SearchBar } from 'react-native-elements';
// import { MusicBarLoader } from 'react-native-indicator';
import flagset from './MusicP'
// ================ Const ================//
const WINDOW_WIDTH = Dimensions.get('window').width;
const url = "http://95.217.79.12:2000/Uploads/";


export class SeriesP extends React.Component {
  // navigation = useNavigation();
  //define Indicator   
  constructor(props) {

    super(props);

    this.state = {
      isLoading: true,

    }
    this.arrayholder = [];
  }

  //============ Load Mainlist =============//

  async componentDidMount() {

    await fetch('http://95.217.79.12:2000/MainList')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        });
        this.arrayholder = responseJson;
      })
      .catch((error) => {
        Alert.alert('You are offline');
        console.error(error);
      });
  }
  // componentDidUpdate(){

  // }
  //============ Flatlist =============//
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "94%",
          backgroundColor: '#fff',
          opacity: 0.2,
          marginLeft: 12,
        }}
      />
    );
  }

  GetFlatListItem(id) {
  var flag= new flagset();
    // this.setState({ data: this.state.dataSource.filter(d => d.userId === id) }) 
    //trackplayerfile.props.
    //  console.log(this.state.dataSource.filter(d => d._id === id));

    // Alert.alert(fruit_name);
    flag.setState({
      
      flag: true,
    });
    console.log(flag.state.falg);
    this.props.navigate.jumpTo('MusicPlayer', { tracklist: this.state.dataSource.filter(d => d._id === id) });

  }
  //============== search ========================//
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.Name.toUpperCase()}   
    ${item.Name.toUpperCase()} ${item.Name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ dataSource: newData });
  };

  //============ bottom navigation =============//


  render() {
    if (this.state.isLoading) {
      return (
        <SafeAreaView style={styles.safeAreaStyle}>
          <StatusBar
            hidden={false}
            backgroundColor={'#0A0815'}
          />

          <View style={{ flex: 11 }}>
            <SearchBar
              containerStyle={{
                backgroundColor: "#0A0815",
                borderRadius: 5,
                marginBottom: 20,
                color: 'red',
              }}
              placeholder="Type Here..."
              darkTheme
              round
              onChangeText={text => this.searchFilterFunction(text)}
              autoCorrect={false}
              value={this.state.value}
            />
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

    return (

      <SafeAreaView style={styles.safeAreaStyle}>
        <StatusBar
          hidden={false}
          backgroundColor={'#0A0815'}
        />
        <View style={{ flex: 11,}}>
          <SearchBar
            containerStyle={{
              backgroundColor: "#0A0815",
              borderRadius: 5,
              marginBottom: 15,
              marginTop: 15,
              marginLeft: 10,
              marginRight: 10,
            }}
            placeholder="Type Here..."
            darkTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
          <ScrollView>
            <View >

              <View style={styles.MainContainer}>

                <FlatList

                  data={this.state.dataSource}

                  ItemSeparatorComponent={this.FlatListItemSeparator}

                  renderItem={({ item }) =>
                    <TouchableOpacity style={styles.viewStyle} onPress={this.GetFlatListItem.bind(this, item._id)} >
                      <Image style={styles.imageStyle} source={{ uri: url + item.AlbumArt }} />
                      <View style={styles.searachRow}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.FlatListItemStyle} > {item.Name} </Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.flatListDiscriptionStyle} > {item.Discription} </Text>
                        </View>
                      
                    </TouchableOpacity>}

                  keyExtractor={(item, index) => index}
                />

              </View>
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
