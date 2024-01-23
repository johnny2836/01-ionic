import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import * as lodash from 'lodash';

@Component({
  selector: 'chart-select',
  templateUrl: 'chart-select.html'
})
export class ChartSelectComponent {

  text: string;
  items = [
    // {name:'AA',icon:'md-settings',dest:'ColumnsettingPage'},
    // {name:'BB',icon:'md-settings',dest:'Yes123Page'},
    // {name:'系列管理',icon:'md-settings',dest:'NoPage'},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public event:Events) {
    console.log(this.navParams.get('number'))
    console.log(this.navParams.get('chart_data2'))

    var number = this.navParams.get('number')

    var data = []
    this.navParams.get('chart_data2').forEach(element => {
      data.push(element[number])
    });

    var items = []
    items = lodash.uniqWith(data,lodash.isEqual)
    
    this.items.push({
      name:'全',
      icon:'md-radio-button-on',
      dest:'',
      number: number
    })

    items.forEach(element => {
        this.items.push({
          name:element,
          icon:'md-radio-button-on',
          dest:'',
          number: number
        })
    });

  }


  return(name,number){
    // alert(number)
    this.event.publish('chart_listen',{name:name,number:number})
    this.navCtrl.pop()
  }


}
