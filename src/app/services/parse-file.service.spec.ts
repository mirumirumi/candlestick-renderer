import { Result } from "ts-results"
import { KLineSource } from "../shared/types"
import { ParseFileService } from "./parse-file.service"

describe("ParseFileService", () => {
  class TParseFileService extends ParseFileService {
    public override synonyms = {
      timestamp: ["timestamp", "ts", "unixtime", "datetime", "epoch", "posix", "time"],
      open: ["open", "o"],
      high: ["high", "h"],
      low: ["low", "l"],
      close: ["close", "c"],
      volume: ["volume", "v"],
    }
    public override synonymMapping: { [key: string]: string } = {}

    public override json(value: string): Result<KLineSource, Error> {
      return super.json(value)
    }

    public override raw(value: string): Result<KLineSource, Error> {
      return super.raw(value)
    }

    public override normalizeKey(key: string): string {
      return super.normalizeKey(key)
    }

    public override extractKLineFromParsed(data: string[][]): KLineSource {
      return super.extractKLineFromParsed(data)
    }
  }

  const service = new TParseFileService()

  test("json()", () => {
    const _1 = `[
      {
        "timestamp": 1696497780000,
        "open": 27687.9,
        "high": 27718.5,
        "low": 27687.9,
        "close": 27698.5,
        "volume": 1041.273
      },
      {
        "timestamp": 1696497840000,
        "open": 27698.5,
        "high": 27698.5,
        "low": 27688.2,
        "close": 27693.8,
        "volume": 233.359
      }
    ]`
    const _1_e = [
      {
        timestamp: 1696497780000,
        open: 27687.9,
        high: 27718.5,
        low: 27687.9,
        close: 27698.5,
        volume: 1041.273,
      },
      {
        timestamp: 1696497840000,
        open: 27698.5,
        high: 27698.5,
        low: 27688.2,
        close: 27693.8,
        volume: 233.359,
      },
    ]
    expect(service.json(_1).val).toEqual(_1_e)

    const _2 = `[
      {
        "unixtime": 1696497780000,
        "o": 27687.9,
        "h": 27718.5,
        "l": 27687.9,
        "c": 27698.5,
        "v": 1041.273
      },
      {
        "unixtime": 1696497840000,
        "o": 27698.5,
        "h": 27698.5,
        "l": 27688.2,
        "c": 27693.8,
        "v": 233.359
      }
    ]`
    const _2_e = [
      {
        timestamp: 1696497780000,
        open: 27687.9,
        high: 27718.5,
        low: 27687.9,
        close: 27698.5,
        volume: 1041.273,
      },
      {
        timestamp: 1696497840000,
        open: 27698.5,
        high: 27698.5,
        low: 27688.2,
        close: 27693.8,
        volume: 233.359,
      },
    ]
    expect(service.json(_2).val).toEqual(_2_e)
  })

  test("raw()", () => {})

  test("extractKLineFromParsed()", () => {
    const _1 = [
      ["1696497780000", "27687.9", "27718.5", "27687.9", "27698.5", "1041.273"],
      ["1696497840000", "27698.5", "27698.5", "27688.2", "27693.8", "233.359"],
    ]
    const _1_e = [
      {
        timestamp: 1696497780000,
        open: 27687.9,
        high: 27718.5,
        low: 27687.9,
        close: 27698.5,
        volume: 1041.273,
      },
      {
        timestamp: 1696497840000,
        open: 27698.5,
        high: 27698.5,
        low: 27688.2,
        close: 27693.8,
        volume: 233.359,
      },
    ]
    expect(service.extractKLineFromParsed(_1)).toEqual(_1_e)

    // No volume
    const _2 = [
      ["1696497780000", "27687.9", "27718.5", "27687.9", "27698.5"],
      ["1696497840000", "27698.5", "27698.5", "27688.2", "27693.8"],
    ]
    const _2_e = [
      {
        timestamp: 1696497780000,
        open: 27687.9,
        high: 27718.5,
        low: 27687.9,
        close: 27698.5,
      },
      {
        timestamp: 1696497840000,
        open: 27698.5,
        high: 27698.5,
        low: 27688.2,
        close: 27693.8,
      },
    ]
    expect(service.extractKLineFromParsed(_2)).toEqual(_2_e)
  })
})
