import React from "react";
import { IconBaseProps } from "react-icons/lib/cjs";
import { MdRefresh as Refresh } from "react-icons/md";

interface Props extends IconBaseProps {}

export default (props: Props) => {
  const { size } = props;
  const handleClick = () => {
    document.location.reload(true);
  };
  return <Refresh size={size} onClick={handleClick} />;
};
