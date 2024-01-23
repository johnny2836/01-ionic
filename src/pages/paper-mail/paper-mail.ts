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
 * Generated class for the PaperMailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-paper-mail",
  templateUrl: "paper-mail.html",
})
export class PaperMailPage {
  ch_color = [
    "rgb(68,84,106)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
    "rgb(205,207,211)",
  ];
  color = ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(0,0,0)", "rgb(0,0,0)"];
  ch_color2 = ["rgb(205,207,211)", "rgb(68,84,106)"];
  color2 = ["rgb(0,0,0)", "rgb(255,255,255)"];

  AD_id = "";
  all_paper = [];
  where = "";
  case_type = "";
  list = "";
  chv = 0;
  checkbox = [];
  fun = "";
  yy = [];
  act = 1;
  client_name = "";
  case_name = "";
  serial_num = "";
  part = "a";
  fun_list = ["室內裝修", "用途變更", "新建工程"];
  city_list = [
    "臺北市",
    "新北市",
    "桃園市",
    "臺中市",
    "臺南市",
    "高雄市",
    "宜蘭縣",
    "新竹縣",
    "苗栗縣",
    "彰化縣",
    "南投縣",
    "雲林縣",
    "嘉義縣",
    "屏東縣",
    "花蓮縣",
    "臺東縣",
    "澎湖縣",
    "基隆市",
    "新竹市",
    "嘉義市",
    "金門縣",
    "連江縣",
  ];
  version_A = ["", "室內裝修核准版", "室內裝修平行掛件版"];
  version_B = [
    "",
    "變更設計核准版",
    "變更設計平行掛件版",
    "變更使用核准版",
    "變更使用平行掛件版",
    "變更使用併室內裝修核准版",
    "變更使用併室內裝修平行掛件版",
    "變更使用併室內裝修變更核准、室裝平行掛件版",
  ];
  version_C = [
    "",
    "新建工程核准版",
    "新建工程平行掛件版",
    "增建工程核准版",
    "增建工程平行掛件版",
    "增建併變更使用平行掛件版",
  ];
  note = "";
  name_arr = "";
  mail_arr = [];
  subject = "";
  content = "";
  name = "";
  paper = [];
  edit_arr = 0;
  new_list = [];
  user = "";
  character = "";
  depart = "";
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
    this.character = window.localStorage.getItem("character");
    this.depart = window.localStorage.getItem("depart");

    console.log(this.AD_id);
    console.log(this.fun);
    console.log(this.client_name);
    console.log(this.case_name);
    console.log(this.serial_num);

    if (this.fun == "0") {
      this.case_type = "室內裝修";
    } else if (this.fun == "1") {
      this.case_type = "用途變更";
    } else if (this.fun == "2") {
      this.case_type = "檢修案件";
    } else if (this.fun == "3") {
      this.case_type = "新建工程";
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PaperMailPage");
    this.readNeed();
    this.readSectionNoteDefault();
    this.mail();
  }

  edit_tool(num) {
    if (num == 0) {
      this.new_list.push({
        item_list: "",
        copies: "",
      });
    }
  }

  edit_tool1(action, i) {
    console.log(action);
    console.log(i);
    console.log(this.new_list[i]);
    if (action == "add") {
      this.new_list.push({
        item_list: "",
        copies: "",
      });
    }
    if (action == "minus") {
      this.new_list.splice(i, 1);
      console.log(this.new_list);
    }
    if (action == "save") {
      console.log(this.new_list[i]);
      var check = true;
      if (this.where == "") {
        alert("請選擇區域");
        check = false;
      }
      if (this.case_type == "") {
        alert("請選擇案件類型");
        check = false;
      }
      if (this.list == "") {
        alert("請選擇核准版本");
        check = false;
      }
      if (
        this.new_list[i]["copies"] == "" ||
        this.new_list[i]["item_list"] == ""
      ) {
        alert("請輸入完整資訊");
        check = false;
      }
      if (check) {
        let loading = this.loadingCtrl.create({
          spinner: "hide",
          content: `<img src="assets/imgs/line_loading.gif" />`,
        });
        loading.present();
        var formdata = new FormData();
        formdata.append("new_list", JSON.stringify(this.new_list[i]));
        formdata.append("city", this.where);
        formdata.append("case_type", this.case_type);
        formdata.append("version", this.list);
        this.network
          .save_apply_tab1_add(formdata)
          .then((data) => {
            loading.dismissAll();
            this.new_list.splice(i, 1);
            this.readNeed();
            this.people();
            alert("新增成功");
          })
          .catch((err) => {
            alert("系統錯誤");
            console.log(err);
            loading.dismissAll();
          });
      }
    }
  }

  edit_tool2() {
    if (this.edit_arr == 0) {
      this.edit_arr = 1;
    } else if (this.edit_arr == 1) {
      console.log(this.all_paper);
      this.edit_arr = 0;
      let loading = this.loadingCtrl.create({
        spinner: "hide",
        content: `<img src="assets/imgs/line_loading.gif" />`,
      });
      loading.present();
      var formdata = new FormData();
      formdata.append("city", this.where);
      formdata.append("case_type", this.case_type);
      formdata.append("version", this.list);
      formdata.append("all_paper", JSON.stringify(this.all_paper));
      this.network
        .save_apply_tab1_edit(formdata)
        .then((data) => {
          loading.dismissAll();
          this.readNeed();
          alert("編輯成功");
        })
        .catch((err) => {
          alert("系統錯誤");
          console.log(err);
          loading.dismissAll();
        });
    }
  }

