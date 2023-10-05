import { TestBed } from "@angular/core/testing"

import { ParseFileService } from "./parse-file.service"

describe("ParseFileService", () => {
  let service: ParseFileService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ParseFileService)
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })
})
