export interface FileData {
  value: string
  name?: string
  ext: string
}

export interface Candle {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

export type KLineSource = Array<Candle>
