import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { STATE_KEY } from "../../redux/modules/talkModule";
import CommonHeader from "../organisms/CommonHeader";
import TalkDetailTimeline from "../organisms/TalkDetailTimeline";
import TalkDetailForm from "../organisms/TalkDetailForm";
import styled from "styled-components";
import talkRoomList from "../../constants/talkRoomList";

type Props = {
  match: any;
};

export default (props: Props) => {
  const roomId = props.match.params.index;

  const talkList = useSelector((state: any) => {
    if (roomId === undefined) return [];
    return state[STATE_KEY][roomId].talkList;
  });

  const mainEl = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const main = mainEl.current;
    if (main !== null) {
      main.scrollTo({ top: main.scrollHeight });
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <Root>
      <Header>
        <CommonHeader type="detail" title={talkRoomList[roomId].name} />
      </Header>
      <Main ref={mainEl}>
        <TalkDetailTimeline talkList={talkList} />
      </Main>
      <Footer>
        <TalkDetailForm roomId={roomId} />
      </Footer>
    </Root>
  );
};

const Root = styled.div`
  /* Layout */
  display: grid;
  grid-template-rows: 50px 1fr 50px;
  /* Size */
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const Header = styled.header`
  /* Layout */
  grid-row: 1;
  /* Size */
  margin: 0;
  padding: 0;
`;

const Main = styled.main`
  /* Layout */
  grid-row: 2;
  /* Size */
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  /* Color */
  background-color: #829fbf;
  background-attachment: scroll;
`;

const Footer = styled.footer`
  /* Layout */
  grid-row: 3;
  /* Size */
  margin: 0;
  padding: 0;
`;
