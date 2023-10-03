import { DialogModule } from "@angular/cdk/dialog"
import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

import { AppComponent } from "./components/app.component"
import { BaseButtonComponent } from "./components/common/button/base-button/base-button.component"
import { SpinnerComponent } from "./components/common/loading/spinner/spinner.component"
import { HalfModalComponent } from "./components/common/modal/half-modal/half-modal.component"
import { FooterComponent } from "./components/layouts/footer/footer.component"
import { HeaderComponent } from "./components/layouts/header/header.component"
import { IndexComponent } from "./pages/index/index.component"
import { RouterModule } from "./router/routes"

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    BaseButtonComponent,
    SpinnerComponent,
    HalfModalComponent,
  ],
  imports: [BrowserModule, RouterModule, FontAwesomeModule, DialogModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTimes)
  }
}
