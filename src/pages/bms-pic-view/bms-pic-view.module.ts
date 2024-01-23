import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BmsPicViewPage } from './bms-pic-view';

@NgModule({
  declarations: [
    BmsPicViewPage,
  ],
  imports: [
    IonicPageModule.forChild(BmsPicViewPage),
  ],
})
export class BmsPicViewPageModule {}
