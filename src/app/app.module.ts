import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MyApp } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { NetworkProvider } from "../providers/network/network";
import { CalendarModule } from "ion2-calendar";
import { AutoCompleteModule } from "ionic2-auto-complete";
import { IonicImageLoader } from "ionic-image-loader";
import { IonicStepperModule } from "ionic-stepper";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { PopoverComponent } from "../components/popover/popover";
import { FilterComponent } from "../components/filter/filter";
import { UploadFilterComponent } from "../components/upload-filter/upload-filter";
import { ChartSelectComponent } from "../components/chart-select/chart-select";
import { HaveFilterComponent } from "../components/have-filter/have-filter";
import { ProgressFilterComponent } from "../components/progress-filter/progress-filter";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { HttpModule } from "@angular/http";
import { BigimageComponent } from "../components/bigimage/bigimage";

@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // RegisterPage,
    FilterComponent,
    UploadFilterComponent,
    PopoverComponent,
    ChartSelectComponent,
    HaveFilterComponent,
    BigimageComponent,
    ProgressFilterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CalendarModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    IonicStepperModule,
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(MyApp),
    NgIdleKeepaliveModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage,
    FilterComponent,
    UploadFilterComponent,
    PopoverComponent,
    // RegisterPage,
    ChartSelectComponent,
    HaveFilterComponent,
    BigimageComponent,
    ProgressFilterComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NetworkProvider,
    DatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
