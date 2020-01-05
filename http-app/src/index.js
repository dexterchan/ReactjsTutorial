import React from "react";
import ReactDOM from "react-dom";

import logger from "./services/logServices";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
/*Sentry.init({
  dsn: "https://38efc95ec3eb421eb43b8bd3146c066e@sentry.io/1871942"
});*/
logger.init();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
