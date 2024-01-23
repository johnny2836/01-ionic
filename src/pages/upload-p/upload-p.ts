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
import { elementAt } from "rxjs/operator/elementAt";

/**
 * Generated class for the UploadPPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-upload-p",
  templateUrl: "upload-p.html",
})
export class UploadPPage {
  load1: any;
  AD_id = "";
  fun = "";
  type_case = "";
  type_case1 = "";
  case_name = "";
  section_note = "";
  yy = [];
  all_paper = [];
  checkbox = [];
  checkbox1 = [];
  chv = "";
  // ch_color = ['rgb(68,84,106)','rgb(205,207,211)','rgb(205,207,211)','rgb(205,207,211)']
  color = ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(0,0,0)", "rgb(0,0,0)"];
  ch_color1 = [
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
  color1 = [
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
  ch_color2 = ["rgb(205,207,211)", "rgb(68,84,106)"];
  color2 = ["rgb(0,0,0)", "rgb(255,255,255)"];
  fun_list = ["室內裝修", "用途變更", "檢修案件", "新建工程"];
  client_name = "";
  client_name2 = "";
  receive = [];
  receive_per = [];
  receive_per1 = [];
  receive_per2 = [];
  receive_per3 = [];
  receive_per4 = [];
  receive_per5 = [];
  receive_per6 = [];
  receive_per7 = [];
  receive_per8 = [];
  receive_per9 = [];
  receive_mail = [];
  subject = "";
  content = "";
  C_1 = [];
  C_2 = [];
  C_3 = [];
  C_4 = [];
  up_url = [];
  part = "a";
  click = ["0", "0", "0", "0"];
  get_character = [];
  get_who1 = [];
  get_who2 = [];
  receive_tab = [];
  bar = [];
  C_name = "";
  serial_num = "";
  data1 = [];
  data2 = [];
  data3 = [];
  data4 = [];
  aa = [];
  company_ch = "";
  company = [];
  data6 = [];
  C_name2 = "";
  mail_arr = [];
  company_arr = [];
  name_arr = [];
  ch = [];
  all_ch = [
    "客戶",
    "業主",
    "建築師",
    "設計師",
    "電機技師",
    "消防公司",
    "營造廠",
    "水電公司",
    "裝修公司",
    "瑞恩消防",
  ];
  person = [];
  all_client_data = [];
  data6_1 = [];
  receive_per_1 = [];
  all_client_data_1 = [];
  all_paper_1 = [];
  data6_2 = [];
  receive_per_2 = [];
  all_client_data_2 = [];
  name = "";
  name2_mail = "";
  name2_com = "";
  C_mail = "";
  mail_id = "";
  C_mail2 = "";
  s_item = [];
  cut_status = [];
  self_add = [];
  add_data = [];
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
  ) {
    this.fun = this.navParams.get("fun");
    this.AD_id = this.navParams.get("id");
    this.client_name = navParams.get("client_name");
    this.case_name = navParams.get("case_name");
    this.serial_num = navParams.get("serial_num");
    this.name = window.localStorage.getItem("name");
    console.log(this.AD_id);
    console.log(typeof this.fun);
    console.log(this.client_name);
    console.log(this.case_name);
    console.log(this.serial_num);
    if (this.client_name != "") {
      this.client_name2 = this.client_name;
    }
    if (this.fun == "0") {
      this.type_case = "室內裝修";
    } else if (this.fun == "1") {
      this.type_case = "用途變更";
    } else if (this.fun == "3") {
      this.type_case = "新建工程";
    }
    console.log(this.type_case);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UploadPPage");
    this.readTab();
    // this.loadReceive()
    this.defult();
    this.readCsDropdownlist();
    this.mailListen();
    this.readSectionNoteDefault();

    this.event.subscribe("mail_choose", (mail_arr) => {
      console.log(mail_arr);
      var a = [];
      mail_arr.forEach((e, i) => {
        this.name_arr[i] = e["company"] + "-" + e["name"];
        this.mail_arr[i] = e["mail"];
      });
      console.log(this.name_arr);
      console.log(this.mail_arr);
    });
  }

  readSectionNoteDefault() {
    this.section_note = "";
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_section_note_default.php?serial_num=" +
        this.serial_num +
        "&chv=" +
        this.fun +
        "&section=AD_section_note1"
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.section_note = result["note"][0];
    });
  }

  mailListen() {
    this.event.subscribe("mail_listen", (data) => {
      console.log("success");
      this.mailNextDefault();
    });
  }
  selectProvidCom1(company, i, from) {
    return new Promise((resolve, reject) => {
      if (from == "預設") {
        this.all_paper[i]["person"] = "";
        this.receive_per[i] = [""];
        if (company != undefined && company != null) {
          var a: any;
          var b: any;
          if (this.all_paper[i]["ch"] == "瑞恩消防") {
            a = 0;
            b = 1;
          } else {
            a = "AD_client_name";
            b = "AD_main";
          }
          this.data6[i].forEach((element) => {
            if (this.all_paper[i]["company"] == element[a]) {
              this.all_paper[i]["company"] = element[a];
            }
          });
          this.all_client_data[i].forEach((e, jj) => {
            if (e[a] == this.all_paper[i]["company"]) {
              this.receive_per[i].push(e[b]);
            }
          });
        }
        resolve(1);
      } else if (from == "自訂") {
        this.add_data[i]["person"] = "";
        this.receive_per_1[i] = [""];
        if (company != undefined && company != null) {
          var a: any;
          var b: any;
          if (this.add_data[i]["ch"] == "瑞恩消防") {
            a = 0;
            b = 1;
          } else {
            a = "AD_client_name";
            b = "AD_main";
          }
          this.data6_1[i].forEach((element) => {
            if (this.add_data[i]["company"] == element[a]) {
              this.add_data[i]["company"] = element[a];
            }
          });
          this.all_client_data_1[i].forEach((e, jj) => {
            if (e[a] == this.add_data[i]["company"]) {
              this.receive_per_1[i].push(e[b]);
            }
          });
        }
        resolve(1);
      } else if (from == "已自訂") {
        this.all_paper_1[i]["person"] = "";
        this.receive_per_2[i] = [""];
        if (company != undefined && company != null) {
          var a: any;
          var b: any;
          if (this.all_paper_1[i]["ch"] == "瑞恩消防") {
            a = 0;
            b = 1;
          } else {
            a = "AD_client_name";
            b = "AD_main";
          }
          this.data6_2[i].forEach((element) => {
            if (this.all_paper_1[i]["company"] == element[a]) {
              this.all_paper_1[i]["company"] = element[a];
            }
          });
          this.all_client_data_2[i].forEach((e, jj) => {
            if (e[a] == this.all_paper_1[i]["company"]) {
              this.receive_per_2[i].push(e[b]);
            }
          });
        }
        resolve(1);
      }
    });
  }
  loadCompany(ch, i, from) {
    return new Promise((resolve, reject) => {
      if (from == "預設") {
        this.data6[i] = [];
        this.receive_per[i] = [];
        this.all_paper[i]["company"] = "";
        this.all_paper[i]["person"] = "";
        this.all_client_data[i] = [];
        let data: Observable<any>;
        data = this.http.get(
          "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_provid_ch.php?provid_ch=" +
            ch
        );
        data.subscribe((result) => {
          result = JSON.stringify(result);
          result = JSON.parse(result);
          if (result == null) {
            result = [];
          }
          this.all_client_data[i] = result;
          var tmp = [];
          if (ch == "瑞恩消防") {
            for (let ii = 0; ii < result.length; ii++) {
              if (tmp.indexOf(result[ii][0]) == -1) {
                tmp.push(result[ii][0]);
              }
            }
          } else {
            for (let ii = 0; ii < result.length; ii++) {
              if (tmp.indexOf(result[ii]["AD_client_name"]) == -1) {
                tmp.push(result[ii]["AD_client_name"]);
              }
            }
          }
          this.data6[i] = tmp;
          resolve(1);
        });
      } else if (from == "自訂") {
        this.data6_1[i] = [];
        this.receive_per_1[i] = [];
        this.add_data[i]["company"] = "";
        this.add_data[i]["person"] = "";
        this.all_client_data_1[i] = [];
        let data: Observable<any>;
        data = this.http.get(
          "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_provid_ch.php?provid_ch=" +
            ch
        );
        data.subscribe((result) => {
          result = JSON.stringify(result);
          result = JSON.parse(result);
          if (result == null) {
            result = [];
          }
          this.all_client_data_1[i] = result;
          var tmp = [];
          if (ch == "瑞恩消防") {
            for (let ii = 0; ii < result.length; ii++) {
              if (tmp.indexOf(result[ii][0]) == -1) {
                tmp.push(result[ii][0]);
              }
            }
          } else {
            for (let ii = 0; ii < result.length; ii++) {
              if (tmp.indexOf(result[ii]["AD_client_name"]) == -1) {
                tmp.push(result[ii]["AD_client_name"]);
              }
            }
          }
          this.data6_1[i] = tmp;

          resolve(1);
        });
      } else if (from == "已自訂") {
        this.data6_2[i] = [];
        this.receive_per_2[i] = [];
        this.all_paper_1[i]["company"] = "";
        this.all_paper_1[i]["person"] = "";
        this.all_client_data_1[i] = [];
        let data: Observable<any>;
        data = this.http.get(
          "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_provid_ch.php?provid_ch=" +
            ch
        );
        data.subscribe((result) => {
          result = JSON.stringify(result);
          result = JSON.parse(result);
          if (result == null) {
            result = [];
          }
          this.all_client_data_2[i] = result;
          var tmp = [];
          if (ch == "瑞恩消防") {
            for (let ii = 0; ii < result.length; ii++) {
              if (tmp.indexOf(result[ii][0]) == -1) {
                tmp.push(result[ii][0]);
              }
            }
          } else {
            for (let ii = 0; ii < result.length; ii++) {
              if (tmp.indexOf(result[ii]["AD_client_name"]) == -1) {
                tmp.push(result[ii]["AD_client_name"]);
              }
            }
          }
          this.data6_2[i] = tmp;

          resolve(1);
        });
      }
      // reject(res)
    });
  }
  readCsDropdownlist() {
    this.data1 = [];
    this.data2 = [];
    this.data3 = [];
    this.data4 = [];
    this.aa = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_add_option.php?case_type=none"
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      this.data1 = result["data1"];
      this.data2 = result["data2"];
      // this.data3 = result['data3']
      this.data4 = result["data4"];
      // this.data3.forEach(element=>{
      //   if (element.indexOf('設計部')>-1) {
      //     this.aa.push(element)
      //   }
      // })
      console.log(this.aa);
    });
  }

  defult() {
    this.yy = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/s1_defult.php?serial_num=" +
        this.serial_num
    );
    data.subscribe(async (result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      if (result["ee"] != null) {
        for (let i = 0; i < this.all_paper.length; i++) {
          for (let j = 0; j < result["ee"].length; j++) {
            if (
              this.all_paper[i]["type"] == result["ee"][j]["type"] &&
              this.all_paper[i]["item"] == result["ee"][j]["item"]
            ) {
              this.all_paper[i]["checkbox"] = result["ee"][j]["checkbox"];
              this.all_paper[i]["ch"] = result["ee"][j]["ch"];
              await this.loadCompany(this.all_paper[i]["ch"], i, "預設");
              this.all_paper[i]["company"] = result["ee"][j]["company"];
              await this.selectProvidCom1(
                this.all_paper[i]["company"],
                i,
                "預設"
              );
              this.all_paper[i]["person"] = result["ee"][j]["person"];

              break;
            }
          }
        }
      }
    });
  }

  mailNextDefault() {
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/s1_mail_defult.php?receive=" +
        this.C_name +
        "&serial_num=" +
        this.serial_num
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      // this.subject = result['aa']
      this.mail_id = result["id"];
      this.content = result["bb"];
      this.C_name = result["cc"]; //收件人
      this.C_mail = result["dd"]; //MAIL
      this.C_name2 = result["ee"]; //附件人
      this.C_mail2 = result["ff"]; //附件人MAIL
    });
  }
  chType(number) {
    this.click[number] = "1";
    this.chv = number;
    this.fun = number;
    let i = 0;
    if (number != 3) {
      this.people();
    } else if (number == 3) {
      this.yy = [false, false, false, false, false, false, false, false];
    }
  }
  chType1(number) {
    this.click[number] = "0";
    this.yy = [false, false, false, false, false, false, false, false];
  }
  chType3(number) {
    let i = 0;
    this.ch_color1.forEach((element) => {
      this.ch_color1[i] = "rgb(205,207,211)";
      this.color1[i] = "rgb(0,0,0)";
      i = i + 1;
    });
    this.ch_color1[number] = "rgb(68,84,106)";
    this.color1[number] = "rgb(255,255,255)";
    this.C_name = this.bar[number];
    console.log(this.C_name);
    this.mailNextDefault();
  }
  chType1A() {
    this.ch_color1 = ["rgb(68,84,106)", "rgb(205,207,211)"];
    this.color1 = ["rgb(255,255,255)", "rgb(0,0,0)"];
  }
  chType1B() {
    this.ch_color1 = ["rgb(205,207,211)", "rgb(68,84,106)"];
    this.color1 = ["rgb(0,0,0)", "rgb(255,255,255)"];
  }

  people() {
    this.yy = [];
    let i = 0;
    this.checkbox[this.fun_list[this.fun]].forEach((element) => {
      if (element == 1) {
        this.yy[i] = true;
      } else {
        this.yy[i] = false;
        this.get_who1[i] = "";
      }
      i++;
    });
    console.log(this.checkbox[this.fun_list[this.fun]]);
  }

  readTab() {
    this.all_paper = [];
    this.all_paper_1 = [];
    this.checkbox = [];
    this.yy = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_upload_tab.php?id=" +
        this.serial_num
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      result["all_paper"].forEach((element) => {
        this.all_paper.push({
          checkbox: false,
          type: element[0],
          item: element[1],
          ch: "",
          company: "",
          person: "",
        });
        // this.all_paper.push(element)
        // this.yy.push(false)
      });
      if (result["add_arr"] != "") {
        JSON.parse(result["add_arr"]).forEach((e) => {
          var a = false;
          if (e["checkbox"] == true) {
            a = true;
          }
          this.all_paper_1.push({
            checkbox: a,
            type: e["type"],
            item: e["item"],
            ch: e["ch"],
            company: e["company"],
            person: e["person"],
          });
        });
      }
      this.checkbox = result["checkbox"];
      this.checkbox1 = result["checkbox1"];

      console.log(this.all_paper);
      console.log(this.checkbox);
      this.defult();
    });
  }

  chooseMail() {
    const modal = this.modalCtrl.create(
      "ChooseMailPage",
      {
        serial_num: this.serial_num,
        id: this.AD_id,
        fun: this.fun,
        case_name: this.case_name,
        client_name: this.client_name,
        mail_id: this.mail_id,
      },
      { cssClass: "test-modal" }
    );
    modal.present();
  }

  sendMail() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    var formdata = new FormData();
    formdata.append("mail_id", this.mail_id);
    formdata.append("client_name", this.client_name);
    formdata.append("receive", this.C_name);
    formdata.append("mail", this.C_mail);
    formdata.append("case_name", this.case_name);
    formdata.append("serial_num", this.serial_num);
    // formdata.append('get_who1',JSON.stringify(this.bar));
    formdata.append(
      "subject",
      this.client_name + "-" + this.type_case + "消防審查作業圖資索取需求"
    );
    formdata.append("content", this.content);
    formdata.append("type_fun", this.fun);
    formdata.append("attachment_mail", this.C_mail2);
    formdata.append("attachment", this.C_name2);
    formdata.append("name", window.localStorage.getItem("name"));
    console.log(this.client_name);
    console.log(this.name2_mail);
    console.log(this.C_name);
    console.log(this.C_name2);
    console.log(this.case_name);
    console.log(this.serial_num);
    console.log(this.subject);
    console.log(this.content);
    console.log(this.bar);

    console.log(window.localStorage.getItem("name"));
    this.network
      .send_pic_request(formdata)
      .then((data) => {
        loading.dismissAll();
        this.event.publish("main_listen");
        // this.navCtrl.pop()
        alert(data);
        console.log(data);
      })
      .catch((err) => {
        alert("系統異常");
        console.log(err);
        loading.dismissAll();
      });
  }

  mail() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    this.part = "b";
    this.C_name = "";
    this.content = "";
    this.all_paper.forEach((e) => {
      if (e["checkbox"] == true) {
        if (
          this.bar.indexOf(e["ch"] + "-" + e["company"] + "-" + e["person"]) ==
            -1 &&
          e["person"] != ""
        ) {
          this.bar.push(e["ch"] + "-" + e["company"] + "-" + e["person"]);
        }
      }
    });
    this.add_data.forEach((e) => {
      if (e["checkbox"] == true) {
        if (
          this.bar.indexOf(e["ch"] + "-" + e["company"] + "-" + e["person"]) ==
            -1 &&
          e["person"] != ""
        ) {
          this.bar.push(e["ch"] + "-" + e["company"] + "-" + e["person"]);
        }
      }
    });
    this.all_paper_1.forEach((e) => {
      if (e["checkbox"] == true) {
        if (
          this.bar.indexOf(e["ch"] + "-" + e["company"] + "-" + e["person"]) ==
            -1 &&
          e["person"] != ""
        ) {
          this.bar.push(e["ch"] + "-" + e["company"] + "-" + e["person"]);
        }
      }
    });
    console.log(this.bar);
    var formdata = new FormData();
    formdata.append("serial_num", this.serial_num);
    formdata.append("client_name", this.client_name);
    formdata.append("all_paper", JSON.stringify(this.all_paper));
    formdata.append("add_data", JSON.stringify(this.add_data));
    formdata.append("all_paper_1", JSON.stringify(this.all_paper_1));
    formdata.append("bar", JSON.stringify(this.bar));
    this.network
      .save_AD_section1_info_sql(formdata)
      .then((data) => {
        loading.dismissAll();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        loading.dismissAll();
      });
  }

  mail2() {
    this.bar = [];
    this.part = "a";
  }

  note() {
    this.part = "c";
  }
  back_mail() {
    this.part = "b";
  }

  saveSectionNote() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    var formdata = new FormData();
    formdata.append("serial_num", this.serial_num);
    formdata.append("client_name", this.client_name);
    formdata.append("case_name", this.case_name);
    formdata.append("chv", this.fun);
    formdata.append("section_note", this.section_note);
    formdata.append("section", "AD_section_note1");
    formdata.append("callback_date", "");
    formdata.append("main_section", "圖資準備");
    formdata.append("sec_section", "圖資索取");
    formdata.append("name", this.name);
    console.log(this.client_name);
    console.log(this.case_name);
    this.network
      .save_section_note(formdata)
      .then((data) => {
        loading.dismissAll();
        alert("作業完成");
        if (this.type_case == "室內裝修") {
          this.event.publish("type1_first_run");
        } else if (this.type_case == "用途變更") {
          this.event.publish("type2_first_run");
        } else if (this.type_case == "檢修案件") {
          this.event.publish("type3_first_run");
        } else if (this.type_case == "新建工程") {
          this.event.publish("type4_first_run");
        } else if (this.type_case == "修繕案件") {
          this.event.publish("type5_first_run");
        }
        this.navCtrl.pop();
      })
      .catch((err) => {
        alert("系統錯誤");
        console.log(err);
        loading.dismissAll();
      });
  }

  copyContent(inputElement) {
    // if (window.navigator && window.navigator.clipboard){
    // navigator.clipboard.writeText(this.content)
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
    // .then(() => {
    console.log("Text copied to clipboard...");
    document.getElementById("custom-tooltip").style.display = "inline";
    setTimeout(() => {
      document.getElementById("custom-tooltip").style.display = "none";
    }, 500);
    // })
    // .catch(err => {
    //   console.log('Something went wrong', err);
    // })
    // }
  }

  customizeCheck(event, i) {
    if (event.value == true) {
      this.cut_status[i] = true;
      this.add_data[i]["checkbox"] = true;
    } else {
      this.add_data[i]["checkbox"] = false;
      this.cut_status[i] = false;
    }
  }
  pushCdd() {
    this.self_add.push(1);
    this.add_data.push({
      checkbox: true,
      type: "",
      item: "",
      ch: "",
      company: "",
      person: "",
    });
    console.log(this.self_add);
    console.log(this.add_data);
  }
  removeAdd() {
    if (this.add_data.length == 0) {
      console.log("a");
    } else {
      this.self_add.splice(0, 1);
      this.add_data.splice(0, 1);
    }
    // console.log(this.self_add)
    // console.log(this.add_data)
  }
}
