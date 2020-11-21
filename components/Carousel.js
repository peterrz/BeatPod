import React, {useState, useEffect, Component} from 'react';
import {View,Image,TouchableOpacity,Text, StyleSheet, Dimensions, FlatList, Animated} from 'react-native';


const {width, height} = Dimensions.get('window')

 const url = "http://95.217.79.12:2000/Uploads/";
export default class Carousel extends Component {
 
    constructor(props)
      {
     
        super(props);
       
      }
//const Carousel = ({data}) => {
//===========Flat list============================


GetFlatListItem(id) {
 
 this.props.navigation.jumpTo('MusicPlayer', { tracklist: this.props.data.filter(d => d._id === id) });

  }




//==========================================
componentDidMount(){
}



    render(){
        if (this.props.data && this.props.data){
            var d= this.props.data.slice(0, 5)
             
            }
        return (
            <View>
                <FlatList data = {d}
                keyExtractor = {(item, index) => 'key' + index}
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment = 'center'
                scrollEventThrottle = {16}
                decelerationRate = {"fast"}
                showsHorizontalScrollIndicator = {false}
                renderItem = {({item}) => 
                  //  return <CarouselItem item = {item}/>
        <TouchableOpacity  onPress={this.GetFlatListItem.bind(this, item._id)} >
        <View style = {styles.cardView}>
        <Image style={styles.imageStyle} source={{ uri: url + item.AlbumArt }}/>
        <View style = {styles.textView}>
        <Text style = {styles.itemTitle}>{item.Name}</Text>
        </View>
        </View>
      </TouchableOpacity>
                }
                // onScroll={Animated.event(
                //      scrollX =nativeEvent.contentOffset.x
                //     [{ nativeEvent: {
                //          contentOffset: {
                //            x: scrollX
                //          }
                //        }
                //      }]
                //   )}
                />
                {/* <View style = {styles.dotView}>
                    {d.map ((_,i) => {
                    //     let opacity = position.interpolate ({
                    //        // inputRange: [i-1, i, i+1],
                    //         //outputRange: [0.3, 1, 0.3],
                    //         extrapolet: 'clamp'
                    //    }
                    //    )
                        return (
                            <Animated.View
                                key = {i}
                                style ={{ height: 10, width: 10, background: '#595959', margin: 8, borderRadius: 5}}
                            />
                        )
                    })}
                </View> */}
            </View>

        )
    
    console.log('please provide Images')}
     
}


const styles = StyleSheet.create ({
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardView : {
        flex: 1,
        width: width - 20 ,
        height: height / 3, 
        backgroundColor: '#000',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    textView : {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5,
    },
    itemTitle : {
        color : 'white',
        fontSize: 16,
        shadowColor : '#000',
        shadowOpacity: 1,
        marginLeft: 5,
        shadowRadius: 3,
        fontWeight: "bold",
        elevation: 5,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        marginTop: 0,
      },

});

