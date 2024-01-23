import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ModalController,
  NavParams,
  Events,
  LoadingController,
  Item,
} from "ionic-angular";
import { PopoverController } from "ionic-angular/components/popover/popover-controller";
import { HostListener } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { NetworkProvider } from "../../providers/network/network";

/**
 * Generated class for the ProgressManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-progress-manage",
  templateUrl: "progress-manage.html",
})
export class ProgressManagePage {
  AD_id = "";
  client_name = "";
  case_name = "";
  serial_num = "";
  case_type = "";
  th_a = [
    "階段",
    "子階段",
    "預計開始",
    "預計完成",
    "主辦完成",
    "協辦完成",
    "實際完成",
    "部門",
    "主辦",
    "協辦",
    "實際作業",
    "訊息通知",
    "主辦接收",
    "協辦接收",
  ];
  th_aa = [
    "階段",
    "預計開始",
    "預計完成",
    "主辦完成",
    "協辦完成",
    "實際完成",
    "部門",
    "主辦",
    "協辦",
    "實際作業",
    "訊息通知",
    "主辦接收",
    "協辦接收",
  ];
  th_b = [
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
  tha = ["圖資索取", "意見回饋", "圖資確認"];
  thb = ["拍照記錄", "協調事項"];
  thc = ["設計作業", "用印申請", "設計檢核", "線上掛件", "圖紙輸出"];
  thd = [
    "紙本掛件",
    "承辦約件",
    "缺失修正",
    "圖說複審",
    "複審修正",
    "結案作業",
    "核准公文",
  ];
  the = ["現場勘查", "工程備料", "圖說調整", "協調進場"];
  thf = ["物料進場", "管線布設", "設備安裝", "自主查驗"];
  thg = ["計價作業", "請款作業"];
  thh = ["圖說核對", "自主測試", "改善確認"];
  thi = ["用印申請", "溝通掛件", "會勘掛件", "承辦約件", "業主回報"];
  thj = ["現場準備", "正式會勘", "會勘缺失", "缺失改善", "會勘複查"];
  thk = ["結案作業", "領合格文件"];
  thAA = [
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
  thBB = [
    "需求確認",
    "自動報價",
    "協調進場",
    "設備修繕",
    "計價作業",
    "請款作業",
  ];
  a = [];
  b = [];
  c = [];
  d = [];
  e = [];
  f = [];
  g = [];
  h = [];
  i = [];
  j = [];
  k = [];
  l = [];
  m = [];
  a1 = [];
  a2 = [];
  a3 = [];
  a4 = [];
  a5 = [];
  a6 = [];
  a7 = [];
  a8 = [];
  a9 = [];
  a10 = [];
  a11 = [];
  a12 = [];
  a13 = [];
  b1 = [];
  b2 = [];
  b3 = [];
  b4 = [];
  b5 = [];
  b6 = [];
  b7 = [];
  b8 = [];
  b9 = [];
  b10 = [];
  b11 = [];
  b12 = [];
  b13 = [];
  c1 = [];
  c2 = [];
  c3 = [];
  c4 = [];
  c5 = [];
  c6 = [];
  c7 = [];
  c8 = [];
  c9 = [];
  c10 = [];
  c11 = [];
  c12 = [];
  c13 = [];
  d1 = [];
  d2 = [];
  d3 = [];
  d4 = [];
  d5 = [];
  d6 = [];
  d7 = [];
  d8 = [];
  d9 = [];
  d10 = [];
  d11 = [];
  d12 = [];
  d13 = [];
  e1 = [];
  e2 = [];
  e3 = [];
  e4 = [];
  e5 = [];
  e6 = [];
  e7 = [];
  e8 = [];
  e9 = [];
  e10 = [];
  e11 = [];
  e12 = [];
  e13 = [];
  f1 = [];
  f2 = [];
  f3 = [];
  f4 = [];
  f5 = [];
  f6 = [];
  f7 = [];
  f8 = [];
  f9 = [];
  f10 = [];
  f11 = [];
  f12 = [];
  f13 = [];
  g1 = [];
  g2 = [];
  g3 = [];
  g4 = [];
  g5 = [];
  g6 = [];
  g7 = [];
  g8 = [];
  g9 = [];
  g10 = [];
  g11 = [];
  g12 = [];
  g13 = [];
  h1 = [];
  h2 = [];
  h3 = [];
  h4 = [];
  h5 = [];
  h6 = [];
  h7 = [];
  h8 = [];
  h9 = [];
  h10 = [];
  h11 = [];
  h12 = [];
  h13 = [];
  i1 = [];
  i2 = [];
  i3 = [];
  i4 = [];
  i5 = [];
  i6 = [];
  i7 = [];
  i8 = [];
  i9 = [];
  i10 = [];
  i11 = [];
  i12 = [];
  i13 = [];
  j1 = [];
  j2 = [];
  j3 = [];
  j4 = [];
  j5 = [];
  j6 = [];
  j7 = [];
  j8 = [];
  j9 = [];
  j10 = [];
  j11 = [];
  j12 = [];
  j13 = [];
  k1 = [];
  k2 = [];
  k3 = [];
  k4 = [];
  k5 = [];
  k6 = [];
  k7 = [];
  k8 = [];
  k9 = [];
  k10 = [];
  k11 = [];
  k12 = [];
  k13 = [];
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
    this.client_name = navParams.get("client_name");
    this.case_name = navParams.get("case_name");
    this.serial_num = navParams.get("serial_num");
    this.case_type = navParams.get("type");
    if (this.serial_num == undefined) {
      this.navCtrl.push("MainLeadPage");
    }
    if (this.case_type == "檢修案件") {
      this.table_status = "檢修";
    } else if (this.case_type == "修繕案件") {
      this.table_status = "修繕";
    } else {
      this.table_status = "其他";
    }
    // console.log(this.AD_id)
    // console.log(this.client_name)
    // console.log(this.case_name)
    // console.log(this.serial_num)
    // console.log(this.case_type)
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProgressManagePage");
    this.readProgressManage();
  }
  readProgressManage() {
    let data: Observable<any>;
    data = this.http.get(
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_progress_manage.php?serial_num=" +
        this.serial_num +
        "&client_name=" +
        this.client_name
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      // console.log(result)
      if (this.table_status == "其他") {
        result.forEach((element) => {
          this.a.push(element[0]["AD_assign_corporate"]);
          this.b.push(element[0]["AD_main"]);
          this.c.push(element[0]["AD_assis"]);
          this.d.push(element[0]["AD_create_update"]);
          this.e.push(element[0]["AD_mission_alert"]);
          this.f.push(element[0]["AD_actual_receive_main"]);
          this.g.push(element[0]["AD_actual_receive_assis"]);
          this.h.push(element[0]["AD_mission_start"]);
          this.i.push(element[0]["AD_mission_complete"]);
          this.j.push(element[0]["AD_finish_callback_main"]);
          this.k.push(element[0]["AD_finish_callback_assis"]);
          this.l.push(element[0]["AD_actual"]);
          this.m.push(element[0]["AD_finish_callback_actual"]);
        });
        for (let i = 0; i < 3; i++) {
          this.a1.push(this.a[i]);
          this.a2.push(this.b[i]);
          this.a3.push(this.c[i]);
          this.a4.push(this.d[i]);
          this.a5.push(this.e[i]);
          this.a6.push(this.f[i]);
          this.a7.push(this.g[i]);
          this.a8.push(this.h[i]);
          this.a9.push(this.i[i]);
          this.a10.push(this.j[i]);
          this.a11.push(this.k[i]);
          this.a12.push(this.l[i]);
          this.a13.push(this.m[i]);
        }
        for (let i = 3; i < 5; i++) {
          this.b1.push(this.a[i]);
          this.b2.push(this.b[i]);
          this.b3.push(this.c[i]);
          this.b4.push(this.d[i]);
          this.b5.push(this.e[i]);
          this.b6.push(this.f[i]);
          this.b7.push(this.g[i]);
          this.b8.push(this.h[i]);
          this.b9.push(this.i[i]);
          this.b10.push(this.j[i]);
          this.b11.push(this.k[i]);
          this.b12.push(this.l[i]);
          this.b13.push(this.m[i]);
        }
        for (let i = 5; i < 10; i++) {
          this.c1.push(this.a[i]);
          this.c2.push(this.b[i]);
          this.c3.push(this.c[i]);
          this.c4.push(this.d[i]);
          this.c5.push(this.e[i]);
          this.c6.push(this.f[i]);
          this.c7.push(this.g[i]);
          this.c8.push(this.h[i]);
          this.c9.push(this.i[i]);
          this.c10.push(this.j[i]);
          this.c11.push(this.k[i]);
          this.c12.push(this.l[i]);
          this.c13.push(this.m[i]);
        }
        for (let i = 10; i < 17; i++) {
          this.d1.push(this.a[i]);
          this.d2.push(this.b[i]);
          this.d3.push(this.c[i]);
          this.d4.push(this.d[i]);
          this.d5.push(this.e[i]);
          this.d6.push(this.f[i]);
          this.d7.push(this.g[i]);
          this.d8.push(this.h[i]);
          this.d9.push(this.i[i]);
          this.d10.push(this.j[i]);
          this.d11.push(this.k[i]);
          this.d12.push(this.l[i]);
          this.d13.push(this.m[i]);
        }
        for (let i = 17; i < 21; i++) {
          this.e1.push(this.a[i]);
          this.e2.push(this.b[i]);
          this.e3.push(this.c[i]);
          this.e4.push(this.d[i]);
          this.e5.push(this.e[i]);
          this.e6.push(this.f[i]);
          this.e7.push(this.g[i]);
          this.e8.push(this.h[i]);
          this.e9.push(this.i[i]);
          this.e10.push(this.j[i]);
          this.e11.push(this.k[i]);
          this.e12.push(this.l[i]);
          this.e13.push(this.m[i]);
        }
        for (let i = 21; i < 25; i++) {
          this.f1.push(this.a[i]);
          this.f2.push(this.b[i]);
          this.f3.push(this.c[i]);
          this.f4.push(this.d[i]);
          this.f5.push(this.e[i]);
          this.f6.push(this.f[i]);
          this.f7.push(this.g[i]);
          this.f8.push(this.h[i]);
          this.f9.push(this.i[i]);
          this.f10.push(this.j[i]);
          this.f11.push(this.k[i]);
          this.f12.push(this.l[i]);
          this.f13.push(this.m[i]);
        }
        for (let i = 25; i < 27; i++) {
          this.g1.push(this.a[i]);
          this.g2.push(this.b[i]);
          this.g3.push(this.c[i]);
          this.g4.push(this.d[i]);
          this.g5.push(this.e[i]);
          this.g6.push(this.f[i]);
          this.g7.push(this.g[i]);
          this.g8.push(this.h[i]);
          this.g9.push(this.i[i]);
          this.g10.push(this.j[i]);
          this.g11.push(this.k[i]);
          this.g12.push(this.l[i]);
          this.g13.push(this.m[i]);
        }
        for (let i = 27; i < 30; i++) {
          this.h1.push(this.a[i]);
          this.h2.push(this.b[i]);
          this.h3.push(this.c[i]);
          this.h4.push(this.d[i]);
          this.h5.push(this.e[i]);
          this.h6.push(this.f[i]);
          this.h7.push(this.g[i]);
          this.h8.push(this.h[i]);
          this.h9.push(this.i[i]);
          this.h10.push(this.j[i]);
          this.h11.push(this.k[i]);
          this.h12.push(this.l[i]);
          this.h13.push(this.m[i]);
        }
        for (let i = 30; i < 35; i++) {
          this.i1.push(this.a[i]);
          this.i2.push(this.b[i]);
          this.i3.push(this.c[i]);
          this.i4.push(this.d[i]);
          this.i5.push(this.e[i]);
          this.i6.push(this.f[i]);
          this.i7.push(this.g[i]);
          this.i8.push(this.h[i]);
          this.i9.push(this.i[i]);
          this.i10.push(this.j[i]);
          this.i11.push(this.k[i]);
          this.i12.push(this.l[i]);
          this.i13.push(this.m[i]);
        }
        for (let i = 35; i < 40; i++) {
          this.j1.push(this.a[i]);
          this.j2.push(this.b[i]);
          this.j3.push(this.c[i]);
          this.j4.push(this.d[i]);
          this.j5.push(this.e[i]);
          this.j6.push(this.f[i]);
          this.j7.push(this.g[i]);
          this.j8.push(this.h[i]);
          this.j9.push(this.i[i]);
          this.j10.push(this.j[i]);
          this.j11.push(this.k[i]);
          this.j12.push(this.l[i]);
          this.j13.push(this.m[i]);
        }
        for (let i = 40; i < 42; i++) {
          this.k1.push(this.a[i]);
          this.k2.push(this.b[i]);
          this.k3.push(this.c[i]);
          this.k4.push(this.d[i]);
          this.k5.push(this.e[i]);
          this.k6.push(this.f[i]);
          this.k7.push(this.g[i]);
          this.k8.push(this.h[i]);
          this.k9.push(this.i[i]);
          this.k10.push(this.j[i]);
          this.k11.push(this.k[i]);
          this.k12.push(this.l[i]);
          this.k13.push(this.m[i]);
        }
      } else if (this.table_status == "檢修" || this.table_status == "修繕") {
        result.forEach((e) => {
          this.a.push(e[0]["AD_assign_corporate"]);
          this.b.push(e[0]["AD_main"]);
          this.c.push(e[0]["AD_assis"]);
          this.d.push(e[0]["AD_create_update"]);
          this.e.push(e[0]["AD_mission_alert"]);
          this.f.push(e[0]["AD_actual_receive_main"]);
          this.g.push(e[0]["AD_actual_receive_assis"]);
          this.h.push(e[0]["AD_mission_start"]);
          this.i.push(e[0]["AD_mission_complete"]);
          this.j.push(e[0]["AD_finish_callback_main"]);
          this.k.push(e[0]["AD_finish_callback_assis"]);
          this.l.push(e[0]["AD_actual"]);
          this.m.push(e[0]["AD_finish_callback_actual"]);
        });
      }
    });
  }
}
