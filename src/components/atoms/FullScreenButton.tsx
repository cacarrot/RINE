import React, { useState, useEffect } from "react";
import { IconBaseProps } from "react-icons/lib/cjs";
import {
  FiMaximize2 as Maximize,
  FiMinimize2 as Minimize,
} from "react-icons/fi";
import ScreenUtil from "../../utils/ScreenUtil";

interface Props extends IconBaseProps {}

type LocalState = {
  isFullScreen: boolean;
};

export default (props: Props) => {
  const { size } = props;
  const [state, setState] = useState<LocalState>({ isFullScreen: false });

  useEffect(() => {
    setState({
      isFullScreen: ScreenUtil.isFullScreen(),
    });
  }, []);

  const handleClick = () => {
    const onEnter = () => {
      setState({
        isFullScreen: true,
      });
    };
    const onExit = () => {
      setState({
        isFullScreen: false,
      });
    };
    ScreenUtil.toggleFullScreen(onEnter, onExit);
  };

  if (state.isFullScreen) {
    return <Minimize size={size} onClick={handleClick} />;
  } else {
    return <Maximize size={size} onClick={handleClick} />;
  }
};
