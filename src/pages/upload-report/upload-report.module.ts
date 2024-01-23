import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadReportPage } from './upload-report';

@NgModule({
  declarations: [
    UploadReportPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadReportPage),
  ],
})
export class UploadReportPageModule {}
