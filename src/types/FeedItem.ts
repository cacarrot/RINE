import Parser from "rss-parser";

export interface FeedItem extends Parser.Item {
  index?: number;
  summary?: string;
  time?: string;
}
