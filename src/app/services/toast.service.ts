import { Injectable } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(
    // biome-ignore format:
    protected sanitizer: DomSanitizer,
  ) {}

  info(message: string) {
    const toast = document.createElement("div")
    // @ts-ignore
    // biome-ignore lint:
    toast.innerHTML = (this.sanitizer.bypassSecurityTrustHtml(message) as any).changingThisBreaksApplicationSecurity

    Object.assign(toast.style, {
      position: "fixed",
      bottom: "1.9em",
      left: "50%",
      transform: "translateX(-50%) translateY(100%)",
      minHeight: "1em",
      padding: "0.8em 1.5em 0.91em",
      fontSize: "0.93rem",
      color: "var(--color-text-white)",
      borderRadius: "5px",
      backgroundColor: "#3e424c",
      boxShadow: "1px 3px 5px rgba(25, 25, 28, 0.666)",
      opacity: "0.5",
      transition: "0.19s all ease",
      zIndex: "3",
    })

    document.body.appendChild(toast)
    setTimeout(() =>
      Object.assign(toast.style, {
        opacity: "1",
        transform: "translateX(-50%) translateY(0%)",
      }),
    )

    setTimeout(() => {
      Object.assign(toast.style, {
        transition: "0.13s all ease-in-out",
        opacity: "0",
        transform: "translateX(-50%) translateY(100%)",
      })
      setTimeout(() => document.body.removeChild(toast), 131)
    }, 4444)
  }

  error(message: string) {
    this.info(message)
  }
}
