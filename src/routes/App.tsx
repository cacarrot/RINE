import React from "react";
import { Switch, Route } from "react-router-dom";
import path from "./path";
import HomeIndexScreen from "../components/templates/HomeIndexScreen";
import TalkIndexScreen from "../components/templates/TalkIndexScreen";
import TalkDetailScreen from "../components/templates/TalkDetailScreen";
import NoteIndexScreen from "../components/templates/NoteIndexScreen";
import NoteDetailScreen from "../components/templates/NoteDetailScreen";
import FeedIndexScreen from "../components/templates/FeedIndexScreen";

type Props = {};

export default (props: Props) => {
  return (
    <Switch>
      <Route exact path={path.index} component={HomeIndexScreen} />

      <Route exact path={path.talk_index} component={TalkIndexScreen} />
      <Route
        exact
        path={path.talk_detail_params}
        component={TalkDetailScreen}
      />

      <Route exact path={path.note_index} component={NoteIndexScreen} />
      <Route exact path={path.note_new} component={NoteDetailScreen} />
      <Route path={path.note_edit_params} component={NoteDetailScreen} />

      <Route exact path={path.feed_index} component={FeedIndexScreen} />

      <Route render={() => <div>Page Not Found.</div>} />
    </Switch>
  );
};
