import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ModalController,
  NavParams,
  Events,
  LoadingController,
  Item,
  App,
  MenuController,
} from "ionic-angular";
import { PopoverController } from "ionic-angular/components/popover/popover-controller";
import { HostListener } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { NetworkProvider } from "../../providers/network/network";
import { FilterComponent } from "../../components/filter/filter";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

/**
 * Generated class for the ConfirmPicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-confirm-pic",
  templateUrl: "confirm-pic.html",
})
export class ConfirmPicPage {
  AD_id = "";
  fun = "";
  client_name = "";
  client_name2 = "";
  list = [];
  case_name = "";
  serial_num = "";
  check = [];
  version = [];
  type_case = "";
  part = "a";
  name = "";
  id = "";
  url = [];
  section_note = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popcontroller: PopoverController,
    public http: HttpClient,
    public network: NetworkProvider,
    public event: Events,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public app: App,
    public menu: MenuController
  ) {
    this.AD_id = this.navParams.get("id");
    this.client_name = navParams.get("client_name");
    this.case_name = navParams.get("case_name");
    this.serial_num = navParams.get("serial_num");
    this.fun = navParams.get("fun");
    this.name = window.localStorage.getItem("name");
    if (this.fun == "0") {
      this.type_case = "室內裝修";
    } else if (this.fun == "1") {
      this.type_case = "用途變更";
    } else if (this.fun == "3") {
      this.type_case = "新建工程";
    }
    console.log(this.AD_id);
    console.log(this.client_name);
    console.log(this.case_name);
    console.log(this.serial_num);
    if (this.client_name != "") {
      this.client_name2 = this.client_name;
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ConfirmPicPage");
    this.loadTab();
  }
  loadTab() {
    this.list = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_pic_comfirm_tab.php?serial_num=" +
        this.serial_num
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      let k = 0;
      result["aa"].forEach((e) => {
        if (e["checkbox"] == true) {
          this.list.push({
            type: e["type"],
            item: e["item"],
            version: "",
            comfirm: false,
          });
          if (result["Version"] != null) {
            for (let i = 0; i < result["Version"].length; i++) {
              var a = result["Version"][i].split(
                "https://ad-ruien.s3.ap-northeast-1.amazonaws.com/"
              )[1];
              var aa = a.split("/")[2];
              var b = aa.split("_")[1]; //type
              var c = aa.split("_")[2]; //item
              var d = aa.split("_")[3]; //version
              if (e["type"] == b && e["item"] == c) {
                this.list[k]["version"] = d;
              } else {
                this.list[k]["version"] = d;
              }
            }
          }

          if (result["check"] != null) {
            for (let i = 0; i < result["check"].length; i++) {
              if (
                e["type"] == result["check"][i]["type"] &&
                e["item"] == result["check"][i]["item"]
              ) {
                this.list[k]["comfirm"] = result["check"][i]["comfirm"];
              }
            }
          } else {
            this.list[k]["comfirm"] = false;
          }
          k++;
        }
      });
      this.id = result["id"];
      this.url = result["url"];
      console.log(this.list);
    });
  }

  sendCheckSql() {
    let load = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    load.present();
    let formData = new FormData();
    formData.append("serial_num", this.serial_num);
    formData.append("fun", this.fun);
    formData.append("list", JSON.stringify(this.list));
    formData.append("name", window.localStorage.getItem("name"));
    console.log(this.list);
    this.network
      .save_check_sql(formData)
      .then((data) => {
        alert(data);
        console.log(data);
        load.dismiss();
        if (this.type_case == "室內裝修") {
          this.event.publish("type1_first_run");
        } else if (this.type_case == "用途變更") {
          this.event.publish("type2_first_run");
        } else if (this.type_case == "檢修案件") {
          this.event.publish("type3_first_run");
        } else if (this.type_case == "新建工程") {
          this.event.publish("type4_first_run");
        } else if (this.type_case == "修繕案件") {
          this.event.publish("type5_first_run");
        }
        // this.event.publish('main_listen')
        // this.navCtrl.pop()
        this.loadTab();
      })
      .catch((error) => {
        alert("系統異常");
        console.log(error);
        load.dismiss();
      });
  }

  view(item_type, type) {
    const modal = this.modalCtrl.create(
      "S1ViewPage",
      { item_type: item_type, type: type, id: this.id, AD_url: this.url },
      { cssClass: "test-modal3" }
    );
    modal.present();
    // console.log(this.url)
  }

  mail() {
    this.part = "b";
    this.readSectionNoteDefault();
  }
  mail2() {
    this.part = "a";
  }

  saveSectionNote() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    var formdata = new FormData();
    formdata.append("serial_num", this.serial_num);
    formdata.append("client_name", this.client_name);
    formdata.append("case_name", this.case_name);
    formdata.append("chv", this.fun);
    formdata.append("section_note", this.section_note);
    formdata.append("section", "AD_section_note3");
    formdata.append("callback_date", "");
    formdata.append("main_section", "圖資準備");
    formdata.append("sec_section", "圖資確認");
    formdata.append("name", this.name);
    console.log(this.client_name);
    console.log(this.case_name);
    this.network
      .save_section_note(formdata)
      .then((data) => {
        loading.dismissAll();
        alert("作業完成");
        // this.event.publish('main_listen')
        if (this.type_case == "室內裝修") {
          this.event.publish("type1_first_run");
        } else if (this.type_case == "用途變更") {
          this.event.publish("type2_first_run");
        } else if (this.type_case == "檢修案件") {
          this.event.publish("type3_first_run");
        } else if (this.type_case == "新建工程") {
          this.event.publish("type4_first_run");
        } else if (this.type_case == "修繕案件") {
          this.event.publish("type5_first_run");
        }
        this.navCtrl.pop();
      })
      .catch((err) => {
        alert("系統錯誤");
        console.log(err);
        loading.dismissAll();
      });
  }

  readSectionNoteDefault() {
    this.section_note = "";
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_section_note_default.php?serial_num=" +
        this.serial_num +
        "&chv=" +
        this.fun +
        "&section=AD_section_note3"
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.section_note = result["note"][0];
    });
  }
}