  edit_tool3() {
    console.log(this.yy);
    console.log(this.all_paper);
    let message = "是否刪除已選取之項目?"; // message : 視窗出現的文字
    var check = confirm(message); // check : 收集回應(true/false)
    if (check) {
      let loading = this.loadingCtrl.create({
        spinner: "hide",
        content: `<img src="assets/imgs/line_loading.gif" />`,
      });
      var formdata = new FormData();
      formdata.append("city", this.where);
      formdata.append("case_type", this.case_type);
      formdata.append("version", this.list);
      formdata.append("yy", JSON.stringify(this.yy));
      formdata.append("all_paper", JSON.stringify(this.all_paper));
      this.network
        .save_apply_tab1_delete(formdata)
        .then((data) => {
          loading.dismissAll();
          this.readNeed();
          alert("刪除成功");
        })
        .catch((err) => {
          alert("系統錯誤");
          console.log(err);
          loading.dismissAll();
        });
    }
  }

  mail() {
    this.event.subscribe("mail_listen2", (mail_arr) => {
      console.log(mail_arr);
      let ii = 0;
      var a = [];
      mail_arr.mail.forEach((e, i) => {
        if (i == 0) {
          a[i] = e["company"] + "-" + e["name"];
        } else {
          a[i] = a[ii] + "," + e["company"] + "-" + e["name"];

          ii++;
        }
        // this.name_arr[i] = e['company'] +'-'+ e['name']
        this.mail_arr[i] = e["mail"];
      });
      this.name_arr = a[a.length - 1];
      console.log(this.name_arr);
      console.log(this.mail_arr);
    });
  }
  action(number) {
    let i = 0;
    this.ch_color2.forEach((element) => {
      this.ch_color2[i] = "rgb(205,207,211)";
      this.color2[i] = "rgb(0,0,0)";
      i = i + 1;
    });
    this.ch_color2[number] = "rgb(68,84,106)";
    this.color2[number] = "rgb(255,255,255)";
    this.act = number;
  }
  chType(number) {
    let i = 0;
    this.ch_color.forEach((element) => {
      this.ch_color[i] = "rgb(205,207,211)";
      this.color[i] = "rgb(0,0,0)";
      i = i + 1;
    });
    this.ch_color[number] = "rgb(68,84,106)";
    this.color[number] = "rgb(255,255,255)";
    this.fun = number;
  }
  load() {
    // this.case_type = ''
    this.readNeed();
  }
  load2() {
    this.list = "";
    for (let i = 0; i < this.all_paper.length; i++) {
      this.yy[i] = false;
    }
  }
  people() {
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_paper_tab_checkbox.php?city=" +
        this.where +
        "&case_type=" +
        this.case_type +
        "&version=" +
        this.list
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      if (result != "") {
        this.all_paper.forEach((e1, i1) => {
          result.forEach((e2, i2) => {
            if (e1["item_list"] == e2["item_list"]) {
              this.yy[i1] = true;
            }
          });
        });
        // result.forEach((element,index) => {
        //   Object.keys(element).forEach((element1,index)=>{
        //     if (this.list == element1) {
        //       this.yy = element[this.list]
        //     }
        //   })
        // });
      }
      console.log(this.yy);
    });
  }

  readNeed() {
    this.all_paper = [];
    this.checkbox = [];
    this.yy = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_paper_tab.php?city=" +
        this.where
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      result.forEach((element, i) => {
        this.yy.push(false);
        this.all_paper.push(element);
      });

      console.log(this.all_paper);
    });
  }

  goPart(num) {
    this.part = num;
  }

  save() {
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
    formdata.append("section_note", this.note);
    formdata.append("section", "AD_section_note7");
    formdata.append("callback_date", "");
    formdata.append("main_section", "設計繪圖");
    formdata.append("sec_section", "用印申請");
    formdata.append("name", this.name);
    console.log(this.client_name);
    console.log(this.case_name);
    this.network
      .save_section_note(formdata)
      .then((data) => {
        loading.dismissAll();
        alert("作業完成");
        if (this.case_type == "室內裝修") {
          this.event.publish("type1_first_run");
        } else if (this.case_type == "用途變更") {
          this.event.publish("type2_first_run");
        } else if (this.case_type == "檢修案件") {
          this.event.publish("type3_first_run");
        } else if (this.case_type == "新建工程") {
          this.event.publish("type4_first_run");
        } else if (this.case_type == "修繕案件") {
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

  readSectionNoteDefault() {
    this.note = "";
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_section_note_default.php?serial_num=" +
        this.serial_num +
        "&chv=" +
        this.fun +
        "&section=AD_section_note7"
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.note = result["note"][0];
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
        part: "just_mail",
      },
      { cssClass: "test-modal" }
    );
    modal.present();
  }
  sendFileMail() {
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
    formdata.append("name_arr", this.name_arr);
    formdata.append("mail_arr", JSON.stringify(this.mail_arr));
    formdata.append("subject", this.subject);
    formdata.append("content", this.content);
    formdata.append("name", window.localStorage.getItem("name"));
    this.all_paper.forEach((e, i) => {
      if (this.yy[i] == true) {
        this.paper.push({
          item: e[0],
          num: e[1],
        });
      }
    });
    formdata.append("paper", JSON.stringify(this.paper));
    this.network
      .send_paper_mail(formdata)
      .then((data) => {
        loading.dismissAll();
        alert("作業完成");
        if (this.case_type == "室內裝修") {
          this.event.publish("type1_first_run");
        } else if (this.case_type == "用途變更") {
          this.event.publish("type2_first_run");
        } else if (this.case_type == "檢修案件") {
          this.event.publish("type3_first_run");
        } else if (this.case_type == "新建工程") {
          this.event.publish("type4_first_run");
        } else if (this.case_type == "修繕案件") {
          this.event.publish("type5_first_run");
        }
        // this.navCtrl.pop()
      })
      .catch((err) => {
        alert("系統錯誤");
        console.log(err);
        loading.dismissAll();
      });
  }
}
