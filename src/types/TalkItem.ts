export type TalkItem = {
  value?: string;
  userType?: "me" | undefined;
  messageType?: "text" | "photo" | undefined;
  time?: string;
  logo?: string;
  name?: string;
  imageId?: string;
  // sticker?: string;
  // isRead?: boolean;
};
