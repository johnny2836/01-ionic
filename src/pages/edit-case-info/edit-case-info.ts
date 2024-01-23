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
import { FilterComponent } from "../../components/filter/filter";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { elementAt } from "rxjs/operator/elementAt";

/**
 * Generated class for the EditCaseInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-case-info",
  templateUrl: "edit-case-info.html",
})
export class EditCaseInfoPage {
  th_list = [
    "客戶名稱",
    "場所名稱",
    "場所地址",
    "案件類型",
    "類組",
    "實際用途",
    "說明",
    "收款對象",
  ];
  th_list_a = [
    "客戶名稱",
    "場所名稱",
    "場所地址",
    "案件類型",
    "類組",
    "實際用途",
    "統一編號",
    "地址",
    "公司聯絡人",
    "公司電話",
  ];
  data = [];
  data6 = [];
  data4 = [];
  case_type = "";
  all_data = [];
  all = {
    "甲-1": [
      "戲院",
      "電影院",
      "歌廳",
      "舞廳",
      "夜總會",
      "俱樂部",
      "理容院",
      "指壓按摩場所",
      "錄影節目帶播映場所(MTV)",
      "視聽歌唱場所(KTV)",
      "酒家",
      "酒吧",
      "酒店(廊)",
    ],
    "甲-2": [
      "保齡球館",
      "撞球場",
      "集會堂",
      "健身休閒中心",
      "室內螢幕式高爾夫練習場",
      "遊藝場所",
      "電子遊戲場",
      "資訊休閒場所",
    ],
    "甲-3": ["觀光旅館", "飯店", "旅館", "招待所", "香客大樓"],
    "甲-4": ["商場", "市場", "百貨商場", "超級市場", "零售市場", "展覽場"],
    "甲-5": ["餐廳", "飲食店", "咖啡廳", "茶藝館"],
    "甲-6": [
      "醫院",
      "療養院",
      "長期照護機構",
      "養護機構",
      "安養機構",
      "老人服務機構",
      "兒童褔利設施",
      "育嬰中心",
      "護理之家",
      "產後護理機構",
      "啟明學校",
      "啟智學校",
      "啟聰學校",
      "殘障服務福利中心",
      "月子中心",
    ],
    "甲-7": ["三溫暖", "公共浴室"],
    "乙-1": ["車站", "機場大廈", "候船室"],
    "乙-2": ["期貨經紀業", "證券交易所", "金融機構"],
    "乙-3": [
      "兒童及少年福利機構",
      "學校教室",
      "補習班",
      "訓練班",
      "Ｋ書中心",
      "安親(才藝)班",
      "漫畫出租店",
      "學校活動中心",
    ],
    "乙-4": ["圖書館", "博物館", "美術館", "陳列館", "史蹟資料館", "紀念館"],
    "乙-5": ["寺廟", "宗祠", "教堂", "靈骨塔"],
    "乙-6": [
      "辦公室",
      "靶場",
      "診所",
      "甲-6以外之老人服務機構",
      "老人文康機構",
      "美容瘦身場所",
    ],
    "乙-7": ["集合住宅", "寄宿舍"],
    "乙-8": ["體育館", "活動中心"],
    "乙-9": ["室內溜冰場", "室內游泳池"],
    "乙-10": ["電影攝影場", "電視播送場"],
    "乙-11": ["倉庫", "傢俱展示販售場"],
    "乙-12": ["幼稚園", "托兒所"],
    "丙-1": ["電信機器室"],
    "丙-2": ["汽車修護廠", "飛機修理廠", "飛機庫"],
    "丙-3": ["室內停車場", "建築物依法附設之室內停車空間"],
    丁: ["高度危險工作場所", "中度危險工作場所", "低度危險工作場所"],
    "戊-1": ["複合用途建築物中，有供甲類用途者"],
    "戊-2": ["前目以外供第乙、丙、丁類用途之複合用途建築物"],
    "戊-3": ["地下建築物"],
    己: ["林場", "大眾運輸工具"],
    庚: ["其他經中央主管機關核定之場所"],
  };
  group_arr = [
    "甲-1",
    "甲-2",
    "甲-3",
    "甲-4",
    "甲-5",
    "甲-6",
    "甲-7",
    "乙-1",
    "乙-2",
    "乙-3",
    "乙-4",
    "乙-5",
    "乙-6",
    "乙-7",
    "乙-8",
    "乙-9",
    "乙-10",
    "乙-11",
    "乙-12",
    "丙-1",
    "丙-2",
    "丙-3",
    "丁",
    "戊-1",
    "戊-2",
    "戊-3",
    "己",
    "庚",
  ];
  actual_arr = [];
  auth = 0;
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
    this.case_type = this.navParams.get("case_type");
    this.all_data = this.navParams.get("all_data");

    this.user = window.localStorage.getItem("name");
    this.character = window.localStorage.getItem("character");
    this.depart = window.localStorage.getItem("depart");

    console.log(this.case_type);
    console.log(this.all_data);

    if (
      this.user == "李惠閔" ||
      this.user == "洪舒寧" ||
      this.user == "洪勝華"
    ) {
      this.auth = 1;
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditCaseInfoPage");
    this.readCompany();
    this.loadEditArr();
  }

  loadEditArr() {
    this.all_data.forEach((e) => {
      if (e["checkbox"] == true) {
        this.data.push(e);
      }
    });
    console.log(this.data);
    this.data.forEach((e, i) => {
      this.actual_arr[i] = [];
      if (e["AD_type"] == "檢修案件") {
        this.loadActual(i);
      }
    });
  }

  readCompany() {
    this.data6 = [];
    let data: Observable<any>;
    data = this.http.get(
      "https://web.ici-biot.com/ici/ap/ionic_app/CK_platform/Php/read_company.php"
    );
    data.subscribe((result) => {
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result == null) {
        result = [];
      }
      console.log(result);
      this.data6 = result;
    });
  }
  saveEdit() {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `<img src="assets/imgs/line_loading.gif" />`,
    });
    loading.present();
    let formData = new FormData();
    formData.append("data", JSON.stringify(this.data));
    formData.append("case_type", this.case_type);
    formData.append("name", window.localStorage.getItem("name"));
    console.log(this.data);
    this.network
      .save_case_edit(formData)
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
        alert("系統異常");
      });
  }
  loadActual(i) {
    console.log(this.data[i]);
    console.log(this.data[i]["AD_group"]);
    this.actual_arr[i] = this.all[this.data[i]["AD_group"]];
  }
}
