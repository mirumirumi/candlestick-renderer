import { DialogRef } from "@angular/cdk/dialog"
import { Component } from "@angular/core"

import { BaseModalComponent } from "../../components/common/modal/base-modal/base-modal.component"
import { ModalService } from "../../services/modal.service"
import { KLineSource } from "../../shared/types"
import { AskAgainQuery } from "../../states/ask-again.query"

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
    protected askAgainQuery: AskAgainQuery,
  ) {}

  renderChart(klineSource: KLineSource) {
    this.klineSource = klineSource
    this.existsViewer = true
  }

  onClose() {
    if (!this.askAgainQuery.getValue().closeChart) {
      this.onConfirm()
      return
    }

    this.dialogRef = this.modalService.open(BaseModalComponent, {
      templateType: "confirm",
      context: {
        content: "Are you sure you want to close?",
        btnText: "Yes",
        askAgain: {
          stateKey: "closeChart",
        },
      },
    })
    this.dialogRef.closed.subscribe((e) => {
      if (e === "OK") this.onConfirm()
    })
  }

  onConfirm() {
    this.existsViewer = false
  }
}
