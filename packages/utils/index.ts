export * as node from "./src/node";
export * as utility from "./src/utility";
export * as dispose from "./src/dispose";
export * as animations from "./src/animation";

export const register = {
    components: [] as any[],
    directives: [] as any[],
    use: (node: any, type: string) => {
        switch (type) {
            case "component":
                register.components.push(node);
                break;

            case "directive":
                register.directives.push(node);
        }

        return node;
    },
};
