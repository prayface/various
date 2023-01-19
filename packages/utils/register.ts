interface Register {
    components: any[];
    use: (node: any, type: string) => any;
}

const register: Register = {
    components: [],
    use: (node: any, type: string) => {
        switch (type) {
            case "component":
                register.components.push(node);
                break;
        }

        return node;
    },
};

export default register;
