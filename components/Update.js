import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,Linking,
} from 'react-native';
export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:'',
    }
        }
       
    componentDidMount(){
      this.setState({
        url: this.props.dataupdate.url
          });
      
    }
        

        render() {
         
          return(<View style={styles.container}>
              <StatusBar
          hidden={false}
          backgroundColor={'#0A0815'}
        />
            <View style={styles.touchBar} onPress={this.loadInBrowser}>
            <Text style={{color:'white',padding:20, fontSize:15}}>New version available</Text>
          <Text style={{color:'white',padding:5, fontSize:14}}>This is a newer version of this app available:</Text>
          <Text style={{color:'white', fontSize:12}}>{this.props.dataupdate.Version}</Text>

          <View style={styles.buttonContainer}>  
                    <Button  
                      title="  Update!  "
                        onPress={() => {Linking.openURL('http://'+this.state.url);}  }
                      
                       
                    />  
                </View>  
       
          
            </View>
          
          </View>);

        }

}
  

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0815',

  },
  buttonContainer: {  
    margin: 40,
    padding:10.  
},
  touchBar: {
    marginBottom:150,
    alignItems: 'center',
  },
})