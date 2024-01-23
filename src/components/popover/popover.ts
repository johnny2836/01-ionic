import { Component } from '@angular/core';
import { NavController,NavParams,ModalController, App } from 'ionic-angular';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;
  items = [
    {name:'重設密碼',icon:'md-lock',page:'set'},
    {name:'登出',icon:'md-exit',page:'logout'},
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public app: App) {

  }

  // go(page){
  //   this.navCtrl.pop()
  //   // this.navCtrl.push(page,{array:this.navParams.get('array'),chv:this.navParams.get('chv'),vvvv:this.navParams.get('vvvv')})
  //   const modal = this.modalCtrl.create(page,{array:this.navParams.get('array'),chv:this.navParams.get('chv'),vvvv:this.navParams.get('vvvv'),value:this.navParams.get('value')},{showBackdrop: true,cssClass:"custom-popover"});
  //   modal.present();
  // }
  jumpPage(page){
    // this.navCtrl.push(page)
    if(page=='logout'){
      this.navCtrl.pop()
      this.app.getRootNav().setRoot('LoginPage');
    }else if(page=='set'){
      console.log(window.localStorage.getItem('name'))
      var name = window.localStorage.getItem('name')
      this.navCtrl.pop()
      // this.app.getRootNav().setRoot('UserPage');
      const modal = this.modalCtrl.create('UserPage',{},{showBackdrop: true,cssClass:"custom-popover"});
      modal.present();

    }
  }




}
