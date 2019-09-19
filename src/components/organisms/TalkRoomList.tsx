import React from "react";
import styled from "styled-components";
import TalkRoomCard from "../molecules/TalkRoomCard";
import { TalkRoomItem } from "../../types/TalkRoomItem";

type Props = {
  talkRoomList: TalkRoomItem[];
};

export default (props: Props) => {
  const { talkRoomList } = props;

  const getCards = () => {
    let cardList = [];
    for (let index = talkRoomList.length - 1; index >= 0; index--) {
      const item = talkRoomList[index];
      cardList.push(
        <TalkRoomCard
          key={index}
          index={index}
          name={item.name}
          logo={item.logo}
        />,
      );
    }
    return cardList;
  };
  return <Main>{getCards()}</Main>;
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
