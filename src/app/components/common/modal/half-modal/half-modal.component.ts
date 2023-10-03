import { AnimationEvent, animate, state, style, transition, trigger } from "@angular/animations"
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog"
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Output,
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
    content: string
    btnText: string | SafeHtml
  }
}

export type Modal = SimpleModal | ConfirmModal

@Component({
  selector: "c-half-modal",
  templateUrl: "./half-modal.component.html",
  styleUrls: ["./half-modal.component.scss"],
  animations: [
    trigger("show", [
      state("shown", style({ opacity: 1, transform: "translateY(0%)" })),
      state("hidden", style({ opacity: 0, transform: "translateY(100%)" })),
      transition(":enter", [style({ opacity: 0, transform: "translateY(100%)" }), animate("0.19s ease")]),
      transition("shown => hidden", [style({ opacity: 1, transform: "translateY(0%)" }), animate("0.09s ease")]),
    ]),
  ],
})
export class HalfModalComponent implements AfterViewInit {
  @Output() confirm = new EventEmitter<void>()

  @ViewChild("container", { read: ViewContainerRef }) container!: ViewContainerRef
  @ViewChild("simple_t", { read: TemplateRef }) simpleTemplate!: TemplateRef<Modal>
  @ViewChild("confirm_t", { read: TemplateRef }) confirmTemplate!: TemplateRef<Modal>

  leaving = false

  constructor(
    @Inject(DIALOG_DATA) private data: Modal,
    private dialogRef: DialogRef<HalfModalComponent>,
    private cd: ChangeDetectorRef,
  ) {
    this.dialogRef.keydownEvents.subscribe(() => this.close())
    this.dialogRef.backdropClick.subscribe(() => this.close())
  }

  ngAfterViewInit() {
    let template: TemplateRef<Modal>
    switch (this.data.templateType) {
      case "simple":
        template = this.simpleTemplate
        break
      case "confirm":
        template = this.confirmTemplate
        break
    }
    this.container.createEmbeddedView(template, this.data)

    this.cd.detectChanges()
  }

  animationDone(event: AnimationEvent) {
    if (event.toState === "hidden") {
      this.dialogRef.close()
    }
  }

  close() {
    this.leaving = true
  }
}
