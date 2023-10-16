import { DialogRef } from "@angular/cdk/dialog"
import { Component } from "@angular/core"

import { BaseModalComponent } from "../../components/common/modal/base-modal/base-modal.component"
import { ModalService } from "../../services/modal.service"
import { KLineSource } from "../../shared/types"

@Component({
  selector: "index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent {
  klineSource!: KLineSource
  dialogRef!: DialogRef
  existsViewer = false

  // biome-ignore format:
  constructor(
    protected modalService: ModalService<BaseModalComponent>,
  ) {}

  renderChart(klineSource: KLineSource) {
    this.klineSource = klineSource
    this.existsViewer = true
  }

  onClose() {
    this.dialogRef = this.modalService.open(BaseModalComponent, {
      templateType: "confirm",
      context: {
        content: "Are you sure you want to close?",
        btnText: "Yes",
      },
    })
    this.dialogRef.closed.subscribe((e) => {
      if (e) this.onConfirm()
    })
  }

  onConfirm() {
    this.existsViewer = false
  }
}
