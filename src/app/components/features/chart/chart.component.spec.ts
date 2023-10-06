import { KLineSource } from "../../../shared/types"
import { ChartComponent } from "./chart.component"

describe("getPrecisions()", () => {
  class TChartComponent extends ChartComponent {
    public override getPrecisions(kline: KLineSource): [number, number] {
      return super.getPrecisions(kline)
    }
  }

  const chartComponent = new TChartComponent()

  test("main", () => {
    const _1 = [
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
      {
        timestamp: 1696497900000,
        open: 27693.8,
        high: 27695.1,
        low: 27682.5,
        close: 27682.5,
        volume: 138.538,
      },
      {
        timestamp: 1696497960000,
        open: 27682.5,
        high: 27682.9,
        low: 27675.2,
        close: 27680,
        volume: 110.032,
      },
      {
        timestamp: 1696498020000,
        open: 27679.9,
        high: 27684.3,
        low: 27676.4,
        close: 27684.3,
        volume: 88,
      },
    ]
    expect(chartComponent.getPrecisions(_1)).toEqual([1, 3])

    const _2 = [
      {
        timestamp: 1692540000000,
        open: 4.4186,
        high: 4.4195,
        low: 4.3373,
        close: 4.3784,
        volume: 119533.3,
      },
      {
        timestamp: 1692541800000,
        open: 4.3784,
        high: 4.4529,
        low: 4.3535,
        close: 4.3535,
        volume: 134856.7,
      },
    ]
    expect(chartComponent.getPrecisions(_2)).toEqual([4, 1])
  })

  test("No volume", () => {
    const _1 = [
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
      {
        timestamp: 1696497900000,
        open: 27693.8,
        high: 27695.1,
        low: 27682.5,
        close: 27682.5,
      },
      {
        timestamp: 1696497960000,
        open: 27682.5,
        high: 27682.9,
        low: 27675.2,
        close: 27680,
      },
      {
        timestamp: 1696498020000,
        open: 27679.9,
        high: 27684.3,
        low: 27676.4,
        close: 27684.3,
      },
    ]
    expect(chartComponent.getPrecisions(_1)).toEqual([1, 0])
  })
})
