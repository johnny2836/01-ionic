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
import { DomSanitizer } from "@angular/platform-browser";
import { HostListener } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { NetworkProvider } from "../../providers/network/network";
import { elementAt } from "rxjs/operator/elementAt";

/**
 * Generated class for the UploadReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-upload-report",
  templateUrl: "upload-report.html",
})
export class UploadReportPage {
  fun = "";
  AD_id = "";
  client_name = "";
  case_name = "";
  serial_num = "";
  json: any;
  file: File;
  name = "";
  arrayBuffer: any;
  work_sheet_name = "";
  AD_url = [];
  current_url: any;
  micro = [".ppt", ".pptx", ".doc", ".docx", ".xls", ".xlsx"];
  aa = [];
  img_num = 0;
  status = 1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer,
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
    console.log(this.AD_id);
    console.log(this.fun);
    console.log(this.client_name);
    console.log(this.case_name);
    console.log(this.serial_num);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UploadReportPage");
    this.loadReport();
    // this.view_report()
  }
  last() {
    if (this.img_num == 0) {
      this.img_num = 0;
      alert("此為第一頁");
    } else {
      this.img_num = this.img_num - 1;
    }
  }

  next() {
    if (this.img_num == this.AD_url.length - 1) {
      this.img_num = this.AD_url.length - 1;
      alert("此為最後一頁");
    } else {
      this.img_num = this.img_num + 1;
    }
    console.log(this.img_num);
  }

  loadReport() {
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_report.php?serial_num=" +
        this.serial_num
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.AD_url = result;
      result.forEach((element) => {
        this.current_url = [];
        this.status = 0;
        if (element.substr(-3) == "pdf") {
          this.current_url.push(
            this.sanitizer.bypassSecurityTrustResourceUrl(element)
          );
          this.aa.push(0);
        } else if (
          this.micro.indexOf(element.substr(-4)) != -1 ||
          this.micro.indexOf(element.substr(-5)) != -1
        ) {
          this.current_url.push(
            this.sanitizer.bypassSecurityTrustResourceUrl(
              "https://view.officeapps.live.com/op/embed.aspx?src=" + element
            )
          );
          this.aa.push(0);
        } else {
          this.current_url.push(
            this.sanitizer.bypassSecurityTrustResourceUrl(element)
          );
          this.aa.push(1);
        }
      });
    });
  }

  fileIncoming(event) {
    if (event.target.files && event.target.files[0]) {
      var data = event.target.files[0]; // 資料
      let fileName = event.target.files[0]["name"]; // 檔名
      console.log(fileName);
      console.log(data);
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      //轉轉圖檔設置
      let loading = this.loadingCtrl.create({
        spinner: "hide",
        content: `<img src="assets/imgs/line_loading.gif" />`,
      });
      loading.present();

      let formData = new FormData();
      formData.append("pdf[]", data, fileName);
      formData.append("id", this.AD_id);
      formData.append("serial_num", this.serial_num);
      formData.append("fun", this.fun);
      formData.append("name", window.localStorage.getItem("name"));
      this.network
        .upload_report(formData)
        .then((data) => {
          this.event.publish("main_listen");
          this.loadReport();
          alert(data);
          loading.dismiss();
        })
        .catch((error) => {
          console.log(error);
          loading.dismiss();
        });
    }
  }

  download() {
    //轉轉圖檔設置
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    let formData = new FormData();
    formData.append("serial_num", this.serial_num);
    formData.append("fun", this.fun);
    this.network
      .download_PreDesign_report(formData)
      .then((data) => {
        loading.dismiss();
        this.event.publish("main_listen");
        this.navCtrl.pop();
        let url: any;
        if (data != null && data != undefined) {
          url = data;
          window.open(url);
        }
        console.log(data);
      })
      .catch((error) => {
        alert("系統異常");
        console.log(error);
      });
  }
}
