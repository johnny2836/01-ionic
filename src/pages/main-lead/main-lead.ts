import { Component, ElementRef } from "@angular/core";
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
import { HaveFilterComponent } from "../../components/have-filter/have-filter";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { elementAt } from "rxjs/operator/elementAt";
import * as moment from "moment";
import { ViewChild } from "@angular/core";
import { Content } from "ionic-angular";
import { PopoverComponent } from "../../components/popover/popover";

@IonicPage()
@Component({
  selector: "page-main-lead",
  templateUrl: "main-lead.html",
  animations: [
    trigger("menu", [
      state("close", style({ display: "none", left: "-100%" })),
      state("open", style({ display: "normal", left: "0" })),
      // keyframes多階段動畫(任何狀態切換的時候都使用該動畫)
      transition("close => open", animate("600ms ease-in")),
      transition("open => close", animate("600ms ease-in")),
    ]),
    trigger("menu-back", [
      state("close", style({ display: "none" })),
      state("open", style({ display: "normal" })),
      // keyframes多階段動畫(任何狀態切換的時候都使用該動畫)
      transition("close => open", animate("6000ms ease-in")),
      transition("open => close", animate("100ms ease-in")),
    ]),
    trigger("toggle", [
      state("close", style({ display: "normal" })),
      state("open", style({ display: "none" })),
      // keyframes多階段動畫(任何狀態切換的時候都使用該動畫)
      transition("close => open", animate("500ms ease-in")),
      transition("open => close", animate("100ms ease-in")),
    ]),
  ],
})
export class MainLeadPage {
  @ViewChild(Content) content: Content;
  first_button = 0;
  a = ["收款對象"];
  num = "";
  state = "close";
  spin = 0;
  chv: any;
  chvv: any;
  chvvv: any;
  edit = [0, 0, 0, 0];
  scrHeight: any;
  scrWidth: any;
  yscroll: any;
  current_month = "";
  current_year = "";
  date_s_9 = [];

  all_data = [];
  all_data2 = [];
  all_data_tmp = [];

  progress_array = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  fun = "0";
  user = "";
  character = "";
  depart = "";
  checkbox_arr = [];

  work_auth = [];
  web_auth = [0, 0, 0];
  all_progress = {};
  all_progress_tmp = [];
  pre_schedule = [];
  pre_schedule_tmp = [];
  total_num: any;
  search = false;

  chart = 0;
  chart_num = 0;
  all_data_1 = [];
  all_data2_1 = [];
  all_data_1A = [];
  contact = [];
  contact_all = [];
  client_contact = [];
  chart_filer_arr = [false, false];
  chart_search_val = "";

  height = "120px";
  display = "visible";

  alert_status = false;

  right = "-100em";

  distribution_case: any = [
    ["配電案件1", 1],
    ["配電案件2", 2],
    ["配電案件3", 3],
  ];

  // 這是分隔線---------------------------------------------------
  case_name = "";
  init_num: number = 0;
  init_type: string = "";

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
    this.yscroll = window.pageYOffset;

    this.current_month = new Date().getMonth() + 1 + "";
    this.current_year = new Date().getFullYear() + "";

