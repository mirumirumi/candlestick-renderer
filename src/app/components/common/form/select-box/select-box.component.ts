import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from "@angular/core"

import { isHalfWidth } from "../../../../shared/utils"

interface Item {
  value: string | unknown
  text?: string
}

export type ItemIndex = [Item, number]

@Component({
  selector: "c-select-box",
  templateUrl: "./select-box.component.html",
  styleUrls: ["./select-box.component.scss"],
})
export class SelectBoxComponent implements OnInit, OnDestroy {
  // Selectable to have the default item selected or not selected as the initial state

  @Input({ required: true }) items!: Array<Item>
  @Input() placeholder = ""
  @Input() defaultIndex: number | null = 0
  @Input() type!: "fill" | "outline" // UNIMPLEMENTED!
  @Input() mainColor = "var(--color-gray)" // UNIMPLEMENTED!
  @Input() fontSize = "0.95em"

  @Output() selected = new EventEmitter<ItemIndex>()

  @ViewChildren("buttons") buttonsRef!: QueryList<ElementRef<HTMLButtonElement>>

  isSelecting = false
  hasSelectedAtLeastOnce = false
  selectedItem!: ItemIndex
  currentIndex!: number // Used only with keyboard selection
  width!: string
  clickEvent = () => this.close()

  ngOnInit() {
    // Dynamically determine the width from the longest strings in items
    this.setWidth()

    if (this.defaultIndex !== null) {
      // Has default selection

      this.selectedItem = [this.items[this.defaultIndex]!, this.defaultIndex]
      this.currentIndex = this.defaultIndex
      this.hasSelectedAtLeastOnce = true
    } else {
      // Does not have default selection

      this.currentIndex = this.selectedItem[1]
    }
  }

  show(e: Event) {
    if (
      this.isSelecting &&
      (e.target as HTMLButtonElement).parentElement?.parentElement?.tagName === "c-select-box".toUpperCase()
    ) {
      return
    }

    this.currentIndex = this.selectedItem[1]
    this.isSelecting = true

    setTimeout(() => {
      this.buttonsRef.get(this.selectedItem[1])!.nativeElement.focus()
      document.addEventListener("click", this.clickEvent)
    })
  }

  select(itemIndex: ItemIndex) {
    this.selectedItem = itemIndex
    this.currentIndex = itemIndex[1]
    this.close()
    this.hasSelectedAtLeastOnce = true
    this.selected.emit(itemIndex)
  }

  onKeyEvents(e: KeyboardEvent, itemIndex: ItemIndex) {
    if (e.key === "Escape") {
      this.close()
      return
    }

    if (e.key === "Enter") {
      this.select(itemIndex)
      return
    }

    if (e.key === "ArrowUp" && 1 <= this.currentIndex) {
      this.currentIndex -= 1
    } else if (e.key === "ArrowDown" && this.currentIndex < this.items.length - 1) {
      this.currentIndex += 1
    }

    this.buttonsRef.get(this.currentIndex)!.nativeElement.focus()
  }

  protected close() {
    this.isSelecting = false
    document.removeEventListener("click", this.clickEvent)
  }

  protected setWidth() {
    let witdh = 0
    for (const item of this.items) {
      const text = item.text ?? item.value
      let length = 0
      for (const t of text as string) {
        if (isHalfWidth(t)) {
          length += 1
        } else {
          length += 1.5
        }
      }
      if (witdh < length) {
        witdh = length
      }
    }
    this.width = `${(witdh * 1.3).toString()}em`
  }

  ngOnDestroy() {
    // It should have been removed every time, but just in case
    document.removeEventListener("click", this.clickEvent)
  }
}
