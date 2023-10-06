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

    const [prePrice, preVol] = this.getPrecisions(this.data)
    chart.setPriceVolumePrecision(prePrice, preVol)

    chart.applyNewData(this.data)
  }

  protected getPrecisions(kline: KLineSource): [number, number] {
    let price = 0
    let volume = 0

    const get = (value: number) => {
      const str = value.toString()
      const index = str.indexOf(".")

      let result
      if (index === -1) {
        result = 0
      } else {
        result = str.length - (index + 1)
      }
      return result
    }

    kline.forEach((candle) => {
      const resOpen = get(candle.open)
      if (price < resOpen) price = resOpen
      const resHigh = get(candle.high)
      if (price < resHigh) price = resHigh
      const resLow = get(candle.low)
      if (price < resLow) price = resLow
      const resClose = get(candle.close)
      if (price < resClose) price = resClose
      if (candle.volume) {
        const resVol = get(candle.volume)
        if (volume < resVol) volume = resVol
      }
    })

    return [price, volume]
  }
}
