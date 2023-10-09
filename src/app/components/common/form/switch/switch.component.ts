import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"

@Component({
  selector: "c-switch",
  templateUrl: "./switch.component.html",
  styleUrls: ["./switch.component.scss"],
})
export class SwitchComponent implements OnInit {
  @Input({ required: true }) isChecked!: boolean
  @Output() onChange = new EventEmitter<boolean>()

  id!: string

  ngOnInit() {
    this.id = Date.now().toString()
  }

  toggle() {
    this.isChecked = !this.isChecked
    this.onChange.emit(this.isChecked)
  }
}
