import { Injectable } from "@angular/core"
import { Store, StoreConfig } from "@datorama/akita"

export interface AskAgainState {
  closeChart: boolean
}

const createInitialState = (): AskAgainState => {
  return {
    closeChart: true,
  }
}

@Injectable({
  providedIn: "root",
})
@StoreConfig({ name: "AskAgain" })
export class AskAgainStore extends Store<AskAgainState> {
  constructor() {
    super(createInitialState())
  }
}
