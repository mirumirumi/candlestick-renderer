import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, signal } from "@angular/core"

@Component({
  selector: "c-base-button",
  templateUrl: "./base-button.component.html",
  styleUrls: ["./base-button.component.scss"],
})
export class BaseButtonComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) type!: "fill" | "outline" | "text"
  @Input() isSubmitButton?: boolean
  @Input() mainColor?: string
  @Input() spinnerColor?: string
  @Input() isSubmitting?: boolean
  @Input() disabled?: boolean

  @ViewChild("button") button!: ElementRef<HTMLButtonElement>

  width = signal("auto")
  height = signal("auto")
  _mainColor = this.mainColor || "var(--color-primary)"
  color!: string
  borderColor!: string
  backgroundColor!: string

  ngOnInit() {
    const white = "var(--color-text-white)"
    const t = "transparent"
    this._mainColor = this.mainColor || "var(--color-primary)"
    this.color = this.type === "fill" ? white : this.type === "outline" ? this._mainColor : "var(--color-text)"
    this.borderColor = this.type === "fill" || this.type === "outline" ? this._mainColor : t
    this.backgroundColor = this.type === "fill" ? this._mainColor : this.type === "outline" ? white : t
  }

  ngAfterViewInit() {
    this.width.set(`${(this.button.nativeElement.offsetWidth + 3).toString()}px`)
    this.height.set(`${(this.button.nativeElement.offsetHeight + 1).toString()}px`)
  }

  onClick(e: Event) {
    e.preventDefault()
  }
}
