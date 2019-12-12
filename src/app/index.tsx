import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "./index.less";

const App = (props) => {
    return (
        <div>
            侧边栏1
            <Router>
                <Switch>
                    {
                        props.routes.map((route: any, index) => (
                            <Route
                                exact={route.exact}
                                key={index}
                                path={route.path}
                                render={(props) => {
                                    return <route.component {...props} routes={route.routes} />
                                }}
                            />
                        ))
                    }
                </Switch>
            </Router>
        </div>
    );
}
export default App;