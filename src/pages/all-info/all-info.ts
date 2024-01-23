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
import { elementAt } from "rxjs/operator/elementAt";

/**
 * Generated class for the AllInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-all-info",
  templateUrl: "all-info.html",
})
export class AllInfoPage {
  ch_color = ["rgb(68,84,106)", "rgb(205,207,211)"];
  color = ["rgb(255,255,255)", "rgb(0,0,0)"];

  chv = 0;
  spin = 0;
  all_data = [];
  all_data2 = [];
  contact = [];

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
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AllInfoPage");
    this.loadAllData();
  }

  chType(number) {
    this.chv = number;
    let i = 0;
    this.ch_color.forEach((element) => {
      this.ch_color[i] = "rgb(205,207,211)";
      this.color[i] = "rgb(0,0,0)";
      i = i + 1;
    });
    this.ch_color[number] = "rgb(68,84,106)";
    this.color[number] = "rgb(255,255,255)";
  }

  loadAllData() {
    this.contact = [];
    this.all_data = [];
    this.all_data2 = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_all_info.php"
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.all_data2 = result["all_data"];
      this.contact = result["contact"];
      for (let i = 0; i < this.all_data2.length && i < 100; i++) {
        this.all_data.push(this.all_data2[i]);
      }
      console.log(this.all_data2);
    });
  }
  doInfiniteAll(infiniteScroll) {
    if (this.all_data.length > 20) {
      console.log("Begin async operation");
      setTimeout(() => {
        var len = this.all_data.length;
        for (let i = 0; i < 100; i++) {
          this.all_data.push(this.all_data2[len + i]);
        }
        infiniteScroll.complete();
      }, 500);
    }
  }
}
