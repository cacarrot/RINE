import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "../../redux/modules/noteModule";
import { Link } from "react-router-dom";
import path from "../../routes/path";
import styled from "styled-components";
import CommonHeader from "../organisms/CommonHeader";
import NoteTimeline from "../organisms/NoteTimeline";
import AddButton from "../atoms/AddButton";

type Props = {};

export default (props: Props) => {
  const noteList = useSelector(selectors.noteList);

  const _ICON_SIZE = "60px";

  return (
    <Root>
      <Header>
        <CommonHeader type="note" title="Notes" />
      </Header>
      <Main>
        <NoteTimeline noteList={noteList} />
        <FixedControl>
          <Link to={path.note_new}>
            <AddButton size={_ICON_SIZE} />
          </Link>
        </FixedControl>
      </Main>
    </Root>
  );
};

const Root = styled.div`
  /* Layout */
  display: grid;
  grid-template-rows: 50px 1fr;
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
`;

const FixedControl = styled.div`
  /* Fix Bottom */
  position: fixed;
  z-index: 99;
  bottom: 0;
  right: 0;
  /* Size */
  margin: 10px;
  padding: 0;
`;
