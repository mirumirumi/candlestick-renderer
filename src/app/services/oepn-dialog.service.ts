import { AutoFocusTarget, Dialog, DialogRef } from "@angular/cdk/dialog"
import { Injectable } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"

import { ComponentType } from "@angular/cdk/portal"
import { ModalBase, ModalType } from "../components/common/modal/modal-base"

@Injectable({
  providedIn: "root",
})
export class OepnDialogService<M extends ModalBase> {
  constructor(protected dialog: Dialog, protected sanitizer: DomSanitizer) {}

  open(
    modalComponent: ComponentType<M>,
    type: ModalType,
    options?: {
      class?: string
      autoFocus?: AutoFocusTarget
    },
  ): DialogRef {
    const data = type
    data.context.content = this.sanitizer.bypassSecurityTrustHtml(data.context.content as string)

    return this.dialog.open<unknown, ModalType>(modalComponent, {
      data,
      disableClose: true,
      panelClass: options?.class,
      autoFocus: options?.autoFocus ?? "first-tabbable",
    })
  }
}
