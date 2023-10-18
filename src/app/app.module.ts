import { DialogModule } from "@angular/cdk/dialog"
import { CdkMenuModule } from "@angular/cdk/menu"
import { OverlayModule } from "@angular/cdk/overlay"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

import { AppComponent } from "./components/app.component"
import { BaseButtonComponent } from "./components/common/button/base-button/base-button.component"
import { InputFileComponent } from "./components/common/form/input-file/input-file.component"
import { SelectBoxComponent } from "./components/common/form/select-box/select-box.component"
import { SwitchComponent } from "./components/common/form/switch/switch.component"
import { SpinnerComponent } from "./components/common/loading/spinner/spinner.component"
import { BaseModalComponent } from "./components/common/modal/base-modal/base-modal.component"
import { HalfModalComponent } from "./components/common/modal/half-modal/half-modal.component"
import { ChartComponent } from "./components/features/chart/chart.component"
import { InputDirectlyComponent } from "./components/features/input-directly/input-directly.component"
import { OpenFileComponent } from "./components/features/open-file/open-file.component"
import { PreferenceComponent } from "./components/features/preference/preference.component"
import { FooterComponent } from "./components/layouts/footer/footer.component"
import { HeaderComponent } from "./components/layouts/header/header.component"
import { IndexComponent } from "./pages/index/index.component"
import { RouterModule } from "./router/routes";
import { CheckboxComponent } from './components/common/form/checkbox/checkbox.component';
import { TooltipComponent } from './components/common/others/tooltip/tooltip.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    BaseButtonComponent,
    SpinnerComponent,
    HalfModalComponent,
    OpenFileComponent,
    InputFileComponent,
    ChartComponent,
    BaseModalComponent,
    PreferenceComponent,
    SwitchComponent,
    SelectBoxComponent,
    InputDirectlyComponent,
    CheckboxComponent,
    TooltipComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    DialogModule,
    CdkMenuModule,
    OverlayModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTimes)
  }
}
