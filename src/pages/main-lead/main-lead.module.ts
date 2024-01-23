import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MainLeadPage } from "./main-lead";
import { ComponentsModule } from "../../components/components.module";
@NgModule({
  declarations: [MainLeadPage],
  imports: [IonicPageModule.forChild(MainLeadPage), ComponentsModule],
})
export class MainLeadPageModule {}
