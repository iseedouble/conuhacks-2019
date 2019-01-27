import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Marcus mange des oranges</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
