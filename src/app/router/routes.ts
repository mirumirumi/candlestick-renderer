import { NgModule } from "@angular/core"
import { RouterModule as Router, Routes } from "@angular/router"

import { IndexComponent } from "../pages/index/index.component"

const routes: Routes = [
  {
    path: "",
    component: IndexComponent,
    title: "Candlestick Renderer",
  },
]

@NgModule({
  imports: [Router.forRoot(routes)],
  exports: [Router],
})
export class RouterModule {}
