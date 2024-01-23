import { Component, Input } from "@angular/core";
import { ModalController, NavController, App } from "ionic-angular";
import { PopoverController } from "ionic-angular/components/popover/popover-controller";
import { PopoverComponent } from "../../components/popover/popover";

@Component({
  selector: "app-header",
  templateUrl: "header.html",
})
export class HeaderComponent {
  depart: string = "";
  user: string = "";
  ch_color = [
    "rgb(68,84,106)",
    "rgb(205,207,211)",
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
    "rgb(0,0,0)",
  ];
  ch_color_1 = [
    "rgb(68,84,106)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
  ];
  color_1 = [
    "rgb(255,255,255)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
    "rgb(0,0,0)",
  ];
  ch_color_2 = ["rgb(68,84,106)", "rgb(205,207,211)", "rgb(205,207,211)"];
  color_2 = ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(0,0,0)"];

  num = "";
  state = "close";
  spin = 0;
  chv: any;
  chvv: any;
  chvvv: any;
  edit = [0, 0, 0, 0];
  chart = 0;
  chart_num = 0;
  progress_array = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  constructor(
    public modalCtrl: ModalController,
    public popcontroller: PopoverController,
    public app: App,
    public navCtrl: NavController
  ) {
    this.user = window.localStorage.getItem("name");
    this.depart = window.localStorage.getItem("depart");
    console.log(this.user);
    console.log(this.depart);
  }
  bmsGo() {
    window.open("http://web.ici-biot.com/bms/login.php");
  }

  openAlert() {
    const modal = this.modalCtrl.create(
      "ReceiveMissionPage",
      {},
      { cssClass: "test-modal3" }
    );
    modal.present();
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
  chartChange() {
    if (this.chart == 0) {
      this.chart = 1;
    } else if (this.chart == 1) {
      this.chart = 0;
    }
  }

  // 案件類型 buttons
  chType() {
    this.chv = -1;
    this.ch_color = [
      "rgb(68,84,106)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
    ];
    this.color = [
      "rgb(255,255,255)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
    ];
    this.spin = 0;
    this.progress_array = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    this.ChType0(1);
  }
  ChType0(num) {
    this.chvv = num;
    this.chv = -1;
    this.ch_color = [
      "rgb(68,84,106)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
    ];
    this.color = [
      "rgb(255,255,255)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
    ];
    let i = 0;
    this.ch_color_1.forEach((element) => {
      this.ch_color_1[i] = "rgb(205,207,211)";
      this.color_1[i] = "rgb(0,0,0)";
      i = i + 1;
    });
    this.ch_color_1[num] = "rgb(68,84,106)";
    this.color_1[num] = "rgb(255,255,255)";

    if (num == 2) {
    }
    this.spin = 0;
    this.progress_array = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
  }
  chType0() {
    this.chv = 0;
    this.navCtrl.push("Type1Page");
  }
  chType1() {
    this.chv = 1;
    this.navCtrl.push("Type2Page");
  }
  chType2() {
    this.chv = 2;
    this.navCtrl.push("Type3Page");
  }
  chType3() {
    this.chv = 3;
    this.navCtrl.push("Type4Page");
  }
  chType4() {
    this.chv = 4;
    this.navCtrl.push("Type5Page");
  }
  chContact() {
    this.chvv = 0;
    this.chv = "通訊錄";
    this.ch_color = [
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(68,84,106)",
      "rgb(205,207,211)",
    ];
    this.color = [
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(255,255,255)",
      "rgb(0,0,0)",
    ];
    this.ch_color_1 = [
      "rgb(68,84,106)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
    ];
    this.color_1 = [
      "rgb(255,255,255)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
    ];
    this.spin = 0;
    this.progress_array = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
  }
  chContact0(num) {
    this.chvv = num;
    this.chv = "通訊錄";
    this.ch_color = [
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(205,207,211)",
      "rgb(68,84,106)",
      "rgb(205,207,211)",
    ];
    this.color = [
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(0,0,0)",
      "rgb(255,255,255)",
      "rgb(0,0,0)",
    ];
    let i = 0;
    this.ch_color_1.forEach((element) => {
      this.ch_color_1[i] = "rgb(205,207,211)";
      this.color_1[i] = "rgb(0,0,0)";
      i = i + 1;
    });
    this.ch_color_1[num] = "rgb(68,84,106)";
    this.color_1[num] = "rgb(255,255,255)";
    this.spin = 0;
    this.progress_array = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
  }
  logout() {
    this.app.getRootNav().setRoot("LoginPage");
  }

  // 檢修申報提醒 介面
  addAlert() {
    console.log("addAlert");
  }

  // 編輯案件資訊
  update(number) {
    console.log("update");
  }

  // 刪除
  deleteCase() {
    console.log("delete");
  }
}
