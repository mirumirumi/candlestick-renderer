import { Injectable } from "@angular/core"

import { PreferenceState, PreferenceStore } from "./preference.store"

@Injectable({
  providedIn: "root",
})
export class PreferenceService {
  constructor(
    // biome-ignore format:
    protected preferenceStore: PreferenceStore,
  ) {}

  update<K extends keyof PreferenceState>(key: K, value: unknown) {
    this.preferenceStore.update({ [key]: value })
  }
}
