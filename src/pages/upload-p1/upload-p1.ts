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

/**
 * Generated class for the UploadP1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-upload-p1",
  templateUrl: "upload-p1.html",
})
export class UploadP1Page {
  ch_color = [
    "rgb(68,84,106)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
  ];
  color = [
    "rgb(255,255,255)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
  ];
  ch_color2 = ["rgb(205,207,211)", "rgb(68,84,106)"];
  color2 = ["rgb(0,0,0)", "rgb(255,255,255)"];

  fun = "";
  AD_id = "";
  client_name = "";
  case_name = "";
  serial_num = "";
  case_type = "";
  part = "a";
  all_paper = [];
  checkbox = [];
  paper = [];
  yy = [];
  act = 1;
  mail_arr = [];
  name_arr = "";
  subject = "";
  content = "";
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
    console.log(this.AD_id);
    console.log(typeof this.fun);
    console.log(this.client_name);
    console.log(this.case_name);
    console.log(this.serial_num);
    if (this.fun == "0") {
      this.case_type = "室內裝修";
    } else if (this.fun == "1") {
      this.case_type = "用途變更";
    } else if (this.fun == "2") {
      this.case_type = "檢修案件";
    } else if (this.fun == "3") {
      this.case_type = "新建工程";
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UploadP1Page");
    this.loadPaper();
    this.mail();
  }
  mail() {
    this.event.subscribe("mail_listen2", (mail_arr) => {
      console.log(mail_arr);
      let ii = 0;
      var a = [];
      mail_arr.mail.forEach((e, i) => {
        if (i == 0) {
          a[i] = e["company"] + "-" + e["name"];
        } else {
          a[i] = a[ii] + "," + e["company"] + "-" + e["name"];

          ii++;
        }
        this.mail_arr[i] = e["mail"];
      });
      this.name_arr = a[a.length - 1];
      console.log(this.name_arr);
      console.log(this.mail_arr);
    });
  }
  chooseMail() {
    const modal = this.modalCtrl.create(
      "ChooseMailPage",
      {
        serial_num: this.serial_num,
        id: this.AD_id,
        fun: this.fun,
        case_name: this.case_name,
        client_name: this.client_name,
        part: "just_mail",
      },
      { cssClass: "test-modal" }
    );
    modal.present();
  }

  action(number) {
    let i = 0;
    this.ch_color2.forEach((element) => {
      this.ch_color2[i] = "rgb(205,207,211)";
      this.color2[i] = "rgb(0,0,0)";
      i = i + 1;
    });
    this.ch_color2[number] = "rgb(68,84,106)";
    this.color2[number] = "rgb(255,255,255)";
    this.act = number;
  }

  loadPaper() {
    this.all_paper = [];
    this.checkbox = [];
    this.yy = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_paper_tab3.php"
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      result["all_paper"].forEach((element) => {
        this.all_paper.push(element);
        this.yy.push(false);
      });
      this.checkbox = result["checkbox"];

      console.log(this.all_paper);
      console.log(this.checkbox);

      if (this.case_type != "") {
        this.people();
      }
    });
  }
  people() {}
}
