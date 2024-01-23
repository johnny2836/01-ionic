import { Component, Input } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'have-filter',
  templateUrl: 'have-filter.html'
})
export class HaveFilterComponent {

  @Input() step: string;
  text: string;
  items = [
    {name:'排序(A➝Z)',icon:'md-arrow-round-up',number:1},
    {name:'排序(Z➝A)',icon:'md-arrow-round-down',number:2},
    {name:'搜尋',icon:'md-search',number:3},
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, public event:Events) {
    console.log(this.navParams.get('number'))
    console.log(this.navParams.get('part'))
    console.log(this.navParams.get('from'))
  }
  return(number){
    // alert(number)
    if (this.navParams.get('from') == 'main') {
      this.event.publish('have_filter_listen_main',{number:number,array_number:this.navParams.get('number'),part:this.navParams.get('part')})
      this.navCtrl.pop()
    }
    if (this.navParams.get('from') == 'type1') {
      this.event.publish('have_filter_listen_type1',{number:number,array_number:this.navParams.get('number'),part:this.navParams.get('part')})
      this.navCtrl.pop()
    }
    if (this.navParams.get('from') == 'type2') {
      this.event.publish('have_filter_listen_type2',{number:number,array_number:this.navParams.get('number'),part:this.navParams.get('part')})
      this.navCtrl.pop()
    }
    if (this.navParams.get('from') == 'type3') {
      this.event.publish('have_filter_listen_type3',{number:number,array_number:this.navParams.get('number'),part:this.navParams.get('part')})
      this.navCtrl.pop()
    }
    if (this.navParams.get('from') == 'type4') {
      this.event.publish('have_filter_listen_type4',{number:number,array_number:this.navParams.get('number'),part:this.navParams.get('part')})
      this.navCtrl.pop()
    }
    if (this.navParams.get('from') == 'type5') {
      this.event.publish('have_filter_listen_type5',{number:number,array_number:this.navParams.get('number'),part:this.navParams.get('part')})
      this.navCtrl.pop()
    }
  }

}
