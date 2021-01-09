const express = require('express');
const router = express.Router();

const scrapRepo = require("./../repo/scrapper");

router.get("/chartink/:id", async (req, res) => {
  try {
    const respTraces = {};
    const traces = await scrapRepo.chartInkScrap(req.params.id);

    for (let i = 0; i < traces.length; i++) {
      const el = traces[i];
      const t = await scrapRepo.saveTrace(req.params.id,el);
      respTraces[t.id] = t;
    }

    req.apiResp(res, null, { traces: respTraces, message: `${traces.length} traces synced for the scan.` });
  } catch (error) {
    req.apiResp(res, error, null);
  }
});

module.exports = router;