import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';

// import { RNCamera } from 'react-native-camera';

export default class App extends React.Component {

   onCompost = () => {
    Alert.alert(
      'Composte',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  onRecycle = () => {
    Alert.alert(
      'Recycle',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  onTrash = () => {
    Alert.alert(
      'Trash',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          // color: "#000000",
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Marcus mange des oranges</Text>
        
      <TouchableOpacity onPress = {this.onCompost} style = {styles.button}>
         <Text>compost</Text>
      </TouchableOpacity>
        
      <TouchableOpacity onPress = {this.onRecycle} style = {styles.button}>
         <Text>Recycle</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress = {this.onTrash} style = {styles.button}>
         <Text>Trash</Text>
      </TouchableOpacity>

      
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
  button: {
    backgroundColor: '#000',
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 100,
 }
});
