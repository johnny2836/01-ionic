import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaperMailPage } from './paper-mail';

@NgModule({
  declarations: [
    PaperMailPage,
  ],
  imports: [
    IonicPageModule.forChild(PaperMailPage),
  ],
})
export class PaperMailPageModule {}
