import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ModalController,
  NavParams,
  Events,
  LoadingController,
} from "ionic-angular";
import { PopoverController } from "ionic-angular/components/popover/popover-controller";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { NetworkProvider } from "../../providers/network/network";

/**
 * Generated class for the AssignMissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-assign-mission",
  templateUrl: "assign-mission.html",
})
export class AssignMissionPage {
  AD_id = "";
  client_id = "";
  client_name = "";
  case_name = "";
  serial_num = "";
  case_type = "";
  bar1 = ["階段", "子階段"];
  bar2 = ["業務部", "管理部", "設計部", "工務部"];
  bar3 = ["設定", "主辦"];
  bar4_a = ["意見回饋", "圖資確認"];
  bar4_a_1 = ["拍照記錄", "協調事項"];
  bar4_b = ["設計作業", "用印申請", "設計檢核", "線上掛件", "圖紙輸出"];
  bar4_c = [
    "紙本掛件",
    "承辦約件",
    "缺失修正",
    "圖說複審",
    "複審修正",
    "結案作業",
    "核准公文",
  ];
  bar4_d = ["工程備料", "圖說調整", "協調進場"];
  bar4_e = ["物料進場", "管線布設", "設備安裝", "自主查驗"];
  bar4_f = ["計價作業", "請款作業"];
  bar4_g = ["圖說核對", "自主測試", "改善確認"];
  bar4_h = ["用印申請", "溝通掛件", "會勘掛件", "承辦約件", "業主回報"];
  bar4_i = ["現場準備", "正式會勘", "會勘缺失", "缺失改善", "會勘複查"];
  bar4_j = ["結案作業", "領合格文件"];
  bar5 = [
    "圖資準備",
    "現場勘查",
    "設計繪圖",
    "圖審作業",
    "前期準備",
    "現場施工",
    "計價請款",
    "現場準備",
    "會勘準備",
    "現場會勘",
    "會勘結案",
  ];
  barA = [
    "文件索取",
    "客戶約件",
    "檢修日期",
    "檢查繳表",
    "檢修回報",
    "製圖作業",
    "結果確認",
    "缺失提報",
    "線上申報",
    "計價作業",
    "請款作業",
  ];
  barB = [
    "需求確認",
    "自動報價",
    "協調進場",
    "設備修繕",
    "計價作業",
    "請款作業",
  ];
  a1 = [];
  a2 = [];
  a3 = [];
  aa1 = [];
  aa2 = [];
  aa3 = [];
  b1 = [];
  b2 = [];
  b3 = [];
  bb1 = [];
  bb2 = [];
  bb3 = [];
  c1 = [];
  c2 = [];
  c3 = [];
  d1 = [];
  d2 = [];
  d3 = [];
  dd1 = [];
  dd2 = [];
  dd3 = [];
  dd4 = [];
  e1 = [];
  e2 = [];
  e3 = [];
  f1 = [];
  f2 = [];
  f3 = [];
  g1 = [];
  g2 = [];
  g3 = [];
  h1 = [];
  h2 = [];
  h3 = [];
  i1 = [];
  i2 = [];
  i3 = [];
  j1 = [];
  j2 = [];
  j3 = [];
  k1 = [];
  k2 = [];
  k3 = [];
  ar_a1 = [];
  ar_aa1 = [];
  ar_b1 = [];
  ar_b2 = [];
  ar_b3 = [];
  ar_bb1 = [];
  ar_bb2 = [];
  ar_bb3 = [];
  ar_c1 = [];
  ar_c2 = [];
  ar_c3 = [];
  ar_d1 = [];
  ar_d2 = [];
  ar_d3 = [];
  ar_e1 = [];
  ar_f1 = [];
  ar_g1 = [];
  ar_h1 = [];
  ar_i1 = [];
  ar_j1 = [];
  ar_j4 = [];
  ar_k1 = [];
  ar_k2 = [];
  ar_k3 = [];
  ar_k4 = [];
  table_status: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popcontroller: PopoverController,
    public http: HttpClient,
    public network: NetworkProvider,
    public event: Events,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
    this.AD_id = this.navParams.get("id");
    this.client_id = this.navParams.get("client_id");
    this.client_name = navParams.get("client_name");
    this.case_name = navParams.get("case_name");
    this.serial_num = navParams.get("serial_num");
    if (this.serial_num == undefined || this.client_id == undefined) {
      this.navCtrl.push("MainLeadPage");
    }
    this.case_type = navParams.get("type");
    if (this.case_type == "檢修案件") {
      this.table_status = "檢修";
    } else if (this.case_type == "修繕案件") {
      this.table_status = "修繕";
    } else {
      this.table_status = "其他";
    }
    console.log(this.AD_id);
    console.log(this.client_id);
    console.log(this.client_name);
    console.log(this.case_name);
    console.log(this.serial_num);
    console.log(this.case_type);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AssignMissionPage");
    this.readMissionMain();
    this.assign_mission_listen();
  }
  assign_mission_listen() {
    this.event.subscribe("assign_mission_listen", () => {
      console.log("success");
      this.readMissionMain();
    });
  }
  readMissionMain() {
    this.a1 = [];
    this.a2 = [];
    this.a3 = [];
    this.aa1 = [];
    this.aa2 = [];
    this.aa3 = [];
    this.b1 = [];
    this.b2 = [];
    this.b3 = [];
    this.bb1 = [];
    this.bb2 = [];
    this.bb3 = [];
    this.c1 = [];
    this.c2 = [];
    this.c3 = [];
    this.d1 = [];
    this.d2 = [];
    this.d3 = [];
    this.dd1 = [];
    this.dd2 = [];
    this.dd3 = [];
    this.dd4 = [];
    this.e1 = [];
    this.e2 = [];
    this.e3 = [];
    this.f1 = [];
    this.f2 = [];
    this.f3 = [];
    this.g1 = [];
    this.g2 = [];
    this.g3 = [];
    this.h1 = [];
    this.h2 = [];
    this.h3 = [];
    this.i1 = [];
    this.i2 = [];
    this.i3 = [];
    this.j1 = [];
    this.j2 = [];
    this.j3 = [];
    this.k1 = [];
    this.k2 = [];
    this.k3 = [];
    this.ar_a1 = [];
    this.ar_aa1 = [];
    this.ar_b1 = [];
    this.ar_b2 = [];
    this.ar_b3 = [];
    this.ar_bb1 = [];
    this.ar_bb2 = [];
    this.ar_bb3 = [];
    this.ar_c1 = [];
    this.ar_c2 = [];
    this.ar_c3 = [];
    this.ar_d1 = [];
    this.ar_d2 = [];
    this.ar_d3 = [];
    this.ar_e1 = [];
    this.ar_f1 = [];
    this.ar_g1 = [];
    this.ar_h1 = [];
    this.ar_i1 = [];
    this.ar_j1 = [];
    this.ar_j4 = [];
    this.ar_k1 = [];
    this.ar_k2 = [];
    this.ar_k3 = [];
    this.ar_k4 = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_mission_main.php?serial_num=" +
        this.serial_num +
        "&client_name=" +
        this.client_name +
        "&type_status=" +
        this.table_status
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      if (this.table_status == "其他") {
        result.forEach((element) => {
          this.ar_j4.push(element[0]["AD_assign_corporate"]);
          this.ar_k2.push(element[0]["AD_main"]);
          this.ar_k3.push(element[0]["AD_assis"]);
          this.ar_k4.push(element[0]["AD_work_status"]);
        });
        this.a1 = this.ar_j4[0];
        this.a2 = this.ar_k2[0];
        this.a3 = this.ar_k3[0];
        this.ar_a1 = this.ar_k4[0];
        for (let i = 1; i < 3; i++) {
          this.aa1.push(this.ar_j4[i]);
          this.aa2.push(this.ar_k2[i]);
          this.aa3.push(this.ar_k3[i]);
          this.ar_aa1.push(this.ar_k4[i]);
        }
        this.b1 = this.ar_j4[3];
        this.b2 = this.ar_k2[3];
        this.b3 = this.ar_k3[3];
        this.ar_b1 = this.ar_k4[3];
        this.bb1 = this.ar_j4[4];
        this.bb2 = this.ar_k2[4];
        this.bb3 = this.ar_k3[4];
        this.ar_bb1 = this.ar_k4[4];
        for (let i = 5; i < 10; i++) {
          this.c1.push(this.ar_j4[i]);
          this.c2.push(this.ar_k2[i]);
          this.c3.push(this.ar_k3[i]);
          this.ar_c1.push(this.ar_k4[i]);
        }
        for (let i = 10; i < 17; i++) {
          this.d1.push(this.ar_j4[i]);
          this.d2.push(this.ar_k2[i]);
          this.d3.push(this.ar_k3[i]);
          this.ar_d1.push(this.ar_k4[i]);
        }
        this.dd1 = this.ar_j4[17];
        this.dd2 = this.ar_k2[17];
        this.dd3 = this.ar_k3[17];
        this.dd4 = this.ar_k4[17];
        for (let i = 18; i < 21; i++) {
          this.e1.push(this.ar_j4[i]);
          this.e2.push(this.ar_k2[i]);
          this.e3.push(this.ar_k3[i]);
          this.ar_e1.push(this.ar_k4[i]);
        }
        for (let i = 21; i < 25; i++) {
          this.f1.push(this.ar_j4[i]);
          this.f2.push(this.ar_k2[i]);
          this.f3.push(this.ar_k3[i]);
          this.ar_f1.push(this.ar_k4[i]);
        }
        for (let i = 25; i < 27; i++) {
          this.g1.push(this.ar_j4[i]);
          this.g2.push(this.ar_k2[i]);
          this.g3.push(this.ar_k3[i]);
          this.ar_g1.push(this.ar_k4[i]);
        }
        for (let i = 27; i < 30; i++) {
          this.h1.push(this.ar_j4[i]);
          this.h2.push(this.ar_k2[i]);
          this.h3.push(this.ar_k3[i]);
          this.ar_h1.push(this.ar_k4[i]);
        }
        for (let i = 30; i < 35; i++) {
          this.i1.push(this.ar_j4[i]);
          this.i2.push(this.ar_k2[i]);
          this.i3.push(this.ar_k3[i]);
          this.ar_i1.push(this.ar_k4[i]);
        }
        for (let i = 35; i < 40; i++) {
          this.j1.push(this.ar_j4[i]);
          this.j2.push(this.ar_k2[i]);
          this.j3.push(this.ar_k3[i]);
          this.ar_j1.push(this.ar_k4[i]);
        }
        for (let i = 40; i < 42; i++) {
          this.k1.push(this.ar_j4[i]);
          this.k2.push(this.ar_k2[i]);
          this.k3.push(this.ar_k3[i]);
          this.ar_k1.push(this.ar_k4[i]);
        }
      } else if (this.table_status == "檢修" || this.table_status == "修繕") {
        this.a1 = result;
      }
    });
  }
  setting(B_section, section) {
    console.log(B_section); //階段
    console.log(section); //子階段
    // console.log(main) //主辦
    if (section == undefined) {
      section = "";
    }
    var corporate;
    var main;
    var assis;
    if (this.table_status == "修繕" && B_section == "設備修繕") {
      corporate = this.a1[0][0]["AD_assign_corporate"];
      main = this.a1[0][0]["AD_main"];
      assis = this.a1[0][0]["AD_assis"];
    }
    console.log(corporate);
    console.log(main);
    console.log(assis);
    const modal = this.modalCtrl.create(
      "AssignSettingPage",
      {
        B_section: B_section,
        section: section,
        AD_id: this.AD_id,
        client_name: this.client_name,
        case_name: this.case_name,
        serial_num: this.serial_num,
        case_type: this.case_type,
        type_status: this.table_status,
        corporate: corporate,
        assis: assis,
        main: main,
        client_id: this.client_id,
      },
      { cssClass: "test-modal3" }
    );
    modal.present();
  }
}
