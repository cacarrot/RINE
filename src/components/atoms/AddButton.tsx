import React from "react";
import { IconBaseProps } from "react-icons/lib/cjs";
import { MdAddCircle as Add } from "react-icons/md";

interface Props extends IconBaseProps {}

export default (props: Props) => {
  const { size, onClick } = props;

  const iconColor = "#00c403";

  const handleClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (onClick) onClick(event);
  };

  return <Add size={size} color={iconColor} onClick={handleClick} />;
};
