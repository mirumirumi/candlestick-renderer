import { Component } from "@angular/core"

@Component({
  selector: "app-root",
  template: `
    <c-header></c-header>
    <router-outlet></router-outlet>
    <c-footer></c-footer>
  `,
})
export class AppComponent {}
