import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  StatusBar,
  StyleSheet,
  TouchableOpacity, FlatList
} from 'react-native';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
import Video from 'react-native-video';
import TrackList from './TrackList';
import MusicControl from 'react-native-music-control';
export default class Player extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
      flag: true
    };
  }
  componentDidMount() {
    MusicControl.enableBackgroundMode(true);
   
   MusicControl.enableControl('play', true);
   
    MusicControl.enableControl('pause', true)
   

//   MusicControl.enableControl('stop', true)
 MusicControl.enableControl('nextTrack', true)
   MusicControl.enableControl('previousTrack', true)
  // MusicControl.enableControl('play', true);
   
   MusicControl.on('play', ()=> {
     if(this.state.paused){
    this.setState({paused: false});}
    else  this.setState({paused: true});
     })
    
       MusicControl.on('nextTrack', ()=> {
        this.onForward()
         })
         MusicControl.on('previousTrack', ()=> {
        this.onBack();
           })
     MusicControl.setNowPlaying({
      title: this.props.tracks[this.state.selectedTrack].title,
      artwork: this.props.tracks[this.state.selectedTrack].albumArtUrl, // URL or RN's image require()
     // artist: 'Michael Jackson',
     // album: 'Thriller',
     // genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
     // duration: 294, // (Seconds)
     // description: '', // Android Only
      color: 0x000000 // Notification Color - Android Only
     // date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
     // rating: 84, // Android Only (Boolean or Number depending on the type)
     // notificationIcon: 'my_custom_icon' // Android Only (String), Android Drawable resource name for a custom notification icon
    });
    //  MusicControl.setNowPlaying({
    //   title: this.props.tracks[this.state.selectedTrack].title,
    //   artwork: this.props.tracks[this.state.selectedTrack].albumArtUrl, // URL or RN's image require()
    //  // artist: 'Michael Jackson',
    //  // album: 'Thriller',
    //  // genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
    //  // duration: 294, // (Seconds)
    //  // description: '', // Android Only
    //   color: 0x000000 // Notification Color - Android Only
    //  // date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
    //  // rating: 84, // Android Only (Boolean or Number depending on the type)
    //  // notificationIcon: 'my_custom_icon' // Android Only (String), Android Drawable resource name for a custom notification icon
    // });
    
   // MusicControl.enableControl('pause', true);
 //console.log(this.props.tracks[this.state.selectedTrack].albumArtUrl);
  
   // MusicControl.enableControl('stop', true)
   // MusicControl.enableControl('nextTrack', true)
  //  MusicControl.enableControl('previousTrack', true)
    
    // Changing track position on lockscreen
  //  MusicControl.enableControl('changePlaybackPosition', true)
    
    // Seeking
   // MusicControl.enableControl('seekForward', false) // iOS only
  //  MusicControl.enableControl('seekBackward', false) // iOS only
   // MusicControl.enableControl('seek', true) // Android only
  //  MusicControl.enableControl('skipForward', false)
  //  MusicControl.enableControl('skipBackward', false)
    
    // Android Specific Options
   // MusicControl.enableControl('setRating', false)
  //  MusicControl.enableControl('volume', true) // Only affected when remoteVolume is enabled
  //  MusicControl.enableControl('remoteVolume', false)
    // on iOS, pause playback during audio interruptions (incoming calls) and resume afterwards.
    // // As of {{ INSERT NEXT VERSION HERE}} works for android aswell.
    // MusicControl.handleAudioInterruptions(true);

    // MusicControl.on('play', ()=> {
    //   this.props.dispatch(playRemoteControl());
    // })

    // // on iOS this event will also be triggered by audio router change events
    // // happening when headphones are unplugged or a bluetooth audio peripheral disconnects from the device
    // MusicControl.on('pause', ()=> {
    //   this.props.dispatch(pauseRemoteControl());
    // })

    // MusicControl.on('stop', ()=> {
    //   this.props.dispatch(stopRemoteControl());
    // })

    // MusicControl.on('nextTrack', ()=> {
    //   this.props.dispatch(nextRemoteControl());
    // })

    // MusicControl.on('previousTrack', ()=> {
    //   this.props.dispatch(previousRemoteControl());
    // })

    // MusicControl.on('changePlaybackPosition', ()=> {
    //   this.props.dispatch(updateRemoteControl());
    // })

    // MusicControl.on('skipForward', ()=> {});
    // MusicControl.on('skipBackward', ()=> {});

    // // Android Only
    // MusicControl.on('closeNotification', ()=> {
    //   this.props.dispatch(onAudioEnd());
    // })
  }
  setDuration(data) {
    // console.log(totalLength);
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    //console.log(data);
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
      MusicControl.setNowPlaying({
        title: this.props.tracks[this.state.selectedTrack-1].title,
        artwork: this.props.tracks[this.state.selectedTrack].albumArtUrl, // URL or RN's image require()
       // artist: 'Michael Jackson',
       // album: 'Thriller',
       // genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
       // duration: 294, // (Seconds)
       // description: '', // Android Only
        color: 0x000000 // Notification Color - Android Only
       // date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
       // rating: 84, // Android Only (Boolean or Number depending on the type)
       // notificationIcon: 'my_custom_icon' // Android Only (String), Android Drawable resource name for a custom notification icon
      });
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
   
  }

  onForward() {
    if (this.state.selectedTrack < this.props.tracks.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1,
      }), 0);
      MusicControl.setNowPlaying({
        title: this.props.tracks[this.state.selectedTrack+1].title,
        artwork: this.props.tracks[this.state.selectedTrack].albumArtUrl, // URL or RN's image require()
       // artist: 'Michael Jackson',
       // album: 'Thriller',
       // genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
       // duration: 294, // (Seconds)
       // description: '', // Android Only
        color: 0x000000 // Notification Color - Android Only
       // date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
       // rating: 84, // Android Only (Boolean or Number depending on the type)
       // notificationIcon: 'my_custom_icon' // Android Only (String), Android Drawable resource name for a custom notification icon
      });
    }
   
  }

  // onEnd(){
  //   this.onForward();
  // }

 //============ Flatlist =============//
 FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "94%",
        backgroundColor: "#fff",
        opacity: 0.2,
        marginLeft: 12,
      }}
    />
  );
}

