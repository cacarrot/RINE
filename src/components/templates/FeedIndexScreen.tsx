import React, { useState } from "react";
import styled from "styled-components";
import CommonHeader from "../organisms/CommonHeader";
import CommonFooter from "../organisms/CommonFooter";
import SwipeableViews from "react-swipeable-views";
import FeedTimeline from "../organisms/FeedTimeline";
import feedTargetList from "../../constants/feedTargetList";

type Props = {};

export default (props: Props) => {
  const [subTitle, setSubTitle] = useState<String>(feedTargetList[0].name);

  const getTabs = () => {
    return feedTargetList.map((item, index) => {
      return <FeedTimeline key={index} url={item.url} />;
    });
  };
  const handleSwipeChange = (index: number, indexLatest: number) => {
    setSubTitle(feedTargetList[index].name);
  };

  return (
    <Root>
      <Header>
        <CommonHeader type="top" title={"フィード(" + subTitle + ")"} />
      </Header>
      <Main>
        <SwipeableViews enableMouseEvents onChangeIndex={handleSwipeChange}>
          {getTabs()}
        </SwipeableViews>
        {/* <FixedControl>
          <Link to={path.feed_new}>
            <AddButton size={_ICON_SIZE} />
          </Link>
        </FixedControl> */}
      </Main>
      <Footer>
        <CommonFooter />
      </Footer>
    </Root>
  );
};

const Root = styled.div`
  /* Layout */
  display: grid;
  grid-template-rows: 50px 1fr 50px;
  /* Size */
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const Header = styled.header`
  /* Layout */
  grid-row: 1;
  /* Size */
  margin: 0;
  padding: 0;
`;

const Main = styled.main`
  /* Layout */
  grid-row: 2;
  /* Size */
  margin: 0;
  padding: 0;
  overflow-y: scroll;
`;

const Footer = styled.footer`
  /* Layout */
  grid-row: 3;
  /* Size */
  margin: 0;
  padding: 0;
`;

// const FixedControl = styled.div`
//   /* Fix Bottom */
//   position: fixed;
//   z-index: 99;
//   bottom: ${styles.FOOTER.HEIGHT};
//   right: 0;
//   /* Size */
//   margin: 10px;
//   padding: 0;
// `;
