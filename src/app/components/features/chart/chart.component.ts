import { Component, Input, OnInit } from "@angular/core"
import { init } from "klinecharts"

import { KLineSource } from "../../../shared/types"
import style from "./style-config"

@Component({
  selector: "c-chart",
  template: `
    <div id="chart"></div>
  `,
  styles: [
    `
    #chart {
      width: 99%;
      height: 99%;
      padding: 0.5%;
    }
    `,
  ],
})
export class ChartComponent implements OnInit {
  @Input() data!: KLineSource

  ngOnInit() {
    const chart = init("chart", style)!
    chart.setBarSpace(9)

    chart.setPriceVolumePrecision(4, 1)

    chart.applyNewData(this.data)
  }
}
