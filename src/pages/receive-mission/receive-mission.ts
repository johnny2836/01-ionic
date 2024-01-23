import { Component, ElementRef } from "@angular/core";
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
import { HostListener } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { NetworkProvider } from "../../providers/network/network";

/**
 * Generated class for the ReceiveMissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-receive-mission",
  templateUrl: "receive-mission.html",
})
export class ReceiveMissionPage {
  user = "";
  character = "";
  depart = "";

  mission = [];

  scrHeight: any;
  scrWidth: any;

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
    public alertCtrl: AlertController,
    public elementRef: ElementRef
  ) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;

    this.user = window.localStorage.getItem("name");
    this.character = window.localStorage.getItem("character");
    this.depart = window.localStorage.getItem("depart");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReceiveMissionPage");
    this.loadMission();
  }

  loadMission() {
    this.mission = [];
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
        result.forEach((e) => {
          e["checkbox"] = false;
        });
        this.mission = result;
      } else {
        alert("無須接收之任務");
        this.navCtrl.pop();
      }
    });
  }

  yesReceive(event, id) {
    // console.log(event.value)
    // console.log(id)
    // if (event.value == true) {

    // }
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    var formdata = new FormData();
    formdata.append("mission", JSON.stringify(this.mission));
    formdata.append("user", this.user);
    this.network
      .save_receive_status_list(formdata)
      .then((data) => {
        loading.dismissAll();
        console.log(data);
        alert("接收成功");
        this.loadMission();
      })
      .catch((err) => {
        loading.dismissAll();
        alert("接收成功");
        this.loadMission();
        // alert('任務接收異常')
        console.log(err);
      });
  }
}
