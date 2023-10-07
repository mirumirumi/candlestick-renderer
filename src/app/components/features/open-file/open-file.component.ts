import { Component, EventEmitter, Output } from "@angular/core"
import { Result } from "ts-results"

import { ParseFileService } from "../../../services/parse-file.service"
import { ToastService } from "../../../services/toast.service"
import { FileData, KLineSource } from "../../../shared/types"

@Component({
  selector: "c-open-file",
  templateUrl: "./open-file.component.html",
  styleUrls: ["./open-file.component.scss"],
})
export class OpenFileComponent {
  @Output() onChange = new EventEmitter<KLineSource>()

  // biome-ignore format:
  constructor(
    protected parseFileService: ParseFileService,
    protected toastService: ToastService,
  ) {}

  accept = [".json", ".csv", ".tsv", ".txt", ".rtf", ".log", ".dat"]
  isLoading = false

  onFileChange(file: Result<Array<FileData>, Error>) {
    this.isLoading = true

    if (file.err) {
      this.toastService.error("Failed to load the file.")
      this.isLoading = false
      return
    }

    if (!this.accept.map((ext) => ext.slice(1)).includes(file.val[0]!.ext)) {
      this.toastService.error("Unsupported file format.")
      this.isLoading = false
      return
    }

    const fileData = file.val[0]!
    const kline = this.parseFileService.parse(fileData)

    if (kline.err) {
      this.toastService.error("The candlestick chart data is incorrect. Please verify and try again.")
      this.isLoading = false
      return
    }

    this.onChange.emit(kline.val)
    this.isLoading = false
  }
}
