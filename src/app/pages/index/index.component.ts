import { DialogRef } from "@angular/cdk/dialog"
import { Component } from "@angular/core"

import { BaseModalComponent } from "../../components/common/modal/base-modal/base-modal.component"
import { OepnDialogService } from "../../services/oepn-dialog.service"
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

  constructor(protected openDialogService: OepnDialogService<BaseModalComponent>) {}

  onFileSelect(klineSource: KLineSource) {
    this.klineSource = klineSource
    this.noFile = false
  }

  onClose() {
    this.dialogRef = this.openDialogService.open(BaseModalComponent, {
      templateType: "confirm",
      context: {
        content: "Are you sure you want to close the current candlestick chart?",
        btnText: "Yes",
      },
    })
    this.dialogRef.closed.subscribe((e) => {
      if (e) this.onConfirm()
    })
  }

  onConfirm() {
    this.noFile = true
  }
}
