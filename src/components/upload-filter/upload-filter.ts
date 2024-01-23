import { Component, Input } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'upload-filter',
  templateUrl: 'upload-filter.html'
})
export class UploadFilterComponent {

  @Input() step: string;
  text: string;
  items = [
    {name:'排序(A➝Z)',icon:'md-arrow-round-up',number:'0'},
    {name:'排序(Z➝A)',icon:'md-arrow-round-down',number:'1'},
    {name:'搜尋',icon:'md-search',number:'2'},
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, public event:Events) {
    console.log(this.navParams.get('number'))
  }
  return(number){
    // alert(number)
    this.event.publish('upload_filter_listen',{number:number,array_number:this.navParams.get('number')})
    this.navCtrl.pop()
  }

}
