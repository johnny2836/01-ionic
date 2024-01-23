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
  AlertController,
} from "ionic-angular";
import { DatePipe } from "@angular/common";
import { PopoverController } from "ionic-angular/components/popover/popover-controller";
import { HostListener } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { NetworkProvider } from "../../providers/network/network";
import { FilterComponent } from "../../components/filter/filter";
import * as XLSX from "xlsx";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { elementAt } from "rxjs/operator/elementAt";
import { PopoverComponent } from "../../components/popover/popover";
import { HaveFilterComponent } from "../../components/have-filter/have-filter";

@IonicPage()
@Component({
  selector: "page-type1",
  templateUrl: "type1.html",
})
export class Type1Page {
  num = 0;
  progress_array = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  chvv = 0;
  chvvv = 0;
  scrHeight: any;
  scrWidth: any;
  current_month = "";
  current_year = "";
  user = "";
  character = "";
  depart = "";
  web_auth = [0, 0, 0];
  spin = 0;

  // 資料 Loading
  chv1 = [];
  chv1_tmp = []; // All

  url_list = [];

  // 備註表格
  right = "-100em";
  transTime = "0.55s";
  show_note = [];
  alert_status = false;

  case_name = "";
  case_id = "";
  stage = "";
  project_data = [];
  type = "";
  edit1 = false;
  edit_num = 99;
  mission_data = {};
  show_mission_data = {};
  department_options = [];
  host_options = [];
  cancel_mission_data = {};
  updateId_list: any = [];

