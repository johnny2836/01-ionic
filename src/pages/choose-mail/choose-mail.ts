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
import { isThisTypeNode } from "typescript";

/**
 * Generated class for the ChooseMailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-choose-mail",
  templateUrl: "choose-mail.html",
})
export class ChooseMailPage {
  AD_id = "";
  fun = "";
  client_name = "";
  case_name = "";
  serial_num = "";
  company_ch = "";
  data6 = [];
  data4 = [];
  get_character = "";
  receive_per = [];
  company = "";
  th_a = ["", "公司名稱", "姓名", "手機", "信箱"];
  th_b = ["", "部門", "姓名", "職稱", "手機", "信箱"];
  mail_id = "";
  part = "";
  C_1 = [];
  C_2 = [];
  C_3 = [];
  mail_arr = [];
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
    this.mail_id = navParams.get("mail_id");
    this.part = this.navParams.get("part");
    console.log(this.AD_id);
    console.log(this.fun);
    console.log(this.client_name);
    console.log(this.case_name);
    console.log(this.serial_num);
    console.log(this.mail_id);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChooseMailPage");
    this.readCsDropdownlist();
  }

  loadCompany() {
    this.data6 = [];
    this.receive_per = [];
    this.get_character = "";
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_select_mail_company.php?provid_ch=" +
        this.company_ch
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      if (result["data"] != null) {
        result["data"].forEach((e) => {
          if (this.data6.indexOf(e["AD_client_name"]) == -1) {
            this.data6.push(e["AD_client_name"]);
          }
        });
      }
      this.receive_per = result["data1"];
      console.log(this.receive_per);
    });
  }
  readCsDropdownlist() {
    this.data4 = [];
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
      console.log(result);
      this.data4 = result["data4"];
      console.log(this.data4);
    });
  }

  selectProvidCom1(event) {
    if (
      this.company != undefined &&
      this.company != null &&
      this.company.length > 1
    ) {
      this.data6.forEach((element) => {
        if (this.company == element[0]) {
          this.company = element[0];
        }
      });
    }
    console.log(this.get_character);
    this.receive_per = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_mail_list.php?company_ch=" +
        this.company_ch +
        "&company=" +
        this.get_character
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      // console.log(result)
      this.receive_per = result;
      console.log(this.receive_per);
    });
  }

  checkboxGet(event, coor_co, name, mail) {
    if (event.value == true) {
      this.C_1.push(coor_co);
      this.C_2.push(name);
      this.C_3.push(mail);
    } else {
      const index = this.C_1.indexOf(coor_co, 0);
      if (index > -1) {
        this.C_1.splice(index, 1);
        this.C_2.splice(index, 1);
        this.C_3.splice(index, 1);
      }
    }
    console.log(this.C_1);
    console.log(this.C_2);
    console.log(this.C_3);
  }

  saveAddress() {
    if (this.part != "just_mail") {
      let loading = this.loadingCtrl.create({
        spinner: "hide",
        content: `<img src="assets/imgs/line_loading.gif" />`,
      });
      loading.present();
      var formdata = new FormData();
      formdata.append("serial_num", this.serial_num);
      formdata.append("mail_id", this.mail_id);
      formdata.append("C_1", JSON.stringify(this.C_1));
      formdata.append("C_2", JSON.stringify(this.C_2));
      formdata.append("C_3", JSON.stringify(this.C_3));
      this.network
        .update_mail_receiver(formdata)
        .then((data) => {
          loading.dismissAll();
          console.log(data);
          this.navCtrl.pop();
          this.event.publish("mail_listen");
        })
        .catch((err) => {
          console.log(err);
          loading.dismissAll();
        });
    } else {
      this.C_1.forEach((e, i) => {
        this.mail_arr.push({
          company: this.C_1[i],
          name: this.C_2[i],
          mail: this.C_3[i],
        });
      });
      this.navCtrl.pop();
      this.event.publish("mail_listen2", { mail: this.mail_arr });
    }
  }
}
