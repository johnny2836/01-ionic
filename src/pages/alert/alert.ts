import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ModalController,
  NavParams,
  Events,
  LoadingController,
  Item,
  AlertController,
} from "ionic-angular";
import { PopoverController } from "ionic-angular/components/popover/popover-controller";
import { HostListener } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { NetworkProvider } from "../../providers/network/network";
import { elementAt } from "rxjs/operator/elementAt";
import { BigimageComponent } from "../../components/bigimage/bigimage";
import { P } from "@angular/core/src/render3";
import { ProgressFilterComponent } from "../../components/progress-filter/progress-filter";
import { connectableObservableDescriptor } from "rxjs/observable/ConnectableObservable";

/**
 * Generated class for the AlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-alert",
  templateUrl: "alert.html",
})
export class AlertPage {
  all_data = [];
  user = "";
  character = "";
  show_arr = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popcontroller: PopoverController,
    public http: HttpClient,
    public network: NetworkProvider,
    public event: Events,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {
    this.all_data = navParams.get("all_data");
    this.user = window.localStorage.getItem("name");
    this.character = window.localStorage.getItem("character");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AlertPage");
    this.load();
  }

  load() {
    this.all_data.forEach((e, i) => {
      if (e["AD_type"] == "檢修案件") {
        this.show_arr.push(e);
      }
    });
  }

  send() {
    const modal = this.modalCtrl.create(
      "AddNewPage",
      { chv_add: this.show_arr, add_type: "chv2" },
      { cssClass: "test-modal3" }
    );
    modal.present();
  }
}
