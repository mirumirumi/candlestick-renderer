import { Injectable } from "@angular/core"
import { Store, StoreConfig } from "@datorama/akita"
import { YAxisType } from "klinecharts"

export interface PreferenceState {
  yAxis: YAxisType
  currentLabel: boolean
  mas: boolean
  volumePane: boolean
}

const createInitialState = (): PreferenceState => {
  return {
    yAxis: YAxisType.Normal,
    currentLabel: true,
    mas: true,
    volumePane: true,
  }
}

@Injectable({
  providedIn: "root",
})
@StoreConfig({ name: "Preference" })
export class PreferenceStore extends Store<PreferenceState> {
  constructor() {
    super(createInitialState())
  }
}
