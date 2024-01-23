import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgressManagePage } from './progress-manage';

@NgModule({
  declarations: [
    ProgressManagePage,
  ],
  imports: [
    IonicPageModule.forChild(ProgressManagePage),
  ],
})
export class ProgressManagePageModule {}
