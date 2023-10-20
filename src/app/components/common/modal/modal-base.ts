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

import { AskAgainQuery } from "../../../states/ask-again.query"
import { AskAgainService } from "../../../states/ask-again.service"
import { AskAgainState } from "../../../states/ask-again.store"

// Only half-modal
type SimpleModal = {
  templateType: "simple"
  context: {
    title?: string
    content: string | SafeHtml
    height?: number
  }
}

type ConfirmModal = {
  templateType: "confirm"
  context: {
    title?: string
    content: string | SafeHtml
    btnText: string
    askAgain?: {
      text?: string
      stateKey: string
    }
  }
}

type ActionModal = {
  templateType: "action"
  context: {
    title?: string
    content: string | SafeHtml | TemplateRef<null>
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
  @ViewChild("action_container", { read: ViewContainerRef }) actionContainer!: ViewContainerRef

  leaving = false
  closeEvent?: CloseEvent = undefined
  isAskAgain!: boolean
  halfModalHeight = "auto"

  constructor(
    @Inject(DIALOG_DATA) protected data: ModalType,
    protected dialogRef: DialogRef<CloseEvent>,
    protected cd: ChangeDetectorRef,
    protected askAgainQuery: AskAgainQuery,
    protected askAgainService: AskAgainService,
  ) {
    this.dialogRef.backdropClick.subscribe(() => this.close())
    this.dialogRef.keydownEvents.subscribe((e: KeyboardEvent) => {
      if (e.key === "Escape") this.close()
    })
  }

  ngAfterViewInit() {
    let template: TemplateRef<ModalType>
    switch (this.data.templateType) {
      case "simple":
        template = this.simpleTemplate
        if (this.data.context.height) {
          this.halfModalHeight = `${this.data.context.height}svh !important`
        }
        break
      case "confirm":
        template = this.confirmTemplate
        if (this.data.context.askAgain) {
          this.isAskAgain = this.askAgainQuery.getValue()[this.data.context.askAgain.stateKey as keyof AskAgainState]
        }
        break
      case "action":
        template = this.actionTemplate
        break
    }
    this.container.createEmbeddedView(template, this.data)
    this.cd.detectChanges()

    if (this.data.context.content instanceof TemplateRef) {
      this.actionContainer.createEmbeddedView(this.data.context.content)
    }

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

  isString(value: unknown) {
    return typeof value === "string"
  }
}
