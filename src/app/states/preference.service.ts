import { PreferenceStore } from "./preference.store"

export class PreferenceService {
  // biome-ignore format:
  constructor(
    protected preferenceStore: PreferenceStore,
  ) {}

  update(key: string, value: unknown) {
    this.preferenceStore.update({ [key]: value })
  }
}
