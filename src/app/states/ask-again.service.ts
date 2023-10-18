import { Injectable } from "@angular/core"

import { AskAgainState, AskAgainStore } from "./ask-again.store"

@Injectable({
  providedIn: "root",
})
export class AskAgainService {
  constructor(
    // biome-ignore format:
    protected askAgainStore: AskAgainStore,
  ) {}

  update<K extends keyof AskAgainState>(key: K, value: unknown) {
    this.askAgainStore.update({ [key]: value })
  }
}
