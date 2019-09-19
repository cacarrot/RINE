import React from "react";
import styled from "styled-components";
import NoteCard from "../molecules/NoteCard";
import { NoteItem } from "../../types/NoteItem";

type Props = {
  noteList: NoteItem[];
};

export default (props: Props) => {
  const { noteList } = props;

  const getNoteCards = () => {
    let cardList = [];
    for (let index = noteList.length - 1; index >= 0; index--) {
      const item = noteList[index];
      cardList.push(
        <NoteCard
          key={index}
          index={index}
          name={item.name}
          value={item.value}
          time={item.time}
        />,
      );
    }
    return cardList;
  };
  return <Main>{getNoteCards()}</Main>;
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
