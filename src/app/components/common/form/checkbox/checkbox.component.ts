import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"

@Component({
  selector: "c-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent implements OnInit {
  @Input({ required: true }) isChecked!: boolean
  @Output() changed = new EventEmitter<boolean>()

  static idCounter = 0
  id!: string

  ngOnInit() {
    this.id = `c-checkbox-${CheckboxComponent.idCounter++}`
  }

  toggle() {
    this.isChecked = !this.isChecked
    this.changed.emit(this.isChecked)
  }
}
