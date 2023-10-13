import { Injectable } from "@angular/core"

import { PreferenceStore } from "./preference.store"
import { PreferenceState } from "./preference.store"

@Injectable({
  providedIn: "root",
})
export class PreferenceService {
  // biome-ignore format:
  constructor(
    protected preferenceStore: PreferenceStore,
  ) {}

  update<K extends keyof PreferenceState>(key: K, value: unknown) {
    this.preferenceStore.update({ [key]: value })
  }
}
