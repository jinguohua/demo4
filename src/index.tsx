import React from "react";
import { render } from "react-dom";
import EntryApp from "./entry";
if (module.hot) {
  module.hot.accept();
}
render(<EntryApp />, document.getElementById("node-content"));
