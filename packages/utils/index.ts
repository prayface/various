export * as node from "./src/node";
export * as verify from "./src/verify";
export * as dispose from "./src/dispose";

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
