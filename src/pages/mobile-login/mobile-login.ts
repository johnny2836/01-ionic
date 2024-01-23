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

/**
 * Generated class for the MobileLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-mobile-login",
  templateUrl: "mobile-login.html",
})
export class MobileLoginPage {
  email = "";
  password = "";
  pet = "puppies";
  splash = false;
  email_data = [];
  show_password = false;

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
    this.email = window.localStorage.getItem("email");
    this.password = window.localStorage.getItem("password");

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

      // this.saveStatus()
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MobileLoginPage");
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
        loading.dismissAll();
        console.log(data);
      })
      .catch((err) => {
        loading.dismissAll();
        alert("任務接收異常");
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
        console.log(result);
        this.email_data = result;
        let person_data = this.email_data["arr"];
        if (person_data.length >= 1) {
          sessionStorage.setItem("login", "true");
          window.localStorage.setItem("uid", person_data[0]["uid"]);
          window.localStorage.setItem("depart", person_data[0]["depart"]);
          window.localStorage.setItem("name", person_data[0]["name"]);
          window.localStorage.setItem("character", person_data[0]["character"]);
          window.localStorage.setItem("phone", person_data[0]["phone"]);
          window.localStorage.setItem("email", person_data[0]["email"]);
          window.localStorage.setItem("fax", person_data[0]["fax"]);
          window.localStorage.setItem("account", this.email);
          window.localStorage.setItem("password", this.password);
          window.localStorage.setItem("authority", person_data[0]["authority"]);
          window.localStorage.setItem(
            "bms_account",
            person_data[0]["bms_account"]
          );
          window.localStorage.setItem(
            "app_account",
            person_data[0]["app_account"]
          );
          this.navCtrl.push("MainLeadPage");
        } else {
          alert("用戶不存在");
        }
        loading.dismissAll();
      },
      (error) => {
        console.log(error);
        alert("用戶不存在");
        loading.dismissAll();
      }
    );
  }

  changeShow() {
    if (this.show_password) {
      this.show_password = false;
    } else {
      this.show_password = true;
    }
  }
}
