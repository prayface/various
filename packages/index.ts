import { App } from "vue";
import { register } from "./utils";

export * from "./components";

//! import引入Various时, 通过use全局引入
export default {
    install: (app: App) => {
        register.components.forEach((value) => {
            app.component(value.name, value);
        });
    },
};
