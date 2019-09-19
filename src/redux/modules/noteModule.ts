import { createSlice } from "redux-starter-kit";
import { NoteItem } from "../../types/NoteItem";
import DateUtil from "../../utils/DateUtil";

export const STATE_KEY = "note";

/**
 * State Type
 */
export type State = {
  noteList: NoteItem[];
  draftText: string;
};

const INITIAL_STATE: State = {
  noteList: [
    // { name: "Tonny", value: "START", time: "9/3 21:01" },
  ],
  draftText: "",
};

/**
 * Selector
 */
export const selectors = {
  noteList: (state: any) => {
    return state[STATE_KEY].noteList;
  },
  draftText: (state: any) => {
    return state[STATE_KEY].draftText;
  },
};

/**
 * Action Type
 */
const NAMESPACE = "app/note";
const ACTION_CREATE = `${NAMESPACE}/ACTION_CREATE`;
const ACTION_UPDATE = `${NAMESPACE}/ACTION_UPDATE`;
const ACTION_DELETE = `${NAMESPACE}/ACTION_DELETE`;
const ACTION_INITIALIZE = `${NAMESPACE}/ACTION_INITIALIZE`;
const ACTION_TEXT_CHANGE = `${NAMESPACE}/ACTION_TEXT_CHANGE`;
const ACTION_TEXT_CLEAR = `${NAMESPACE}/ACTION_TEXT_CLEAR`;

type CreateAction = {
  type: typeof ACTION_CREATE;
  payload: NoteItem;
};

type UpdateAction = {
  type: typeof ACTION_UPDATE;
  payload: NoteItem;
};

type DeleteAction = {
  type: typeof ACTION_DELETE;
  payload: { index: number };
};

type InitializeAction = {
  type: typeof ACTION_INITIALIZE;
};

type ChangeTextAction = {
  type: typeof ACTION_TEXT_CHANGE;
  payload: string;
};

type ClearTextAction = {
  type: typeof ACTION_TEXT_CLEAR;
};

/**
 * Reducer
 */
const noteModule = createSlice({
  slice: NAMESPACE,
  initialState: INITIAL_STATE,
  reducers: {
    create: (state: State, action: CreateAction) => {
      const noteItem = Object.assign({}, action.payload, {
        time: DateUtil.getNowDateTime(),
      });
      state.noteList.push(noteItem);
    },
    update: (state: State, action: UpdateAction) => {
      const index = action.payload.index;
      const noteItem = action.payload;
      if (index !== undefined) {
        state.noteList[index] = noteItem;
        
      }
    },
    delete: (state: State, action: DeleteAction) => {
      state.noteList.splice(action.payload.index, 1);
    },
    initialize: (state: State, action: InitializeAction) => {
      state.noteList = INITIAL_STATE.noteList;
      state.draftText = INITIAL_STATE.draftText;
    },
    changeText: (state: State, action: ChangeTextAction) => {
      state.draftText = action.payload;
    },
    clearText: (state: State, action: ClearTextAction) => {
      state.draftText = "";
    },
  },
});

export const { actions, reducer } = noteModule;
