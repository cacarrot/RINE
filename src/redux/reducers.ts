import { combineReducers } from "redux-starter-kit";
import { connectRouter } from "connected-react-router";
import {
  reducer as talkReducer,
  STATE_KEY as TALK_STATE_KEY,
} from "./modules/talkModule";
import {
  reducer as noteReducer,
  STATE_KEY as NOTE_STATE_KEY,
} from "./modules/noteModule";

export default (history: any) => {
  return combineReducers({
    router: connectRouter(history),
    [TALK_STATE_KEY]: talkReducer,
    [NOTE_STATE_KEY]: noteReducer,
  });
};
