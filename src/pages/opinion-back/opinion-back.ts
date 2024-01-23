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
 * Generated class for the OpinionBackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-opinion-back",
  templateUrl: "opinion-back.html",
})
export class OpinionBackPage {
  AD_id = "";
  client_name = "";
  client_name2 = "";
  ch_color = ["rgb(68,84,106)", "rgb(205,207,211)", "rgb(205,207,211)"];
  color = ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(0,0,0)"];
  receive = [];
  list = [];
  list2 = [];
  case_name = "";
  serial_num = "";
  section_note = "";
  date = [];
  a = [];
  b = [];
  c = [];
  d = [];
  e = [];
  f = [];
  g = [];
  h = [];
  opnion = [];
  id = "";
  url = [];
  receiver = [];
  fun = "";
  version = [];
  type_case = "";
  opinion_receiver = "";
  subject = "";
  content = "";
  name = "";
  chv = 0;
  history = 0;
  opinion_history = [];
  url_history = [];
  hashtag_1 = [];
  hashtag_2 = [];
  hashtag_3 = [];
  hashtag_4 = [];
  hashtag_5 = [];
  hashtag_6 = [];
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
    this.AD_id = this.navParams.get("id");
    this.client_name = navParams.get("client_name");
    this.case_name = navParams.get("case_name");
    this.serial_num = navParams.get("serial_num");
    this.fun = navParams.get("fun");
    this.name = window.localStorage.getItem("name");
    if (this.fun == "0") {
      this.type_case = "室內裝修";
    } else if (this.fun == "1") {
      this.type_case = "用途變更";
    } else if (this.fun == "3") {
      this.type_case = "新建工程";
    }
    console.log(this.AD_id);
    console.log(this.client_name);
    console.log(this.case_name);
    console.log(this.serial_num);
    console.log(this.fun);
    if (this.client_name != "") {
      this.client_name2 = this.client_name;
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OpinionBackPage");
    this.readOpnionList();
    this.loadOpnionBackList();
    this.loadOpinionHistory();
    this.readSectionNoteDefault();
  }

