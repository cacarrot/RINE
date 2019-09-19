import React, { useState } from "react";
import styled from "styled-components";
import styles from "../../styles/constants";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import path from "../../routes/path";
import { goBack } from "connected-react-router";
import {
  FiChevronLeft as BackButton,
  FiFileText as NoteButton,
} from "react-icons/fi";
import PhoneButton from "../atoms/PhoneButton";
import MoreButton from "../atoms/MoreButton";
import TalkMoreMenu from "../molecules/TalkMoreMenu";

type Props = {
  title?: string;
  type: "top" | "detail" | "note";
};

type LocalState = {
  isShowMoreMenu: boolean;
};

export default (props: Props) => {
  const { title, type } = props;
  const [state, setState] = useState<LocalState>({ isShowMoreMenu: false });
  const dispatch = useDispatch();

  const handleClickMore = () => {
    setState({
      isShowMoreMenu: !state.isShowMoreMenu,
    });
  };

  const handleClickBack = () => {
    dispatch(goBack());
  };

  const _ICON_SIZE = styles.HEADER.ICON_SIZE;
  const _ICON_COLOR = styles.HEADER.COLOR;

  const getLeftItems = () => {
    switch (type) {
      case "top":
        return <MenuItem>{title}</MenuItem>;
      default:
        return (
          <>
            <MenuItem>
              <BackButton
                size={_ICON_SIZE}
                color={_ICON_COLOR}
                onClick={handleClickBack}
              />
            </MenuItem>
            <MenuItem>{title}</MenuItem>
          </>
        );
    }
  };

  const getRightItems = () => {
    switch (type) {
      case "detail":
        return (
          <>
            <MenuItem>
              <PhoneButton size={_ICON_SIZE} />
            </MenuItem>
            <MenuItem>
              <Link to={path.note_index}>
                <NoteButton size={_ICON_SIZE} color={_ICON_COLOR} />
              </Link>
            </MenuItem>
            <MenuItem>
              <MoreButton
                size={_ICON_SIZE}
                isShow={state.isShowMoreMenu}
                onClick={handleClickMore}
              />
            </MenuItem>
          </>
        );
      case "top":
        return;
      default:
        return;
    }
  };

  return (
    <Root>
      <MainMenu>
        <MenuLeft>{getLeftItems()}</MenuLeft>
        <MenuRight>{getRightItems()}</MenuRight>
      </MainMenu>
      <SubMenu>
        <TalkMoreMenu isShow={state.isShowMoreMenu} />
      </SubMenu>
    </Root>
  );
};

const Root = styled.header`
  /* Size */
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const MainMenu = styled.menu`
  /* Layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* Size */
  width: 100%;
  height: ${styles.HEADER.HEIGHT};
  margin: 0;
  padding: 0;
  font-size: ${styles.HEADER.FONT_SIZE};
  /* Color */
  background-color: #262d49;
  color: ${styles.HEADER.COLOR};
`;

const MenuLeft = styled.div`
  /* Layout */
  float: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MenuRight = styled.div`
  /* Layout */
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MenuItem = styled.div`
  /* Layout */
  display: flex;
  justify-content: center;
  align-items: center;
  /* Size */
  margin: 0 10px;
`;

const SubMenu = styled.div`
  /* Fix Top */
  position: relative;
  z-index: 99;
  top: 0;
  left: 0;
  /* Size */
  width: 100%;
  margin: 0;
  padding: 0;
  /* Color */
  background-color: #ffffff;
  color: black;
`;
