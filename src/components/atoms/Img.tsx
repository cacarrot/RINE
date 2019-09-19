import React, { useEffect, useRef } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

export default (props: Props) => {
  const imgEl = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgEl.current;
    if (img !== null) img.setAttribute("loading", "lazy");
  }, []);

  // eslint-disable-next-line
  return <img ref={imgEl} {...props} />;
};
