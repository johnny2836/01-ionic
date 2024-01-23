import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignMissionPage } from './assign-mission';

@NgModule({
  declarations: [
    AssignMissionPage,
  ],
  imports: [
    IonicPageModule.forChild(AssignMissionPage),
  ],
})
export class AssignMissionPageModule {}
