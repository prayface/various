import { SetupContext, nextTick, computed, inject, ref } from "vue";
import { UiSelectProps, UiSelectEmits } from "../index";
import { node, utility, dispose } from "@various/utils";
import { UiFormEmitterKey } from "@various/constants";

export const useComposable = (define: UiSelectProps, emits: SetupContext<typeof UiSelectEmits>["emit"]) => {
    //* 初始化mitt
    const emitter = inject(UiFormEmitterKey, undefined);

    //* 响应式变量
    const refs = {
        visible: ref<boolean>(false),
        triangle: ref<HTMLElement>(),
        container: ref<HTMLElement>(),
        candidate: ref<HTMLElement>(),
    };

    //* 组件状态
    const status = computed(() => {
        if (define.loading) {
            return { is: true, name: "loading" };
        } else if (define.disabled) {
            return { is: false, name: "disabled" };
        } else if (define.readonly) {
            return { is: false, name: "readonly" };
        } else {
            return { is: false, name: "default" };
        }
    });

    //* 函数列表
    const methods = {
        //* 候选项切换事件
        switchCandidate: (content: String, ev: Event) => {
            emits("update:modelValue", content);
            emits("change", ev);
            if (emitter?.emit) {
                emitter.emit(define.name || "", "change");
            }

            if (refs.visible.value) {
                methods.hidden();
            }
        },

        //* 候选框隐藏事件
        hidden: (ev?: Event) => {
            if (!refs.container.value) return;
            if (ev?.target && node.includes(ev.target as HTMLElement, refs.container.value)) return;
            else {
                refs.visible.value = false;
                window.removeEventListener("click", methods.hidden);
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
            if (status.value.name != "default") return;
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
                    const rect = dispose.boundary.relativeContainerBody(refs.container.value, refs.candidate.value, {
                        direction: "bottom",
                        height: define.height,
                        offset: 8,
                        width: refs.container.value?.offsetWidth || 0,
                        align: "start",
                    });

                    //* 判断是否需要调整小三角位置
                    if (rect.triangle && refs.triangle.value) {
                        refs.triangle.value.style.inset = rect.triangle;
                        refs.triangle.value.style.transform = `rotate(${rect.rotate})`;
                    }

                    //* 隐藏事件
                    window.addEventListener("click", methods.hidden, true);
                });
            }
        },
    };

    //* 计算属性
    const computeds = {
        //* 输入框内容
        value: computed(() => define.candidates.find((candidate) => candidate.value == define.modelValue)?.label || ""),
        //* 标签属性
        attrs: computed(() => {
            const disabled = ["disabled", "loading"].includes(status.value.name);
            return {
                disabled: disabled,
                readonly: !disabled,
                placeholder: define.placeholder,
                autocomplete: "off",
            };
        }),

        //* 标签样式
        style: computed(() => {
            //* 宽度处理
            if (utility.isNumber(define.width)) return { width: define.width + "px" };
            else {
                return { width: define.width };
            }
        }),

        //* 标签类名
        className: computed(() => {
            //* 初始化输出列表
            const result: string[] = [];
            //* 判断是否是禁用或只读状态
            if (status.value.name == "disabled") result.push("ui-disabled-status");
            else if (status.value.name == "readonly") result.push("ui-readonly-status");
            else if (status.value.name == "loading") result.push("ui-loading-status");
            //* 判断是否需要添加size类名
            if (define.size != "default") result.push(`ui-${define.size}`);
            //* 判断是否需要添加clearable类名
            if (define.clearable) result.push("ui-clearable");
            //* 判断候选项是否处于展示状态
            if (refs.visible.value && define.candidates?.length) result.push("ui-candidates-show");

            return result.join(" ");
        }),
    };

    return { refs, status, methods, computeds };
};
