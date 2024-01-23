import { Component, Input } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'progress-filter',
  templateUrl: 'progress-filter.html'
})
export class ProgressFilterComponent {

  @Input() step: string;
  text: string;
  items = [
    {name:'排序(A➝Z)',icon:'md-arrow-round-up',number:'1'},
    {name:'排序(Z➝A)',icon:'md-arrow-round-down',number:'2'},
    // {name:'搜尋',icon:'md-search',number:'2'},
    {name:'取消',icon:'md-close',number:'0'},
  ]

  sort_condition = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public event:Events) {
    console.log(this.navParams.get('number'))
    this.sort_condition = this.navParams.get('sort_condition')
  }
  return(number){
    // alert(number)
    this.event.publish('pic_sort_listen',{number:number,array_number:this.navParams.get('number')})
    this.navCtrl.pop()
  }
  arr(){
    if (this.sort_condition.length >= 2) {
      for (let ii = 0; ii < this.sort_condition.length; ii++) {
        var a = []
        this.sort_condition[ii]['p1_arr'].forEach(e2=>{
          if (e2 != this.sort_condition[ii]['p1']) {
            a.push(e2)
          }
          // console.log(a)
          this.sort_condition[ii+1]['p1_arr'] = a
        })
      }
    }
    console.log(this.sort_condition)
  }
  add_sort(){
    if (this.sort_condition.length < 1) {
      this.sort_condition.push({
        'p1': '',
        'p1_arr': ['客戶','場所','案件類型','日期','時間','拍攝者','主階段','子階段','項目'],
        'p2': '',
        'p2_arr': ['Z-A','A-Z']
      })
    }else{
      this.sort_condition.push({
        'p1': '',
        'p1_arr': [],
        'p2': '',
        'p2_arr': ['Z-A','A-Z']
      })
      for (let ii = 0; ii < this.sort_condition.length; ii++) {
        var a = []
        this.sort_condition[ii]['p1_arr'].forEach(e2=>{
          if (e2 != this.sort_condition[ii]['p1']) {
            a.push(e2)
          }
          // console.log(a)
          this.sort_condition[ii+1]['p1_arr'] = a
        })
      }
      // this.arr()
    }
  }
  remove_sort(){
    this.sort_condition.splice(-1,1)
  }

  return_sort(){
    this.event.publish('pic_sort_listen',{sort_condition:this.sort_condition})
    this.navCtrl.pop()
  }
  back(){
    this.navCtrl.pop()
  }



  

}
