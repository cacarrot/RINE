import React from "react";
import { IconBaseProps } from "react-icons/lib/cjs";
import { FiShare2 as Share } from "react-icons/fi";
import ShareUtil from "../../utils/ShareUtil";

interface Props extends IconBaseProps {}

export default (props: Props) => {
  const { size } = props;
  const handleClick = () => {
    ShareUtil.share(
      "https://rine.netlify.com/",
      "Try RINE!!",
      "RINE",
    );
  };
  return <Share size={size} onClick={handleClick} />;
};
