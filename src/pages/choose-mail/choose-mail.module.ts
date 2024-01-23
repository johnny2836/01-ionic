import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseMailPage } from './choose-mail';

@NgModule({
  declarations: [
    ChooseMailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseMailPage),
  ],
})
export class ChooseMailPageModule {}
