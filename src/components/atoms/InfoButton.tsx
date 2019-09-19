import React, { useState } from "react";
import styled from "styled-components";
import { IconBaseProps } from "react-icons/lib/cjs";
import { GoInfo as Info } from "react-icons/go";
import PackageUtil from "../../utils/PackageUtil";
import ClientInfoUtil from "../../utils/ClientInfoUtil";

interface Props extends IconBaseProps {}

export default (props: Props) => {
  const { size } = props;
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);

  const showPopup = () => {
    setIsShowPopup(true);
  };

  const hidePopup = () => {
    setIsShowPopup(false);
  };

  const getPopup = () => {
    if (isShowPopup) {
      return (
        <Popup>
          <div>
            <div>
              現在のバージョン：<span>{PackageUtil.getVersion()}</span>
            </div>
            <div>
              ユーザーエージェント：<span>{ClientInfoUtil.getUserAgent()}</span>
            </div>
            <div></div>
            <div onClick={hidePopup}>戻る</div>
          </div>
        </Popup>
      );
    }
  };

  const handleClick = () => {
    showPopup();
  };

  return (
    <>
      <Info size={size} onClick={handleClick} />
      {getPopup()}
    </>
  );
};

const Popup = styled.div`
  /* Fix */
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  /* Layout */
  display: flex;
  justify-content: center;
  align-items: center;
  /* Size */
  width: 100%;
  height: 100vh;
  /* Color */
  background-color: rgba(0, 0, 0, 0.7);
  div {
    /* Layout */
    display: flex;
    flex-direction: column;
    /* Color */
    background-color: #ffffff;
    div {
      /* Size */
      width: 80vw;
      padding: 10px;
      font-size: 1.2rem;
      /* Color */
      color: #000000;
      border-color: transparent;
      span {
        /* Size */
        font-size: 1rem;
        /* Color */
        color: #808080;
      }
    }
  }
`;
