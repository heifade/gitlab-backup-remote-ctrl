import React from "react";
import { Router, Route, Switch } from "dva/router";
import GitlabBackUpPage from "./routes/gitlabBackUpPage";
import WakeUpPage from "./routes/wakeUpPage";
import { RouterAPI } from "dva";

export default function (api?: RouterAPI) {
  return (
    <Router history={api!.history}>
      <Switch>
        <Route path="/gitlabBackUp" exact component={GitlabBackUpPage} />
        <Route path="/serverWarkUp" exact component={WakeUpPage} />
      </Switch>
    </Router>
  );
}
