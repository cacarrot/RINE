import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

export default () => {
  const middleware = [
    /**
     * DefaultMiddleware includes [immutableStateInvariant, thunk, serializableStateInvariant].
     *  spec: https://github.com/reduxjs/redux-starter-kit/blob/master/docs/api/getDefaultMiddleware.md
     *  note: https://github.com/rt2zz/redux-persist/issues/988
     */
    ...getDefaultMiddleware(),
    routerMiddleware(history),
  ];
  const store = configureStore({
    reducer: persistReducer(
      { key: "root", storage },
      createRootReducer(history),
    ),
    middleware: middleware,
  });
  const persistor = persistStore(store);
  return { store, persistor };
};
