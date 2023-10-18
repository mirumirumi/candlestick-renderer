import { Injectable } from "@angular/core"
import { Query } from "@datorama/akita"

import { AskAgainState, AskAgainStore } from "./ask-again.store"

@Injectable({
  providedIn: "root",
})
export class AskAgainQuery extends Query<AskAgainState> {
  constructor(
    // biome-ignore format:
    protected override store: AskAgainStore,
  ) {
    super(store)
  }
}
