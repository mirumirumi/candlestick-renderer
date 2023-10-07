import { AnimationEvent } from "@angular/animations"
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog"
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core"
import { SafeHtml } from "@angular/platform-browser"

type SimpleModal = {
  templateType: "simple"
  context: {
    title: string
    content: string | SafeHtml
  }
}

type ConfirmModal = {
  templateType: "confirm"
  context: {
    content: string | SafeHtml
    btnText: string
  }
}

type ActionModal = {
  templateType: "action"
  context: {
    content: string | SafeHtml
    btnText: string
  }
}

export type ModalType = SimpleModal | ConfirmModal | ActionModal

type CloseEvent = "OK"

@Component({ template: "" })
export abstract class ModalBase implements AfterViewInit {
  @ViewChild("container", { read: ViewContainerRef }) container!: ViewContainerRef
  @ViewChild("simple_t", { read: TemplateRef }) simpleTemplate!: TemplateRef<ModalType>
  @ViewChild("confirm_t", { read: TemplateRef }) confirmTemplate!: TemplateRef<ModalType>
  @ViewChild("action_t", { read: TemplateRef }) actionTemplate!: TemplateRef<ModalType>

  leaving = false
  closeEvent?: CloseEvent = undefined

  constructor(
    @Inject(DIALOG_DATA) protected data: ModalType,
    protected dialogRef: DialogRef<CloseEvent>,
    protected cd: ChangeDetectorRef,
  ) {
    this.dialogRef.keydownEvents.subscribe((e: KeyboardEvent) => {
      if (e.key === "Escape") this.close()
    })
    this.dialogRef.backdropClick.subscribe(() => this.close())
  }

  ngAfterViewInit() {
    let template: TemplateRef<ModalType>
    switch (this.data.templateType) {
      case "simple":
        template = this.simpleTemplate
        break
      case "confirm":
        template = this.confirmTemplate
        break
      case "action":
        template = this.actionTemplate
        break
    }
    this.container.createEmbeddedView(template, this.data)

    this.cd.detectChanges()
  }

  // All close events must use this method
  close(event?: CloseEvent) {
    this.closeEvent = event

    // The animation will start to close
    this.leaving = true
  }

  animationDone(event: AnimationEvent) {
    if (event.toState === "hidden") {
      this.dialogRef.close(this.closeEvent)
    }
  }
}
