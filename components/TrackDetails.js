import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
 
} from 'react-native';

const TrackDetails = ({
  title,
  onTitlePress,
}) => (
  <View style={styles.container}>
    <View style={styles.detailsWrapper}>
      <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title} onPress={onTitlePress}>{title}</Text>
    </View>
  </View>
);

export default TrackDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20,
    marginTop: 20,
  },
  detailsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginRight: 30,
    marginLeft: 30,
  },
  button: {
    opacity: 0.72,
  },
  moreButton: {
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 2,
    opacity: 0.72,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonIcon: {
    height: 17,
    width: 17,
  }
});