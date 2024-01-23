import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesignWorkUploadPage } from './design-work-upload';

@NgModule({
  declarations: [
    DesignWorkUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(DesignWorkUploadPage),
  ],
})
export class DesignWorkUploadPageModule {}
