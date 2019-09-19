import Parser from "rss-parser";
import { getProxyUrl } from "../functions/proxy";

/**
 * https://github.com/bobby-brennan/rss-parser
 */
export default class FeedUtil {
  static getFeed = async (url) => {
    const proxyUrl = getProxyUrl(url);
    const parser = new Parser();
    const feed = await parser.parseURL(proxyUrl);
    return feed;
  };
}
