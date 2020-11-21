/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Dimensions, StyleSheet} from 'react-native';
import HomeP from './components/HomeP';
import SeriesP from './components/SeriesP';
import MusicP from './components/MusicP';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';
import NetInfo from "@react-native-community/netinfo";
import Update from './components/Update';
import packageJson from './package.json';
// ================ Const ================//
const WINDOW_WIDTH = Dimensions.get('window').width;
const urlversion ='http://95.217.79.12:2000/version';
const Tab = createMaterialBottomTabNavigator();
var flag;
const MyTheme = {
  dark: false,
  colors: {
    primary: '#181428',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: '#5c5c7e',
    border: 'rgb(199, 199, 204)',
  },
};

function HomePage({navigation}) {
  return (
   <HomeP navigate={navigation}/>
  );
}

function SeriesPage({navigation}) {
  return (
    <SeriesP navigate={navigation} />
  );
}

function MusicPlayer({route}) {
  return (
    <MusicP router={route}/>
  );
}


  function MyTabs() {
   
             
              return (
                <Tab.Navigator
                  initialRouteName="HomePage"
                  activeColor="#fff"
                  labelStyle={{ fontSize: 12 }}
                  
                >
                  <Tab.Screen
                    name="HomePage"
                    component={HomePage}
                    options={{
                      tabBarLabel: '',
                      tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons style={styles.navIcon} name="home-outline" color={color} size={24} />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="SeriesPage"
                    component={SeriesPage}
                    options={{
                      tabBarLabel: '',
                      tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons style={styles.navIcon} name="movie-outline" color={color} size={24} />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="MusicPlayer"
                    component={MusicPlayer}
                    options={{
                      tabBarLabel: '',
                      tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons style={styles.navIcon} name="music-box-outline" color={color} size={24} />
                      ),
                    }}
                  />
                </Tab.Navigator>
              );
           
    
 
}
//====================player =================//









//=======================================================================//




export default class App extends React.Component {

  constructor(props)
  {
 
    super(props);
    this.state = {
      NeedUpdate: false,
            }
  
  }

async componentDidMount() {
   
   // NetInfo.addEventListener(handleConnectivityChange);
//console.log(parseFloat( DeviceInfo.getVersion(),1.001));

//console.log(DeviceInfo.getUsedMemory());
    //NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    this.senduserinfo();
    NetInfo.fetch().then(state => {
      if(state.isConnected){
      
  await fetch(urlversion).then(response => response.json())
    .then(responseJson => {
     
     if(responseJson){
         
         var version= packageJson.version.localeCompare(responseJson.Version);
       
        // string1.localeCompare(string2)
      
         if (version!="0"){
          this.setState({
            NeedUpdate: true,
            dataupdate: responseJson,
              });
              this.forceUpdate();
         
         }
        }
      });
      SplashScreen.hide();
    }
    });
  }
    renderTab = ({ tab, isActive }) => (
      <FullTab 
        isActive={isActive}
        key={tab.key}
        label={tab.label}
        renderIcon={this.renderIcon(tab.icon)}
      />
    )
  
  //===============update===========================
async senduserinfo(){
  var size_memory;
  // console.log("info");
  // console.log(DeviceInfo.getBrand())
  // console.log(DeviceInfo.getModel());
  // console.log(DeviceInfo.getSystemName());
  // console.log(DeviceInfo.getSystemVersion());
 await DeviceInfo.getUsedMemory().then(usedMemory => {
    // 23452345
  
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        DeviceName: DeviceInfo.getBrand(),
        DeviceModel: DeviceInfo.getModel(),
        SystemName: DeviceInfo.getSystemName(),
        SystemVersion: DeviceInfo.getSystemVersion(),
        UsedMemory: usedMemory,
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
       
      }
    }
     fetch('http://95.217.79.12:2000/UserInfo', data)
            .then(response => response.json())  // promise
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
  
   
  });
} 
  

 //============ bottom navigation =============//
    render() {
     
    if(this.state.NeedUpdate){
      return(<Update dataupdate={this.state.dataupdate}/>)
    }
    else{
      return (
        <NavigationContainer theme={MyTheme}>
           <MyTabs/>
          </NavigationContainer>
      );}
    }
}

const styles = StyleSheet.create({
  navIcon: {
    marginTop: 7,
  }
});