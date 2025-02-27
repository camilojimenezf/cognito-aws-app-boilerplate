import { createApp } from "vue";
import { Amplify } from "aws-amplify";

import "./style.css";
import App from "./App.vue";

import { amplifyConfig } from "./config/providers/amplify-config";
import { router } from "./router/router";

Amplify.configure(amplifyConfig);

const app = createApp(App);

app.use(router);

app.mount("#app");
