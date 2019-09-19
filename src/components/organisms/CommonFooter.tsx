import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import path from "../../routes/path";
import styled from "styled-components";
import styles from "../../styles/constants";
import {
  FiHome as HomeButton,
  FiRss as FeedButton,
  FiFileText as NoteButton,
} from "react-icons/fi";
import { FaRegCommentDots as TalkButton } from "react-icons/fa";
import InfoButton from "../atoms/InfoButton";

type Props = {};

const _COLOR_ACTIVE = "#000000";
const _COLOR_INACTIVE = "#808080";

export default (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const _ICON_SIZE = styles.FOOTER.ICON_SIZE;

  const MenuItem = styled.div`
    /* Layout */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* Size */
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    /* Color */
    color: ${props =>
      props["aria-colindex"] === activeIndex ? _COLOR_ACTIVE : _COLOR_INACTIVE};
  `;

  return (
    <Root>
      <Link to={path.index}>
        <MenuItem
          aria-colindex={0}
          onClick={() => {
            setActiveIndex(0);
          }}>
          <HomeButton size={_ICON_SIZE} />
          <MenuCaption>ホーム</MenuCaption>
        </MenuItem>
      </Link>
      <Link to={path.talk_index}>
        <MenuItem
          aria-colindex={1}
          onClick={() => {
            setActiveIndex(1);
          }}>
          <TalkButton size={_ICON_SIZE} />
          <MenuCaption>トーク</MenuCaption>
        </MenuItem>
      </Link>
      <Link to={path.feed_index}>
        <MenuItem
          aria-colindex={2}
          onClick={() => {
            setActiveIndex(2);
          }}>
          <FeedButton size={_ICON_SIZE} />
          <MenuCaption>フィード</MenuCaption>
        </MenuItem>
      </Link>
      <Link to={path.note_index}>
        <MenuItem
          aria-colindex={3}
          onClick={() => {
            setActiveIndex(3);
          }}>
          <NoteButton size={_ICON_SIZE} />
          <MenuCaption>ノート</MenuCaption>
        </MenuItem>
      </Link>
      <MenuItem>
        <InfoButton size={_ICON_SIZE} />
        <MenuCaption>インフォ</MenuCaption>
      </MenuItem>
    </Root>
  );
};

const Root = styled.div`
  /* Layout */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  /* Size */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  /* Color */
  background-color: #fffafa;
`;

const MenuCaption = styled.div``;

const Link = styled(RouterLink)`
  text-decoration: none;
`;
