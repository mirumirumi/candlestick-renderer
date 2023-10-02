import { Component, Input } from "@angular/core"

@Component({
  selector: "c-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"],
})
export class SpinnerComponent {
  @Input() color?: string = "#8b8b8b"
}
