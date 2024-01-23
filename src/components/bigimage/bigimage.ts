import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the BigimageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bigimage',
  templateUrl: 'bigimage.html'
})
export class BigimageComponent {

  text: string;
  url = ""

  constructor(public navParams: NavParams, public event:Events,public navCtrl: NavController) {
    console.log('Hello BigimageComponent Component');
    this.text = 'Hello World';
    this.url = this.navParams.get('url')
    console.log(this.url)
  }

  close(){
    this.navCtrl.pop();
  }

}
