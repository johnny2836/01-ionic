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
 * Generated class for the PaperMail2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-paper-mail2",
  templateUrl: "paper-mail2.html",
})
export class PaperMail2Page {
  ch_color = [
    "rgb(68,84,106)",
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
  ];
  ch_color2 = ["rgb(205,207,211)", "rgb(68,84,106)"];
  color2 = ["rgb(0,0,0)", "rgb(255,255,255)"];

  fun = "";
  AD_id = "";
  client_name = "";
  case_name = "";
  serial_num = "";
  case_type = "";
  part = "a";
  all_paper = [];
  checkbox = [];
  paper = [];
  yy = [];
  act = 1;
  mail_arr = [];
  name_arr = "";
  subject = "";
  content = "";
  group = "";
  actual_use = "";
  deadline = "";
  note = "";
  name = "";
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
    console.log("ionViewDidLoad UploadP1Page");
    this.loadPaper();
    this.mail();
    this.readSectionNoteDefault();
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
        this.mail_arr[i] = e["mail"];
      });
      this.name_arr = a[a.length - 1];
      console.log(this.name_arr);
      console.log(this.mail_arr);
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

  loadPaper() {
    this.all_paper = [];
    this.checkbox = [];
    this.yy = [];
    this.group = "";
    this.actual_use = "";
    this.deadline = "";
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_paper_tab2.php?client_name=" +
        this.client_name +
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
      result["all_paper"].forEach((element) => {
        this.all_paper.push(element);
        this.yy.push(false);
      });
      this.checkbox = result["checkbox"];
      this.group = result["group"];
      this.actual_use = result["actual_use"];

      console.log(this.all_paper);
      console.log(this.checkbox);

      if (this.group != "" && this.actual_use != "") {
        this.people();
      }
    });
  }
  people() {
    var check = false;
    if (Object.keys(this.checkbox).indexOf(this.group) > -1) {
      if (Object.keys(this.checkbox[this.group]).length > 1) {
        Object.keys(this.checkbox[this.group]).forEach((e1, i) => {
          if (e1.indexOf(this.actual_use) > -1) {
            this.checkbox[this.group][e1]["checkbox"].forEach((e2, i) => {
              this.yy[i] = e2;
            });
            this.deadline = this.checkbox[this.group][e1]["申報期限"];
            check = true;
          }
        });
      } else {
        if (
          Object.keys(this.checkbox[this.group]).indexOf(this.actual_use) > -1
        ) {
          this.checkbox[this.group][
            Object.keys(this.checkbox[this.group])[
              Object.keys(this.checkbox[this.group]).indexOf(this.actual_use)
            ]
          ]["checkbox"].forEach((e, i) => {
            this.yy[i] = e;
          });
          this.deadline =
            this.checkbox[this.group][
              Object.keys(this.checkbox[this.group])[
                Object.keys(this.checkbox[this.group]).indexOf(this.actual_use)
              ]
            ]["申報期限"];
          check = true;
        }
      }
    } else {
      Object.keys(this.checkbox).forEach((e, i) => {
        if (e.split("-")[0] == this.group.split("-")[0]) {
          Object.keys(this.checkbox[e]).forEach((e2, i2) => {
            if (e2.indexOf(this.actual_use) > -1 || e2 == this.actual_use) {
              this.checkbox[e][e2]["checkbox"].forEach((e3, i3) => {
                this.yy[i3] = e3;
              });
              this.deadline = this.checkbox[e][e2]["申報期限"];
              check = true;
            }
          });
        }
      });
    }
    if (!check) {
      alert('無符合"實際用途"與"類組"');
    }
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
    formdata.append("case_type", this.case_type);
    formdata.append("name_arr", this.name_arr);
    formdata.append("mail_arr", JSON.stringify(this.mail_arr));
    formdata.append("subject", this.subject);
    formdata.append("content", this.content);
    formdata.append("name", window.localStorage.getItem("name"));
    formdata.append("deadline", this.deadline);
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
      .send_paper_mail2(formdata)
      .then((data) => {
        loading.dismissAll();
        alert(data);
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
    formdata.append("section", "AD_section_note1");
    formdata.append("callback_date", "");
    formdata.append("main_section", "文件索取");
    formdata.append("sec_section", "");
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
        "&section=AD_section_note1"
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
}
