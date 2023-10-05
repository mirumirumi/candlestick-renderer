import { Component } from "@angular/core"

import { KLineSource } from "../../shared/types"

@Component({
  selector: "index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent {
  klineSource!: KLineSource
  noFile = true

  onFileSelect(klineSource: KLineSource) {
    this.klineSource = klineSource
    this.noFile = false
  }
}
