import React from "react";
import styled from "styled-components";
import { FeedItem } from "../../types/FeedItem";
import { FaRegBookmark as BookmarkButton } from "react-icons/fa";

type Props = FeedItem;

const _ICON_SIZE = "1.2rem";
const _MAX_LINES = 3;

export default (props: Props) => {
  const { title, link, summary, time } = props;
  return (
    <>
      <Card>
        <A href={link} target="_blank" rel="noopener noreferrer">
          <Header>{title}</Header>
          <Main>{summary}</Main>
        </A>
        <IconArea>
          <IconItem>
            <BookmarkButton size={_ICON_SIZE} />
          </IconItem>
        </IconArea>
        <Time>{time}</Time>
      </Card>
    </>
  );
};

const A = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Card = styled.div`
  /* Size */
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 10px;
  /* Color */
  background-color: #ffffff;
  border-style: dashed;
  border-width: 1px;
  border-color: gray;
`;

const Header = styled.div`
  /* Layout */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Other */
  font-size: 1.2rem;
  font-weight: bold;
`;

const Main = styled.div`
  /* Layout */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${_MAX_LINES};
  /* Size */
  max-height: 50vh;
  /* Other */
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
`;

const IconArea = styled.div`
  /* Layout */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* Size */
  margin: 0;
  padding: 0;
`;

const IconItem = styled.div`
  /* Layout */
  display: flex;
  justify-content: center;
  align-items: center;
  /* Size */
  margin: 0 5px;
`;

const Time = styled.div`
  /* Layout */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* Size */
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  /* Color */
  color: #808080;
`;
