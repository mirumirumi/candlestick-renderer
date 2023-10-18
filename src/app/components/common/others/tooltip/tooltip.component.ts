import { animate, style, transition, trigger } from "@angular/animations"
import { OverlayRef } from "@angular/cdk/overlay"
import { Component, Inject } from "@angular/core"

@Component({
  selector: "c-tooltip",
  template: `
    <div @show>
      {{ message }}
    </div>
  `,
  styleUrls: ["./tooltip.component.scss"],
  animations: [trigger("show", [transition(":enter", [style({ opacity: 0 }), animate("0.11s ease-out")])])],
})
export class TooltipComponent {
  constructor(
    // biome-ignore format:
    @Inject("message") public message: string,
    protected overlayRef: OverlayRef,
  ) {}

  close() {
    this.overlayRef.detach()
  }
}
