//* 按需导入插件
import { ref, inject, computed, nextTick, SetupContext, reactive, shallowRef } from "vue";
//* 组件属性
import type { UiCascadeProps, UiCascadeEmits, UiCascadeOption } from "./index";
//* 公共属性
import { UiFormEmitterKey } from "@various/constants";
//* 公共函数
import { node, utility, dispose, animations } from "@various/utils";

export const useComposable = (define: UiCascadeProps, emits: SetupContext<typeof UiCascadeEmits>["emit"]) => {
    //* 初始化mitt
    const emitter = inject(UiFormEmitterKey, undefined);

    //* 响应式变量
    const refs = {
        visible: ref<boolean>(false),
        ephemeral: ref<any>(),
    };

    //* 节点
    const nodes = {
        body: ref<HTMLElement>(),
        body2: ref<HTMLElement>(),
        container: ref<HTMLElement>(),
        candidates: ref<HTMLElement[]>([]),
    };

    //* 静态属性
    const variable = {
        timer: shallowRef<NodeJS.Timeout>(),
    };

    //* 函数列表
    const methods = {
        //* 候选框隐藏事件
        hidden: (ev?: Event) => {
            if (!nodes.container.value) return;
            if (ev?.target && node.includes(ev.target as HTMLElement, nodes.container.value)) return;
            else {
                variable.timer.value && clearTimeout(variable.timer.value);
                variable.timer.value = undefined;
                refs.ephemeral.value = undefined;
                refs.visible.value = false;
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
            return define.resolveName?.() || define.modelValue?.join?.("/") || "";
        }),

        //* 禁用状态
        disabled: computed(() => define.loading || define.disabled),

        //* 次级菜单配置
        children: computed(() => {
            const option = define.option.find((value) => refs.ephemeral.value == value.value);
            if (!option) return [];
            else {
                return define.sort?.(option) || option.children;
            }
        }),

        //* 组件类
        className: computed(() => {
            //* 初始化数据
            const className: string[] = [];
            //* 判断候选项是否处于展示状态
            if (refs.visible.value && define.option?.length) className.push("ui-candidates-show");
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
                readonly: !computeds.disabled.value,
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
        animation: animations.selector(true, {
            beforeEnter: () => emits("before-enter"),
            beforeLeave: () => emits("before-leave"),
            afterEnter: () => emits("after-enter"),
            afterLeave: () => emits("after-leave"),
        }),

        //* 候选项事件（主要）
        candidate1: (data: UiCascadeOption, index: number) => {
            return {
                mousemove: () => {
                    variable.timer.value && clearTimeout(variable.timer.value);
                    variable.timer.value = undefined;
                    refs.ephemeral.value = data.value;
                    nextTick(() => {
                        if (!nodes.candidates.value[index] || !nodes.body2.value) return;
                        //* 将内容添加到视图容器中
                        node.append(document.body, nodes.body2.value);
                        //* 根据配置计算当前窗口位置
                        dispose.boundary.relativeContainerBody(
                            { container: nodes.candidates.value[index], view: nodes.body2.value },
                            {
                                direction: "right",
                                height: define.height,
                                offset: 0,
                                align: "start",
                            }
                        );
                    });
                },

                mouseleave: () => {
                    variable.timer.value && clearTimeout(variable.timer.value);
                    variable.timer.value = setTimeout(() => {
                        refs.ephemeral.value = undefined;
                    }, 200);
                },
            };
        },

        //* 候选项事件（次要）
        candidate2: (data: { name: string; value: any }) => {
            return {
                mousedown: (ev: Event) => {
                    emits("update:modelValue", [refs.ephemeral.value, data.value]);
                    emits("change", ev);
                    emitter?.emit(define.name || "", "change");
                    if (refs.visible.value) {
                        methods.hidden();
                    }
                },

                mousemove: () => {
                    variable.timer.value && clearTimeout(variable.timer.value);
                    variable.timer.value = undefined;
                },

                mouseleave: () => {
                    variable.timer.value && clearTimeout(variable.timer.value);
                    variable.timer.value = setTimeout(() => {
                        refs.ephemeral.value = undefined;
                    }, 200);
                },
            };
        },
    };

    return { ons, refs, nodes, binds, methods, computeds };
};
