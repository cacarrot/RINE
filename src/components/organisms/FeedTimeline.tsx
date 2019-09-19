import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FeedCard from "../molecules/FeedCard";
import { FeedItem } from "../../types/FeedItem";
import FeedUtil from "../../utils/FeedUtil";

type Props = {
  url: string;
};

export default (props: Props) => {
  const { url } = props;
  const [feedList, setFeedList] = useState<FeedItem[]>([]);

  useEffect(() => {
    if (url === undefined || url === null || url === "") return;
    (async () => {
      const data = await FeedUtil.getFeed(url);
      if (data.items === undefined) return;
      const feedList = data.items.map((item, index) => {
        return item;
      });
      feedList.sort((a, b) => {
        const aDate = a.pubDate || "0";
        const bDate = b.pubDate || "0";
        if (aDate < bDate) return -1;
        if (aDate > bDate) return 1;
        return 0;
      });
      setFeedList(feedList);
    })();
  }, [url]);

  const getFeedCards = () => {
    let cardList = [];
    for (let index = feedList.length - 1; index >= 0; index--) {
      const item = feedList[index];
      cardList.push(
        <FeedCard
          key={index}
          index={index}
          title={item.title}
          link={item.link}
          summary={item.contentSnippet}
          time={item.isoDate}
        />,
      );
    }
    return cardList;
  };
  return <Main>{getFeedCards()}</Main>;
};

const Main = styled.main`
  /* Size */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  /* Color */
  background-color: #ffffff;
  background-attachment: local;
`;
