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
 * Generated class for the DesignWorkUploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-design-work-upload",
  templateUrl: "design-work-upload.html",
})
export class DesignWorkUploadPage {
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
  type_case = "";
  view_url = [];
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
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DesignWorkUploadPage");
    this.loadCompleteFileItem();
    this.defaultUrl();
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
      console.log(result);
      this.list = result["data"];
    });
  }
  defaultUrl() {
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
  fileIncoming(event, group2) {
    for (let i = 0; i <= event.target.files.length; i++) {
      if (event.target.files && event.target.files[i]) {
        var data = event.target.files[i]; // 資料
        let fileName = event.target.files[i]["name"]; // 檔名
        console.log(fileName);
        console.log(data);
        let reader = new FileReader();
        this.url[i] = event.target.files[i];
        reader.onload = (event: any) => {
          console.log(this.url);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
    //轉轉圖檔設置
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    let formData = new FormData();
    for (let i = 0; i <= this.url.length; i++) {
      let file = this.url[i];
      if (this.url[i] != null) {
        formData.append("pdf[]", file);
        console.log(file);
        // console.log(fileName)
      } else {
        console.log("無此資料");
      }
    }
    formData.append("id", this.AD_id);
    formData.append("item", group2);
    formData.append("serial_num", this.serial_num);
    formData.append("case_name", this.case_name);
    formData.append("fun", this.fun);
    formData.append("name", window.localStorage.getItem("name"));
    console.log(group2);
    console.log(this.AD_id);
    console.log(this.serial_num);
    this.network
      .upload_complete_file(formData)
      .then((data) => {
        this.event.publish("main_listen");
        alert(data);
        loading.dismiss();
      })
      .catch((error) => {
        console.log(error);
        loading.dismiss();
      });
  }
  view(group2) {
    this.view_url = [];
    console.log(group2);
    console.log(this.url_list);
    this.url_list.forEach((element) => {
      if (element.split("/")[8].split("_")[2] == group2[0]) {
        this.view_url.push(element);
      }
      console.log(this.view_url);
    });
    const modal = this.modalCtrl.create(
      "S1ViewPage",
      {
        serial_num: this.serial_num,
        AD_url: this.view_url,
        view_type: "complete_file_view",
      },
      { cssClass: "test-modal3" }
    );
    modal.present();
  }

  download(group2) {
    //轉轉圖檔設置
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    let formData = new FormData();
    formData.append("serial_num", this.serial_num);
    formData.append("item", group2[0]);
    console.log(group2);
    this.network
      .download_complete_file_one(formData)
      .then((data) => {
        this.navCtrl.pop();
        console.log(data);
        var url: any;
        url = data;
        url.forEach((element) => {
          window.open(element);
        });
        loading.dismiss();
      })
      .catch((error) => {
        console.log(error);
        loading.dismiss();
        alert("系統異常");
      });
  }
  downloadAll() {
    //轉轉圖檔設置
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    let formData = new FormData();
    formData.append("serial_num", this.serial_num);
    formData.append("case_name", this.case_name);
    this.network
      .download_complete_file_all(formData)
      .then((data) => {
        this.navCtrl.pop();
        console.log(data);
        var url: any;
        url = data;
        window.open(url);
        loading.dismiss();
      })
      .catch((error) => {
        console.log(error);
        loading.dismiss();
        alert("系統異常");
      });
  }
}
