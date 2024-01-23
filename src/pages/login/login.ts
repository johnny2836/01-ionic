import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { NetworkProvider } from "../../providers/network/network";

@IonicPage({
  segment: "login/:serial/:main_sec/:sec_sec/:s_name/:m_a", //單號、階段、子階段、姓名、主協辦
})
@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  email = "";
  password = "";
  pet = "puppies";
  splash = false;
  email_data = [];

  scrHeight: any;
  scrWidth: any;

  serial = "";
  main_sec = "";
  sec_sec = "";
  s_name = "";
  m_a = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public network: NetworkProvider,
    public loadingCtrl: LoadingController
  ) {
    this.email = window.localStorage.getItem("account");
    this.password = window.localStorage.getItem("password");

    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight);
    console.log(this.scrWidth);
    if (this.scrWidth < 900) {
      this.navCtrl.push("MobileLoginPage", {
        serial: this.navParams.get("serial"),
        main_sec: this.navParams.get("main_sec"),
        sec_sec: this.navParams.get("sec_sec"),
        s_name: this.navParams.get("s_name"),
        m_a: this.navParams.get("m_a"),
      });
    } else {
      if (
        this.navParams.get("serial") != null &&
        this.navParams.get("serial") != "" &&
        this.navParams.get("serial") != ":serial"
      ) {
        this.serial = this.navParams.get("serial");
        this.main_sec = this.navParams.get("main_sec");
        this.sec_sec = this.navParams.get("sec_sec");
        this.s_name = this.navParams.get("s_name");
        this.m_a = this.navParams.get("m_a");

        console.log(this.serial);
        console.log(this.main_sec);
        console.log(this.sec_sec);
        console.log(this.s_name);
        console.log(this.m_a);
      }
    }
  }

  saveStatus() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    var formdata = new FormData();
    formdata.append("serial", this.serial);
    formdata.append("main_sec", this.main_sec);
    formdata.append("sec_sec", this.sec_sec);
    formdata.append("s_name", this.s_name);
    formdata.append("m_a", this.m_a);
    this.network
      .save_receive_status(formdata)
      .then((data) => {
        // alert(data)
        loading.dismissAll();
        console.log(data);
        // this.navCtrl.push('LoginPage')
      })
      .catch((err) => {
        loading.dismissAll();
        alert("任務接收異常");
        // this.navCtrl.push('LoginPage')
        console.log(err);
      });
  }
  login() {
    this.loadLoginEmail();
    // this.navCtrl.push('MainLeadPage')
  }

  loadLoginEmail() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    let data: Observable<any>;
    this.email_data = [];
    loading.present();
    data = this.http.get(
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/login_email.php?email=" +
        this.email +
        "&password=" +
        this.password
    );
    data.subscribe(
      (result) => {
        result = JSON.stringify(result);
        result = JSON.parse(result);
        if (result["arr"].length == 0) {
          alert(result);
        } else {
          sessionStorage.setItem("login", "true");
          window.localStorage.setItem("uid", result["arr"]["uid"]);
          window.localStorage.setItem("depart", result["arr"]["depart"]);
          window.localStorage.setItem("name", result["arr"]["name"]);
          window.localStorage.setItem("character", result["arr"]["character"]);
          window.localStorage.setItem("phone", result["arr"]["phone"]);
          window.localStorage.setItem("email", result["arr"]["email"]);
          window.localStorage.setItem("fax", result["arr"]["fax"]);
          window.localStorage.setItem("account", this.email);
          window.localStorage.setItem("password", this.password);
          window.localStorage.setItem("authority", result["arr"]["authority"]);
          window.localStorage.setItem(
            "bms_account",
            result["arr"]["bms_account"]
          );
          window.localStorage.setItem(
            "app_account",
            result["arr"]["app_account"]
          );
          this.navCtrl.push("MainLeadPage");
        }
        loading.dismissAll();
      },
      (error) => {
        console.log(error);
        alert("系統錯誤");
        loading.dismissAll();
      }
    );
  }
}
