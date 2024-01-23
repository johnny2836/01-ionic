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
import { elementAt } from "rxjs/operators";

/**
 * Generated class for the AssignSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-assign-setting",
  templateUrl: "assign-setting.html",
})
export class AssignSettingPage {
  AD_id = "";
  client_id = "";
  client_name = "";
  case_name = "";
  serial_num = "";
  case_type = "";
  corporate = "";
  B_section = "";
  section = "";
  pre_main = "";
  bar = [
    "類組",
    "實際用途",
    "統一編號",
    "地址",
    "現場聯絡人",
    "現場聯絡人手機",
    "公司聯絡人",
    "公司電話",
  ];
  bar_1 = ["主辦", "協辦", "任務通知", "任務開始", "任務完成"];
  bar_2 = ["索取文件", "索取圖說"];
  bar_2A = ["攜帶圖說", "攜帶工具"];
  bar_3A = ["拍照記錄", "協調事項"];
  case_data = [];
  list = [];
  file = ["使用執照"];
  pic = ["平面", "面積計算", "位置", "門窗", "立剖面", "結構", "消防竣工"];
  tool = ["測距尺", "捲尺", "電壓錶"];
  camera = ["既設設備", "移設位置", "新設位置", "建築外觀"];
  consort = ["物料進場", "工班進場", "施工時段"];
  tool_a = [
    "火警探測器",
    "緊急照明燈",
    "避難方向指示燈",
    "緊急廣播揚聲器",
    "出口標示燈",
    "線材",
    "閥類",
    "受信總機",
    "廣播主機",
  ];
  tool_a1 = ["滅火器", "放置盒", "掛勾", "標示牌"];
  tool_a2 = [
    "發信器",
    "警鈴",
    "標示燈",
    "泵浦燈",
    "水帶",
    "太平龍頭",
    "瞄子",
    "泵浦",
  ];
  tool_a3 = ["發信器", "警鈴", "標示燈"];
  tool_a4 = ["偵煙式", "定溫式"];
  tool_a5 = ["固定架", "緩降機本體"];
  tool_a6 = ["火警探測器", "受信總機", "廣播主機", "緊急廣播揚聲器"];
  tool_a7 = ["緊急照明燈", "避難方向指示燈", "出口標示燈"];
  tool_a8 = ["線材", "閥類", "發電機"];
  tool_b = ["偵煙探測棒", "風速計", "扭力板手", "水帶", "比托計"];
  tool_b1 = ["滅火器", "室內消防栓", "泵浦"];
  tool_b2 = [
    "火警探測器",
    "受信總機",
    "廣播主機",
    "緊急廣播揚聲器",
    "住警器",
    "綜合盤",
  ];
  tool_b3 = ["緊急照明燈", "避難方向指示燈", "出口標示燈", "緩降機"];
  tool_b4 = ["發電機"];
  edit = 0;
  main = "";
  assis = "";
  alert_date = "";
  start_date = "";
  finish_date = "";
  note = "";

  design_T1 = []; // 設計部 索取文件
  design_T2 = []; // 設計部 索取圖說
  d_t1 = [];
  d_t2 = [];
  dd_t1 = "";
  dd_t2 = "";

  work_T1_1 = []; //  現場施工- 設備安裝- 確認設備 (一般)
  work_T1_2 = []; //  現場施工- 設備安裝- 確認設備 (滅火器)
  work_T1_3 = []; //  現場施工- 設備安裝- 確認設備 (綜合消防栓箱)
  work_T1_4 = []; //  現場施工- 設備安裝- 確認設備 (綜合盤)
  work_T1_5 = []; //  現場施工- 設備安裝- 確認設備 (住警器)
  work_T1_6 = []; //  現場施工- 設備安裝- 確認設備 (緩降機)
  w1_t1 = [];
  w1_t2 = [];
  w1_t3 = [];
  w1_t4 = [];
  w1_t5 = [];
  w1_t6 = [];
  ww1_t1 = "";
  ww1_t2 = "";
  ww1_t3 = "";
  ww1_t4 = "";
  ww1_t5 = "";
  ww1_t6 = "";

  work_T1 = []; // 現場勘查- 拍照記錄 協調事項- 攜帶文件
  work_T2 = []; // 現場勘查- 拍照記錄 協調事項- 攜帶圖說
  work_T3 = []; // 現場勘查- 拍照記錄 協調事項- 攜帶工具
  work_T4 = []; // 現場勘查- 拍照記錄- 拍照記錄
  work_T5 = []; // 現場勘查- 協調事項- 協調事項
  w_t1 = [];
  w_t2 = [];
  w_t3 = [];
  w_t4 = [];
  w_t5 = [];
  ww_t1 = "";
  ww_t2 = "";
  ww_t3 = "";
  ww_t4 = "";
  ww_t5 = "";

  work_T2_1 = []; // 現場會勘- 現場準備- 攜帶工具
  w2_t1 = [];
  ww2_t1 = "";

  A1 = [];
  A2 = [];
  A3 = [];
  A4 = [];
  coor = "";
  coor_list = ["", "管理", "工務", "設計", "行政", "業務"];
  aa = ["圖資索取"]; //設計部
  bb = ["拍照記錄", "協調事項"]; //工務部
  cc = ["計價作業", "請款作業"]; //管理部
  dd = ["索取資料"]; //行政部
  type_status: any;
  vis_tool = [
    {
      滅火器: [],
      室內消防栓: [],
      警報設備: [],
      住警器: [],
      綜合盤: [],
      避難逃生設備: [],
      緩降機: [],
      其他: [],
    },
  ];
  vis_tool_b = [{ 滅火設備: [], 警報設備: [], 避難逃生設備: [], 其他: [] }];
  vis = [0, 0, 0, 0, 0];
  self_add_arr = [];
  add_status = false;
  self_add_check = [];
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
    this.client_name = this.navParams.get("client_name");
    this.case_name = this.navParams.get("case_name");
    this.serial_num = this.navParams.get("serial_num");
    this.case_type = this.navParams.get("case_type");

    this.B_section = this.navParams.get("B_section");
    if (
      this.navParams.get("section") == undefined ||
      this.navParams.get("section") == null
    ) {
      this.section = "";
    } else {
      this.section = this.navParams.get("section");
    }
    this.type_status = this.navParams.get("type_status");

    if (
      (this.B_section == "現場施工" && this.section == "物料進場") ||
      (this.B_section == "現場施工" && this.section == "管線布設") ||
      (this.B_section == "現場施工" && this.section == "設備安裝")
    ) {
      this.coor = "設備安裝";
      this.work_T1 = [
        [false, false, false, false, false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false],
        [false, false],
        [false, false],
        [false, false, false],
        [false, false, false],
      ];
    }
    if (this.B_section == "現場施工" && this.section == "自主查驗") {
      this.coor = "自主查驗";
      this.work_T1 = [
        [false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false],
        [false],
      ];
    }
    if (this.B_section == "現場會勘" && this.section == "現場準備") {
      this.coor = "現場準備";
    }
    this.aa.forEach((element) => {
      if (this.section == element) {
        this.coor = "設計部";
      }
    });
    if (this.B_section == "現場勘查") {
      if (this.section == "拍照記錄") {
        this.coor = "工務部_1";
      } else if (this.section == "協調事項") {
        this.coor = "工務部_2";
      }
    }
    this.cc.forEach((element) => {
      if (this.section == element) {
        this.coor = "管理部";
      }
    });
    this.dd.forEach((element) => {
      if (this.section == element) {
        this.coor = "行政部";
      }
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AssignSettingPage");
    this.readAllData();
    this.loadCaseData();
  }
  loadMainList() {
    this.list = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_AD_contact.php?corporate=" +
        this.corporate
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.list = result;
    });
  }
  readAllData() {
    this.main = "";
    this.assis = "";
    this.alert_date = "";
    this.start_date = "";
    this.finish_date = "";
    this.note = "";
    this.dd_t1 = "";
    this.dd_t2 = "";
    this.ww_t1 = "";
    this.ww_t2 = "";
    this.ww_t3 = "";
    this.ww_t4 = "";
    this.ww_t5 = "";
    this.corporate = "";
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_assign_case_setting_tabel.php?serial_num=" +
        this.serial_num +
        "&B_section=" +
        this.B_section +
        "&section=" +
        this.section
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      if (this.type_status == "修繕" && this.B_section == "設備修繕") {
        if (
          (result["AD_assign_corporate"] == "" &&
            result["AD_main"] == "" &&
            result["AD_assis"] == "") ||
          result.length == 0
        ) {
          this.corporate = this.navParams.get("corporate");
          this.main = this.navParams.get("main");
          this.assis = this.navParams.get("assis");
        } else {
          this.corporate = result[0]["AD_assign_corporate"];
          this.main = result[0]["AD_main"];
          this.assis = result[0]["AD_assis"];
        }
      } else if (result.length > 0) {
        this.corporate = result[0]["AD_assign_corporate"];
        this.main = result[0]["AD_main"];
        this.assis = result[0]["AD_assis"];
      }
      if (result.length > 0) {
        this.alert_date = result[0]["AD_mission_alert"];
        this.start_date = result[0]["AD_mission_start"];
        this.finish_date = result[0]["AD_mission_complete"];
        this.note = result[0]["AD_note"];

        this.dd_t1 = result[0]["AD_design_T1"];
        this.dd_t2 = result[0]["AD_design_T2"];
        this.ww_t1 = result[0]["AD_worker_T1"];
        this.ww_t2 = result[0]["AD_worker_T2"];
        this.ww_t3 = result[0]["AD_worker_T3"];
        this.ww_t4 = result[0]["AD_worker_T4"];
        this.ww_t5 = result[0]["AD_worker_T5"];
        this.readDefaultCheckbox();
        this.loadMainList();
      }
    });
  }
  readDefaultCheckbox() {
    if (this.coor == "設計部") {
      if (this.dd_t1.indexOf("使用執照") > -1) {
        this.design_T1[0] = true;
      }

      if (this.dd_t2.indexOf("平面") > -1) {
        this.design_T2[0] = true;
      }
      if (this.dd_t2.indexOf("面積計算") > -1) {
        this.design_T2[1] = true;
      }
      if (this.dd_t2.indexOf("位置") > -1) {
        this.design_T2[2] = true;
      }
      if (this.dd_t2.indexOf("門窗") > -1) {
        this.design_T2[3] = true;
      }
      if (this.dd_t2.indexOf("立剖面") > -1) {
        this.design_T2[4] = true;
      }
      if (this.dd_t2.indexOf("結構") > -1) {
        this.design_T2[5] = true;
      }
      if (this.dd_t2.indexOf("消防竣工") > -1) {
        this.design_T2[6] = true;
      }
    } else if (
      this.coor == "工務部_1" ||
      this.coor == "工務部_2" ||
      (this.B_section == "設備修繕" && this.section == "")
    ) {
      console.log(this.ww_t1);
      console.log(this.ww_t2);
      console.log(this.ww_t3);
      if (this.ww_t1.indexOf("使用執照") > -1) {
        this.work_T1[0] = true;
      }

      if (this.ww_t2.indexOf("平面") > -1) {
        this.work_T2[0] = true;
      }
      if (this.ww_t2.indexOf("面積計算") > -1) {
        this.work_T2[1] = true;
      }
      if (this.ww_t2.indexOf("位置") > -1) {
        this.work_T2[2] = true;
      }
      if (this.ww_t2.indexOf("門窗") > -1) {
        this.work_T2[3] = true;
      }
      if (this.ww_t2.indexOf("立剖面") > -1) {
        this.work_T2[4] = true;
      }
      if (this.ww_t2.indexOf("結構") > -1) {
        this.work_T2[5] = true;
      }
      if (this.ww_t2.indexOf("消防竣工") > -1) {
        this.work_T2[6] = true;
      }

      if (this.ww_t3.indexOf("測距尺") > -1) {
        this.work_T3[0] = true;
      }
      if (this.ww_t3.indexOf("捲尺") > -1) {
        this.work_T3[1] = true;
      }
      if (this.ww_t3.indexOf("電壓錶") > -1) {
        this.work_T3[2] = true;
      }

      if (this.ww_t4.indexOf("既設設備") > -1) {
        this.work_T4[0] = true;
      }
      if (this.ww_t4.indexOf("移設位置") > -1) {
        this.work_T4[1] = true;
      }
      if (this.ww_t4.indexOf("新設位置") > -1) {
        this.work_T4[2] = true;
      }
      if (this.ww_t4.indexOf("建築外觀") > -1) {
        this.work_T4[3] = true;
      }
      if (this.ww_t4.indexOf("自訂") > -1) {
        var a = this.ww_t4.split("自訂:")[1];
        var b = a.split(",");
        b.forEach((e) => {
          this.self_add_check.push(e);
        });
      }

      if (this.ww_t5.indexOf("物料進場") > -1) {
        this.work_T5[0] = true;
      }
      if (this.ww_t5.indexOf("工班進場") > -1) {
        this.work_T5[1] = true;
      }
      if (this.ww_t5.indexOf("施工時段") > -1) {
        this.work_T5[2] = true;
      }
    } else if (this.coor == "設備安裝") {
      //滅火設備
      if (this.ww_t4.indexOf("室內消防栓-發信器") > -1) {
        this.work_T1[0][0] = true;
        this.vis_tool[0]["室內消防栓"].push("發信器");
      }
      if (this.ww_t4.indexOf("室內消防栓-警鈴") > -1) {
        this.work_T1[0][1] = true;
        this.vis_tool[0]["室內消防栓"].push("警鈴");
      }
      if (this.ww_t4.indexOf("室內消防栓-標示燈") > -1) {
        this.work_T1[0][2] = true;
        this.vis_tool[0]["室內消防栓"].push("標示燈");
      }
      if (this.ww_t4.indexOf("室內消防栓-泵浦燈") > -1) {
        this.work_T1[0][3] = true;
        this.vis_tool[0]["室內消防栓"].push("泵浦燈");
      }
      if (this.ww_t4.indexOf("室內消防栓-水帶") > -1) {
        this.work_T1[0][4] = true;
        this.vis_tool[0]["室內消防栓"].push("水帶");
      }
      if (this.ww_t4.indexOf("室內消防栓-太平龍頭") > -1) {
        this.work_T1[0][5] = true;
        this.vis_tool[0]["室內消防栓"].push("太平龍頭");
      }
      if (this.ww_t4.indexOf("室內消防栓-瞄子") > -1) {
        this.work_T1[0][6] = true;
        this.vis_tool[0]["室內消防栓"].push("瞄子");
      }
      if (this.ww_t4.indexOf("室內消防栓-泵浦") > -1) {
        this.work_T1[0][7] = true;
        this.vis_tool[0]["室內消防栓"].push("泵浦");
      }
      if (this.ww_t4.indexOf("滅火器-滅火器") > -1) {
        this.work_T1[1][0] = true;
        this.vis_tool[0]["滅火器"].push("滅火器");
      }
      if (this.ww_t4.indexOf("滅火器-放置盒") > -1) {
        this.work_T1[1][1] = true;
        this.vis_tool[0]["滅火器"].push("放置盒");
      }
      if (this.ww_t4.indexOf("滅火器-掛勾") > -1) {
        this.work_T1[1][2] = true;
        this.vis_tool[0]["滅火器"].push("掛勾");
      }
      if (this.ww_t4.indexOf("滅火器-標示牌") > -1) {
        this.work_T1[1][3] = true;
        this.vis_tool[0]["滅火器"].push("標示牌");
      }
      //警報設備
      if (this.ww_t4.indexOf("火警探測器") > -1) {
        this.work_T1[2][0] = true;
        this.vis_tool[0]["警報設備"].push("火警探測器");
      }
      if (this.ww_t4.indexOf("受信總機") > -1) {
        this.work_T1[2][1] = true;
        this.vis_tool[0]["警報設備"].push("受信總機");
      }
      if (this.ww_t4.indexOf("廣播主機") > -1) {
        this.work_T1[2][2] = true;
        this.vis_tool[0]["警報設備"].push("廣播主機");
      }
      if (this.ww_t4.indexOf("緊急廣播揚聲器") > -1) {
        this.work_T1[2][3] = true;
        this.vis_tool[0]["警報設備"].push("緊急廣播揚聲器");
      }
      if (this.ww_t4.indexOf("綜合盤-發信器") > -1) {
        this.work_T1[3][0] = true;
        this.vis_tool[0]["綜合盤"].push("發信器");
      }
      if (this.ww_t4.indexOf("綜合盤-警鈴") > -1) {
        this.work_T1[3][1] = true;
        this.vis_tool[0]["綜合盤"].push("警鈴");
      }
      if (this.ww_t4.indexOf("綜合盤-標示燈") > -1) {
        this.work_T1[3][2] = true;
        this.vis_tool[0]["綜合盤"].push("標示燈");
      }
      if (this.ww_t4.indexOf("住警器-偵煙式") > -1) {
        this.work_T1[4][0] = true;
        this.vis_tool[0]["住警器"].push("偵煙式");
      }
      if (this.ww_t4.indexOf("住警器-定溫式") > -1) {
        this.work_T1[4][1] = true;
        this.vis_tool[0]["住警器"].push("定溫式");
      }
      //避難逃生設備
      if (this.ww_t4.indexOf("緩降機-固定架") > -1) {
        this.work_T1[5][0] = true;
        this.vis_tool[0]["緩降機"].push("固定架");
      }
      if (this.ww_t4.indexOf("緩降機-緩降機本體") > -1) {
        this.work_T1[5][1] = true;
        this.vis_tool[0]["緩降機"].push("緩降機本體");
      }
      if (this.ww_t4.indexOf("緊急照明燈") > -1) {
        this.work_T1[6][0] = true;
        this.vis_tool[0]["避難逃生設備"].push("緊急照明燈");
      }
      if (this.ww_t4.indexOf("避難方向指示燈") > -1) {
        this.work_T1[6][1] = true;
        this.vis_tool[0]["避難逃生設備"].push("避難方向指示燈");
      }
      if (this.ww_t4.indexOf("出口標示燈") > -1) {
        this.work_T1[6][2] = true;
        this.vis_tool[0]["避難逃生設備"].push("出口標示燈");
      }
      //其他
      if (this.ww_t4.indexOf("線材") > -1) {
        this.work_T1[7][0] = true;
        this.vis_tool[0]["其他"].push("線材");
      }
      if (this.ww_t4.indexOf("閥類") > -1) {
        this.work_T1[7][1] = true;
        this.vis_tool[0]["其他"].push("閥類");
      }
      if (this.ww_t4.indexOf("發電機") > -1) {
        this.work_T1[7][2] = true;
        this.vis_tool[0]["其他"].push("發電機");
      }
    } else if (this.coor == "現場準備") {
      if (this.ww_t1.indexOf("偵煙探測棒") > -1) {
        this.work_T1[0] = true;
      }
      if (this.ww_t1.indexOf("風速計") > -1) {
        this.work_T1[1] = true;
      }
      if (this.ww_t1.indexOf("扭力板手") > -1) {
        this.work_T1[2] = true;
      }
      if (this.ww_t1.indexOf("水帶") > -1) {
        this.work_T1[3] = true;
      }
      if (this.ww_t1.indexOf("比托計") > -1) {
        this.work_T1[4] = true;
      }
    } else if (this.coor == "自主查驗") {
      //滅火設備
      if (this.ww_t4.indexOf("滅火器") > -1) {
        this.work_T1[0][0] = true;
        this.vis_tool_b[0]["滅火設備"].push("滅火器");
      }
      if (this.ww_t4.indexOf("室內消防栓") > -1) {
        this.work_T1[0][1] = true;
        this.vis_tool_b[0]["滅火設備"].push("室內消防栓");
      }
      if (this.ww_t4.indexOf("泵浦") > -1) {
        this.work_T1[0][2] = true;
        this.vis_tool_b[0]["滅火設備"].push("泵浦");
      }
      //警報設備
      if (this.ww_t4.indexOf("火警探測器") > -1) {
        this.work_T1[1][0] = true;
        this.vis_tool_b[0]["警報設備"].push("火警探測器");
      }
      if (this.ww_t4.indexOf("受信總機") > -1) {
        this.work_T1[1][1] = true;
        this.vis_tool_b[0]["警報設備"].push("受信總機");
      }
      if (this.ww_t4.indexOf("廣播主機") > -1) {
        this.work_T1[1][2] = true;
        this.vis_tool_b[0]["警報設備"].push("廣播主機");
      }
      if (this.ww_t4.indexOf("緊急廣播揚聲器") > -1) {
        this.work_T1[1][3] = true;
        this.vis_tool_b[0]["警報設備"].push("緊急廣播揚聲器");
      }
      if (this.ww_t4.indexOf("住警器") > -1) {
        this.work_T1[1][4] = true;
        this.vis_tool_b[0]["住警器"].push("緊急廣播揚聲器");
      }
      if (this.ww_t4.indexOf("綜合盤") > -1) {
        this.work_T1[1][5] = true;
        this.vis_tool_b[0]["住警器"].push("綜合盤");
      }
      //避難逃生設備
      if (this.ww_t4.indexOf("緊急照明燈") > -1) {
        this.work_T1[2][0] = true;
        this.vis_tool_b[0]["避難逃生設備"].push("緊急照明燈");
      }
      if (this.ww_t4.indexOf("避難方向指示燈") > -1) {
        this.work_T1[2][1] = true;
        this.vis_tool_b[0]["避難逃生設備"].push("避難方向指示燈");
      }
      if (this.ww_t4.indexOf("出口標示燈") > -1) {
        this.work_T1[2][2] = true;
        this.vis_tool_b[0]["避難逃生設備"].push("出口標示燈");
      }
      if (this.ww_t4.indexOf("緩降機") > -1) {
        this.work_T1[2][3] = true;
        this.vis_tool_b[0]["避難逃生設備"].push("緩降機");
      }
      //其他
      if (this.ww_t4.indexOf("發電機") > -1) {
        this.work_T1[3][0] = true;
        this.vis_tool_b[0]["其他"].push("發電機");
      }
    }
    console.log(this.vis_tool);
  }

  loadCaseData() {
    this.case_data = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_assign_case_setting_data.php?serial_num=" +
        this.serial_num
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      this.case_data = result["all_data"];
    });
  }
  confirmCheckboxGet(event, value) {
    if (event.value == true) {
      console.log(value);
    }
  }
  setting() {
    this.edit = 1;
  }
  save() {
    this.edit = 0;
    this.d_t1 = [];
    this.d_t2 = [];
    this.w_t1 = [];
    this.w_t2 = [];
    this.w_t3 = [];
    this.w_t4 = [];
    this.w_t5 = [];
    this.self_add_check = [];
    // this.w1_t1=[];this.w1_t2=[];this.w1_t3=[];this.w1_t4=[];this.w1_t5=[];this.w1_t6=[];
    if (this.coor == "設計部") {
      this.file.forEach((element, index) => {
        if (this.design_T1[index] == true) {
          this.d_t1.push(element);
        }
      });
      this.pic.forEach((element, index) => {
        if (this.design_T2[index] == true) {
          this.d_t2.push(element);
        }
      });
    } else if (
      this.coor == "工務部_1" ||
      this.coor == "工務部_2" ||
      (this.B_section == "設備修繕" && this.section == "")
    ) {
      this.file.forEach((element, index) => {
        if (this.work_T1[index] == true) {
          this.w_t1.push(element);
        }
      });
      this.pic.forEach((element, index) => {
        if (this.work_T2[index] == true) {
          this.w_t2.push(element);
        }
      });
      this.tool.forEach((element, index) => {
        if (this.work_T3[index] == true) {
          this.w_t3.push(element);
        }
      });
      this.camera.forEach((element, index) => {
        if (this.work_T4[index] == true) {
          this.w_t4.push(element);
        }
      });
      this.consort.forEach((element, index) => {
        if (this.work_T5[index] == true) {
          this.w_t5.push(element);
        }
      });
      this.self_add_arr.forEach((e) => {
        if (e["data"] != "") {
          this.self_add_check.push(e["data"]);
        }
      });
    } else if (this.coor == "設備安裝") {
      this.tool_a2.forEach((element, index) => {
        if (this.work_T1[0][index] == true) {
          this.w_t4.push("室內消防栓-" + element);
        }
      });
      this.tool_a1.forEach((element, index) => {
        if (this.work_T1[1][index] == true) {
          this.w_t4.push("滅火器-" + element);
        }
      });
      this.tool_a6.forEach((element, index) => {
        if (this.work_T1[2][index] == true) {
          this.w_t4.push(element);
        }
      });
      this.tool_a3.forEach((element, index) => {
        if (this.work_T1[3][index] == true) {
          this.w_t4.push("綜合盤-" + element);
        }
      });
      this.tool_a4.forEach((element, index) => {
        if (this.work_T1[4][index] == true) {
          this.w_t4.push("住警器-" + element);
        }
      });
      this.tool_a5.forEach((element, index) => {
        if (this.work_T1[5][index] == true) {
          this.w_t4.push("緩降機-" + element);
        }
      });
      this.tool_a7.forEach((element, index) => {
        if (this.work_T1[6][index] == true) {
          this.w_t4.push(element);
        }
      });
      this.tool_a8.forEach((element, index) => {
        if (this.work_T1[7][index] == true) {
          this.w_t4.push("其他-" + element);
        }
      });
    } else if (this.coor == "現場準備") {
      this.tool_b.forEach((element, index) => {
        if (this.work_T1[index] == true) {
          this.w_t1.push(element);
        }
      });
    } else if (this.coor == "自主查驗") {
      this.tool_b1.forEach((element, index) => {
        if (this.work_T1[0][index] == true) {
          this.w_t4.push(element);
        }
      });
      this.tool_b2.forEach((element, index) => {
        if (this.work_T1[1][index] == true) {
          this.w_t4.push(element);
        }
      });
      this.tool_b3.forEach((element, index) => {
        if (this.work_T1[2][index] == true) {
          this.w_t4.push(element);
        }
      });
      this.tool_b4.forEach((element, index) => {
        if (this.work_T1[3][index] == true) {
          this.w_t4.push(element);
        }
      });
    }
    let load = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    load.present();
    let formData = new FormData();
    formData.append("client_id", this.client_id);
    formData.append("serial_num", this.serial_num);
    formData.append("client_name", this.client_name);
    formData.append("case_name", this.case_name);
    formData.append("case_type", this.case_type);
    formData.append("B_section", this.B_section);
    formData.append("section", this.section);
    formData.append("corporate", this.corporate);
    formData.append("main", this.main);
    formData.append("assis", this.assis);
    formData.append("alert_date", this.alert_date);
    formData.append("start_date", this.start_date);
    formData.append("finish_date", this.finish_date);
    formData.append("note", this.note);
    formData.append("type_status", this.type_status);
    formData.append("d_t1", JSON.stringify(this.d_t1));
    formData.append("d_t2", JSON.stringify(this.d_t2));
    formData.append("w_t1", JSON.stringify(this.w_t1));
    formData.append("w_t2", JSON.stringify(this.w_t2));
    formData.append("w_t3", JSON.stringify(this.w_t3));
    formData.append("w_t4", JSON.stringify(this.w_t4));
    formData.append("w_t5", JSON.stringify(this.w_t5));
    formData.append("self_add_check", JSON.stringify(this.self_add_check));
    formData.append("name", window.localStorage.getItem("name"));

    console.log(this.d_t1);
    console.log(this.d_t2);
    console.log(this.w_t1);
    console.log(this.w_t4);
    console.log(this.assis);
    console.log(this.self_add_check);
    console.log(this.type_status);

    this.network
      .save_assign_setting(formData)
      .then((data) => {
        this.event.publish("assign_mission_listen");
        this.navCtrl.pop();
        alert(data);
        console.log(data);
        load.dismiss();
      })
      .catch((error) => {
        alert("系統異常");
        console.log(error);
        load.dismiss();
      });
  }

  more(num) {
    if (this.vis[num] == 0) {
      this.vis[num] = 1;
    } else if (this.vis[num] == 1) {
      this.vis[num] = 0;
    }
  }

  selfAdd() {
    this.self_add_arr.push({
      data: "",
    });
    console.log(this.self_add_arr);
  }
  selfPop() {
    this.self_add_arr.splice(-1, 1);
    console.log(this.self_add_arr);
  }
  add(event) {
    console.log(event.value);
    this.add_status = event.value;
  }
}
