import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import TalkCard from "../components/molecules/TalkCard";

storiesOf("Atoms", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Molecules", module).add("TalkCard", () => (
  <div style={{ width: "375px", height: "667px", backgroundColor: "#829fbf" }}>
    <TalkCard userType="me" value="どうも" />
  </div>
));
