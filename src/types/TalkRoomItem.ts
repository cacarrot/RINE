import { BotType } from "./BotType";

export type TalkRoomItem = {
  index?: number;
  logo?: string;
  name?: string;
  botType?: BotType;
  firstMessage?: string;
};
