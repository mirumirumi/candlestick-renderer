import { Store, StoreConfig } from "@datorama/akita"

export interface PreferenceState {
  yAxis: "Price" | "Percent" | "Log"
  currentLabel: boolean
  mas: boolean
  volumePane: boolean
}

const createInitialState = (): PreferenceState => {
  return {
    yAxis: "Price",
    currentLabel: true,
    mas: true,
    volumePane: true,
  }
}

@StoreConfig({ name: "preference" })
export class PreferenceStore extends Store<PreferenceState> {
  constructor() {
    super(createInitialState())
  }
}
