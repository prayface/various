import Message from "./src/message.vue";
import { messageOption } from "./src/message";
import { createApp } from "vue";
import { node } from "../../utils";

const UiMessage = (option: messageOption, callBack: Function | undefined) => {
    //* 1. 创建Vue实例和包裹容器
    const app = createApp(Message, option);
    const container = document.createElement("div");
    //* 2. 将Vue实例挂载到容器中
    app.mount(container);
    //* 3. 为容器添加css样式
    container.style.left = "50%";
    container.style.position = "absolute";
    container.style.transform = `translateX(-50%)`;
    container.style.transition = "all 0.4s";
    //* 4. 将容器添加到#ui-messages中
    node.append("ui-messages", container);
    //* 5. 重置message位置
    reset(option.offset || 20);
    //* 6. 设置定时器移除message
    setTimeout(() => {
        container.style.opacity = "0";
        container.style.transform = `translate(-50%, -${option.offset || 20}px)`;
        setTimeout(() => {
            app.unmount();
            node.remove("ui-messages", container);
            reset(option.offset || 20);
            callBack && callBack();
        }, 400);
    }, option.delay || 3000);
};

//* 重置Message的位置
const reset = (offset: number) => {
    const container = node.use("ui-messages");
    if (container && container.children?.length) {
        let size = 0;
        for (let i = 0; i < container.children.length; i++) {
            const node = container.children[i] as HTMLElement;
            const rect = node.getBoundingClientRect();

            node.style.top = `${i * offset + size}px`;
            size += rect.height;
        }
    }
};

UiMessage.success = (message: string, callBack: Function | undefined) => {
    return UiMessage({ icon: "success", type: "success", message: message }, callBack);
};

UiMessage.warning = (message: string, callBack: Function | undefined) => {
    return UiMessage({ icon: "warning", type: "warning", message: message }, callBack);
};

UiMessage.error = (message: string, callBack: Function | undefined) => {
    return UiMessage({ icon: "error", type: "error", message: message }, callBack);
};

UiMessage.info = (message: string, callBack: Function | undefined) => {
    return UiMessage({ type: "info", message: message }, callBack);
};

export * from "./src/message";
export const $message = UiMessage;
export default $message;
