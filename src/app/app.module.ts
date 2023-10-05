import { DialogModule } from "@angular/cdk/dialog"
import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

import { AppComponent } from "./components/app.component"
import { BaseButtonComponent } from "./components/common/button/base-button/base-button.component"
import { InputFileComponent } from "./components/common/form/input-file/input-file.component"
import { SpinnerComponent } from "./components/common/loading/spinner/spinner.component"
import { HalfModalComponent } from "./components/common/modal/half-modal/half-modal.component"
import { OpenFileComponent } from "./components/features/open-file/open-file.component"
import { FooterComponent } from "./components/layouts/footer/footer.component"
import { HeaderComponent } from "./components/layouts/header/header.component"
import { IndexComponent } from "./pages/index/index.component"
import { RouterModule } from "./router/routes";
import { ChartComponent } from './components/features/chart/chart.component'

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
  ],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule, FontAwesomeModule, DialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTimes)
  }
}
