import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./components/app.component"
import { FooterComponent } from "./components/layouts/footer/footer.component"
import { HeaderComponent } from "./components/layouts/header/header.component"
import { IndexComponent } from "./pages/index/index.component"
import { RouterModule } from "./router/routes"

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, IndexComponent],
  imports: [BrowserModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
