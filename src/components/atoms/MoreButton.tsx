import React from "react";
import { IconBaseProps } from "react-icons/lib/cjs";
import { FiChevronDown as Down, FiChevronUp as Up } from "react-icons/fi";

interface Props extends IconBaseProps {
  isShow: boolean;
}

export default (props: Props) => {
  const { size, isShow, onClick } = props;
  const handleClick = onClick;
  if (isShow) {
    return <Up size={size} onClick={handleClick} />;
  }
  return <Down size={size} onClick={handleClick} />;
};
