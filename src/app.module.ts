import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./components/app.component"
import { IndexComponent } from "./pages/index/index.component"
import { RouterModule } from "./router/routes"

@NgModule({
  declarations: [AppComponent, IndexComponent],
  imports: [BrowserModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
