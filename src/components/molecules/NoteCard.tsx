import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/modules/noteModule";
import { Link } from "react-router-dom";
import path from "../../routes/path";
import styled from "styled-components";
import { NoteItem } from "../../types/NoteItem";
import {
  FaRegSmile as SmileButton,
  FaRegCommentDots as CommentButton,
} from "react-icons/fa";
import { FiMoreHorizontal as ControlButton } from "react-icons/fi";

type Props = NoteItem;

type LocalState = {
  isShowPopup: boolean;
};

const _ICON_SIZE = "1.5rem";
const _MAX_LINES = 10;

export default (props: Props) => {
  const dispatch = useDispatch();
  const { index, value, time } = props;
  const [state, setState] = useState<LocalState>({
    isShowPopup: false,
  });

  const countLines = () => {
    return (value.match(/\n/g) || []).length;
  };

  const showPopup = () => {
    setState({ isShowPopup: true });
  };

  const hidePopup = () => {
    setState({ isShowPopup: false });
  };

  const handleClickDelete = () => {
    if (index !== undefined) {
      dispatch(actions.delete({ index: index }));
    }
    hidePopup();
  };

  const handleMore = () => {
    alert(value);
  };

  const getMore = () => {
    if (countLines() > _MAX_LINES) {
      return <MoreButton onClick={handleMore}>もっと見る</MoreButton>;
    }
  };

  const getPopup = () => {
    if (state.isShowPopup) {
      return (
        <Popup>
          <div>
            <Link to={path.note_edit + index}>
              <button onClick={hidePopup}>投稿を修正</button>
            </Link>
            <DeleteButton onClick={handleClickDelete}>投稿を削除</DeleteButton>
          </div>
        </Popup>
      );
    }
  };

  return (
    <>
      <Card>
        <Header>
          <div></div>
          <ControlButton size={_ICON_SIZE} onClick={showPopup} />
        </Header>
        <Main>
          {value}
          {getMore()}
        </Main>

        <IconArea>
          <IconItem>
            <SmileButton size={_ICON_SIZE} />
          </IconItem>
          <IconItem>
            <CommentButton size={_ICON_SIZE} />
          </IconItem>
        </IconArea>
        <Time>{time}</Time>
      </Card>
      {getPopup()}
    </>
  );
};

const DeleteButton = styled.button``;

const Popup = styled.div`
  /* Fix */
  position: absolute;
  top: 0;
  z-index: 999;
  /* Layout */
  display: flex;
  justify-content: center;
  align-items: center;
  /* Size */
  width: 100%;
  height: 110vh;
  /* Color */
  background-color: rgba(0, 0, 0, 0.7);
  div {
    /* Layout */
    display: flex;
    flex-direction: column;
    /* Color */
    background-color: #ffffff;
    button {
      /* Size */
      width: 80vw;
      padding: 10px;
      font-size: 1.2rem;
      /* Color */
      color: #000000;
      border-color: transparent;
    }
  }
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
  white-space: pre-line;
  overflow: hidden;
`;

const MoreButton = styled.div`
  text-align: right;
  color: #808080;
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
