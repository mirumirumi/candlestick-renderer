import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"

@Component({
  selector: "c-switch",
  templateUrl: "./switch.component.html",
  styleUrls: ["./switch.component.scss"],
})
export class SwitchComponent implements OnInit {
  @Input({ required: true }) isChecked!: boolean
  @Output() changed = new EventEmitter<boolean>()

  static idCounter = 0
  id!: string

  ngOnInit() {
    this.id = `c-switch-${SwitchComponent.idCounter++}`
  }

  toggle() {
    this.isChecked = !this.isChecked
    this.changed.emit(this.isChecked)
  }
}
