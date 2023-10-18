import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay"
import { ComponentPortal } from "@angular/cdk/portal"
import { Injectable, Injector, Input, StaticProvider } from "@angular/core"
import { Subject } from "rxjs"
import { debounceTime } from "rxjs/operators"

import { TooltipComponent } from "../components/common/others/tooltip/tooltip.component"

interface TooltipData {
  message: string
  origin: HTMLElement
}

@Injectable({
  providedIn: "root",
})
export class TooltipService {
  @Input() position: "above" | "below" = "below" // UNIMPLEMENTED!

  showTooltipSubject = new Subject<TooltipData>()
  overlayRef!: OverlayRef

  constructor(
    // biome-ignore format:
    protected overlay: Overlay,
    protected parentInjector: Injector,
  ) {
    this.showTooltipSubject.pipe(debounceTime(373)).subscribe((data) => {
      this._show(data.message, data.origin)
    })
  }

  show(message: string, origin: HTMLElement) {
    this.showTooltipSubject.next({ message, origin })
  }

  close() {
    this.overlayRef.detach()
  }

  protected _show(message: string, origin: HTMLElement) {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPush(true)
      .withPositions([
        {
          originX: "center",
          originY: "bottom",
          overlayX: "center",
          overlayY: "top",
        },
      ])

    const overlayRef = this.overlay.create(
      new OverlayConfig({
        positionStrategy,
      }),
    )

    const providers: StaticProvider[] = [
      { provide: "message", useValue: message },
      { provide: OverlayRef, useValue: overlayRef },
    ]
    const childInjector = Injector.create({ providers, parent: this.parentInjector })

    const tooltipPortal = new ComponentPortal(TooltipComponent, null, childInjector)
    overlayRef.attach(tooltipPortal)

    this.overlayRef = overlayRef
  }
}
