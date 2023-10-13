import { Component } from "@angular/core"

import { PreferenceQuery } from "../../../states/preference.query"
import { ItemIndex } from "../../common/form/select-box/select-box.component"

@Component({
  selector: "c-preference",
  templateUrl: "./preference.component.html",
  styleUrls: ["./preference.component.scss"],
})
export class PreferenceComponent {
  yAxisIndex!: number
  currentLabelValue!: boolean
  masValue!: boolean
  volumePaneValue!: boolean

  // biome-ignore format:
  constructor(
    protected preferenceQuery: PreferenceQuery,
  ) {}

  yAxis(e: ItemIndex) {}

  currentLabel(value: boolean) {}

  mas(value: boolean) {}

  volumePane(value: boolean) {}
}
