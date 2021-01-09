const moment = require("moment");

const { parseChartinkCopyString, visitAndGetCopyFromChartinkUrl } = require('./../utils/scrapper');
const Scanner = require('./../models/scanner');
const Traces = require('./../models/traces');

module.exports = {
  chartInkScrap: async (id) => {
    const scanner = await Scanner.findByPk(id);

    if (!scanner) throw new Error(`Scanner not found for id ${id}`);

    const clip = await visitAndGetCopyFromChartinkUrl(scanner.url);
    const clipArr = parseChartinkCopyString(clip);

    return clipArr;
  },
  saveTrace: async (scannerId, clip) => {
    const [trace, _] = await Traces.findOrCreate({
      where: {
        scannerId,
        scannedAt: moment().format("YYYY-MM-DD"),
        symbol: clip.symbol
      },
      defaults: {
        name: clip.stock_name,
        percentChange: clip.percent_change,
        ltp: clip.price,
        volume: clip.volume
      }
    });

    // await trace.save();

    return trace;
  }
}