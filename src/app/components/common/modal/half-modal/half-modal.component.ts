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

@Component({
  selector: "c-half-modal",
  templateUrl: "./half-modal.component.html",
  styleUrls: ["./half-modal.component.scss"],
})
export class HalfModalComponent implements AfterViewInit {
  @Output() onConfirm = new EventEmitter<void>()

  @ViewChild("container", { read: ViewContainerRef }) container!: ViewContainerRef
  @ViewChild("simple_t", { read: TemplateRef }) simpleTemplate!: TemplateRef<Modal>
  @ViewChild("confirm_t", { read: TemplateRef }) confirmTemplate!: TemplateRef<Modal>

  constructor(
    @Inject(DIALOG_DATA) private data: Modal,
    private dialogRef: DialogRef<HalfModalComponent>,
    private cd: ChangeDetectorRef,
  ) {}

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

  confirm() {
    this.onConfirm.emit()
  }

  close() {
    this.dialogRef.close()
  }
}

export type Modal = SimpleModal | ConfirmModal

type SimpleModal = {
  templateType: "simple"
  context: {
    title: string
    content: string
  }
}

type ConfirmModal = {
  templateType: "confirm"
  context: {
    title: string
    content: string
    btnText: string
  }
}
