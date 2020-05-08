import { Notify } from "quasar";

Notify.setDefaults({
  position: "bottom",
  timeout: 1500,
  textColor: "dark",
  actions: [{ icon: "close", color: "dark" }]
});
