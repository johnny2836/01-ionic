import { Component, Input } from "@angular/core";
import { NavController, NavParams, Events } from "ionic-angular";

/**
 * Generated class for the FilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "filter",
  templateUrl: "filter.html",
})
export class FilterComponent {
  @Input() step: string;
  text: string;
  items = [
    // {name:'排序(A➝Z)',icon:'md-arrow-round-up',number:'0'},
    // {name:'排序(Z➝A)',icon:'md-arrow-round-down',number:'1'},
    { name: "搜尋", icon: "md-search", number: "2" },
  ];
  part = "";
  db = [];
  show = [];
  depart = [];
  number: any;
  search = "";
  placeholder = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public event: Events
  ) {
    console.log(this.navParams.get("number"));
    console.log(this.navParams.get("part"));
    this.part = navParams.get("part");
    this.db = navParams.get("db");
    this.show = navParams.get("show");
    this.number = this.navParams.get("number");

    if (this.part == "內部") {
      var tmp = [];
      this.db.forEach((e) => {
        if (tmp.indexOf(e["AD_depart"]) == -1) {
          tmp.push(e["AD_depart"]);
          this.depart.push({
            check: false,
            depart: e["AD_depart"],
          });
        }
      });
      this.show.forEach((e) => {
        this.depart.forEach((e2) => {
          if (e["AD_depart"] == e2["depart"]) {
            e2["check"] = true;
          }
        });
      });
    }
    if (this.part == "進度總表") {
      if (this.navParams.get("number") == 6) {
        this.placeholder = "主辦";
        var tmp = [];
        this.db.forEach((e) => {
          if (tmp.indexOf(e["AD_main"]) == -1) {
            tmp.push(e["AD_main"]);
            this.depart.push({
              check: false,
              depart: e["AD_main"],
            });
          }
        });
      }
    }
    if (this.part == "進度總表-類型") {
      console.log(this.db);
      var tmp = [];
      this.db.forEach((e) => {
        if (tmp.indexOf(e["AD_type"]) == -1) {
          tmp.push(e["AD_type"]);
          this.depart.push({
            check: false,
            depart: e["AD_type"],
          });
        }
      });
      this.show.forEach((e) => {
        this.depart.forEach((e2) => {
          if (e["AD_type"] == e2["depart"]) {
            e2["check"] = true;
          }
        });
      });
    }
    if (this.part == "進度總表-圖表") {
      console.log(this.db);
      var tmp = [];
      this.db.forEach((e) => {
        if (tmp.indexOf(e["AD_type"]) == -1) {
          tmp.push(e["AD_type"]);
          this.depart.push({
            check: false,
            depart: e["AD_type"],
          });
        }
      });
      this.show.forEach((e) => {
        this.depart.forEach((e2) => {
          if (e["AD_type"] == e2["depart"]) {
            e2["check"] = true;
          }
        });
      });
    }
  }
  allInput(event, num) {
    this.search = event.target.value;
    console.log(this.search);
    if (this.search == "") {
      this.depart = [];
      if (this.part == "內部") {
        var tmp = [];
        this.db.forEach((e) => {
          if (tmp.indexOf(e["AD_depart"]) == -1) {
            tmp.push(e["AD_depart"]);
            this.depart.push({
              check: false,
              depart: e["AD_depart"],
            });
          }
        });
        this.show.forEach((e) => {
          this.depart.forEach((e2) => {
            if (e["AD_depart"] == e2["depart"]) {
              e2["check"] = true;
            }
          });
        });
      }
      if (this.part == "進度總表") {
        if (this.navParams.get("number") == 6) {
          this.placeholder = "主辦";
          var tmp = [];
          this.db.forEach((e) => {
            if (tmp.indexOf(e["AD_main"]) == -1) {
              tmp.push(e["AD_main"]);
              this.depart.push({
                check: false,
                depart: e["AD_main"],
              });
            }
          });
        }
      }
    } else {
      console.log(this.depart);
      const data = this.depart;
      data.filter((item) => {
        console.log(item);
        var depart;
        if (item.depart == null) {
          depart = "";
        } else {
          console.log(item.depart);
          depart = item.depart.toLowerCase();
          if (this.search.toLowerCase().length >= 1) {
            console.log(depart.search(this.search.toLowerCase()) > -1);
            return depart.search(this.search.toLowerCase()) > -1;
          }
        }
      });
      console.log(data);
    }
  }
  return(number) {
    if (this.part != "") {
      console.log(this.depart);
      this.event.publish("progress_listen", {
        number: number,
        array_number: this.navParams.get("number"),
        part: this.part,
        depart: this.depart,
      });
      this.navCtrl.pop();
    } else {
      this.event.publish("progress_listen", {
        number: number,
        array_number: this.navParams.get("number"),
      });
      this.navCtrl.pop();
    }
  }

  pop() {
    this.navCtrl.pop();
  }
}
