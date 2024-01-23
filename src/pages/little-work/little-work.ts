import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ModalController,
  NavParams,
  Events,
  LoadingController,
  App,
  MenuController,
  AlertController,
} from "ionic-angular";
import { PopoverController } from "ionic-angular/components/popover/popover-controller";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { NetworkProvider } from "../../providers/network/network";

/**
 * Generated class for the LittleWorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-little-work",
  templateUrl: "little-work.html",
})
export class LittleWorkPage {
  serial_num = "";
  client_name = "";
  case_name = "";
  coloum = "";
  main_section = "";
  sec_section = "";

  th_A = "";
  call_back = "";
  note = "";

  user = "";
  character = "";
  depart = "";
  type = "";

  all_status = "";
  closed_status = "";
  closed_note = "";
  upload_file = false;
  file_list = [];
  img_list = [];
  url = [];
  up_url = [];
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
    public menu: MenuController,
    public alertCtrl: AlertController
  ) {
    this.serial_num = this.navParams.get("serial_num");
    this.client_name = this.navParams.get("client_name");
    this.case_name = this.navParams.get("case_name");
    this.coloum = this.navParams.get("coloum"); // sql save coloum
    this.main_section = this.navParams.get("main_section");
    this.sec_section = this.navParams.get("sec_section");

    this.th_A = this.navParams.get("th_A");

    this.all_status = this.navParams.get("all_status");

    this.user = window.localStorage.getItem("name");
    this.character = window.localStorage.getItem("character");
    this.depart = window.localStorage.getItem("depart");

    if (this.serial_num.split("-")[1] == "01") {
      this.type = "室內裝修";
    } else if (this.serial_num.split("-")[1] == "02") {
      this.type = "用途變更";
    } else if (this.serial_num.split("-")[1] == "03") {
      this.type = "檢修案件";
    } else if (this.serial_num.split("-")[1] == "04") {
      this.type = "新建工程";
    } else if (this.serial_num.split("-")[1] == "05") {
      this.type = "設計";
    } else if (this.serial_num.split("-")[1] == "06") {
      this.type = "變更併室裝";
    } else if (this.serial_num.split("-")[1] == "07") {
      this.type = "新建變更設計";
    } else if (this.serial_num.split("-")[1] == "08") {
      this.type = "用途變更併室裝";
    } else if (this.serial_num.split("-")[1] == "09") {
      this.type = "修繕案件";
    }

    if (this.all_status == "結案編輯") {
      this.closed_status = this.navParams.get("closed_status");
      this.closed_note = this.navParams.get("closed_note");
    } else {
      if (this.main_section == "圖審作業" && this.sec_section == "結案作業") {
        this.upload_file = true;
        this.readUploadList();
      }
      this.readDefault();
    }

    console.log(this.type);
    console.log(this.upload_file);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LittleWorkPage");
  }

  readDefault() {
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_default_little_work.php?serial_num=" +
        this.serial_num +
        "&coloum=" +
        this.coloum
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.call_back = result["call_back"];
      this.note = result["note"];
    });
  }

  save() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    var formdata = new FormData();
    formdata.append("serial_num", this.serial_num);
    formdata.append("client_name", this.client_name);
    formdata.append("case_name", this.case_name);
    formdata.append("coloum", this.coloum);
    formdata.append("main_section", this.main_section);
    formdata.append("sec_section", this.sec_section);
    formdata.append("call_back", this.call_back);
    formdata.append("note", this.note);
    formdata.append("user", this.user);
    this.network
      .save_other_work(formdata)
      .then((data) => {
        loading.dismissAll();
        if (this.type == "室內裝修") {
          this.event.publish("type1_first_run");
        } else if (this.type == "用途變更") {
          this.event.publish("type2_first_run");
        } else if (this.type == "檢修案件") {
          this.event.publish("type3_first_run");
        } else if (this.type == "新建工程") {
          this.event.publish("type4_first_run");
        } else if (this.type == "修繕案件") {
          this.event.publish("type5_first_run");
        }
        console.log(data);
        alert(data);
        this.navCtrl.pop();
      })
      .catch((err) => {
        console.log(err);
        loading.dismissAll();
      });
  }

  saveClose() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    var formdata = new FormData();
    formdata.append("serial_num", this.serial_num);
    formdata.append("closed_status", this.closed_status);
    formdata.append("closed_note", this.closed_note);
    formdata.append("user", this.user);
    this.network
      .save_close(formdata)
      .then((data) => {
        loading.dismissAll();
        this.event.publish("main_listen");
        console.log(data);
        alert(data);
        this.navCtrl.pop();
      })
      .catch((err) => {
        console.log(err);
        loading.dismissAll();
      });
  }

  // 回報 上傳檔案
  fileChange(event) {
    for (let i = 0; i <= event.target.files.length; i++) {
      if (event.target.files && event.target.files[i]) {
        var data = event.target.files[i]; // 資料
        let fileName = event.target.files[i]["name"]; // 檔名
        console.log(data);
        console.log(fileName);
        let reader = new FileReader();
        this.up_url[i] = event.target.files[i];
        reader.onload = (event: any) => {
          console.log(this.up_url);
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
    let formdata = new FormData();
    for (let i = 0; i <= this.up_url.length; i++) {
      let file = this.up_url[i];
      if (this.up_url[i] != null) {
        formdata.append("pdf[]", file);
        console.log(file);
      } else {
        console.log("無此資料");
      }
    }
    formdata.append("serial_num", this.serial_num);
    formdata.append("client_name", this.client_name);
    formdata.append("case_name", this.case_name);
    formdata.append("coloum", this.coloum);
    formdata.append("main_section", this.main_section);
    formdata.append("sec_section", this.sec_section);
    formdata.append("case_type", this.type);
    this.network
      .save_callback_file(formdata)
      .then((data) => {
        alert(data);
        // console.log(data)
        loading.dismiss();
        this.readUploadList();
      })
      .catch((error) => {
        console.log(error);
        loading.dismiss();
      });
  }

  readUploadList() {
    console.log(this.serial_num);
    console.log(this.main_section);
    console.log(this.sec_section);
    console.log(this.type);
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    let data: Observable<any>;
    this.url = [];
    this.file_list = [];
    this.img_list = [];
    data = this.http.get(
      "https://ici-biot.com/ap/ionic_app/AD_platform/read_callback_url_list.php?serial_num=" +
        this.serial_num +
        "&main_section=" +
        this.main_section +
        "&sec_section=" +
        this.sec_section +
        "&type=" +
        this.type
    );
    data.subscribe(
      (result) => {
        result = JSON.stringify(result);
        result = JSON.parse(result);
        console.log(result);
        if (result != null) {
          this.url = result[0]["url"];
          this.url.forEach((e) => {
            this.file_list.push(e.substr(e.lastIndexOf("/") + 1));
            if (
              e.substr(e.lastIndexOf(".") + 1) == "ppt" ||
              e.substr(e.lastIndexOf(".") + 1) == "pptx"
            ) {
              this.img_list.push("assets/imgs/ppt.jpg");
            } else if (
              e.substr(e.lastIndexOf(".") + 1) == "xls" ||
              e.substr(e.lastIndexOf(".") + 1) == "xlsx"
            ) {
              this.img_list.push("assets/imgs/xls.jpg");
            } else if (
              e.substr(e.lastIndexOf(".") + 1) == "doc" ||
              e.substr(e.lastIndexOf(".") + 1) == "docx"
            ) {
              this.img_list.push("assets/imgs/doc.jpg");
            } else if (
              e.substr(e.lastIndexOf(".") + 1) == "pdf" ||
              e.substr(e.lastIndexOf(".") + 1) == "pdf"
            ) {
              this.img_list.push("assets/imgs/pdf.png");
            } else {
              this.img_list.push(e);
            }
          });
        }
        loading.dismiss();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
    console.log(this.img_list);
    console.log(this.file_list);
  }

  deleteFile(i) {
    console.log(this.url);
    console.log(this.url[i]);

    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    let formdata = new FormData();
    formdata.append("serial_num", this.serial_num);
    formdata.append("client_name", this.client_name);
    formdata.append("case_name", this.case_name);
    formdata.append("coloum", this.coloum);
    formdata.append("main_section", this.main_section);
    formdata.append("sec_section", this.sec_section);
    formdata.append("case_type", this.type);
    formdata.append("delete_url", this.url[i]);

    var num = this.url.indexOf(this.url[i]);
    this.url.splice(num, 1);
    this.file_list.splice(num, 1);
    this.img_list.splice(num, 1);
    formdata.append("urls", JSON.stringify(this.url));

    this.network
      .delete_callback_file(formdata)
      .then((data) => {
        alert(data);
        console.log(data);
        loading.dismiss();
        // this.readUploadList()
      })
      .catch((error) => {
        alert("系統錯誤");
        console.log(error);
        loading.dismiss();
      });
  }

  view(url) {
    const modal = this.modalCtrl.create(
      "S1ViewPage",
      {
        serial_num: this.serial_num,
        AD_url: this.url,
        view_type: "callback_file",
      },
      { cssClass: "test-modal3" }
    );
    modal.present();
  }
}
