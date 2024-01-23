import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesignCompletePage } from './design-complete';

@NgModule({
  declarations: [
    DesignCompletePage,
  ],
  imports: [
    IonicPageModule.forChild(DesignCompletePage),
  ],
})
export class DesignCompletePageModule {}
