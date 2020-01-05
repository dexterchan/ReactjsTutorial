import Raven from "raven-js";

const init = () => {
  Raven.config("https://38efc95ec3eb421eb43b8bd3146c066e@sentry.io/1871942", {
    release: "1-0-0",
    environment: "development-test"
  }).install();
};

const log = error => {
  Raven.captureException(error);
};

export default {
  init: init,
  log: log
};
