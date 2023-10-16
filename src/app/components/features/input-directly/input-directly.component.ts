import { DialogRef } from "@angular/cdk/dialog"
import { Component, EventEmitter, Output, TemplateRef, ViewChild } from "@angular/core"

import { ModalService } from "../../../services/modal.service"
import { ParseFileService } from "../../../services/parse-file.service"
import { ToastService } from "../../../services/toast.service"
import { FileData, KLineSource } from "../../../shared/types"
import { BaseModalComponent } from "../../common/modal/base-modal/base-modal.component"

@Component({
  selector: "c-input-directly",
  templateUrl: "./input-directly.component.html",
  styleUrls: ["./input-directly.component.scss"],
})
export class InputDirectlyComponent {
  @Output() changed = new EventEmitter<KLineSource>()

  @ViewChild("enter_form") enterFormRef!: TemplateRef<null>

  text!: string
  dialogRef!: DialogRef
  isLoading = false

  // biome-ignore format:
  constructor(
    protected modalService: ModalService<BaseModalComponent>,
    protected parseFileService: ParseFileService,
    protected toastService: ToastService,
  ) {}

  onClick() {
    this.dialogRef = this.modalService.open(
      BaseModalComponent,
      {
        templateType: "action",
        context: {
          title: "Enter your candlestick data",
          content: this.enterFormRef,
          btnText: "Render",
        },
      },
      { autoFocus: "first-tabbable" },
    )
    this.dialogRef.closed.subscribe((e) => {
      if (e === "OK") {
        this.isLoading = true

        const fileData = this.textToFileLike(this.text)
        const kline = this.parseFileService.parse(fileData)

        if (kline.err) {
          this.toastService.error("The candlestick chart data is incorrect. Please verify and try again.")
          this.isLoading = false
          return
        }

        this.changed.emit(kline.val)
        this.isLoading = false
      }
    })
  }

  protected textToFileLike(text: string): FileData {
    if (["{", "}", ":"].every((c) => text.includes(c))) {
      return {
        value: text,
        ext: "json",
      }
    } else {
      return {
        value: text,
        ext: "txt",
      }
    }
  }
}
