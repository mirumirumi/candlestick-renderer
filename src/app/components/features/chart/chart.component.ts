import { Component, Input, OnDestroy, OnInit } from "@angular/core"
import { Chart, init } from "klinecharts"
import { skip } from "rxjs"
import { debounce } from "throttle-debounce"

import { KLineSource } from "../../../shared/types"
import { PreferenceQuery } from "../../../states/preference.query"
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
export class ChartComponent implements OnInit, OnDestroy {
  @Input({ required: true }) data!: KLineSource

  chart!: Chart
  onResize = debounce(300, () => this.chart.resize())

  constructor(
    // biome-ignore format:
    protected preferenceQuery: PreferenceQuery,
  ) {}

  ngOnInit() {
    this.chart = init("chart", style)!
    this.chart.setBarSpace(11)

    const [prePrice, preVol] = this.getPrecisions(this.data)
    this.chart.setPriceVolumePrecision(prePrice, preVol)

    // Load preferences
    const preference = this.preferenceQuery.getValue()
    let paneIdVolumePane: string
    this.chart.createIndicator({ name: "MA", calcParams: [5, 10, 20], visible: preference.mas }, false, {
      id: "candle_pane",
    }) as string
    if (preference.volumePane) {
      if (this.data[0]!.volume) {
        paneIdVolumePane = this.chart.createIndicator({ name: "VOL" }, true, { height: 113 }) as string
      }
    }

    // Render a chart
    this.chart.applyNewData(this.data)

    // Subscribe changing preferences
    this.preferenceQuery.selectYAxis().subscribe((newValue) => this.chart.setStyles({ yAxis: { type: newValue } }))
    this.preferenceQuery
      .selectCurrentLabel()
      .subscribe((newValue) => this.chart.setStyles({ candle: { priceMark: { last: { show: newValue } } } }))
    this.preferenceQuery.selectMAs().subscribe((newValue) => {
      this.chart.overrideIndicator({ name: "MA", visible: newValue })
    })
    this.preferenceQuery
      .selectVolumePane()
      .pipe(skip(1))
      .subscribe((newValue) => {
        if (!newValue) {
          this.chart.removeIndicator(paneIdVolumePane)
        } else {
          paneIdVolumePane = this.chart.createIndicator({ name: "VOL" }, true, { height: 113 }) as string
        }
      })

    // Add event listener for window resizeing
    window.addEventListener("resize", this.onResize)
  }

  ngOnDestroy() {
    window.removeEventListener("resize", this.onResize)
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
