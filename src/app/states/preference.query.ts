import { Injectable } from "@angular/core"
import { Query } from "@datorama/akita"
import { YAxisType } from "klinecharts"
import { Observable } from "rxjs"

import { PreferenceState, PreferenceStore } from "./preference.store"

@Injectable({
  providedIn: "root",
})
export class PreferenceQuery extends Query<PreferenceState> {
  // biome-ignore format:
  constructor(
    protected override store: PreferenceStore,
  ) {
    super(store)
  }

  selectYAxis(): Observable<YAxisType> {
    return this.select((state) => state.yAxis)
  }

  selectCurrentLabel(): Observable<boolean> {
    return this.select((state) => state.currentLabel)
  }

  selectMAs(): Observable<boolean> {
    return this.select((state) => state.mas)
  }

  selectVolumePane(): Observable<boolean> {
    return this.select((state) => state.volumePane)
  }
}
