import React, { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "../../styles/constants";
import { goBack } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../redux/modules/noteModule";

type Props = {
  match: any;
};

type LocalState = {
  isNew: boolean;
};

export default (props: Props) => {
  const dispatch = useDispatch();
  const draftText = useSelector(selectors.draftText);
  const noteList = useSelector(selectors.noteList);
  const [state, setState] = useState<LocalState>({ isNew: false });
  const index = props.match.params.index;

  useEffect(() => {
    if (index === undefined) {
      dispatch(actions.clearText());
      setState({ isNew: true });
    } else {
      dispatch(actions.changeText(noteList[index].value));
      setState({ isNew: false });
    }
  }, [index, dispatch, noteList]);

  const initializeMessage = ["init"];

  const handlePost = () => {
    if (draftText === "") return;
    if (initializeMessage.indexOf(draftText) >= 0) {
      dispatch(actions.initialize());
    } else {
      if (state.isNew) {
        dispatch(
          actions.create({
            name: "You",
            value: draftText,
          }),
        );
      } else {
        dispatch(
          actions.update(
            Object.assign({}, noteList[index], {
              index: index,
              value: draftText,
            }),
          ),
        );
      }
    }
    dispatch(actions.clearText());
    dispatch(goBack());
  };

  const handleTextChange = (event: any) => {
    dispatch(actions.changeText(event.target.value));
  };

  const handleTextKeyPress = (event: any) => {
    if (event.ctrlKey && event.key === "Enter") {
      handlePost();
    }
  };

  return (
    <Root>
      <Header>
        <PostButton onClick={handlePost}>投稿</PostButton>
      </Header>
      <Main>
        <TextInput
          onChange={handleTextChange}
          onKeyPress={handleTextKeyPress}
          value={draftText}
          autoFocus
        />
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
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  /* Size */
  box-sizing: border-box;
  width: 100%;
  height: ${styles.HEADER.HEIGHT};
  margin: 0;
  padding: 0 10px;
  /* Color */
  background-color: #f0f0f0;
  opacity: 0.5;
`;

const Main = styled.main`
  /* Layout */
  grid-row: 2;
  /* Size */
  margin: 0;
  padding: 0;
  overflow-y: scroll;
`;

const PostButton = styled.button`
  border-width: 0;
  font-size: 1rem;
  background-color: transparent;
`;

const TextInput = styled.textarea`
  /* Layout */
  flex-shrink: 1;
  flex-grow: 1;
  /* Size */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px;
  font-size: 1rem;
  /* Color */
  background-color: #ffffff;
  /* Other */
  border: solid 1px #ececec;
  outline: none;
  resize: none;
  white-space: pre-line;
`;
