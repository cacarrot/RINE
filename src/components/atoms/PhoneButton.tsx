import React from "react";
import { IconBaseProps } from "react-icons/lib/cjs";
import { FiPhone as Phone } from "react-icons/fi";
import AudioUtil from "../../utils/AudioUtil";

interface Props extends IconBaseProps {}

export default (props: Props) => {
  const { size } = props;
  const handleClick = () => {
    AudioUtil.playTelephoneRing();
  };
  return <Phone size={size} onClick={handleClick} />;
};
