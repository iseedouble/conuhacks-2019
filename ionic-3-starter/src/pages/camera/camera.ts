import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import {
  CameraPreview,
  CameraPreviewOptions
} from "@ionic-native/camera-preview";

const cameraPreviewOpts: CameraPreviewOptions = {
  x: 0,
  y: 0,
  width: window.screen.width,
  height: window.screen.height,
  camera: "rear",
  tapPhoto: true,
  previewDrag: true,
  toBack: true,
  alpha: 1
};

@Component({
  selector: "page-camera",
  templateUrl: "camera.html"
})
export class CameraPage {
  @ViewChild("image") canvas;
  result;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cameraPreview: CameraPreview
  ) {}

  onCameraPreview() {
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      res => {
        // this.result = res;
      },
      err => {
        // this.result = err
      }
    );
  }
}
