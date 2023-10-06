import { Dialog, DialogRef } from "@angular/cdk/dialog"
import { Component } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"

import { BaseModalComponent } from "../../components/common/modal/base-modal/base-modal.component"
import { ModalType } from "../../components/common/modal/modal-base"
import { KLineSource } from "../../shared/types"

@Component({
  selector: "index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent {
  klineSource!: KLineSource
  dialogRef!: DialogRef
  noFile = true

  constructor(protected dialog: Dialog) {}

  onFileSelect(klineSource: KLineSource) {
    this.klineSource = klineSource
    this.noFile = false
  }

  onClose() {
    this.dialogRef = this.dialog.open<unknown, ModalType>(BaseModalComponent, {
      data: {
        templateType: "confirm",
        context: {
          content: "Are you sure you want to close the current candlestick chart?",
          btnText: "Yes",
        },
      },
      // panelClass: "",
      disableClose: true,
    })

    // this.noFile = true
  }
}
