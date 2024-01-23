import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiveMissionPage } from './receive-mission';

@NgModule({
  declarations: [
    ReceiveMissionPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiveMissionPage),
  ],
})
export class ReceiveMissionPageModule {}
