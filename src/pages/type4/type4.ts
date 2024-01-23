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

/**
 * Generated class for the Type4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-type4",
  templateUrl: "type4.html",
})
export class Type4Page {
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
  ch_color_2 = ["rgb(68,84,106)", "rgb(205,207,211)"];
  color_2 = ["rgb(255,255,255)", "rgb(0,0,0)"];

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
  public isSearchBarOpened = false;

  //欄位表頭
  a = ["場所地址", "收款對象"];
  bar_1 = ["圖資索取", "意見回饋", "圖資確認"];
  bar_1_a = [
    "人員",
    "實際完成",
    "預計完成",
    "作業",
    "人員",
    "實際完成",
    "預計完成",
    "作業",
    "人員",
    "實際完成",
    "預計完成",
    "作業",
  ];
  bar_1_1_a = [
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
  ];

  bar_1_1 = ["拍照記錄", "協調事項"];
  bar_d = [
    "人員",
    "實際完成",
    "預計完成",
    "作業",
    "人員",
    "實際完成",
    "預計完成",
    "作業",
  ];
  bar_1_1_b = ["負責人員", "完成狀態", "負責人員", "完成狀態"];

  bar_2 = ["設計作業", "用印申請", "設計檢核", "線上掛件", "圖紙輸出"];
  bar_e = [
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "作業",
    "人員",
    "實際完成",
    "預計完成",
    "作業",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
  ];
  bar_1_1_c = [
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
  ];

  bar_3 = [
    "紙本掛件",
    "承辦約件",
    "缺失修正",
    "圖說複審",
    "複審修正",
    "結案作業",
    "核准公文",
  ];
  bar_c = [
    "人員",
    "實際完成",
    "預計完成",
    "掛件日期",
    "人員",
    "實際完成",
    "預計完成",
    "承辦日期",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "承辦日期",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "作業",
    "人員",
    "實際完成",
    "預計完成",
    "發文日期",
  ];
  bar_1_1_d = [
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
  ];

  bar_4 = ["工程備料", "圖說調整", "協調進場"];
  bar_1_aa = [
    "人員",
    "實際完成",
    "預計完成",
    "作業",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "回報日期",
  ];
  bar_1_1_f = [
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
  ];

  bar_5 = ["物料進場", "管線布設", "設備安裝", "自主查驗"];
  bar_a = [
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
  ];
  bar_1_1_g = [
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
  ];

  bar_6 = ["計價作業", "請款作業"];
  bar_1_1_h = ["負責人員", "完成狀態", "負責人員", "完成狀態"];

  bar_7 = ["圖說核對", "自主測試", "改善確認"];
  bar_ee = [
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
  ];
  bar_1_1_i = [
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
  ];

  bar_8 = ["用印申請", "溝通掛件", "會勘掛件", "承辦約件", "業主回報"];
  bar_eee = [
    "人員",
    "實際完成",
    "預計完成",
    "作業",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "承辦日期",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
  ];
  bar_1_1_j = [
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
  ];

  bar_9 = ["現場準備", "正式會勘", "會勘缺失", "缺失改善", "會勘複查"];
  bar_eee1 = [
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "作業",
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "作業",
  ];
  bar_1_1_k = [
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
    "負責人員",
    "完成狀態",
  ];

  bar_10 = ["結案作業", "領合格文件"];
  bar_d1 = [
    "人員",
    "實際完成",
    "預計完成",
    "進度",
    "人員",
    "實際完成",
    "預計完成",
    "文件日期",
  ];
  bar_1_1_l = ["負責人員", "完成狀態", "負責人員", "完成狀態"];

  // 篩選
  allInput0 = "";
  allInput1 = "";
  allInput2 = "";
  allInput3 = "";
  allInput4 = "";
  allInput5 = "";
  allInput6 = "";
  allInput7 = "";
  chv1Input0 = "";
  chv1Input1 = "";
  chv1Input2 = "";
  chv1Input3 = "";
  chv1Input4 = "";
  chv1Input5 = "";
  chv1Input6 = "";
  chv1Input7 = "";
  cs_contact0 = "";
  cs_contact1 = "";

  // 資料 Loading
  chv4 = [];
  chv4_tmp = []; // All

  url_list = [];
  // 備註表格
  right = "-100em";
  transTime = "0.55s";
  show_note = [];

  alert_status = false;

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
