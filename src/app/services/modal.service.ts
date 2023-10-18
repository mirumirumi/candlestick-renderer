import { AutoFocusTarget, Dialog, DialogRef } from "@angular/cdk/dialog"
import { Injectable } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"

import { ComponentType } from "@angular/cdk/portal"
import { ModalBase, ModalType } from "../components/common/modal/modal-base"

@Injectable({
  providedIn: "root",
})
export class ModalService<M extends ModalBase> {
  constructor(
    // biome-ignore format:
    protected dialog: Dialog,
    protected sanitizer: DomSanitizer,
  ) {}

  open(
    modalComponent: ComponentType<M>,
    type: ModalType,
    options?: {
      class?: string
      autoFocus?: AutoFocusTarget
    },
  ): DialogRef {
    const data = type

    if (typeof data.context.content === "string" && data.context.content[0] === "<") {
      data.context.content = this.sanitizer.bypassSecurityTrustHtml(data.context.content as string)
    }

    return this.dialog.open<unknown, ModalType>(modalComponent, {
      data,
      disableClose: true,
      panelClass: options?.class,
      autoFocus: options?.autoFocus ?? "dialog",
    })
  }
}
