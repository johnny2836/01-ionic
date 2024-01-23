import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ModalController,
  NavParams,
  Events,
  LoadingController,
  Item,
} from "ionic-angular";
import { PopoverController } from "ionic-angular/components/popover/popover-controller";
import { HostListener } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { NetworkProvider } from "../../providers/network/network";
import { BigimageComponent } from "../../components/bigimage/bigimage";

/**
 * Generated class for the ReUploadPicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-re-upload-pic",
  templateUrl: "re-upload-pic.html",
})
export class ReUploadPicPage {
  client_name = "";
  case_name = "";
  case_type = "";
  main_section = "";
  sec_section = "";
  user = "";
  character = "";
  depart = "";
  title = "";
  dis1 = [];
  dis2 = [];
  dis3 = [];
  num1 = "";
  num2 = "";
  num3 = "";
  note = "";
  img_send_array = [];
  img_show_array = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popcontroller: PopoverController,
    public http: HttpClient,
    public network: NetworkProvider,
    public event: Events,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
    this.client_name = this.navParams.get("client_name");
    this.case_name = this.navParams.get("case_name");
    this.case_type = this.navParams.get("case_type");
    this.main_section = this.navParams.get("main_section");
    this.sec_section = this.navParams.get("sec_section");

    this.user = window.localStorage.getItem("name");
    this.character = window.localStorage.getItem("character");
    this.depart = window.localStorage.getItem("depart");
    if (this.sec_section == "會勘缺失") {
      this.title = "設備";
    } else {
      this.title = "項目";
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReUploadPicPage");
    this.readPic();
  }

  readPic() {
    this.dis1 = [];
    this.dis2 = [];
    this.dis3 = [];
    let load = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    load.present();
    let data: Observable<any>;
    data = this.http.get(
      'https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_callback_table.php?serial_num=""'
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      load.dismiss();
      console.log(result);
      if (
        this.sec_section == "會勘缺失" ||
        (this.case_type == "檢修案件" && this.main_section == "檢修回報") ||
        (this.case_type == "修繕案件" && this.main_section == "需求確認")
      ) {
        this.dis1 = result["missing_type"];
      } else {
        result["arr_all"].forEach((e, i) => {
          if (
            e["client_name"] == this.client_name &&
            e["case_name"] == this.case_name &&
            e["case_type"] == this.case_type &&
            e["main_section"] == this.main_section &&
            e["sec_section"] == this.sec_section
          ) {
            if (this.dis1.indexOf(e["project"]) == -1) {
              this.dis1.push(e["project"]);
            }
          }
        });
      }
    });
  }

  chooseFilter(num, p1, p2) {
    if (num == "num2") {
      this.changeMissingType(p1);
    }
    if (num == "num3") {
      this.changeMissingEquip(p1, p2);
    }
  }
  changeMissingType(type) {
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/worker_read_missing_equip.php?type=" +
        type
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.dis2 = result;
    });
  }
  changeMissingEquip(type, equip) {
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/worker_read_missing_check.php?type=" +
        type +
        "&equip=" +
        equip
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.dis3 = result;
    });
  }

  view(ev: any, url) {
    let popover = this.popcontroller.create(BigimageComponent, { url: url });
    popover.present();
  }

  fileChange(event) {
    let load = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    load.present();
    // console.log(event.target.files.length)
    for (let i = 0; i <= event.target.files.length; i++) {
      if (event.target.files && event.target.files[i]) {
        let reader = new FileReader();
        // this.img_send_array[i] = event.target.files[i];
        this.img_send_array.push(event.target.files[i]);
        reader.onload = (event: any) => {
          // this.img1 = event.target.result;
          // this.img_show_array[i] = event.target.result;
          this.img_show_array.push(event.target.result);

          console.log(this.img_show_array);
          // console.log(this.img1)
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
    load.dismiss();
  }

  deleteImage(i) {
    this.img_send_array.splice(i, 1);
    this.img_show_array.splice(i, 1);
  }

  send() {
    let load = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    load.present();
    let formData = new FormData();
    for (var i = 0; i < this.img_send_array.length; i++) {
      let file = this.img_send_array[i];
      if (this.img_send_array[i] != undefined && file != "") {
        formData.append("pdf[]", file);
        console.log(file.name);
        console.log(file);
      } else {
        console.log("無此資料");
      }
    }
    formData.append("client_name", this.client_name);
    formData.append("case_name", this.case_name);
    formData.append("case_type", this.case_type);
    formData.append("main_section", this.main_section);
    formData.append("sec_section", this.sec_section);
    formData.append("user", this.user);
    formData.append("num1", this.num1);
    formData.append("num2", this.num2);
    formData.append("num3", this.num3);
    formData.append("note", this.note);
    load.present();
    console.log(this.img_send_array);
    this.network
      .re_upload_pic(formData)
      .then((data) => {
        this.navCtrl.pop();
        load.dismissAll();
        alert(data);
        console.log(data);
        this.event.publish("pic_first_run");
      })
      .catch((error) => {
        alert("系統錯誤");
        load.dismissAll();
        console.log(error);
      });
  }
}
