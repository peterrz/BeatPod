import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'





const TAB_BAR_HEIGHT = 400;

export default class App extends React.Component {
  renderContent = () => {
    return (
      <View >
        <Text>Show Tracks</Text>
      </View>
    )
  }

  render() {
    console.disableYellowBox = true;
    return (
      <View>
        {/* <BottomDrawer
          containerHeight={900}
          offset={TAB_BAR_HEIGHT}
        >
          <View style={styles.header}>
            {this.renderContent()}
          </View>


          <View style={styles.content}>
            <Text>Show Tracks</Text>
            <Text>Show Tracks</Text>
            <Text>Show Tracks</Text>
            <Text>Show Tracks</Text>
          </View>
        </BottomDrawer> */}


      </View>
    )
  }
}

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontWeight: "700",
    padding: 17,

  },
  content: {

    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'blue',
    fontWeight: "700",
    width: '100%',
    height: '100%',
  },

});