//================ Flatlist change track =============//
GetFlatListItem (id) {
this.state.selectedTrack=id;
this.setState({
  paused: false,
    });
  // Alert.alert(id + '2');
//this.props.navigate.jumpTo('MusicPlayer', {tracklist: this.state.dataSource.filter(d => d._id === id)});

 }
 //=========================================================//
 componentWillUnmount(){
  //this.state.flag=false;
 // this.player();
 }

 //===========================player===============================//
componentDidUpdate(prevProps){
  if(this.props.tracks!= prevProps.tracks){
    this.setState({
      selectedTrack: 0,
        });
    MusicControl.setNowPlaying({
      title: this.props.tracks[this.state.selectedTrack].title,
      artwork: this.props.tracks[this.state.selectedTrack].albumArtUrl, // URL or RN's image require()
     // artist: 'Michael Jackson',
     // album: 'Thriller',
     // genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
     // duration: 294, // (Seconds)
     // description: '', // Android Only
      color: 0x000000 // Notification Color - Android Only
     // date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
     // rating: 84, // Android Only (Boolean or Number depending on the type)
     // notificationIcon: 'my_custom_icon' // Android Only (String), Android Drawable resource name for a custom notification icon
    });
  }

}


 //============================================================//
  render() {
    const track = this.props.tracks[this.state.selectedTrack];
    
    // if(this.state.flag){
    //   MusicControl.setNowPlaying({
    //     title: this.props.tracks[this.state.selectedTrack].title,
    //     artwork: this.props.tracks[this.state.selectedTrack].albumArtUrl, // URL or RN's image require()
    //    // artist: 'Michael Jackson',
    //    // album: 'Thriller',
    //    // genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
    //    // duration: 294, // (Seconds)
    //    // description: '', // Android Only
    //     color: 0x000000 // Notification Color - Android Only
    //    // date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
    //    // rating: 84, // Android Only (Boolean or Number depending on the type)
    //    // notificationIcon: 'my_custom_icon' // Android Only (String), Android Drawable resource name for a custom notification icon
    //   });
    //   this.state.flag=false;
    // }

 //console.log(this.props.tracks);
 MusicControl.on('play', ()=> {
  if(this.state.paused){
 this.setState({paused: false});}
 else  {this.setState({paused: true});
 MusicControl.enableControl('pause', true)}
  })
 
    const video = this.state.isChanging ? null : (
      
      <Video source={{uri: track.audioUrl}} // Can be a URL or a local file.
        ref="audioElement"
        paused={this.state.paused}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
       repeat={this.state.repeatOn}                // Repeat forever.
        onLoadStart={this.loadStart} // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        onEnd={this.onForward.bind(this)}           // Callback when playback finishes
        onError={this.videoError}    // Callback when video cannot be loaded
        style={styles.audioElement}
        playInBackground={true}
        playWhenInactive={true} />
    );

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={{flex: 2}}>
          <AlbumArt  url={track.albumArtUrl} />
        </View>
        <View style={{flex:1,marginTop:-30,marginBottom:20}}>
          <TrackDetails title={track.title} artist={track.artist} />
          <SeekBar
            onSeek={this.seek.bind(this)}
            trackLength={this.state.totalLength}
            onSlidingStart={() => this.setState({paused: true})}
            currentPosition={this.state.currentPosition} />
          <Controls
            onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}
            repeatOn={this.state.repeatOn}
            shuffleOn={this.state.shuffleOn}
            forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
            onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
            onPressPlay={() => this.setState({paused: false})}
            onPressPause={() => this.setState({paused: true})}
            onBack={this.onBack.bind(this)}
            onForward={this.onForward.bind(this)}
            paused={this.state.paused}/>
          </View>
          <View style={styles.trackListStyle}>
          <FlatList
                 data={ this.props.tracks}
                 ItemSeparatorComponent = {this.FlatListItemSeparator}
                 renderItem={({item ,index}) => 
                  <TouchableOpacity onPress={this.GetFlatListItem.bind(this, index)}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.FlatListItemStyle}>{item.title}</Text>
                  </TouchableOpacity>}
                 keyExtractor={(item, index) => index.toString()}
             />
          </View>
        {video}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#0A0815',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
  FlatListItemStyle: {
    paddingLeft:15,
    paddingTop: 10,
    fontSize: 14,
    height: 44,
    flexDirection: 'row',
    color: '#fff',
    opacity: 0.6,
    backgroundColor: '#0A0815',
    width: '98%',
  },
  trackListStyle: {
    flex: 1,
  },
});