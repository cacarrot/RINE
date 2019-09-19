import React from "react";
import styled from "styled-components";
import styles from "../../styles/constants";
import FullScreenButton from "../atoms/FullScreenButton";
import ReloadButton from "../atoms/ReloadButton";
import ShareButton from "../atoms/ShareButton";
import InfoButton from "../atoms/InfoButton";

type Props = {
  isShow: boolean;
};

export default (props: Props) => {
  const { isShow } = props;

  const _ICON_SIZE = styles.HEADER.ICON_SIZE;

  if (isShow) {
    return (
      <Menu>
        <MenuItem>
          <ReloadButton size={_ICON_SIZE} />
        </MenuItem>
        <MenuItem>
          <FullScreenButton size={_ICON_SIZE} />
        </MenuItem>
        <MenuItem>
          <ShareButton size={_ICON_SIZE} />
        </MenuItem>
        <MenuItem>
          <InfoButton size={_ICON_SIZE} />
        </MenuItem>
      </Menu>
    );
  }
  return <></>;
};

const Menu = styled.menu`
  /* Layout */
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  /* Size */
  padding: 0;
`;

const MenuItem = styled.div`
  /* Layout */
  display: flex;
  justify-content: center;
  align-items: center;
  /* Size */
  margin: 15px 0;
  padding: 0;
`;
