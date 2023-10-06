import { Injectable } from "@angular/core"
import Papa from "papaparse"
import { Err, Ok, Result } from "ts-results"

import { ParseError } from "../shared/errors"
import { Candle, FileData, KLineSource } from "../shared/types"

@Injectable({
  providedIn: "root",
})
export class ParseFileService {
  protected synonyms = {
    timestamp: ["timestamp", "ts", "unixtime", "datetime", "epoch", "posix", "time"],
    open: ["open", "o"],
    high: ["high", "h"],
    low: ["low", "l"],
    close: ["close", "c"],
    volume: ["volume", "v"],
  }
  protected synonymMapping: { [key: string]: string } = {}

  parse(file: FileData): Result<KLineSource, ParseError> {
    // json: Match the key against the synonyms
    // csv, tsv, txt: As is (TOHLCV is assumed to be in order)

    let result: KLineSource | Result<KLineSource, Error>

    switch (file.ext) {
      case "json":
        result = this.json(file.value)
        break
      case "csv":
        result = this.csv(file.value)
        break
      case "tsv":
        result = this.tsv(file.value)
        break
      case "txt":
      case "rtf":
      case "log":
      case "dat":
        result = this.raw(file.value)
        break
    }

    if (result! instanceof Ok || result! instanceof Err) {
      if (result.err) {
        return new Err(new ParseError(`${file.name}.${file.ext}`))
      }

      result = result.val
    }

    return new Ok(result!)
  }

  protected json(value: string): KLineSource {
    // Initialize synonym mapping table
    for (const [canonical, aliases] of Object.entries(this.synonyms)) {
      for (const alias of aliases) {
        this.synonymMapping[alias] = canonical
      }
    }

    return (JSON.parse(value) as Array<{ [key: string]: number }>).map((candle) => {
      const result = {} as Candle
      for (const key in candle) {
        if (Object.prototype.hasOwnProperty.call(candle, key)) {
          switch (this.normalizeKey(key)) {
            case "timestamp":
              result.timestamp = candle[key]!
              break
            case "open":
              result.open = candle[key]!
              break
            case "high":
              result.high = candle[key]!
              break
            case "low":
              result.low = candle[key]!
              break
            case "close":
              result.close = candle[key]!
              break
            case "volume":
              result.volume = candle[key]!
              break
          }
        }
      }
      return result
    })
  }

  protected csv(value: string): Result<KLineSource, Error> {
    const parsed = Papa.parse(value)
    if (0 < parsed.errors.length) {
      return new Err(Error())
    }

    const kline = this.extractKLineFromParsed(parsed.data as Array<Array<string>>)
    return new Ok(kline)
  }

  protected tsv(value: string): Result<KLineSource, Error> {
    const parsed = Papa.parse(value, { delimiter: "\t" })
    if (0 < parsed.errors.length) {
      return new Err(Error())
    }

    const kline = this.extractKLineFromParsed(parsed.data as Array<Array<string>>)
    return new Ok(kline)
  }

  protected raw(value: string): Result<KLineSource, Error> {
    const parsed = Papa.parse(value, { delimiter: "," })
    if (0 < parsed.errors.length) {
      return new Err(Error())
    }

    let result
    if (value.includes("[") && value.includes("]")) {
      result = (parsed.data as Array<Array<string>>).map((row) =>
        row.map((column, i) => {
          if (i === 0) {
            return column.slice(1)
          } else if (i === row.length - 1) {
            return column.slice(0, -1)
          } else {
            return column
          }
        }),
      )
    } else if (value.includes(",")) {
      result = parsed.data as Array<Array<string>>
    } else {
      return new Err(Error())
    }

    const kline = this.extractKLineFromParsed(result)
    return new Ok(kline)
  }

  protected normalizeKey(key: string): string {
    return this.synonymMapping[key] || key
  }

  protected extractKLineFromParsed(data: Array<Array<string>>): KLineSource {
    return data
      .filter((row) => 5 <= row.length)
      .map((row) => {
        const result = {} as Candle
        row.map((column, i) => {
          if (i === 0) {
            result.timestamp = Number(column)
          } else if (i === 1) {
            result.open = Number(column)
          } else if (i === 2) {
            result.high = Number(column)
          } else if (i === 3) {
            result.low = Number(column)
          } else if (i === 4) {
            result.close = Number(column)
          } else if (i === 5) {
            result.volume = Number(column)
          }
        })
        return result
      })
  }
}
