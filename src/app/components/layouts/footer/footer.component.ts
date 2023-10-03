import { Dialog } from "@angular/cdk/dialog"
import { Component } from "@angular/core"

import { HalfModalComponent, Modal } from "../../common/modal/half-modal/half-modal.component"

@Component({
  selector: "c-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  constructor(private dialog: Dialog) {}

  showPP() {
    this.dialog.open<unknown, Modal>(HalfModalComponent, {
      data: {
        templateType: "simple",
        context: {
          title: "Privacy Policy",
          content: "Your Content",
        },
      },
    })
  }
}
