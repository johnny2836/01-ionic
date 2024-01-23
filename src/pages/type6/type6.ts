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
  selector: "page-type6",
  templateUrl: "type6.html",
})
export class Type6Page {
  chvv = 0;
  chvvv = 0;
  scrHeight: any;
  scrWidth: any;
  current_month = "";
  current_year = "";
  user = "";
  character = "";
  depart = "";

  case_name = "";
  case_id = "";
  stage = "";
  type = "";

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
    this.case_id = window.sessionStorage.getItem("case_id");
    this.stage = window.sessionStorage.getItem("stage");
    this.type = window.sessionStorage.getItem("type");
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
}
