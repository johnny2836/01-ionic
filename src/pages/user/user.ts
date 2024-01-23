import { Component, HostListener, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, App, Content, LoadingController } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  @ViewChild(Content) content: Content;
  show_password = false
  change = false
  user = {
    uid:'',
    depart:'',
    name:'',
    character:'',
    phone:'',
    email:'',
    fax:'',
    account:'',
    password:'',
    bms_account:'',
    app_account:'',
  }
  n_password1 = ''
  n_password2 = ''
  vertify = ''
  count_second = 60
  count_check = false
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public app: App,
    public loadingCtrl: LoadingController, public network:NetworkProvider) {
    this.user = {
      uid: window.localStorage.getItem('uid'),
      depart: window.localStorage.getItem('depart'),
      name: window.localStorage.getItem('name'),
      character: window.localStorage.getItem('character'),
      phone: window.localStorage.getItem('phone'),
      email: window.localStorage.getItem('email'),
      fax: window.localStorage.getItem('fax'),
      account: window.localStorage.getItem('account'),
      password: window.localStorage.getItem('password'),
      bms_account: window.localStorage.getItem('bms_account'),
      app_account: window.localStorage.getItem('app_account'),
    }
    console.log(this.user)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  // 密碼顯示
  changeShow(){
    if(this.show_password){
      this.show_password = false
    }else{
      this.show_password = true
    }
  }

  // 密碼變更
  changePassword(){
    if(!this.change){
      this.change = true
      this.content.scrollTo(0, 350)
    }else if(this.change){
      this.content.scrollToTop(1000);
      this.change = false
    }
  }

  // 驗證碼
  getVertify(){
    // var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(this.n_password1 == ""){
      alert("未輸入密碼")
    }else if (this.n_password2 == "") {
      alert("未輸入密碼確認")
    }else if (this.n_password1 != this.n_password2) {
      alert("密碼不一致")
    }else if (this.n_password1 == this.user['password']) {
      alert("密碼不可與舊密碼一致")
    }else{
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="assets/imgs/line_loading.gif" />`,
      });
      loading.present()
      let formData = new FormData();
      formData.append('basic_user',JSON.stringify(this.user))
      loading.present()
      this.network.get_vertify(formData).then(data => {
        loading.dismissAll()
        alert(data)
        if(data = '已發送驗證碼至信箱!'){
          this.count_second = 60
          this.settime()
        }
      }).catch(error=>{
        alert("發送失敗!")
        console.log(error)
        loading.dismissAll()
      })
    }
  }

  // 倒數
  settime() {
		if (this.count_second == 0) {
      this.count_check = false
			return;
		} else {
     
      this.count_check = true
			this.count_second = this.count_second - 1
		}
		setTimeout(()=>this.settime(), 1000);
	}

  // 確認變更
  confirmChange(){
    if(this.n_password1 == ""){
      alert("未輸入密碼")
    }else if (this.n_password2 == "") {
      alert("未輸入密碼確認")
    }else if (this.n_password1 != this.n_password2) {
      alert("密碼不一致")
    }else if (this.n_password1 == this.user['password']) {
      alert("密碼不可與舊密碼一致")
    }else if (this.vertify == '') {
      alert("未輸入驗證碼")
    }else{
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="assets/imgs/line_loading.gif" />`,
      });
      loading.present()
      let formData = new FormData();
      formData.append('basic_user',JSON.stringify(this.user))
      formData.append('n_password',this.n_password2)
      formData.append('vertify',this.vertify)
      loading.present()
      this.network.confirm_change_password(formData).then(data => {
        loading.dismissAll()
        alert(data)
        this.navCtrl.pop()
        this.app.getRootNav().setRoot('LoginPage');
      }).catch(error=>{
        alert("系統錯誤")
        console.log(error)
        loading.dismissAll()
      })
    }
  }

}
