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
 * Generated class for the AddClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-add-client",
  templateUrl: "add-client.html",
})
export class AddClientPage {
  character = [];
  type = [];

  client_num = "";
  client_num_type = "";
  company = "";
  uniform = "";
  address = "";
  phone = "";
  fax = "";
  main = "";
  mobile = "";
  mail = "";
  group = "";
  actual_use = "";
  shipping_address = "";
  declare = "";
  check_type = "";
  account = "";
  password = "";
  line_id = "";
  section = "";
  title = "";
  client_id = [];
  client_company = [];
  show_data = [];
  chv: any;
  list1 = ["管理部", "行政部", "工務部", "設計部"];
  add_per = [];
  all_ad = [];
  ad_edit_show = [];
  check_type_arr = [];
  user = "";
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
    this.user = window.localStorage.getItem("name");
    this.section = this.navParams.get("section");
    this.client_id = this.navParams.get("id");
    this.client_company = this.navParams.get("company");
    this.chv = this.navParams.get("chv");
    console.log(this.section);
    console.log();
    if (this.section == "新增") {
      this.title = "客戶新增";
    } else if (this.section == "編輯") {
      this.title = "客戶編輯";
      this.client_id.forEach((e, i) => {
        this.loadEditClient(e, this.client_company[i]);
      });
      if (this.chv == 0) {
        this.title = "人員編輯";
        this.all_ad = this.navParams.get("all_ad");
        this.loadAllCK();
      }
    }
    this.navParams.get("client_db").forEach((e) => {
      if (
        this.check_type_arr.indexOf(e["AD_check_type"]) == -1 &&
        e["AD_check_type"] != ""
      ) {
        this.check_type_arr.push(e["AD_check_type"]);
      }
    });
    console.log(this.check_type_arr);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddClientPage");
  }

  loadAllCK() {
    this.all_ad.forEach((e) => {
      if (e["checkbox"] == true) {
        let data: Observable<any>;
        data = this.http.get(
          "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_edit_client.php?id=" +
            e["uid"] +
            "&from=瑞恩"
        );
        data.subscribe((result) => {
          result = JSON.stringify(result);
          result = JSON.parse(result);
          if (result == null) {
            result = [];
          }
          console.log(result);
          this.ad_edit_show.push({
            uid: result[0]["uid"],
            depart: result[0]["AD_depart"],
            name: result[0]["AD_name"],
            character: result[0]["AD_character"],
            certificate: result[0]["AD_certificate"],
            tele: result[0]["AD_telephone"],
            email: result[0]["AD_email"],
            fax: result[0]["AD_fax"],
            account: result[0]["AD_account"],
            password: result[0]["AD_password"],
            BMS: result[0]["AD_BMS_account"],
            App: result[0]["AD_APP_account"],
          });
        });
      }
    });
  }

  loadEditClient(id, company) {
    let data: Observable<any>;
    data = this.http.get(
      "https://ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_edit_client.php?id=" +
        id +
        "&from=客戶"
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      var tmpa_1 = false;
      var tmpa_2 = false;
      var tmpa_3 = false;
      var tmpa_4 = false;
      var tmpa_5 = false;
      var tmpa_6 = false;
      var tmpa_7 = false;
      var tmpa_8 = false;
      var tmpa_9 = false;
      var tmpb_1 = false;
      var tmpb_2 = false;
      var tmpb_3 = false;
      var tmpb_4 = false;
      var tmpb_5 = false;
      if (result["type1"] == 1) {
        tmpa_1 = true;
      }
      if (result["type2"] == 1) {
        tmpa_2 = true;
      }
      if (result["type3"] == 1) {
        tmpa_3 = true;
      }
      if (result["type4"] == 1) {
        tmpa_4 = true;
      }
      if (result["type5"] == 1) {
        tmpa_5 = true;
      }
      if (result["type6"] == 1) {
        tmpa_6 = true;
      }
      if (result["type7"] == 1) {
        tmpa_7 = true;
      }
      if (result["type8"] == 1) {
        tmpa_8 = true;
      }
      if (result["type9"] == 1) {
        tmpa_9 = true;
      }
      if (result["case_type1"] == 1) {
        tmpb_1 = true;
      }
      if (result["case_type2"] == 1) {
        tmpb_2 = true;
      }
      if (result["case_type3"] == 1) {
        tmpb_3 = true;
      }
      if (result["case_type4"] == 1) {
        tmpb_4 = true;
      }
      if (result["case_type5"] == 1) {
        tmpb_5 = true;
      }

      this.show_data.push({
        id: id,
        client_num: result["client_num"],
        client_num_type: result["client_num_type"],
        company: company,
        uniform: result["uniform"],
        address: result["address"],
        phone: result["phone"],
        fax: result["fax"],
        main: result["main"],
        mobile: result["mobile"],
        mail: result["mail"],
        group: result["group"],
        actual_use: result["actual_use"],
        shipping_address: result["shipping_address"],
        declare: result["declare"],
        check_type: result["check_type"],
        account: result["account"],
        password: result["password"],
        line_id: result["line_id"],
        type1: tmpa_1,
        type2: tmpa_2,
        type3: tmpa_3,
        type4: tmpa_4,
        type5: tmpa_5,
        type6: tmpa_6,
        type7: tmpa_7,
        type8: tmpa_8,
        type9: tmpa_9,
        case_type1: tmpb_1,
        case_type2: tmpb_2,
        case_type3: tmpb_3,
        case_type4: tmpb_4,
        case_type5: tmpb_5,
        check_type_arr: this.check_type_arr,
      });
      console.log(this.show_data);
    });
  }

  checkboxCharacter(event, ch) {
    if (event.value == true) {
      this.character.push(ch);
    } else {
      const index = this.character.indexOf(ch, 0);
      if (index > -1) {
        this.character.splice(index, 1);
      }
    }
    console.log(this.character);
  }

  checkboxType(event, type) {
    if (event.value == true) {
      this.type.push(type);
    } else {
      const index = this.type.indexOf(type, 0);
      if (index > -1) {
        this.type.splice(index, 1);
      }
    }
    console.log(this.type);
  }

  confirm() {
    if (this.chv == 0) {
      let loading = this.loadingCtrl.create({
        spinner: "hide",
        content: `<img src="assets/imgs/line_loading.gif" />`,
      });
      loading.present();
      let formData = new FormData();
      formData.append("add_per", JSON.stringify(this.add_per)); // 案件類型
      formData.append("from", "瑞恩"); // from
      this.network
        .save_add_sql_client(formData)
        .then((data) => {
          loading.dismissAll();
          this.event.publish("main_listen");
          this.navCtrl.pop();
          alert(data);
          console.log(data);
        })
        .catch((error) => {
          loading.dismissAll();
          console.log(error);
          alert("系統錯誤");
        });
    } else {
      var arr = [
        this.client_num,
        this.client_num_type,
        this.company,
        this.uniform,
        this.address,
        this.phone,
        this.fax,
        this.main,
        this.mobile,
        this.mail,
        this.group,
        this.actual_use,
        this.shipping_address,
        this.declare,
        this.check_type,
        this.account,
        this.password,
        this.line_id,
      ];
      var arr1 = [
        "客戶編號",
        "客戶類型編號",
        "客戶名稱",
        "統編",
        "地址",
        "電話",
        "傳真",
        "負責人",
        "手機",
        "信箱",
        "類組",
        "實際用途",
        "送貨地址",
        "申報",
        "結帳類別",
        "帳號",
        "密碼",
        "line id",
      ];
      var a = [];
      var check = true;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "") {
          check = false;
          alert("請輸入完整資訊," + arr1[i]);
        }
      }

      if (check == true) {
        let loading = this.loadingCtrl.create({
          spinner: "hide",
          content: `<img src="assets/imgs/line_loading.gif" />`,
        });
        loading.present();
        let formData = new FormData();
        formData.append("client_num", this.client_num);
        formData.append("client_num_type", this.client_num_type);
        formData.append("company", this.company);
        formData.append("uniform", this.uniform);
        formData.append("address", this.address);
        formData.append("phone", this.phone);
        formData.append("fax", this.fax);
        formData.append("main", this.main);
        formData.append("mobile", this.mobile);
        formData.append("mail", this.mail);
        formData.append("group", this.group);
        formData.append("actual_use", this.actual_use);
        formData.append("shipping_address", this.shipping_address);
        formData.append("declare", this.declare);
        formData.append("check_type", this.check_type);
        formData.append("account", this.account);
        formData.append("password", this.password);
        formData.append("line_id", this.line_id);
        formData.append("ch", JSON.stringify(this.character)); //角色分類
        formData.append("type", JSON.stringify(this.type)); // 案件類型
        formData.append("from", "客戶"); // from
        console.log(this.character);
        console.log(this.type);

        this.network
          .save_add_sql_client(formData)
          .then((data) => {
            loading.dismissAll();
            this.event.publish("main_listen");
            this.navCtrl.pop();
            alert(data);
            console.log(data);
          })
          .catch((error) => {
            loading.dismissAll();
            console.log(error);
            alert("系統錯誤");
          });
      }
    }
  }

  send() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    let formData = new FormData();
    if (this.chv == 0) {
      var from = "瑞恩";
      formData.append("show_data", JSON.stringify(this.ad_edit_show));
    } else {
      var from = "客戶";
      formData.append("show_data", JSON.stringify(this.show_data));
    }
    formData.append("from", from); // from
    formData.append("name", this.user);
    console.log(this.show_data);

    this.network
      .save_edit_sql_client(formData)
      .then((data) => {
        loading.dismissAll();
        this.event.publish("main_listen");
        this.navCtrl.pop();
        alert(data);
        console.log(data);
      })
      .catch((error) => {
        loading.dismissAll();
        console.log(error);
        alert("系統錯誤");
      });
  }

  addMore() {
    this.add_per.push({
      depart: "",
      name: "",
      character: "",
      certificate: "",
      tele: "",
      email: "",
      fax: "",
      account: "",
      password: "",
      BMS: "a00008",
      App: "",
    });
  }
  popMore() {
    this.add_per.pop();
  }
}
