import { animate, state, style, transition, trigger } from "@angular/animations"
import { Component } from "@angular/core"

import { ModalBase } from "../modal-base"

@Component({
  selector: "c-base-modal",
  templateUrl: "./base-modal.component.html",
  animations: [
    trigger("show", [
      state("hidden", style({ opacity: 0 })),
      transition(":enter", [style({ opacity: 0, transform: "translateY(-13px)" }), animate("0.19s ease")]),
      transition("shown => hidden", animate("0.09s ease")),
    ]),
  ],
})
export class BaseModalComponent extends ModalBase<BaseModalComponent> {}
