import { createSlice } from "redux-starter-kit";
import { Dispatch } from "redux";
import BotUtil from "../../utils/BotUtil";
import { TalkItem } from "../../types/TalkItem";
import VibrationUtil from "../../utils/VibrationUtil";
import AudioUtil from "../../utils/AudioUtil";
import FileUtil from "../../utils/FileUtil";
import SpeechUtil from "../../utils/SpeechUtil";
import DateUtil from "../../utils/DateUtil";
import { ImageDao } from "../../db/Image";
import uuidv4 from "uuid/v4";
import talkRoomList from "../../constants/talkRoomList";

export const STATE_KEY = "talk";

/**
 * State Type
 */
export type State = {
  [roomId: number]: {
    talkList: TalkItem[];
    draftText: string;
  };
};

const INITIAL_STATE: State = {
  0: {
    talkList: [
      {
        name: "J.A.R.V.I.S",
        value: "Hello. I'm Jarvis.",
        logo: talkRoomList[0].logo,
      },
    ],
    draftText: "",
  },
  1: {
    talkList: [
      {
        name: "Gideon",
        value: "Hello. I'm Gideon.",
        logo: talkRoomList[1].logo,
      },
    ],
    draftText: "",
  },
};

/**
 * Action Type
 */
const NAMESPACE = "app/talk";
const ACTION_CREATE = `${NAMESPACE}/ACTION_CREATE`;
const ACTION_INITIALIZE = `${NAMESPACE}/ACTION_INITIALIZE`;
const ACTION_TEXT_CHANGE = `${NAMESPACE}/ACTION_TEXT_CHANGE`;
const ACTION_TEXT_CLEAR = `${NAMESPACE}/ACTION_TEXT_CLEAR`;

type CreateAction = {
  type: typeof ACTION_CREATE;
  payload: {
    roomId: number;
    item: TalkItem;
  };
};

type InitializeAction = {
  type: typeof ACTION_INITIALIZE;
  payload: {
    roomId: number;
  };
};

type ChangeTextAction = {
  type: typeof ACTION_TEXT_CHANGE;
  payload: {
    roomId: number;
    text: string;
  };
};

type ClearTextAction = {
  type: typeof ACTION_TEXT_CLEAR;
  payload: {
    roomId: number;
  };
};

/**
 * Reducer
 */
const talkModule = createSlice({
  slice: NAMESPACE,
  initialState: INITIAL_STATE,
  reducers: {
    create: (state: State, action: CreateAction) => {
      const roomId = action.payload.roomId;
      const talkItem = Object.assign({}, action.payload.item, {
        time: DateUtil.getNowTime(),
      });
      state[roomId].talkList.push(talkItem);
      const { value } = talkItem;
      if (value !== undefined) SpeechUtil.speak(value, () => {});
    },
    initialize: (state: State, action: InitializeAction) => {
      const roomId = action.payload.roomId;
      state[roomId].talkList = [];
      state[roomId].draftText = "";
      ImageDao.clear();
    },
    changeText: (state: State, action: ChangeTextAction) => {
      const roomId = action.payload.roomId;
      const text = action.payload.text;
      state[roomId].draftText = text;
    },
    clearText: (state: State, action: ClearTextAction) => {
      const roomId = action.payload.roomId;
      state[roomId].draftText = "";
    },
  },
});

/**
 * Effective Action
 */
export const effectiveActions = {
  postText: (roomId: number, text: string) => {
    return async (dispatch: Dispatch) => {
      dispatch(
        actions.create({
          roomId: roomId,
          item: {
            userType: "me",
            value: text,
          },
        }),
      );
      dispatch(actions.clearText({ roomId: roomId }));
      const replyMessage = await BotUtil.talk(
        text,
        talkRoomList[roomId].botType,
      );
      dispatch(
        actions.create({
          roomId: roomId,
          item: {
            name: talkRoomList[roomId].name,
            value: replyMessage,
            logo: talkRoomList[roomId].logo,
          },
        }),
      );
      VibrationUtil.vibrate([100, 100, 100]);
      AudioUtil.playMessageReceived();
    };
  },
  postPhoto: (roomId: number, target: any) => {
    return (dispatch: Dispatch) => {
      // const files: File[] = target.files;
      const callback = (event: any) => {
        const base64 = event.target.result;
        const imageId = uuidv4();
        (async () => {
          const replyImage = await BotUtil.searchImage();
          ImageDao.insert({ id: imageId, value: base64 }, (key: string) => {
            dispatch(
              actions.create({
                roomId: roomId,
                item: {
                  userType: "me",
                  messageType: "photo",
                  imageId: imageId,
                },
              }),
            );
            dispatch(
              actions.create({
                roomId: roomId,
                item: {
                  name: talkRoomList[roomId].name,
                  logo: talkRoomList[roomId].logo,
                  messageType: "photo",
                  imageId: replyImage,
                },
              }),
            );
          });
        })();
      };
      FileUtil.loadImageFileToBase64(target, callback);
    };
  },
};

export const actions = Object.assign({}, talkModule.actions, effectiveActions);

export const { reducer } = talkModule;
