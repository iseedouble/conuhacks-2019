import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, CameraRoll} from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  sendPhoto(photo) {
    fetch('https://classitrash-server.herokuapp.com/photo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'photo': photo
      })
    })
  }

  async snap() {
    if(this.camera) {
      const options = { quality: 1, base64: true, fixOrientation: true};
      const photo = await this.camera.takePictureAsync(options);
      CameraRoll.saveToCameraRoll(photo.uri, 'photo');
      this.sendPhoto(photo);
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
        <Camera style={styles.preview} type={this.state.type}
          ref={ (ref) => {this.camera = ref} }>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>              
            {/* <TouchableOpacity
                style={styles.capture}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 14 }}>
                  {' '}Flip{' '}
                </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={styles.capture} onPress={this.snap.bind(this)}>
              <Text
                  style={{ fontSize: 16, fontWeight: 'bold'}}>
                  {' '}CLASSIFY{' '}
              </Text>
            </TouchableOpacity>
        </View>
        </Camera>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 40,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 50
  },
});