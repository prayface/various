import { App } from "vue";
import { register } from "./utils";

export * from "./components";
export * from "./directives";

//! import引入Various时, 通过use全局引入
export default {
    install: (app: App) => {
        register.components.forEach((value) => {
            app.component(value.name, value);
        });

        register.directives.forEach((value) => {
            app.directive(value.name, value);
        });
    },
};
