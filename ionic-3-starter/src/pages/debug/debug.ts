import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CameraPage } from '../camera/camera';

@Component({
  selector: 'page-debug',
  templateUrl: 'debug.html',
})
export class DebugPage {
  Object = Object;
  pages = {
    'camera': CameraPage
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
