import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.less";
import { AppRoute } from "./app/route";
import { LoginRoute } from "./login/route";
const RouteIndex = [...LoginRoute, ...AppRoute];
class EntryApp extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {RouteIndex.map((route: any, index) => (
            <Route
              exact={route.exact}
              key={index}
              path={route.path}
              render={props => (
                <route.component {...props} routes={route.routes} />
              )}
            />
          ))}
        </Switch>
      </Router>
    );
  }
}
export default EntryApp;
