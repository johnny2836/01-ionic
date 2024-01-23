import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCaseInfoPage } from './edit-case-info';

@NgModule({
  declarations: [
    EditCaseInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCaseInfoPage),
  ],
})
export class EditCaseInfoPageModule {}
