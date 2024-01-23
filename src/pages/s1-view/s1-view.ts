import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  ModalController,
  NavParams,
  Events,
  LoadingController,
  App,
  MenuController,
} from "ionic-angular";
import { PopoverController } from "ionic-angular/components/popover/popover-controller";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { NetworkProvider } from "../../providers/network/network";

/**
 * Generated class for the S1ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-s1-view",
  templateUrl: "s1-view.html",
})
export class S1ViewPage {
  item_type = "";
  type = "";
  id = "";
  current_url: any;
  AD_url = [];
  micro = [".ppt", ".pptx", ".doc", ".docx", ".xls", ".xlsx"];
  aa = [];
  img_num = 0;
  view_type = "";
  AD_url_tmp = [];
  sort: any;
  tmp_c = [];
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
    this.item_type = this.navParams.get("item_type");
    this.type = this.navParams.get("type");
    this.id = this.navParams.get("id");
    if (typeof this.navParams.get("AD_url") == "string") {
      this.AD_url = this.navParams.get("AD_url").split(" ");
    } else if (this.AD_url == undefined) {
      this.AD_url = [];
    } else {
      this.AD_url = this.navParams.get("AD_url");
    }
    this.view_type = this.navParams.get("view_type");
    console.log(this.item_type);
    console.log(this.type);
    console.log(this.id);
    console.log(this.AD_url);
    // this.loadUrl()

    if (this.view_type == "complete_file_view") {
      this.current_url = [];
      console.log(this.AD_url);
      this.AD_url.forEach((element) => {
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
        } else if (element.indexOf(this.type) != -1) {
          this.current_url.push(
            this.sanitizer.bypassSecurityTrustResourceUrl(element)
          );
          this.aa.push(1);
        }
      });
    } else if (this.view_type == "callback_file") {
      this.status = 0;
      this.current_url = [];
      this.AD_url.forEach((element) => {
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
    } else {
      this.current_url = [];
      this.AD_url_tmp = [];

      let url_tmp = "";
      let version = 0;
      let tmp_c = 0;

      this.AD_url.forEach((element, index) => {
        if (
          element.indexOf(this.item_type) != -1 &&
          element.indexOf(this.type) != -1
        ) {
          version = parseInt(element.split("_")[3].split("V")[1]);
          if (version > tmp_c) {
            tmp_c = version;
          }
        }
      });

      this.AD_url.forEach((element, index) => {
        // console.log(element.indexOf(this.item_type)
        if (parseInt(element.split("_")[3].split("V")[1]) == tmp_c) {
          this.status = 0;
          if (
            element.indexOf(this.item_type) != -1 &&
            element.indexOf(this.type) != -1 &&
            element.substr(-3) == "pdf"
          ) {
            this.current_url.push(
              this.sanitizer.bypassSecurityTrustResourceUrl(element)
            );
            this.aa.push(0);
          } else if (
            (element.indexOf(this.item_type) != -1 &&
              element.indexOf(this.type) != -1 &&
              this.micro.indexOf(element.substr(-4)) != -1) ||
            (element.indexOf(this.item_type) != -1 &&
              element.indexOf(this.type) != -1 &&
              this.micro.indexOf(element.substr(-5)) != -1)
          ) {
            this.current_url.push(
              this.sanitizer.bypassSecurityTrustResourceUrl(
                "https://view.officeapps.live.com/op/embed.aspx?src=" + element
              )
            );
            this.aa.push(0);
          } else if (
            element.indexOf(this.item_type) != -1 &&
            element.indexOf(this.type) != -1
          ) {
            this.current_url.push(
              this.sanitizer.bypassSecurityTrustResourceUrl(element)
            );
            this.aa.push(1);
          }
        }
      });
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad S1ViewPage");
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
    if (this.img_num == this.current_url.length - 1) {
      this.img_num = this.current_url.length - 1;
      alert("此為最後一頁");
    } else {
      this.img_num = this.img_num + 1;
    }
    console.log(this.img_num);
  }

  loadUrl() {
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/load_S1_url.php?id=" +
        this.id +
        "&item_type=" +
        this.item_type +
        "&type=" +
        this.type
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.AD_url = result;
      // result.forEach(element => {
      //   console.log(element)
      //   // element.split('\/')
      // });
    });
  }
}
