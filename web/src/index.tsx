import dva from "dva";
import "./index.less";
import gitlabBackUpModal from "./routes/gitlabBackUpPage/modal";
import wakeUpModal from "./routes/wakeUpPage/modal";

import router from "./router";

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(gitlabBackUpModal);
app.model(wakeUpModal);

// 4. Router
app.router(router);

// 5. Start
app.start("#root");
