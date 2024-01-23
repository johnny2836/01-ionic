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
import { BigimageComponent } from "../../components/bigimage/bigimage";
import { ProgressFilterComponent } from "../../components/progress-filter/progress-filter";
import { PopoverComponent } from "../../components/popover/popover";
import { P } from "@angular/core/src/render3";
/**
 * Generated class for the BmsPicViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-bms-pic-view",
  templateUrl: "bms-pic-view.html",
})
export class BmsPicViewPage {
  AD_id = "";

  chv: any;
  all_tab = [];
  All = [];

  input_client_name = "";
  input_case_name = "";
  input_serial_num = "";
  input_case_type = "";
  input_AD_account = "";
  input_main_section = "";
  input_sec_section = "";
  input_project = "";
  input_date_start = "";
  input_date_end = "";
  dis = [
    {
      docx: [""],
      A1: [""],
      A2: [""],
      A3: [""],
      A4: [""],
      A5: [""],
      A6: [""],
      A7: [""],
    },
  ];

  all_true = false;
  output = "";
  user = "";
  character = "";
  pic_auth: any;
  sort = [0, 0, 0];
  show_box = false;
  sort_condition = [];
  depart = "";
  edit_row = [];
  list_a = []; // 主階段
  list_b = []; // 子階段
  list_c = []; // 項目/設備
  list_d = []; // 名稱
  list_e = []; // 結果
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
    // this.AD_id=this.navParams.get('id')
    this.input_client_name = navParams.get("client_name");
    this.input_case_name = navParams.get("case_name");
    this.input_serial_num = navParams.get("serial_num");
    this.input_case_type = navParams.get("type");
    window.localStorage.setItem("pic_auth", navParams.get("pic_auth"));
    this.pic_auth = window.localStorage.getItem("pic_auth");
    // if (navParams.get('chv') == null || navParams.get('chv') == undefined || navParams.get('chv') == '') {
    //   this.chv = 1
    // }else{
    this.chv = navParams.get("chv");
    // }
    this.user = window.localStorage.getItem("name");
    this.character = window.localStorage.getItem("character");
    this.depart = window.localStorage.getItem("depart");
    console.log(this.AD_id);
    console.log(this.input_client_name);
    console.log(this.input_case_name);
    console.log(this.input_serial_num);
    console.log(this.input_case_type);
    console.log(this.character);
    console.log(this.user);
    console.log(this.pic_auth);
    console.log(navParams.get("chv"));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad BmsPicViewPage");
    this.readPic();
    this.picSortListen();
    this.picFirstRun();
  }

  picFirstRun() {
    this.event.subscribe("pic_first_run", (data) => {
      console.log("success");
      this.readPic();
    });
  }

  chType(num) {
    this.chv = num;
  }

  bmsGo() {
    window.open("http://web.ici-biot.com/bms/login.php");
  }
  allmarket() {
    window.open("https://allmarket.com.tw");
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
  //核取
  checkboxGet(i) {
    if (this.all_tab[i]["checkbox"] == true) {
      this.All.forEach((e) => {
        if (e["pic_url"] == this.all_tab[i]["pic_url"]) {
          e["checkbox"] = true;
        }
      });
    } else {
      this.All.forEach((e) => {
        if (e["pic_url"] == this.all_tab[i]["pic_url"]) {
          e["checkbox"] = false;
        }
      });
    }
    console.log(this.All);
  }
  //全選
  GetAll() {
    if (this.all_true == true) {
      this.all_tab.forEach((e) => {
        e["checkbox"] = true;
        this.All.forEach((e1) => {
          if (e["pic_url"] == e1["pic_url"]) {
            e1["checkbox"] = true;
          }
        });
      });
    } else if (this.all_true == false) {
      this.all_true = false;
      this.all_tab.forEach((e) => {
        e["checkbox"] = false;
        this.All.forEach((e1) => {
          if (e["pic_url"] == e1["pic_url"]) {
            e1["checkbox"] = false;
          }
        });
      });
    }
    console.log(this.All);
  }

  readPic() {
    this.edit_row = [];
    this.all_tab = [];
    this.All = [];
    let load = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    load.present();
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_callback_table.php?serial_num=" +
        this.input_serial_num +
        "&user=" +
        this.user
    );
    // data = this.http.get('https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_callback_table.php?serial_num='+this.input_serial_num+'&pic_auth='+this.pic_auth+'&user='+this.user);
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      load.dismiss();
      console.log(result);
      if (result["arr"] != null) {
        result["arr"].forEach((e, i) => {
          if (e["note"] == "undefined" || e["note"] == undefined) {
            e["note"] = "";
          }
          if (
            e["account"] == this.user ||
            this.user == "李惠閔" ||
            this.user == "洪舒寧" ||
            this.user == "洪勝華"
          ) {
            e["edit_auth"] = true;
          } else {
            e["edit_auth"] = false;
          }
          this.readSelectA(
            e["main_section"],
            e["sec_section"],
            i,
            e["AD_serial_number"],
            e["project"],
            e["project_2"]
          );
          this.all_tab.push(e);
          this.edit_row.push(false);
        });
        // this.choose_filter('A3')
      } else if (
        this.input_case_name != "" &&
        this.input_case_name != undefined
      ) {
        let message =
          '此場所"' + this.input_case_name + '"無照片, 是否預覽全案件?'; // message : 視窗出現的文字
        var check = confirm(message); // check : 收集回應(true/false)
        if (check) {
          this.all_true = false;
          this.input_date_start = "";
          this.input_date_end = "";
          this.input_client_name = "";
          this.input_case_name = "";
          this.input_serial_num = "";
          this.input_case_type = "";
          this.input_AD_account = "";
          this.input_main_section = "";
          this.input_sec_section = "";
          this.input_project = "";
        }
      } else {
        this.all_true = false;
        this.input_date_start = "";
        this.input_date_end = "";
        this.input_client_name = "";
        this.input_case_name = "";
        this.input_serial_num = "";
        this.input_case_type = "";
        this.input_AD_account = "";
        this.input_main_section = "";
        this.input_sec_section = "";
        this.input_project = "";
      }
      this.All = result["arr_all"];
      this.dis["docx"] = result["docx"];
      this.dis["A1"] = result["O_client_name"];
      this.dis["A2"] = result["O_case_name"];
      this.dis["A3"] = result["O_type"];
      this.dis["A4"] = result["O_name"];
      this.dis["A5"] = result["O_main_section"];
      this.dis["A6"] = result["O_sec_section"];
      this.dis["A7"] = result["O_list"];
      this.dis["A1"].splice(0, 0, "");
      this.dis["A2"].splice(0, 0, "");
      this.dis["A3"].splice(0, 0, "");
      this.dis["A4"].splice(0, 0, "");
      this.dis["A5"].splice(0, 0, "");
      this.dis["A6"].splice(0, 0, "");
      this.dis["A7"].splice(0, 0, "");

      this.choose_filter("A3");
    });
  }

  // 編輯之下拉選單
  readSelectA(parameter, parameter2, i, serial_number, parameter3, parameter4) {
    this.list_a[i] = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/worker_read_pic_select.php?part=a&serial_number=" +
        serial_number +
        "&name=" +
        this.user
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      // console.log(result)
      this.list_a[i] = result["list_a"];
      this.list_a[i].splice(0, 0, "");
      this.readSelectB(
        parameter,
        parameter2,
        i,
        serial_number,
        parameter3,
        parameter4
      );
      console.log(this.list_a);
    });
  }
  readSelectB(parameter, parameter2, i, serial_number, parameter3, parameter4) {
    this.list_b[i] = [];
    if (parameter == "現場勘查") {
      this.list_b[i] = ["", "拍照記錄"];
    } else if (parameter == "現場施工") {
      this.list_b[i] = ["", "物料進場", "管線布設", "設備安裝", "自主查驗"];
    } else if (parameter == "現場會勘") {
      this.list_b[i] = ["", "會勘缺失"];
    }
    this.list_b[i].splice(0, 0, "");
    console.log(this.list_b);
    this.readSelectC(
      parameter,
      parameter2,
      i,
      serial_number,
      parameter3,
      parameter4
    );
  }
  readSelectC(parameter, parameter2, i, serial_number, parameter3, parameter4) {
    // console.log(serial_number)
    this.list_c[i] = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/worker_read_pic_select.php?part=c&main_section=" +
        parameter +
        "&sec_section=" +
        parameter2 +
        "&serial_number=" +
        serial_number +
        "&name=" +
        this.user
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      // console.log(result)
      // if (result['list_c'] == null || result['list_c'] == [] ) {
      //   this.list_c[i].push('無')
      // }else{
      this.list_c[i] = result["list_c"];
      // }
      this.list_c[i].splice(0, 0, "");
      this.readSelectD(parameter3, i, parameter4);
    });
    console.log(this.list_c[i]);
  }
  readSelectD(parameter3, i, parameter4) {
    this.list_d[i] = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/worker_read_pic_select.php?part=d&parameter3=" +
        parameter3
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      // console.log(result)
      this.list_d[i] = result["list_d"];
      this.list_d[i].splice(0, 0, "");
      this.readSelectE(parameter3, i, parameter4);
    });
  }
  readSelectE(parameter3, i, parameter4) {
    this.list_e[i] = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/worker_read_pic_select.php?part=e&parameter3=" +
        parameter3 +
        "&parameter4=" +
        parameter4
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      // console.log(result)
      this.list_e[i] = result["list_e"];
      this.list_e[i].splice(0, 0, "");
    });
  }

  view(ev: any, url) {
    let popover = this.popcontroller.create(BigimageComponent, { url: url });
    popover.present();
  }

  choose_date() {
    var arr = [];
    if (this.input_date_start == "") {
      this.all_tab.forEach((e) => {
        arr.push(e["date"]);
      });
      arr.sort();
      this.input_date_start = arr[0];
    }
    if (this.input_date_end == "") {
      this.all_tab.forEach((e) => {
        arr.push(e["date"]);
      });
      arr.sort();
      this.input_date_end = arr[arr.length - 1];
    }
    var tmp = [];
    tmp = this.all_tab.filter((item) => {
      console.log(item.date);
      // 輸入資料
      var date;
      // 過濾
      if (item.date == null) {
        date = "";
      } else {
        date = item.date;
        return (
          date.toLowerCase() >= this.input_date_start.toLowerCase() &&
          date.toLowerCase() <= this.input_date_end.toLowerCase()
        );
      }
    });
    this.all_tab = tmp;
    this.All.forEach((e) => {
      if (e["checkbox"] == true) {
        e["checkbox"] = false;
      }
    });
    this.all_tab.forEach((e) => {
      if (e["checkbox"] == true) {
        e["checkbox"] = false;
      }
    });
    this.all_true = false;
  }

  choose_filter(part) {
    if (
      this.input_date_start == "" &&
      this.input_date_end == "" &&
      (this.input_client_name == "" || this.input_client_name == undefined) &&
      (this.input_case_name == "" || this.input_case_name == undefined) &&
      (this.input_serial_num == "" || this.input_serial_num == undefined) &&
      (this.input_case_type == "" || this.input_case_type == undefined) &&
      this.input_AD_account == "" &&
      this.input_main_section == "" &&
      this.input_sec_section == "" &&
      this.input_project == ""
    ) {
      this.all_tab = [];
      this.edit_row = [];
      this.All.forEach((e, i) => {
        if (e["note"] == "undefined") {
          e["note"] = "";
        }
        if (e["checkbox"] == true) {
          e["checkbox"] = false;
        }
        if (
          e["account"] == this.user ||
          this.user == "李惠閔" ||
          this.user == "洪舒寧" ||
          this.user == "洪勝華"
        ) {
          e["edit_auth"] = true;
        } else {
          e["edit_auth"] = false;
        }
        this.all_tab.push(e);
        this.edit_row.push(false);
        this.readSelectA(
          e["main_section"],
          e["sec_section"],
          i,
          e["AD_serial_number"],
          e["project"],
          e["project_2"]
        );
      });
      this.all_true = false;
      console.log(this.all_tab);
    } else {
      let list = ["A1", "A2", "A3", "A4", "A5", "A6", "A7"];

      this.all_tab = [];
      this.edit_row = [];

      if (list.indexOf(part) < 1) {
        this.input_case_name = "";
        this.dis["A2"] = [];
      }
      if (list.indexOf(part) < 2) {
        this.input_case_type = "";
        this.dis["A3"] = [];
      }
      if (list.indexOf(part) < 3) {
        this.input_AD_account = "";
        this.dis["A4"] = [];
      }
      if (list.indexOf(part) < 4) {
        this.input_main_section = "";
        this.dis["A5"] = [];
      }
      if (list.indexOf(part) < 5) {
        this.input_sec_section = "";
        this.dis["A6"] = [];
      }
      if (list.indexOf(part) < 6) {
        this.input_project = "";
        this.dis["A7"] = [];
      }
      console.log(this.input_date_start);

      const data = this.All.filter((item) => {
        var AD_serial_number;
        var client_name;
        var case_name;
        var case_type;
        var date;
        var time;
        var account;
        var main_section;
        var sec_section;
        var project;
        // var note
        // var pic_url

        if (
          item.AD_serial_number == null ||
          item.client_name == null ||
          item.case_name == null ||
          item.case_type == null ||
          item.date == null ||
          item.time == null ||
          item.account == null ||
          item.main_section == null ||
          item.sec_section == null ||
          item.project == null
        ) {
          AD_serial_number = "";
          client_name = "";
          case_name = "";
          case_type = "";
          date = "";
          time = "";
          account = "";
          main_section = "";
          sec_section = "";
          project = "";
        } else {
          client_name = item.client_name.toLowerCase();
          case_name = item.case_name.toLowerCase();
          case_type = item.case_type.toLowerCase();
          date = item.date.toLowerCase();
          time = item.time.toLowerCase();
          account = item.account.toLowerCase();
          main_section = item.main_section.toLowerCase();
          sec_section = item.sec_section.toLowerCase();
          project = item.project.toLowerCase();

          if (
            this.input_client_name.toLowerCase().length >= 2 ||
            this.input_case_name.toLowerCase().length >= 2 ||
            this.input_case_type.toLowerCase().length >= 2 ||
            this.input_AD_account.toLowerCase().length >= 2 ||
            this.input_main_section.toLowerCase().length >= 2 ||
            this.input_sec_section.toLowerCase().length >= 2 ||
            this.input_project.toLowerCase().length >= 2
          ) {
            // console.log(client_name.search(this.input_client_name.toLowerCase()) > -1)
            return (
              client_name.search(this.input_client_name.toLowerCase()) > -1 &&
              case_name.search(this.input_case_name.toLowerCase()) > -1 &&
              case_type.search(this.input_case_type.toLowerCase()) > -1 &&
              account.search(this.input_AD_account.toLowerCase()) > -1 &&
              main_section.search(this.input_main_section.toLowerCase()) > -1 &&
              sec_section.search(this.input_sec_section.toLowerCase()) > -1 &&
              project.search(this.input_project.toLowerCase()) > -1
            );
          }
        }
      });
      this.all_tab = data;
      console.log(this.all_tab);

      var option = {
        A2: [""],
        A3: [""],
        A4: [""],
        A5: [""],
        A6: [""],
        A7: [""],
      };
      this.All.forEach((e) => {
        if (e["checkbox"] == true) {
          e["checkbox"] = false;
        }
        if (
          e["account"] == this.user ||
          this.user == "李惠閔" ||
          this.user == "洪舒寧" ||
          this.user == "洪勝華"
        ) {
          e["edit_auth"] = true;
        } else {
          e["edit_auth"] = false;
        }
      });
      this.all_tab.forEach((e, i) => {
        if (e["checkbox"] == true) {
          e["checkbox"] = false;
        }
        if (
          e["account"] == this.user ||
          this.user == "李惠閔" ||
          this.user == "洪舒寧" ||
          this.user == "洪勝華"
        ) {
          e["edit_auth"] = true;
        } else {
          e["edit_auth"] = false;
        }
        if (option["A2"].indexOf(e["case_name"]) == -1) {
          option["A2"].push(e["case_name"]);
        }
        if (option["A3"].indexOf(e["case_type"]) == -1) {
          option["A3"].push(e["case_type"]);
        }
        if (option["A4"].indexOf(e["account"]) == -1) {
          option["A4"].push(e["account"]);
        }
        if (option["A5"].indexOf(e["main_section"]) == -1) {
          option["A5"].push(e["main_section"]);
        }
        if (option["A6"].indexOf(e["sec_section"]) == -1) {
          option["A6"].push(e["sec_section"]);
        }
        if (option["A7"].indexOf(e["project"]) == -1) {
          option["A7"].push(e["project"]);
        }
        this.edit_row.push(false);
        this.readSelectA(
          e["main_section"],
          e["sec_section"],
          i,
          e["AD_serial_number"],
          e["project"],
          e["project_2"]
        );
      });

      if (list.indexOf(part) < 1) {
        this.dis["A2"] = option["A2"];
      }
      if (list.indexOf(part) < 2) {
        this.dis["A3"] = option["A3"];
      }
      if (list.indexOf(part) < 3) {
        this.dis["A4"] = option["A4"];
      }
      if (list.indexOf(part) < 4) {
        this.dis["A5"] = option["A5"];
      }
      if (list.indexOf(part) < 5) {
        this.dis["A6"] = option["A6"];
      }
      if (list.indexOf(part) < 6) {
        this.dis["A7"] = option["A7"];
      }

      this.all_true = false;
    }
  }

  cancel_filter() {
    this.all_true = false;
    this.input_date_start = "";
    this.input_date_end = "";
    this.input_client_name = "";
    this.input_case_name = "";
    this.input_serial_num = "";
    this.input_case_type = "";
    this.input_AD_account = "";
    this.input_main_section = "";
    this.input_sec_section = "";
    this.input_project = "";

    this.readPic();
  }

  //下載
  downloadPicZip() {
    console.log(this.All);
    // if (this.all_tab.length < 1) {
    //   alert('無回報照片')
    // }else{
    //   let load = this.loadingCtrl.create({
    //     spinner: 'hide',
    //     content: `<img src="assets/imgs/line_loading.gif" />`,
    //   });
    //   load.present()
    //   let formData = new FormData();
    //   formData.append('All',JSON.stringify(this.All))
    //   this.network.download_pic_zip(formData).then(data => {
    //     let url:any
    //     if (data != '' && data != null && data != undefined) {
    //       url = data
    //       window.open(url)
    //     }else{
    //       alert('系統異常')
    //     }
    //     load.dismiss()
    //   }).catch(error=>{
    //     alert('系統異常')
    //     console.log(error)
    //     load.dismiss()
    //   })
    // }
  }

  //輸出報告書
  output_file() {
    if (this.all_tab.length < 1) {
      alert("無回報照片");
    } else if (this.output == "") {
      alert("尚未選擇輸出格式");
    } else {
      let load = this.loadingCtrl.create({
        spinner: "hide",
        content: `<img src="assets/imgs/line_loading.gif" />`,
      });
      load.present();
      let formData = new FormData();
      formData.append("output", this.output);
      formData.append("user", this.user);
      formData.append("All", JSON.stringify(this.All));
      console.log(this.All);
      this.network
        .report_main(formData)
        .then((data) => {
          console.log(data);
          let url: any;
          if (data != "" && data != null && data != undefined) {
            url = data;
            window.open(url);
          } else {
            alert("系統異常");
          }
          load.dismiss();
        })
        .catch((error) => {
          alert("系統異常");
          console.log(error);
          load.dismiss();
        });
    }
  }

  //排序
  picSortListen() {
    let aaa = [
      "客戶",
      "場所",
      "案件類型",
      "日期",
      "時間",
      "拍攝者",
      "主階段",
      "子階段",
      "項目",
    ];
    let bbb = [
      "client_name",
      "case_name",
      "case_type",
      "date",
      "time",
      "account",
      "main_section",
      "main_section",
      "project",
    ];
    this.event.subscribe("pic_sort_listen", (data) => {
      console.log(data);
      this.sort_condition = data["sort_condition"];
      this.all_tab.sort((left, right): any => {
        for (let i = 0; i < data["sort_condition"].length; i++) {
          let item = data["sort_condition"][i]["p1"];
          let sort = data["sort_condition"][i]["p2"];
          if (sort == "Z-A") {
            if (left[bbb[aaa.indexOf(item)]] < right[bbb[aaa.indexOf(item)]])
              return 1;
            if (left[bbb[aaa.indexOf(item)]] > right[bbb[aaa.indexOf(item)]])
              return -1;
          } else {
            if (left[bbb[aaa.indexOf(item)]] < right[bbb[aaa.indexOf(item)]])
              return -1;
            if (left[bbb[aaa.indexOf(item)]] > right[bbb[aaa.indexOf(item)]])
              return 1;
          }
        }
        return 0;
      });
      console.log(this.all_tab);
    });
    //old
    // this.event.subscribe('pic_sort_listen', (data) => {
    //   this.sort[data.array_number] =  parseInt(data.number)
    //   console.log(this.sort)
    //   console.log(this.sort.indexOf(0))
    //   this.all_tab.sort((left, right): number => {
    //     if (this.sort[0] == 1 && this.sort[1] == 0) {
    //       if (left.date < right.date) return -1;
    //       if (left.date > right.date) return 1;
    //       return 0;
    //     }else if (this.sort[0] == 0 && this.sort[1] == 1) {
    //       if (left.time < right.time) return -1;
    //       if (left.time > right.time) return 1;
    //       return 0;
    //     }else if (this.sort[0] == 2 && this.sort[1] == 0) {
    //       if (left.date > right.date) return -1;
    //       if (left.date < right.date) return 1;
    //       return 0;
    //     }else if (this.sort[0] == 0 && this.sort[1] == 2) {
    //       if (left.time > right.time) return -1;
    //       if (left.time < right.time) return 1;
    //       return 0;
    //     }else if (this.sort[0] == 1 && this.sort[1] == 1) {
    //       if (left.date < right.date) return -1;
    //       if (left.date > right.date) return 1;
    //       if (left.time < right.time) return -1;
    //       if (left.time > right.time) return 1;
    //       return 0;
    //     }else if (this.sort[0] == 1 && this.sort[1] == 2) {
    //       if (left.date < right.date) return -1;
    //       if (left.date > right.date) return 1;
    //       if (left.time > right.time) return -1;
    //       if (left.time < right.time) return 1;
    //       return 0;
    //     }else if (this.sort[0] == 2 && this.sort[1] == 1) {
    //       if (left.date > right.date) return -1;
    //       if (left.date < right.date) return 1;
    //       if (left.time < right.time) return -1;
    //       if (left.time > right.time) return 1;
    //       return 0;
    //     }else if (this.sort[0] == 2 && this.sort[1] == 2) {
    //       if (left.date > right.date) return -1;
    //       if (left.date < right.date) return 1;
    //       if (left.time > right.time) return -1;
    //       if (left.time < right.time) return 1;
    //       return 0;
    //     }

    //   })
    //   console.log(this.all_tab)
    // })
  }

  sortStatus(myEvent, number) {
    let popover = this.popcontroller.create(ProgressFilterComponent, {
      number: number,
    });
    popover.present({
      ev: myEvent,
    });
  }
  sortBox(myEvent, number) {
    let popover = this.popcontroller.create(ProgressFilterComponent, {
      number: number,
      sort_condition: this.sort_condition,
    });
    popover.present({
      ev: myEvent,
    });
  }
  addSort() {
    this.sort_condition.push({
      p1: "",
      p1_arr: [
        "客戶",
        "場所",
        "案件類型",
        "案件類型",
        "日期",
        "時間",
        "拍攝者",
        "主階段",
        "子階段",
        "項目",
      ],
      p2: "",
      p2_arr: ["Z-A", "A-Z"],
    });
  }

  //工務補上傳
  reUpload(none) {
    if (none == "None") {
      var tmp_a = ["客戶", "場所", "案件類型", "主階段", "子階段"];
      var tmp_b = [
        this.input_client_name,
        this.input_case_name,
        this.input_case_type,
        this.input_main_section,
        this.input_sec_section,
      ];
      var status = true;
      for (let i = 0; i < tmp_a.length; i++) {
        if (tmp_b[i] == "") {
          status = false;
          alert("請篩選完整'客戶,場所,類型,主階段,子階段'");
          break;
        }
      }
    } else {
      const modal = this.modalCtrl.create(
        "ReUploadPicPage",
        {
          client_name: this.input_client_name,
          case_name: this.input_case_name,
          case_type: this.input_case_type,
          main_section: this.input_main_section,
          sec_section: this.input_sec_section,
        },
        { cssClass: "test-modal3" }
      );
      modal.present();
    }
  }

  deletePic(from, url, serial_number, type, sec_section, main_section) {
    const prompt = this.alertCtrl.create({
      title: "刪除後將無法復原檔案資訊，是否繼續執行?",
      buttons: [
        {
          text: "取消",
          handler: (data) => {
            console.log("取消");
          },
        },
        {
          text: "確定",
          handler: (data) => {
            console.log("確定");
            let load = this.loadingCtrl.create({
              spinner: "hide",
              content: `<img src="assets/imgs/line_loading.gif" />`,
            });
            load.present();
            if (from == "web") {
              var check = [];
              this.All.forEach((e) => {
                if (e["checkbox"] == true) {
                  if (
                    e["account"] == this.user ||
                    this.user == "李惠閔" ||
                    this.user == "洪舒寧" ||
                    this.user == "洪勝華"
                  ) {
                    check.push(true);
                  } else {
                    check.push(false);
                  }
                }
              });
              if (check.indexOf(false) > -1) {
                load.dismiss();
                alert("請勾選您負責的照片");
              } else {
                let formData = new FormData();
                formData.append("All", JSON.stringify(this.All));
                formData.append("platform", from);
                this.network
                  .delete_callback_pic(formData)
                  .then((data) => {
                    console.log(data);
                    alert(data);
                    load.dismiss();
                    this.readPic();
                  })
                  .catch((error) => {
                    alert("系統異常");
                    console.log(error);
                    load.dismiss();
                  });
              }
            } else if (from == "work_mobile") {
              console.log(url);
              console.log(serial_number);
              console.log(type);
              console.log(sec_section);
              console.log(main_section);
              let formData = new FormData();
              formData.append("url", url);
              formData.append("serial_num", serial_number);
              formData.append("type", type);
              formData.append("sec_section", sec_section);
              formData.append("main_section", main_section);
              formData.append("platform", from);
              this.network
                .delete_callback_pic(formData)
                .then((data) => {
                  console.log(data);
                  load.dismiss();
                  this.readPic();
                })
                .catch((error) => {
                  alert("系統異常");
                  console.log(error);
                  load.dismiss();
                });
            }
          },
        },
      ],
    });
    prompt.present();
  }
  // 照片編輯
  editPic(
    url,
    serial_number,
    i,
    main,
    sec,
    project1,
    project2,
    project3,
    note,
    case_name
  ) {
    if (!this.edit_row[i]) {
      this.edit_row[i] = true;
    } else if (this.edit_row[i]) {
      const prompt = this.alertCtrl.create({
        title: "儲存後會覆蓋原本的檔案資訊，是否繼續執行?",
        buttons: [
          {
            text: "取消",
            handler: (data) => {
              console.log("取消");
            },
          },
          {
            text: "確定",
            handler: (data) => {
              console.log("確定");
              let load = this.loadingCtrl.create({
                spinner: "hide",
                content: `<img src="assets/imgs/line_loading.gif" />`,
              });
              load.present();
              let formData = new FormData();
              formData.append("url", url);
              formData.append("serial_number", serial_number);
              formData.append("case_name", case_name);
              formData.append("main_section", main);
              formData.append("sec_section", sec);
              formData.append("project1", project1);
              formData.append("project2", project2);
              formData.append("project3", project3);
              formData.append("note", note);
              formData.append("name", this.user);
              console.log(url);
              console.log(serial_number);
              console.log(case_name);
              console.log(main);
              console.log(sec);
              console.log(project1);
              console.log(project2);
              console.log(project3);
              console.log(note);
              this.network
                .worker_save_edit_pic(formData)
                .then((data) => {
                  console.log(data);
                  load.dismiss();
                  this.readPic();
                })
                .catch((error) => {
                  alert("系統異常");
                  console.log(error);
                  load.dismiss();
                });
            },
          },
        ],
      });
      prompt.present();
      this.edit_row[i] = false;
    }
  }
}
