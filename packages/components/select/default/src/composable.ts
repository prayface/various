//* 按需导入插件
import { SetupContext, nextTick, computed, inject, ref } from "vue";
//* 组件属性
import { UiSelectProps, UiSelectEmits } from "../index";
//* 公共属性
import { UiFormEmitterKey, UiTypes } from "@various/constants";
//* 公共函数
import { node, utility, dispose, animations } from "@various/utils";

export const useComposable = (define: UiSelectProps, emits: SetupContext<typeof UiSelectEmits>["emit"]) => {
    //* 初始化mitt
    const emitter = inject(UiFormEmitterKey, undefined);

    //* 响应式变量
    const refs = {
        visible: ref<boolean>(false),
        container: ref<HTMLElement>(),
        candidate: ref<HTMLElement>(),
    };

    //* 函数列表
    const methods = {
        //* 候选框隐藏事件
        hidden: (ev?: Event) => {
            if (!refs.container.value) return;
            if (ev?.target && node.includes(ev.target as HTMLElement, refs.container.value)) return;
            else {
                refs.visible.value = false;
            }
        },

        //* 选择器清空事件
        clear: () => {
            emits("update:modelValue", "");
            emits("clear", "clear");
            if (emitter?.emit) {
                emitter.emit(define.name || "", "change");
            }
        },

        //* 候选框显示事件
        show: () => {
            //* 判断选择框是否处于异常状态
            if (computeds.status.value.name != "default") return;
            //* 判断候选项是否已被激活
            if (refs.visible.value) {
                methods.hidden();
            } else {
                refs.visible.value = true;
                nextTick(() => {
                    if (!refs.container.value || !refs.candidate.value) return;
                    //* 将内容添加到视图容器中
                    node.append(document.body, refs.candidate.value);
                    //* 根据配置计算当前窗口位置
                    dispose.boundary.relativeContainerBody(
                        { container: refs.container.value, view: refs.candidate.value },
                        {
                            direction: "bottom",
                            height: define.height,
                            offset: 8,
                            width: refs.container.value?.offsetWidth || 0,
                            align: "start",
                        }
                    );

                    //* 隐藏事件
                    addEventListener("click", methods.hidden, { capture: true, once: true });
                });
            }
        },
    };

    //* 计算属性
    const computeds = {
        status: computed(() => {
            if (define.loading) {
                return { is: true, name: "loading" };
            } else if (define.disabled) {
                return { is: false, name: "disabled" };
            } else if (define.readonly) {
                return { is: false, name: "readonly" };
            } else {
                return { is: false, name: "default" };
            }
        }),
    };

    //* 动态计算列表
    const dynamics = {
        //* 动态计算候选项类名
        activate: (option: UiTypes.candidate) => {
            if ((option.activate && option.activate(define.modelValue, option)) || define.modelValue == option.value) return "ui-active";
            else {
                return "";
            }
        },
    };

    //* 属性
    const binds = {
        //* 候选项容器
        candidates: computed(() => {
            return {
                class: define.classExtraName || "",
                style: {
                    zIndex: define.zIndex,
                },
            };
        }),

        //* 候选项
        candidate: computed(() => {
            return {
                style: {
                    maxHeight: define.height + "px",
                },
            };
        }),

        //* 容器
        container: computed(() => {
            //* 初始化数据
            const className: string[] = [];
            const style: { [name: string]: any } = {
                width: define.width,
            };

            //* 判断宽度类型并进行处理
            if (utility.isNumber(define.width)) style.width = define.width + "px";

            //* 判断是否是禁用或只读状态
            if (computeds.status.value.name == "disabled") className.push("ui-disabled-status");
            else if (computeds.status.value.name == "readonly") className.push("ui-readonly-status");
            else if (computeds.status.value.name == "loading") className.push("ui-loading-status");
            //* 判断是否需要添加size类名
            if (define.size != "default") className.push(`ui-${define.size}`);
            //* 判断是否需要添加clearable类名
            if (define.clearable) className.push("ui-clearable");
            //* 判断候选项是否处于展示状态
            if (refs.visible.value && define.candidates?.length) className.push("ui-candidates-show");

            return {
                class: className.join(" "),
                style: style,
            };
        }),

        //* 主体
        main: computed(() => {
            const disabled = ["disabled", "loading"].includes(computeds.status.value.name);
            return {
                value: define.candidates.find((candidate) => candidate.value == define.modelValue)?.label || "",
                disabled: disabled,
                readonly: !disabled,
                placeholder: define.placeholder,
                autocomplete: "off",
            };
        }),
    };

    //* 响应事件
    const ons = {
        //* 候选项容器事件
        candidates: animations.selector(define.animation, {
            enterBefore: () => emits("before-enter"),
            leaveBefore: () => emits("before-leave"),
            enterAfter: () => emits("after-enter"),
            leaveAfter: () => emits("after-leave"),
        }),

        //* 候选项事件
        candidate: (option: UiTypes.candidate) => {
            return {
                //* 候选项选择事件
                mousedown: (ev: Event) => {
                    if (option.children?.length) {
                        removeEventListener("click", methods.hidden, { capture: true });
                    } else {
                        emits("update:modelValue", option.value);
                        emits("change", ev);
                        emitter?.emit(define.name || "", "change");
                        if (refs.visible.value) {
                            methods.hidden();
                        }
                    }
                },

                //* 补充被移除的点击事件
                mouseup: () => {
                    if (option.children?.length) {
                        setTimeout(() => addEventListener("click", methods.hidden, { capture: true, once: true }), 100);
                    }
                },
            };
        },
    };

    return { ons, refs, binds, methods, dynamics, computeds, animations };
};
