import { Dialog, DialogRef } from "@angular/cdk/dialog"
import { Component, OnInit } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"
import { ActivatedRoute, Router } from "@angular/router"

import { HalfModalComponent, Modal } from "../../common/modal/half-modal/half-modal.component"

@Component({
  selector: "c-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  dialogRef!: DialogRef

  constructor(
    private dialog: Dialog,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    setTimeout(() => {
      const p = this.route.snapshot.queryParamMap.get("p")
      if (p === "pp") {
        this.showPP()
      }
    })
  }

  onClickPP() {
    this.router.navigate([], { queryParams: { p: "pp" }, queryParamsHandling: "merge" })
    this.showPP()
  }

  showPP() {
    this.dialogRef = this.dialog.open<unknown, Modal>(HalfModalComponent, {
      data: {
        templateType: "simple",
        context: {
          title: "Privacy Policy and Terms of Use",
          content: this.sanitizer.bypassSecurityTrustHtml(statement),
        },
      },
      // panelClass: "",
      autoFocus: "first-header",
      disableClose: true,
    })

    this.dialogRef.closed.subscribe(() =>
      this.router.navigate([], { queryParams: { p: null }, queryParamsHandling: "merge" }),
    )
  }
}

const statement = `
<div class="document">

<p>Candlestick Renderer (hereinafter referred to as the Service) hereby defines its Privacy Policy and Terms of Use.
</p>

<h3>The collection of personal information</h3>
<p>This site can be used without registration at this time (however, this may change in the future as we improve our
  services and require registration for convenience and to prevent harassment).</p>

<h3>The information you post</h3>
<p>The information you enter on this site is used only to perform the functions of the service. </p>

<h3>Access analysis tools</h3>
<p>This website uses Google Analytics for access analysis. Google Analytics uses cookies to collect data, but does not
  identify individuals. You can opt out of tracking by Google Analytics by disabling cookies. For more information,
  please see the <a href="https://policies.google.com/" tabindex="-1">Google Analytics Policy and Terms of Use</a>.</p>

<h3>Article 1 (Application)</h3>
<p>These Terms of Use shall apply to all relationships between Users and the use of the Service.</p>

<h3>Article 2 (Prohibited Matters)</h3>
<p>Users shall not engage in any of the following acts when using the Service.</p>

<ul>
  <li>Actions that violate laws or public order and morals, or criminal acts</li>
  <li>Acts that infringe on intellectual property rights, such as copyrights and trademarks.</li>
  <li>Actions that destroy or interfere with the functions of this service or any other third party's server or
    network.</li>
  <li>An act that interferes with the Operator's service operation</li>
  <li>Attempting to gain unauthorized access</li>
  <li>Acts of collecting or accumulating personal information about other users.</li>
  <li>Actions that cause disadvantage, damage, or discomfort to other users of this service or other third parties.
  </li>
  <li>An act of impersonating another user.</li>
  <li>An act that directly or indirectly provides benefits to antisocial forces in relation to the Operator's service.
  </li>
  <li>Any other act that the Operator deems inappropriate.</li>
</ul>

<h3>Article 3 (Change or suspension of the provision of the Service)</h3>
<p>This service may change the contents of the provided service without prior notice to the user. In addition, all or
  part of the provided services may be stopped or suspended without prior notice.</p>

<h3>Article 4 (Disclaimer)</h3>
<p>The operator of this service shall not be liable for any damages incurred by users due to this service.</p>

<h3>Article 5 (Changes to the Terms of Use)</h3>
<p>The operator of this service may change the Terms of Use at any time without notice to the user, if it deems it
  necessary. In the event that a User begins using the Service after a change to the Terms, the User shall be deemed
  to have agreed to the changed Terms.</p>

<h3>Article 6 (Governing Law and Jurisdiction)</h3>
<p>These Terms shall be governed by and construed in accordance with the laws of Japan. In the event of a dispute
  regarding this service, the court with jurisdiction over the location of the operator shall have exclusive
  jurisdiction.</p>

<p style="margin: 3em 1.3em 0px 0px; font-size: 0.95em; color: rgb(141, 141, 141); text-align: right;">
  Revision: 2023/10/1
</p>

</div>
`
