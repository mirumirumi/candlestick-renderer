import { animate, state, style, transition, trigger } from "@angular/animations"
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core"

import { ModalBase } from "../modal-base"

@Component({
  selector: "c-half-modal",
  templateUrl: "./half-modal.component.html",
  styleUrls: ["./half-modal.component.scss"],
  animations: [
    trigger("show", [
      state("hidden", style({ opacity: 0, transform: "translateY(100%)" })),
      transition(":enter", [style({ opacity: 0, transform: "translateY(100%)" }), animate("0.19s ease")]),
      transition("shown => hidden", animate("0.09s ease")),
    ]),
  ],
})
export class HalfModalComponent extends ModalBase implements AfterViewInit {
  @ViewChild("modal") modal!: ElementRef<HTMLDivElement>

  override ngAfterViewInit() {
    super.ngAfterViewInit()

    if (this.halfModalHeight === "auto") {
      let plus = 1
      if (this.platform.IOS) {
        plus += 10
      }
      this.halfModalHeight = `${(this.modal.nativeElement.offsetHeight + plus).toString()}px`
    }
    this.modal.nativeElement.style.opacity = "1"

    this.cd.detectChanges()
  }
}
