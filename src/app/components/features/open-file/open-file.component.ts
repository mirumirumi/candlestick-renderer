import { Component, EventEmitter, Output } from "@angular/core"
import { Result } from "ts-results"

import { FileData } from "../../common/form/input-file/input-file.component"

@Component({
  selector: "c-open-file",
  templateUrl: "./open-file.component.html",
  styleUrls: ["./open-file.component.scss"],
})
export class OpenFileComponent {
  @Output() onChange = new EventEmitter<File>()

  isLoading = false

  // ファイルサイズの上限は？（ローソク足の本数の上限は？

  // 読み込みに全然時間がかからないなら少なくとも読み込み用の画面はいらない

  onFileChange(file: Result<FileData[], Error>) {
    this.isLoading = true

    if (file.err) {
      // toast
      return
    }

    const data = file.val[0]
    console.log(data)

    // なんか色々やる

    this.onChange.emit()
    this.isLoading = false
  }
}
