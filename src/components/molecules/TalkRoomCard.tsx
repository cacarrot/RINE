import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { STATE_KEY } from "../../redux/modules/talkModule";
import { Link as RouterLink } from "react-router-dom";
import path from "../../routes/path";
import styled from "styled-components";
import { TalkRoomItem } from "../../types/TalkRoomItem";

type Props = TalkRoomItem;

const _MAX_LINES = 2;

export default (props: Props) => {
  const { logo, name, index } = props;

  const [lastMessage, setLastMessage] = useState<string>("");
  const [lastTime, setLastTime] = useState<string>("");

  const talkList = useSelector((state: any) => {
    if (index === undefined) return [];
    return state[STATE_KEY][index].talkList;
  });

  useEffect(() => {
    if (talkList.length > 0) {
      const { messageType, value, time } = talkList[talkList.length - 1];
      if (time !== undefined) {
        setLastTime(time);
      }
      if (messageType === "photo") {
        setLastMessage("画像を送信しました");
      } else if (value !== undefined) {
        setLastMessage(value);
      }
    }
  }, [talkList]);
  return (
    <Link to={path.talk_detail + index}>
      <Card>
        <UserIcon src={logo} alt="logo" />
        <Main>
          <UserName>{name}</UserName>
          <LastMessage>{lastMessage}</LastMessage>
        </Main>
        <Time>{lastTime}</Time>
      </Card>
    </Link>
  );
};

const Card = styled.div`
  /* Layout */
  display: flex;
  justify-content: flex-start;
  /* Size */
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 10px;
  /* Color */
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px;
  border-color: #fff0f0;
`;

const UserIcon = styled.img`
  /* Size */
  width: 40px;
  height: 40px;
  /* Other */
  border-radius: 50%;
`;

const Main = styled.div`
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  flex-shrink: 1;
  /* Size */
  margin-left: 19px;
`;

const UserName = styled.span`
  /* Size */
  font-size: 1rem;
  /* Color */
  color: #000000;
`;

const LastMessage = styled.span`
  /* Layout */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${_MAX_LINES};
  /* Size */
  font-size: 0.8rem;
  /* Color */
  color: #808080;
  /* Other */
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
`;

const Time = styled.time`
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  flex-shrink: 1;
  flex-grow: 0;
  flex-shrink: 0;
  /* Size */
  margin: 10px;
  font-size: 0.5rem;
  /* Color */
  color: #808080;
`;

const Link = styled(RouterLink)`
  /* Color */
  color: inherit;
  /* Other */
  text-decoration: none;
`;
