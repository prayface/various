interface Register {
    components: any[];
    directives: any[];
    use: (node: any, type: string) => any;
}

const register: Register = {
    components: [],
    directives: [],
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

export default register;
