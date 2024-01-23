import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LittleWorkPage } from './little-work';

@NgModule({
  declarations: [
    LittleWorkPage,
  ],
  imports: [
    IonicPageModule.forChild(LittleWorkPage),
  ],
})
export class LittleWorkPageModule {}
