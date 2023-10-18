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
  mouseMoveListener: ((event: MouseEvent) => void) | null = null
  overlayRef!: OverlayRef | null

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
    if (this.overlayRef) {
      this.overlayRef.detach()
      this.overlayRef = null
    }

    // Securely hide tooltips
    if (this.mouseMoveListener) {
      document.removeEventListener("mousemove", this.mouseMoveListener)
      this.mouseMoveListener = null
    }
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

    // Securely hide tooltips
    this.mouseMoveListener = (event: MouseEvent) => {
      const rect = origin.getBoundingClientRect()
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        this.close()
      }
    }
    document.addEventListener("mousemove", this.mouseMoveListener)

    this.overlayRef = overlayRef
  }
}
