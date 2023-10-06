import { Component, EventEmitter, Input, Output } from "@angular/core"
import { Err, Ok, Result } from "ts-results"

import { FileData } from "../../../../shared/types"

@Component({
  selector: "c-input-file",
  templateUrl: "./input-file.component.html",
})
export class InputFileComponent {
  @Input() accept?: string
  @Input() multiple?: boolean

  @Output() onChange = new EventEmitter<Result<Array<FileData>, Error>>()

  async onFileChange(e: Event) {
    const input = e.target as HTMLInputElement
    if (!input.files?.length) {
      this.onChange.emit(new Err(Error()))
      return
    }

    const files = []
    if (this.multiple) {
      for (let i = 0; i < input.files.length; i++) {
        files.push(input.files[i]!)
      }
    } else {
      files.push(input.files[0]!)
    }

    let results
    try {
      results = await Promise.all(
        Array.from(files).map(async (file) => {
          return {
            value: await this.readFileAsync(file),
            name: file.name,
            ext: file.name.split(".").pop(),
          } as FileData
        }),
      )
    } catch (err) {
      console.error(err)
      this.onChange.emit(new Err(Error()))
      return
    }

    this.onChange.emit(new Ok(results))
  }

  protected async readFileAsync(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = (event) => resolve(event.target!.result as string)
      reader.onerror = (err) => reject(err)
    })
  }
}
