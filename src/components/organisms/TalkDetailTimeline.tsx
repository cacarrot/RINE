import React from "react";
import styled from "styled-components";
import TalkCard from "../molecules/TalkCard";
import { TalkItem } from "../../types/TalkItem";

type Props = {
  talkList: TalkItem[];
  onUpdate?: Function;
};

export default (props: Props) => {
  const { talkList } = props;

  const listTalkComponents = () => {
    return talkList.map((item, index) => {
      return (
        <TalkCard
          key={index}
          userType={item.userType}
          messageType={item.messageType}
          value={item.value}
          name={item.name}
          logo={item.logo}
          time={item.time}
          imageId={item.imageId}
        />
      );
    });
  };

  return <Root>{listTalkComponents()}</Root>;
};

const Root = styled.div`
  /* Size */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
`;
