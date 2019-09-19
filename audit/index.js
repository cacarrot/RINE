const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const log = require("lighthouse-logger");
const targetUrls = require("./targetUrls").default;

/**
 * https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/readme.md
 */
const launchChromeAndRunLighthouse = (url, opts, config = null) => {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then(chrome => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config).then(results => {
        return chrome.kill().then(() => results.lhr);
      });
    });
};

const opts = {
  chromeFlags: ["--ignore-certificate-errors", "--headless"],
  onlyCategories: ["performance"],
  logLevel: "error",
};

log.setLevel(opts.logLevel);

const exec = async url => {
  const results = await launchChromeAndRunLighthouse(url, opts);
  const finalUrl = results.finalUrl;
  const score = results.categories.performance.score * 100;
  console.log(finalUrl + ": " + score);
  // const finalScreenshot = results.audits["final-screenshot"].details.data;
  // console.log(finalScreenshot);
};

(async () => {
  for (let i = 0; i < targetUrls.length; i++) {
    const url = targetUrls[i];
    await exec(url);
  }
})();
