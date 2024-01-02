//* 按需导入插件
import { SetupContext, nextTick, reactive, computed, inject, ref } from "vue";
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
    };

    const nodes = {
        body: ref<HTMLElement>(),
        container: ref<HTMLElement>(),
    };

    //* 函数列表
    const methods = {
        //* 候选框隐藏事件
        hidden: (ev?: Event) => {
            if (!nodes.container.value) return;
            if (ev?.target && node.includes(ev.target as HTMLElement, nodes.container.value)) return;
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
            if (define.readonly || define.disabled || define.loading) return;
            //* 判断候选项是否已被激活
            if (refs.visible.value) {
                methods.hidden();
            } else {
                refs.visible.value = true;
                nextTick(() => {
                    if (!nodes.container.value || !nodes.body.value) return;
                    //* 将内容添加到视图容器中
                    node.append(document.body, nodes.body.value);
                    //* 根据配置计算当前窗口位置
                    dispose.boundary.relativeContainerBody(
                        { container: nodes.container.value, view: nodes.body.value },
                        {
                            direction: "bottom",
                            height: define.height,
                            offset: 8,
                            width: nodes.container.value?.offsetWidth || 0,
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
        //* 组件值
        value: computed(() => {
            return define.candidates.find((candidate) => candidate.value == define.modelValue)?.label || "";
        }),

        //* 禁用状态
        disabled: computed(() => define.loading || define.disabled),

        //* 组件类
        className: computed(() => {
            //* 初始化数据
            const className: string[] = [];
            //* 判断候选项是否处于展示状态
            if (refs.visible.value && define.candidates?.length) className.push("ui-form-selector");
            //* 判断是否需要添加clearable类名
            if (define.clearable) className.push("ui-clearable");
            //* 判断是否需要添加size类名
            if (define.size != "default") className.push(`ui-${define.size}`);
            //* 判断是否是禁用或只读状态
            if (define.loading) className.push("ui-loading-status");
            else if (define.disabled) className.push("ui-disabled-status");
            else if (define.readonly) {
                className.push("ui-readonly-status");
            }

            return className.join(" ");
        }),
    };

    //* 属性
    const binds = reactive({
        //* 主体
        main: computed(() => {
            return {
                value: computeds.value.value,
                disabled: computeds.disabled.value,
                placeholder: define.placeholder,
                autocomplete: "off",
            };
        }),

        //* 候选项容器
        body: computed(() => {
            return {
                class: define.classExtraName || "",
                style: {
                    zIndex: define.zIndex,
                },
            };
        }),

        //* 容器
        container: computed(() => {
            return {
                class: computeds.className.value,
                style: {
                    width: utility.isNumber(define.width) ? define.width + "px" : define.width,
                },
            };
        }),

        //* 候选项列表
        candidates: computed(() => {
            return {
                style: {
                    maxHeight: define.height + "px",
                },
            };
        }),
    });

    //* 响应事件
    const ons = {
        //* 候选项容器事件
        animation: animations.selector(define.animation, {
            beforeEnter: () => emits("before-enter"),
            beforeLeave: () => emits("before-leave"),
            afterEnter: () => emits("after-enter"),
            afterLeave: () => emits("after-leave"),
        }),

        //* 候选项事件
        candidate: (option: UiTypes.candidate) => {
            return {
                //* 候选项选择事件
                mousedown: (ev: Event) => {
                    emits("update:modelValue", option.value);
                    emits("change", ev);
                    emitter?.emit(define.name || "", "change");
                    if (refs.visible.value) {
                        methods.hidden();
                    }
                },
            };
        },
    };

    return { ons, refs, nodes, binds, methods, computeds, animations };
};