  readSectionNoteDefault() {
    this.section_note = "";
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_section_note_default.php?serial_num=" +
        this.serial_num +
        "&chv=" +
        this.fun +
        "&section=AD_section_note2"
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

  copyContent(inputElement) {
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
    formdata.append("section", "AD_section_note2");
    formdata.append("callback_date", "");
    formdata.append("main_section", "圖資準備");
    formdata.append("sec_section", "意見回饋");
    formdata.append("name", this.name);
    console.log(this.client_name);
    console.log(this.case_name);
    this.network
      .save_section_note(formdata)
      .then((data) => {
        loading.dismissAll();
        alert("作業完成");
        this.event.publish("main_listen");
        this.navCtrl.pop();
      })
      .catch((err) => {
        alert("系統錯誤");
        console.log(err);
        loading.dismissAll();
      });
  }

  chType(num) {
    let i = 0;
    this.ch_color.forEach((element) => {
      this.ch_color[i] = "rgb(205,207,211)";
      this.color[i] = "rgb(0,0,0)";
      i = i + 1;
    });
    this.ch_color[num] = "rgb(68,84,106)";
    this.color[num] = "rgb(255,255,255)";
    this.chv = num;
  }

  change() {
    if (this.history == 0) {
      this.history = 1;
    } else if (this.history == 1) {
      this.history = 0;
    }
  }

  readOpnionList() {
    this.list = [];
    this.list2 = [];
    this.date = [];
    this.version = [];
    this.receiver = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_outuser_tab.php?switch=" +
        this.serial_num
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      result["date"].forEach((e, i) => {
        this.list.push({
          type: e["type"],
          item: e["item"],
          person: e["person"],
          date: e["date"],
          opnion: "",
          version: "",
        });
        if (result["opnion"] != null) {
          for (let ii = 0; ii < result["opnion"].length; ii++) {
            if (
              e["type"] == result["opnion"][ii]["type"] &&
              e["item"] == result["opnion"][ii]["item"]
            ) {
              this.list[i]["opnion"] = result["opnion"][ii]["opnion"];
            }
          }
        }

        for (let iii = 0; iii < result["Version"].length; iii++) {
          // var a =  result['Version'][iii].split('_')[9]
          var b = result["Version"][iii].split("_")[1];
          var c = result["Version"][iii].split("_")[2];
          if (e["item"] == c && e["type"] == b) {
            this.list[i]["version"] = result["Version"][iii].split("_")[3];
          }
        }
        // if(result['opnion'][i] !=null || result['opnion'][i] !=undefined ){
        //   this.opnion.push(e['type']+('-')+e['item']+('-')+result['opnion'][i])
        // }else{
        //   this.opnion.push('')
        // }
        if (this.receiver.indexOf(e["person"]) == -1) {
          this.receiver.push(e["person"]);
        }
      });

      this.id = result["id"];
      if (result["url"] != null) {
        this.url = result["url"];
      }
      console.log(this.opnion);
      console.log(this.list);
    });
  }

  loadOpnionBackList() {
    this.a = [];
    this.b = [];
    this.c = [];
    this.d = [];
    this.e = [];
    this.f = [];
    this.g = [];
    this.h = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_opnion_back_list.php"
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.a = result["a"];
      this.b = result["b"];
      this.c = result["c"];
      this.d = result["d"];
      this.e = result["e"];
      this.f = result["f"];
      this.g = result["g"];
      this.h = result["h"];
      console.log(this.a);
    });
  }

  loadOpinionHistory() {
    this.opinion_history = [];
    this.url_history = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_opinion_history.php?serial_num=" +
        this.serial_num
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);

      this.opinion_history = result["data"];
      this.url_history = result["url"];
    });
  }
  createCheckbox(
    event,
    AD_list_type,
    AD_list_item,
    AD_uploader,
    AD_version,
    AD_opinion,
    url
  ) {
    if (event.value == true) {
      this.hashtag_1.push(AD_list_type);
      this.hashtag_2.push(AD_list_item);
      this.hashtag_3.push(AD_uploader);
      this.hashtag_4.push(AD_version);
      this.hashtag_5.push(AD_opinion);
      this.hashtag_6.push(url);
    } else {
      const index = this.hashtag_1.indexOf(AD_list_type, 0);
      if (index > -1) {
        this.hashtag_1.splice(index, 1);
        this.hashtag_2.splice(index, 1);
        this.hashtag_3.splice(index, 1);
        this.hashtag_4.splice(index, 1);
        this.hashtag_5.splice(index, 1);
        this.hashtag_6.splice(index, 1);
      }
    }
    console.log(this.hashtag_1);
    console.log(this.hashtag_2);
    console.log(this.hashtag_3);
    console.log(this.hashtag_4);
    console.log(this.hashtag_5);
    console.log(this.hashtag_6);
  }

  sendFileMail() {
    let load = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    load.present();
    let formData = new FormData();
    formData.append("serial_num", this.serial_num);
    formData.append("fun", this.fun);
    // formData.append('opnion',JSON.stringify(this.opnion))
    formData.append("list2", JSON.stringify(this.list));
    // formData.append('version',JSON.stringify(this.version))
    formData.append("url", JSON.stringify(this.url));
    formData.append("name", window.localStorage.getItem("name"));
    formData.append("client_name", this.client_name);
    formData.append("case_name", this.case_name);

    formData.append("hashtag_1", JSON.stringify(this.hashtag_1));
    formData.append("hashtag_2", JSON.stringify(this.hashtag_2));
    formData.append("hashtag_3", JSON.stringify(this.hashtag_3));
    formData.append("hashtag_4", JSON.stringify(this.hashtag_4));
    formData.append("hashtag_5", JSON.stringify(this.hashtag_5));
    formData.append("hashtag_6", JSON.stringify(this.hashtag_6));

    formData.append("opinion_receiver", this.opinion_receiver);
    formData.append("subject", this.subject);
    formData.append("content", this.content);

    console.log(this.list);
    console.log(this.hashtag_6);
    this.network
      .save_opnion_sql_and_email(formData)
      .then((data) => {
        alert(data);
        console.log(data);
        load.dismiss();
        // this.event.publish('main_listen')
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
        // this.navCtrl.pop()
      })
      .catch((error) => {
        alert("系統異常");
        console.log(error);
        load.dismiss();
      });
  }
  view(item_type, type) {
    const modal = this.modalCtrl.create(
      "S1ViewPage",
      { item_type: item_type, type: type, id: this.id, AD_url: this.url },
      { cssClass: "test-modal3" }
    );
    modal.present();
    // console.log(this.url)
  }
  viewHistory(item_type, type, url) {
    const modal = this.modalCtrl.create(
      "S1ViewPage",
      { item_type: item_type, type: type, id: this.id, AD_url: url },
      { cssClass: "test-modal3" }
    );
    modal.present();
  }
}