  upload_file_data: any = {};

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
    public datePipe: DatePipe
  ) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;

    this.current_month = new Date().getMonth() + 1 + "";
    this.current_year = new Date().getFullYear() + "";

    this.user = window.localStorage.getItem("name");
    this.character = window.localStorage.getItem("character");
    this.depart = window.localStorage.getItem("depart");
    this.case_name = window.sessionStorage.getItem("case_name");
    this.case_id = window.sessionStorage.getItem("case_id");
    this.stage = window.sessionStorage.getItem("stage");
    this.type = window.sessionStorage.getItem("type");
  }
  ngOnInit() {
    // this.readAllData();
  }
  bcakMainPage(num, type) {
    this.navCtrl.push("MainLeadPage", { num: num, type: type });
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

  logout() {
    this.app.getRootNav().setRoot("LoginPage");
  }

  @HostListener("window:resize", ["$event"])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  viewNoteTable(allnote) {
    console.log(allnote);
    this.right = "25%";
    this.show_note = [];
    allnote.forEach((e, i) => {
      this.show_note.push(e);
    });
  }
  noNoteTable() {
    this.right = "-100em";
  }
  //室內裝修
  chType0(num, type) {
    window.sessionStorage.setItem("type", type);
    switch (num) {
      case 0:
        this.navCtrl.push("Type1Page");
        break;
      case 1:
        this.navCtrl.push("Type2Page");
        break;
      case 2:
        this.navCtrl.push("Type3Page");
        break;
      case 3:
        this.navCtrl.push("Type4Page");
        break;
      case 4:
        this.navCtrl.push("Type5Page");
        break;
      default:
        console.log("錯誤");
    }
  }
  chType1(num) {
    this.num = num;
    switch (num) {
      case 0:
        window.sessionStorage.setItem("stage", "開案階段");
        break;
      case 1:
        window.sessionStorage.setItem("stage", "開案許可階段");
        break;
      case 2:
        window.sessionStorage.setItem("stage", "規劃設計階段");
        break;
      case 3:
        window.sessionStorage.setItem("stage", "施工階段");
        break;
      case 4:
        window.sessionStorage.setItem("stage", "驗證上線階段");
        break;
      default:
        console.log("錯誤");
    }
  }
  add() {
    const modal = this.modalCtrl.create(
      "AddNewPage",
      {
        number: this.num,
        project_list: this.project_data,
        department_list: this.department_options,
        host_list: this.host_options,
      },
      { cssClass: "test-modal3" }
    );
    modal.present();
  }
  edit(num: number) {
    // if (num === 0) {
    //   this.edit1 = true;
    //   this.edit_num = num;
    // } else {
    //   if (this.updateId_list.length === 0) {
    //     alert("未曾測到更新動作，請更新後再按按鈕");
    //   } else {
    //     let editData: any = [];
    //     Object.values(this.show_mission_data).forEach((e: any, i) => {
    //       e.map((items) => {
    //         if (this.updateId_list.includes(items.id)) {
    //           editData.push(items);
    //         }
    //       });
    //     });
    //     console.log(editData);
    //     let formdata = new FormData();
    //     formdata.append("editData", JSON.stringify(editData));
    //     formdata.append("user_name", this.user);
    //     this.network
    //       .updateMissionData(formdata)
    //       .then((data) => {
    //         this.readAllData();
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //     this.updateId_list = [];
    //     this.edit1 = false;
    //     this.edit_num = 99;
    //   }
    // }
  }
  cancelEdit() {
    this.show_mission_data = JSON.parse(
      JSON.stringify(this.cancel_mission_data)
    );
    this.updateId_list = [];
    this.edit1 = false;
  }
  readAllData() {
    let formdata = new FormData();
    formdata.append("case_id", this.case_id);
    formdata.append("type", this.type);
    formdata.append("stage", this.stage);
    this.network
      .readDistributionAllData(formdata)
      .then((data) => {
        console.log(data);
        this.mission_data = JSON.parse(JSON.stringify(data["data"]));
        this.show_mission_data = this.mission_data;
        this.cancel_mission_data = JSON.parse(JSON.stringify(data["data"]));
        this.department_options = data["department_dpoptions"].map(
          (e: any) => e
        );
        this.host_options = data["host_options"].map((e: any) => e);
        this.project_data = data["project"].map((e: any) => e);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  calFinshDate(project_id, id) {
    const startDate = new Date(this.mission_data[project_id][id]["start_date"]);
    if (!startDate || !this.mission_data[project_id][id].day) {
      return;
    }
    startDate.setUTCDate(
      startDate.getUTCDate() +
        parseInt(this.mission_data[project_id][id]["day"])
    );
    this.mission_data[project_id][id]["finish_date"] = this.datePipe.transform(
      startDate,
      "yyyy-MM-dd"
    );
    this.editInputChange(project_id, id);
  }
  editInputChange(project_id, id) {
    if (
      this.updateId_list.includes(this.mission_data[project_id][id]["id"]) ||
      this.mission_data[project_id][id]["id"] === ""
    ) {
      return;
    } else {
      this.updateId_list.push(this.mission_data[project_id][id]["id"]);
    }
    console.log(this.updateId_list);
  }
  upload(event: any) {
    // this.upload_file_data = {};
    // const target: DataTransfer = <DataTransfer>event.target;
    // const reader: FileReader = new FileReader();
    // reader.readAsBinaryString(target.files[0]);
    // const resultBySheet = {};
    // reader.onload = (e: any) => {
    //   const binarystr: string = e.target.result;
    //   const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: "binary" });
    //   const sheetNames: string[] = wb.SheetNames;
    //   sheetNames.forEach((wsname) => {
    //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    //     const data = XLSX.utils.sheet_to_json(ws, { header: 0, defval: "" });
    //     const organizedData = {};
    //     data.forEach((item) => {
    //       const key = item["項目"];
    //       if (key) {
    //         if (!organizedData[key]) {
    //           organizedData[key] = [];
    //         }
    //         organizedData[key].push(item);
    //       }
    //     });
    //     resultBySheet[wsname] = Object.values(organizedData);
    //   });
    //   this.upload_file_data = resultBySheet;
    //   console.log(this.upload_file_data);
    //   let formdata = new FormData();
    //   formdata.append("data", JSON.stringify(this.upload_file_data));
    //   formdata.append("case_id", this.case_id);
    //   formdata.append("type", this.type);
    //   formdata.append("user_name", this.user);
    //   this.network
    //     .uploadExcelFile(formdata)
    //     .then((data) => {
    //       console.log(data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };
  }
}
