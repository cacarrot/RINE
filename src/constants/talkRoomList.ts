import { TalkRoomItem } from "../types/TalkRoomItem";

const talkRoomList: TalkRoomItem[] = [
  {
    name: "Gideon",
    logo: require("../images/gideon.png"),
    botType: "noby",
    firstMessage: "こんにちは。私はギデオンです。",
  },
  {
    name: "J.A.R.V.I.S",
    logo: require("../images/jarvis.svg"),
    botType: "a3rt",
    firstMessage: "こんにちは。私はジャービスです。",
  },
  {
    name: "Baymax",
    logo: require("../images/baymax.png"),
    botType: "a3rt",
    firstMessage: "こんにちは。私はBaymax。",
  },
];
export default talkRoomList;
