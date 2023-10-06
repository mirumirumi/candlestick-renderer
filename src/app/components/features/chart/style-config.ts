import { Options } from "klinecharts"

export default {
  styles: {
    grid: {
      horizontal: {
        size: 0.5,
        color: "#3e3e3e",
        dashedValue: [1.5, 1.5],
      },
      vertical: {
        size: 0.5,
        color: "#3e3e3e",
        dashedValue: [1.5, 1.5],
      },
    },
    candle: {
      bar: {
        upColor: "#20b26c",
        downColor: "#ef454a",
        noChangeColor: "#8e8e8e",
        upBorderColor: "#20b26c",
        downBorderColor: "#ef454a",
        noChangeBorderColor: "#8e8e8e",
        upWickColor: "#20b26c",
        downWickColor: "#ef454a",
        noChangeWickColor: "#8e8e8e",
      },
      priceMark: {
        last: {
          upColor: "#20b26c",
          downColor: "#ef454a",
          noChangeColor: "#8e8e8e",
          line: {
            dashedValue: [3, 3],
            size: 0.9,
          },
          text: {
            paddingLeft: 7,
            borderRadius: 3.7,
          },
        },
      },
      tooltip: {
        defaultValue: "N/A",
        text: {
          size: 11.7,
          color: "#8e8e8e",
          marginLeft: 12,
          marginTop: 7,
        },
      },
    },
    indicator: {
      bars: [
        {
          upColor: "#20b26cb3",
          downColor: "#ef454ab3",
          noChangeColor: "#8e8e8e",
        },
      ],
      lines: [
        {
          color: "#f57f17",
        },
        {
          color: "#ffee58",
        },
        {
          color: "#f06292",
        },
      ],
    },
    xAxis: {
      axisLine: {
        color: "#8e8e8e",
      },
      tickText: {
        color: "#8e8e8e",
        size: 10.5,
      },
      tickLine: {
        length: 3.5,
        color: "#8e8e8e",
      },
    },
    yAxis: {
      axisLine: {
        color: "#8e8e8e",
      },
      tickText: {
        color: "#8e8e8e",
        size: 11,
      },
      tickLine: {
        length: 3.5,
        color: "#8e8e8e",
      },
    },
    separator: {
      color: "#8e8e8e",
    },
    crosshair: {
      horizontal: {
        line: {
          dashedValue: [4.5, 2],
          size: 1.1,
          color: "#8e8e8e",
        },
        text: {
          paddingLeft: 7,
          borderRadius: 3.7,
          backgroundColor: "#4e4e4e",
        },
      },
      vertical: {
        line: {
          dashedValue: [4.5, 2],
          size: 1.1,
          color: "#8e8e8e",
        },
        text: {
          size: 10.7,
          paddingLeft: 6,
          paddingRight: 6,
          paddingTop: 4.9,
          paddingBottom: 3.7,
          borderRadius: 3.7,
          backgroundColor: "#4e4e4e",
        },
      },
    },
  },
} as Options
