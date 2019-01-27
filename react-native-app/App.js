import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TouchableHighlight, CameraRoll, ListView } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    modalVisible: false,
    modalStyle: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'green',
      padding: 20,
      marginTop: 22
    }
  };

  photoType = 2;

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  sendPhoto(photo) {
    fetch('https://classitrash-server.herokuapp.com/mobilenet', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'dataURL': 'data:image/png;base64,' + photo.base64
      })
    }).then((res) => res.json())
      .then((prediction) => this.startModal(prediction)).catch((err) => console.log(err));
  }

  async snap(button) {
    if (this.camera) {
      const options = { quality: 1, base64: true, fixOrientation: true };
      const photo = await this.camera.takePictureAsync(options);
      CameraRoll.saveToCameraRoll(photo.uri, 'photo');
      this.sendPhoto(photo);
    }
  }

  changeModalColor(prediction) {
    console.log(prediction[0].className);
    const newModalStyle = Object.create(this.state.modalStyle);
    switch (prediction[0].className) {
      case "radiator":
        newModalStyle.backgroundColor = 'grey';
        break;
      case "refrigerator":
        newModalStyle.backgroundColor = 'blue';

        break;
      case "icebox":
        newModalStyle.backgroundColor = 'brown';

        break;
      case "sliding door":
        newModalStyle.backgroundColor = 'black';

        break;
      default:
        newModalStyle.backgroundColor = 'white';
    }
    this.setState({ modalStyle: Object.create(newModalStyle) })
  }

  startModal(prediction) {
    this.changeModalColor(prediction);
    this.setModalVisible(true);
    setTimeout(() => {
      this.setModalVisible(false);
    }, 4000);
  }

  // modalStyle = function (photoType) {
  //   if (photoType === 1) {
  //     return {
  //       flex: 1,
  //       flexDirection: 'column',
  //       backgroundColor: 'green',
  //       marginTop: 22
  //     }
  //   }
  //   else if (photoType === 2) {
  //     return {
  //       flex: 1,
  //       flexDirection: 'column',
  //       backgroundColor: 'blue',
  //       marginTop: 22
  //     }
  //   }
  //   else {
  //     return {
  //       flex: 1,
  //       flexDirection: 'column',
  //       backgroundColor: 'red',
  //       marginTop: 22
  //     }
  //   }
  // }

  render() {
    console.log('RENDERING!');
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={this.state.modalStyle}>
              </View>
            </Modal>
          </View>


          <Camera style={styles.preview} type={this.state.type}
            ref={(ref) => { this.camera = ref }}>
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
                  style={{ fontSize: 16, fontWeight: 'bold' }}>
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
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    padding: 20,
    marginTop: 22
  }
});