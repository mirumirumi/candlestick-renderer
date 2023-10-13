import { Component, OnInit } from "@angular/core"
import { YAxisType } from "klinecharts"

import { PreferenceQuery } from "../../../states/preference.query"
import { PreferenceService } from "../../../states/preference.service"
import { ItemIndex } from "../../common/form/select-box/select-box.component"

@Component({
  selector: "c-preference",
  templateUrl: "./preference.component.html",
  styleUrls: ["./preference.component.scss"],
})
export class PreferenceComponent implements OnInit {
  yAxisValue = [
    { value: YAxisType.Normal, text: "Price" },
    { value: YAxisType.Percentage, text: "Percent" },
    { value: YAxisType.Log, text: "Log" },
  ]
  yAxisIndex!: number
  currentLabelValue!: boolean
  masValue!: boolean
  volumePaneValue!: boolean

  // biome-ignore format:
  constructor(
    protected preferenceQuery: PreferenceQuery,
    protected preferenceService: PreferenceService,
  ) {}

  ngOnInit() {
    const preference = this.preferenceQuery.raw()
    switch (preference.yAxis) {
      case YAxisType.Normal:
        this.yAxisIndex = 0
        break
      case YAxisType.Percentage:
        this.yAxisIndex = 1
        break
      case YAxisType.Log:
        this.yAxisIndex = 2
        break
    }
    this.currentLabelValue = preference.currentLabel
    this.masValue = preference.mas
    this.volumePaneValue = preference.volumePane
  }

  onChangeYAxis(e: ItemIndex) {
    this.preferenceService.update("yAxis", e[0].value)
  }

  onChangeCurrentLabel(value: boolean) {
    this.preferenceService.update("currentLabel", value)
  }

  onChangeMAs(value: boolean) {
    this.preferenceService.update("mas", value)
  }

  onChangeVolumePane(value: boolean) {
    this.preferenceService.update("volumePane", value)
  }
}
