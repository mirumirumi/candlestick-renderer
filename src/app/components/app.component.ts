import { Component, OnInit } from "@angular/core"

import { ModalService } from "../services/modal.service"
import { HalfModalComponent } from "./common/modal/half-modal/half-modal.component"

@Component({
  selector: "app-root",
  template: `
    <c-header></c-header>
    <router-outlet></router-outlet>
    <c-footer></c-footer>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    // biome-ignore format:
    protected modalService: ModalService<HalfModalComponent>,
  ) {}

  ngOnInit() {
    const width = window.innerWidth

    if (width < 768 && !localStorage.getItem("mobile-detected")) {
      this.modalService.open(HalfModalComponent, {
        templateType: "simple",
        context: {
          title: "Mobile (or Tablet) detected!",
          content: "This site is intended for PC use only. Please note that the screen may not display properly.",
          height: 27,
        },
      })
      localStorage.setItem("mobile-detected", "true")
    }
  }
}
