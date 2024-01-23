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
  AlertController,
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
import { elementAt } from "rxjs/operator/elementAt";
import { PopoverComponent } from "../../components/popover/popover";
import { HaveFilterComponent } from "../../components/have-filter/have-filter";

@IonicPage()
@Component({
  selector: "page-type2",
  templateUrl: "type2.html",
})
export class Type2Page {
  num = 0;
  progress_array = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  chvv = 0;
  chvvv = 0;
  scrHeight: any;
  scrWidth: any;
  current_month = "";
  current_year = "";
  user = "";
  character = "";
  depart = "";
  web_auth = [0, 0, 0];
  spin = 0;

  // 資料 Loading
  chv1 = [];
  chv1_tmp = []; // All

  url_list = [];

  // 備註表格
  right = "-100em";
  transTime = "0.55s";
  show_note = [];
  alert_status = false;

  case_name = "";
  type = "";
  edit1 = false;
  edit_num = 99;
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
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;

    this.current_month = new Date().getMonth() + 1 + "";
    this.current_year = new Date().getFullYear() + "";

    this.user = window.localStorage.getItem("name");
    this.character = window.localStorage.getItem("character");
    this.depart = window.localStorage.getItem("depart");
    this.case_name = window.sessionStorage.getItem("case_name");
    this.type = window.sessionStorage.getItem("type");
    console.log(this.type);
  }
  bcakMainPage() {
    this.navCtrl.push("MainLeadPage");
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad Type1Page");

    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_mission_list.php?user=" +
        this.user
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      console.log(result);
      if (result != null) {
        this.alert_status = true;
        if (this.scrWidth < 900) {
          const modal = this.modalCtrl.create("ReceiveMissionMobilePage");
          modal.present();
        } else {
          const modal = this.modalCtrl.create(
            "ReceiveMissionPage",
            {},
            { cssClass: "test-modal3" }
          );
          modal.present();
        }
      } else {
        this.alert_status = false;
      }
    });
  }

  // 閃爍判斷
  loadAlertIcon() {
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_mission_list.php?user=" +
        this.user
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result != null) {
        this.alert_status = true;
      } else {
        this.alert_status = false;
      }
    });
    // console.log('aaaa')
  }

  openFirst(myEvent) {
    let popover = this.popcontroller.create(
      PopoverComponent,
      {},
      { cssClass: "popover-hhh" }
    );
    popover.present({
      ev: myEvent,
    });
  }
  openAlert() {
    const modal = this.modalCtrl.create(
      "ReceiveMissionPage",
      {},
      { cssClass: "test-modal3" }
    );
    modal.present();
  }
  bmsGo() {
    window.open("http://web.ici-biot.com/bms/login.php");
  }
  allmarket() {
    window.open("https://allmarket.com.tw");
  }
  logout() {
    this.app.getRootNav().setRoot("LoginPage");
  }

  @HostListener("window:resize", ["$event"])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  viewNoteTable(allnote) {
    console.log(allnote);
    this.right = "25%";
    this.show_note = [];
    allnote.forEach((e, i) => {
      this.show_note.push(e);
    });
  }
  noNoteTable() {
    this.right = "-100em";
  }

  chType0(num, type) {
    window.sessionStorage.setItem("type", type);
    switch (num) {
      case 0:
        this.navCtrl.push("Type1Page");
        break;
      case 1:
        this.navCtrl.push("Type2Page");
        break;
      case 2:
        this.navCtrl.push("Type3Page");
        break;
      case 3:
        this.navCtrl.push("Type4Page");
        break;
      case 4:
        this.navCtrl.push("Type5Page");
        break;
      default:
        console.log("錯誤");
    }
  }
  chType1(num) {
    this.num = num;
  }
  add(num) {}
  edit(num) {
    if (num !== 99) {
      this.edit1 = true;
      this.edit_num = num;
    } else {
      this.edit1 = false;
      this.edit_num = 99;
    }
  }
}