    this.user = window.localStorage.getItem("name");
    this.character = window.localStorage.getItem("character");
    this.depart = window.localStorage.getItem("depart");
    this.init_num = this.navParams.get("num") ? this.navParams.get("num") : 0;
    this.init_type = this.navParams.get("type");
    console.log(this.init_num);
    this.chType(this.init_num, "");
  }
  ngOninit() {}
  @HostListener("window:resize", ["$event"])

  //- table resize coloums -//
  resizeColoums() {
    var createResizableTable = document.getElementById("table"); // 找ID是resizeMe
    const cols = Array.from(createResizableTable.querySelectorAll("th")); // 取resizeMe全部的th
    cols.forEach((col) => {
      //新增一個div
      const resizer = document.createElement("div");
      //賦予div resizer的class => css
      resizer.classList.add("resizer");
      //讓他跟表格依樣高
      resizer.style.height = `${createResizableTable.offsetHeight}px`;
      //將div加入th中
      col.appendChild(resizer);

      let x = 0;
      let w = 0;
      function mouseDownHandler(e) {
        //獲取點擊X軸位置
        x = e.clientX;

        //獲取欄位寬度
        const styles = window.getComputedStyle(col); // getComputedStyle 取指定元素(col)的CSS樣式
        w = parseInt(styles.width, 10); // 10進位

        //賦予div resizing的class(冒藍光) => css
        resizer.classList.add("resizing");

        //建立監聽
        document.addEventListener("mousemove", mouseMoveHandler); //當滑鼠移動=>mouseMoveHandler
        document.addEventListener("mouseup", mouseUpHandler); //當滑鼠放開=>mouseUpHandler
      }
      function mouseMoveHandler(e) {
        //當下位置減掉初始位置(X軸位移量)
        const dx = e.clientX - x;
        //新的寬度 = 原始寬度+位移量
        col.style.width = `${w + dx}px`; // ${var}變量
      }

      function mouseUpHandler() {
        //取消藍光
        resizer.classList.remove("resizing");
        //關閉監聽
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      }
      //監聽是否有點擊
      resizer.addEventListener("mousedown", mouseDownHandler);
    });
    // console.log(cols)
  }
  viewNoteTable(allnote) {
    console.log(allnote);
    this.right = "17em";
  }
  noNoteTable() {
    this.right = "-100em";
  }
  ionViewDidLoad() {
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

    this.loadAllData();
    this.progressListen();
    this.mainListen();
    this.progressChart();
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

  mainListen() {
    this.event.subscribe("main_listen", (data) => {
      console.log("success");
      this.loadAllData();
      this.progressChart();
    });
  }
  //menu
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

  // 案件類型 buttons
  chType(num, type) {
    window.sessionStorage.setItem("type", type);
    this.first_button = num;
    if (num === 0) {
      this.loadAllData();
      this.progressChart();
    }
  }

  chType0(num, case_name, case_id) {
    window.sessionStorage.setItem("case_id", case_id);
    window.sessionStorage.setItem("case_name", case_name);
    switch (num) {
      case 0:
        window.sessionStorage.setItem("stage", "開案階段");
        this.navCtrl.push("Type1Page");
        break;
      case 1:
        window.sessionStorage.setItem("stage", "開發許可階段");
        this.navCtrl.push("Type2Page");
        break;
      case 2:
        window.sessionStorage.setItem("stage", "規劃設計階段");
        this.navCtrl.push("Type3Page");
        break;
      case 3:
        window.sessionStorage.setItem("stage", "施工階段");
        this.navCtrl.push("Type4Page");
        break;
      case 4:
        window.sessionStorage.setItem("stage", "驗證上線階段");
        this.navCtrl.push("Type5Page");
        break;
      default:
        console.log("錯誤");
    }
  }

  logout() {
    this.app.getRootNav().setRoot("LoginPage");
  }

  // 案件總攬table
  loadAllData() {
    this.all_data = [];
    this.all_data_tmp = [];
    this.all_data_1 = [];
    this.all_data2 = [];
    this.all_data2_1 = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_all_data.php?user=" +
        this.user
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result["all_data"] == null || result["all_data"] == undefined) {
        result["all_data"] = [];
      }
      if (result["all_data_1"] == null || result["all_data_1"] == undefined) {
        result["all_data_1"] = [];
      }
      console.log(result);
      result["all_data"].forEach((e) => {
        if (e["AD_auth_design"] == 1) {
          e["AD_auth_design"] = true;
        } else {
          e["AD_auth_design"] = false;
        }
        if (e["AD_auth_worker"] == 1) {
          e["AD_auth_worker"] = true;
        } else {
          e["AD_auth_worker"] = false;
        }
        if (
          this.character == "經理" ||
          this.user == "李惠閔" ||
          this.user == "洪舒寧"
        ) {
          e["show"] = true;
        } else if (this.character == "工務部主任") {
          if (e["AD_auth_worker"] == true) {
            e["show"] = true;
          } else {
            e["show"] = false;
          }
        } else if (this.character == "設計部主任") {
          if (e["AD_auth_design"] == true) {
            e["show"] = true;
          } else {
            e["show"] = false;
          }
        } else {
          e["show"] = false;
        }
        if (e["AD_actual_use"] == undefined) {
          e["AD_actual_use"] = "";
        }
        if (e["AD_group"] == undefined) {
          e["AD_group"] = "";
        }
        this.all_data.push(e);
        this.all_data_tmp.push(e);
      });
      this.all_data_1A = result["all_data_1"];
      for (let i = 0; i < this.all_data_1A.length && i < 40; i++) {
        this.all_data_1.push(this.all_data_1A[i]);
      }
      console.log(this.all_data_1);

      this.all_data.forEach((e, i) => {
        e["pic_show"] = false;
        this.all_data_tmp[i]["pic_show"] = false;
        this.all_data_1A.forEach((e1) => {
          if (e["AD_serial_number"] == e1["AD_serial_number"]) {
            if (e1["AD_worker_T4_status"] != "") {
              e["pic_show"] = true;
              this.all_data_tmp[i]["pic_show"] = true;
            }
          }
        });
      });
      console.log(this.all_data);
    });
  }
  // 檢修申報提醒 介面

  // 進度狀態 chart
  progressChart() {
    this.chart_filer_arr = [false, false];
    this.all_progress = [];
    this.all_progress_tmp = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_progress_chart.php?chart_num=" +
        this.chart_num
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result["all"] == null || result["all"] == undefined) {
        result["all"] = [];
      }
      if (result["color"] == null || result["color"] == undefined) {
        result["color"] = [];
      }
      console.log(result);
      this.all_progress_tmp["all"] = result["all"];
      this.all_progress_tmp["color"] = result["color"];
      this.all_progress["all"] = result["all"];
      this.all_progress["color"] = result["color"];
    });
  }

  // infinite-scroll
  doInfiniteAll(infiniteScroll) {
    var limit = 20;
    var num = 0;
    if (this.chv == "-1" && this.chvv == "2") {
      if (this.pre_schedule.length != this.pre_schedule_tmp.length) {
        console.log("Begin async operation");
        setTimeout(() => {
          var len = this.pre_schedule.length;
          for (
            let i = len;
            i < this.pre_schedule_tmp.length && num < limit;
            i++
          ) {
            this.pre_schedule.push(this.pre_schedule_tmp[i]);
            num++;
          }
          infiniteScroll.complete();
        }, 500);
      } else {
        this.spin = 1;
      }
    }
    if (this.chv == "-1" && this.chvv == "1") {
      if (this.all_data_1.length != this.all_data_1A.length) {
        console.log("Begin async operation");
        console.log(this.all_data_1);
        setTimeout(() => {
          var len = this.all_data_1.length;
          for (let i = len; i < this.all_data_1A.length && num < limit; i++) {
            this.all_data_1.push(this.all_data_1A[i]);
          }
          console.log(this.all_data_1);
          infiniteScroll.complete();
        }, 500);
      } else {
        this.spin = 1;
      }
    }
    if (
      (this.chv == "-1" && this.chvv == "0") ||
      (this.chv == "-1" && this.chvv == "3") ||
      (this.chv == "-1" && this.chvv == "4")
    ) {
      if (this.all_data.length != this.all_data_tmp.length) {
        console.log("Begin async operation");
        setTimeout(() => {
          var len = this.all_data.length;
          for (let i = 0; i < this.all_data_tmp.length && num < limit; i++) {
            this.all_data.push(this.all_data_tmp[i]);
          }
          infiniteScroll.complete();
        }, 500);
      } else {
        this.spin = 1;
      }
    }
  }

  // 表頭篩選
  progressListen() {
    this.event.subscribe("progress_listen", (data) => {
      if (data.part != "") {
        if (data.part == "內部") {
          var search = [];
          var check = false;
          data.depart.forEach((e) => {
            if (e["check"] == true) {
              search.push(e["depart"]);
              check = true;
            }
          });
          var result_data = [];
          this.contact = [];
          if (check) {
            for (let i = 0; i < search.length; i++) {
              this.contact_all.filter((item) => {
                if (item["AD_depart"] == search[i]) {
                  result_data.push(item);
                }
              });
            }
            this.contact = result_data;
          } else {
            this.contact = [];
            for (let i = 0; i < this.contact_all.length; i++) {
              this.contact.push(this.contact_all[i]);
            }
          }
        } else if (data.part == "進度總表-類型") {
          var search = [];
          var check = false;
          data.depart.forEach((e) => {
            if (e["check"] == true) {
              search.push(e["depart"]);
              check = true;
            }
          });
          var result_data = [];
          this.all_data_1 = [];
          if (check) {
            for (let i = 0; i < search.length; i++) {
              this.all_data_1A.filter((item) => {
                if (item["AD_type"] == search[i]) {
                  result_data.push(item);
                }
              });
            }
            this.all_data_1 = result_data;
          } else {
            this.all_data_1 = [];
            for (let i = 0; i < this.all_data_1A.length; i++) {
              this.all_data_1.push(this.all_data_1A[i]);
            }
          }
        } else if (data.part == "進度總表-圖表") {
          var search = [];
          var check = false;
          data.depart.forEach((e) => {
            if (e["check"] == true) {
              search.push(e["depart"]);
              check = true;
            }
          });
          var result_data1 = [];
          var result_data2 = [];
          this.all_progress["all"] = [];
          this.all_progress["color"] = [];
          if (check) {
            for (let i = 0; i < search.length; i++) {
              this.all_progress_tmp["all"].filter((item, i2) => {
                if (item["AD_type"] == search[i]) {
                  result_data1.push(item);
                  result_data2.push(this.all_progress_tmp["color"][i2]);
                }
              });
            }
            this.all_progress["all"] = result_data1;
            this.all_progress["color"] = result_data2;
          } else {
            this.all_progress["all"] = [];
            this.all_progress["color"] = [];
            for (let i = 0; i < this.all_progress_tmp.length; i++) {
              this.all_progress["all"].push(this.all_progress_tmp["all"][i]);
              this.all_progress["color"].push(
                this.all_progress_tmp["color"][i]
              );
            }
          }
        }
      } else {
        this.progress_array[data.array_number] = parseInt(data.number);
        console.log(this.progress_array);
      }
    });
    this.event.subscribe("have_filter_listen_main", (data) => {
      this.progress_array[data["array_number"]] = data["number"];
      console.log(data);
      if (this.chv == "-1" && this.chvv == "2") {
        let aaa = [
          "預計開始",
          "預計完成",
          "主辦",
          "協辦",
          "主辦完成",
          "協辦完成",
          "客戶",
          "場所",
          "類型",
          "主階段",
          "子階段",
        ];
        let bbb = [
          "AD_mission_start",
          "AD_mission_complete",
          "AD_main",
          "AD_assis",
          "AD_finish_callback_main",
          "AD_finish_callback_assis",
          "AD_client_name",
          "AD_case_name",
          "AD_type",
          "AD_main_section",
          "AD_sec_section",
        ];
        this.pre_schedule.sort((left, right): any => {
          for (let i = 0; i < this.progress_array.length; i++) {
            if (this.progress_array[i] == 1) {
              if (
                left[bbb[aaa.indexOf(data["part"])]] <
                right[bbb[aaa.indexOf(data["part"])]]
              )
                return -1;
              if (
                left[bbb[aaa.indexOf(data["part"])]] >
                right[bbb[aaa.indexOf(data["part"])]]
              )
                return 1;
            }
            if (this.progress_array[i] == 2) {
              if (
                left[bbb[aaa.indexOf(data["part"])]] <
                right[bbb[aaa.indexOf(data["part"])]]
              )
                return 1;
              if (
                left[bbb[aaa.indexOf(data["part"])]] >
                right[bbb[aaa.indexOf(data["part"])]]
              )
                return -1;
            }
          }
          return 0;
        });
        console.log(this.pre_schedule);
      }
      if (
        (this.chv == "-1" && this.chvv == "0") ||
        (this.chv == "-1" && this.chvv == "3") ||
        (this.chv == "-1" && this.chvv == "4")
      ) {
        let aaa = [
          "客戶",
          "場所",
          "場所地址",
          "類型",
          "類組",
          "實際用途",
          "狀態",
        ];
        let bbb = [
          "AD_client_name",
          "AD_case_name",
          "AD_case_address",
          "AD_type",
          "AD_group",
          "AD_actual_use",
          "AD_closed_status",
        ];
        this.all_data.sort((left, right): any => {
          for (let i = 0; i < this.progress_array.length; i++) {
            if (this.progress_array[i] == 1) {
              if (
                left[bbb[aaa.indexOf(data["part"])]] <
                right[bbb[aaa.indexOf(data["part"])]]
              )
                return -1;
              if (
                left[bbb[aaa.indexOf(data["part"])]] >
                right[bbb[aaa.indexOf(data["part"])]]
              )
                return 1;
            }
            if (this.progress_array[i] == 2) {
              if (
                left[bbb[aaa.indexOf(data["part"])]] <
                right[bbb[aaa.indexOf(data["part"])]]
              )
                return 1;
              if (
                left[bbb[aaa.indexOf(data["part"])]] >
                right[bbb[aaa.indexOf(data["part"])]]
              )
                return -1;
            }
          }
          return 0;
        });
        console.log(this.all_data);
      }
      if (this.chv == "通訊錄" && this.chvv == 1) {
        let aaa = ["客戶編號", "客戶名稱"];
        let bbb = ["AD_client_num", "AD_client_name"];
        this.client_contact.sort((left, right): any => {
          for (let i = 0; i < this.progress_array.length; i++) {
            if (this.progress_array[i] == 1) {
              if (
                left[bbb[aaa.indexOf(data["part"])]] <
                right[bbb[aaa.indexOf(data["part"])]]
              )
                return -1;
              if (
                left[bbb[aaa.indexOf(data["part"])]] >
                right[bbb[aaa.indexOf(data["part"])]]
              )
                return 1;
            }
            if (this.progress_array[i] == 2) {
              if (
                left[bbb[aaa.indexOf(data["part"])]] <
                right[bbb[aaa.indexOf(data["part"])]]
              )
                return 1;
              if (
                left[bbb[aaa.indexOf(data["part"])]] >
                right[bbb[aaa.indexOf(data["part"])]]
              )
                return -1;
            }
          }
          return 0;
        });
        console.log(this.client_contact);
      }
    });
  }

  FilterPopOver(Event, number, part) {
    var db: any;
    var show: any;
    if (part == "內部") {
      db = this.contact_all;
      show = this.contact;
    } else if (part == "進度總表" || part == "進度總表-類型") {
      db = this.all_data_1A;
      show = this.all_data_1;
    } else if (part == "進度總表-圖表") {
      db = this.all_progress_tmp["all"];
      show = this.all_progress["all"];
    }
    let popover = this.popcontroller.create(FilterComponent, {
      number: number,
      part: part,
      db: db,
      show: show,
    });
    popover.present({
      ev: Event,
    });
  }
  chartSearch(event) {
    var pattern = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/; // 注音符號
    var pattern1 = /[\u02CA]/; // 二聲
    var pattern2 = /[\u02C7]/; // 三聲
    var pattern3 = /[\u02CB]/; // 四聲
    var pattern4 = /[\u02D9]/; // 輕聲
    console.log(pattern.test(this.chart_search_val)); // true
    var show = [];
    if (this.chart_search_val != "" && !pattern.test(this.chart_search_val)) {
      var filter = [];
      // 類型已篩選
      if (this.all_data_1A.length != this.all_data_1.length) {
        filter = this.all_data_1;
      } else {
        filter = this.all_data_1A;
      }
      filter.forEach((e) => {
        var check = false;
        if (e["AD_type"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_client_name"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_case_name"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_main_section"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_sec_section"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_main"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_assis"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_create_time"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_mission_alert"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_mission_line"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_actual_receive_main"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_actual_receive_assis"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_mission_start"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_mission_complete"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_finish_callback_main"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (e["AD_finish_callback_assis"].indexOf(this.chart_search_val) > -1) {
          check = true;
        }
        if (check) {
          show.push(e);
        }
      });
      this.all_data_1 = [];
      this.all_data_1 = show;
      console.log(show);
      console.log(this.all_data_1);
    } else {
      this.all_data_1 = [];
      for (let i = 0; i < this.all_data_1A.length; i++) {
        this.all_data_1.push(this.all_data_1A[i]);
      }
    }
    console.log(this.chart_search_val);
  }
  searchShow() {
    if (!this.search) {
      this.search = true;
    } else if (this.search) {
      this.search = false;
      this.chart_search_val = "";
      this.chartSearch(event);
    }
  }
}
