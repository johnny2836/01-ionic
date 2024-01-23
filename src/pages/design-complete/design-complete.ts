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
import { elementAt } from "rxjs/operator/elementAt";
import { group } from "@angular/animations";

/**
 * Generated class for the DesignCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-design-complete",
  templateUrl: "design-complete.html",
})
export class DesignCompletePage {
  fun = "";
  AD_id = "";
  client_name = "";
  case_name = "";
  serial_num = "";
  json: any;
  file: File;
  name = "";
  arrayBuffer: any;
  work_sheet_name = "";
  list = [];
  url = [];
  url_list = [];
  AD_url = [];
  view_type = "";
  check = [];
  type_case = "";
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
    this.fun = this.navParams.get("fun");
    this.AD_id = this.navParams.get("id");
    this.client_name = navParams.get("client_name");
    this.case_name = navParams.get("case_name");
    this.serial_num = navParams.get("serial_num");
    this.AD_url = navParams.get("AD_url");
    this.view_type = navParams.get("view_type");
    if (this.fun == "0") {
      this.type_case = "室內裝修";
    } else if (this.fun == "1") {
      this.type_case = "用途變更";
    } else if (this.fun == "3") {
      this.type_case = "新建工程";
    }
    console.log(this.AD_id);
    console.log(this.fun);
    console.log(this.client_name);
    console.log(this.case_name);
    console.log(this.serial_num);
    console.log(this.AD_url);
    console.log(this.view_type);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DesignCompletePage");
    this.loadCompleteFileItem();
    this.designComplete();
  }
  loadCompleteFileItem() {
    this.list = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_complete_file_item.php?serial_num=" +
        this.serial_num
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      this.list = result["data"];
      console.log(JSON.parse(result["aa"]));
      if (result["aa"] != null) {
        this.check = JSON.parse(result["aa"]);
      }
    });
  }

  completeFileConfirm() {
    let load = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    load.present();
    let formData = new FormData();
    formData.append("serial_num", this.serial_num);
    formData.append("fun", this.fun);
    formData.append("check", JSON.stringify(this.check));
    formData.append("name", window.localStorage.getItem("name"));
    console.log(this.check);
    this.network
      .save_complete_file_check_sql(formData)
      .then((data) => {
        alert(data);
        console.log(data);
        this.loadCompleteFileItem();
        load.dismiss();
        this.event.publish("main_listen");
      })
      .catch((error) => {
        alert("系統異常");
        console.log(error);
        load.dismiss();
      });
  }
  designComplete() {
    this.url_list = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_complete_file_default_url.php?serial_num=" +
        this.serial_num
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.url_list = result;
    });
  }

  view(group2) {
    this.url = [];
    console.log(group2);
    console.log(this.url_list);
    this.url_list.forEach((element) => {
      if (element.split("/")[8].split("_")[2] == group2[0]) {
        this.url.push(element);
      }
      console.log(this.url);
    });
    const modal = this.modalCtrl.create(
      "S1ViewPage",
      {
        serial_num: this.serial_num,
        AD_url: this.url,
        view_type: "complete_file_view",
      },
      { cssClass: "test-modal3" }
    );
    modal.present();
  }
}
