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
 * Generated class for the AddNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-add-new",
  templateUrl: "add-new.html",
})
export class AddNewPage {
  user_name = "";
  num = "";
  case_id = "";
  case_type = "";
  project_list: any = [];
  department_list: any = [];
  host_list: any = [];
  project_select: string = "";
  mission: string = "";
  now: string = "";
  start_date: string = "";
  day: string = "";
  department_select: string = "";
  host_select: string = "";
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
    this.case_id = window.sessionStorage.getItem("case_id");
    this.num = this.navParams.get("number");
    this.project_list = this.navParams.get("project_list");
    this.department_list = this.navParams.get("department_list");
    this.host_list = this.navParams.get("host_list");
    this.user_name = window.localStorage.getItem("name");
    if (this.num == "0") {
      this.case_type = "開案";
    } else if (this.num == "1") {
      this.case_type = "開發許可";
    } else if (this.num == "2") {
      this.case_type = "規劃設計";
    } else if (this.num == "3") {
      this.case_type = "施工";
    } else if (this.num == "4") {
      this.case_type = "驗證上線";
    } else {
      this.case_type = "維運";
    }
  }

  addCase() {
    let check = false;
    if (this.project_select !== "") {
      check = true;
    } else {
      alert("項目不得為空白");
    }
    if (check) {
      let project_id = this.project_list.find((e: any) => {
        return e.project == this.project_select;
      });
      let formdata = new FormData();
      formdata.append("user_name", this.user_name);
      formdata.append("case_id", this.case_id);
      formdata.append("project_id", project_id.id);
      formdata.append("mission", this.mission);
      formdata.append("now", this.now);
      formdata.append("start_date", this.start_date);
      formdata.append("day", this.day);
      formdata.append("department_select", this.department_select);
      formdata.append("host_select", this.host_select);
      this.network
        .addNewProject(formdata)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.navCtrl.pop();
    }
  }
}
