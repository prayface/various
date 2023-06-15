import _ from "lodash";
import { nextTick, computed, inject, ref } from "vue";
import { UiInputProps, UiInputEmits } from "../index";
import { UiFormEmitterKey } from "@various/constants";
import { node, dispose } from "@various/utils";

export const useComposable = (define: UiInputProps, emit: UiInputEmits) => {
    //* 初始化mitt
    const emitter = inject(UiFormEmitterKey, undefined);

    //* 响应式变量
    const refs = {
        main: ref<HTMLElement>(),
        visible: ref<boolean>(false),
        triangle: ref<HTMLElement>(),
        container: ref<HTMLElement>(),
        candidate: ref<HTMLElement>(),
    };

    //* 工具函数
    const utils = {
        //* 候选框显示事件
        show: () => {
            //* 检测是否满足运行条件
            if (refs.visible.value) return;
            else {
                //* 显示候选项列表
                refs.visible.value = true;
                //* 下一帧运行
                nextTick(() => {
                    //* 检测是否向下执行
                    if (!refs.container.value || !refs.candidate.value) return;
                    //* 将内容添加到视图容器中
                    node.append(document.body, refs.candidate.value);

                    //* 根据配置计算当前窗口位置
                    const rect = dispose.boundary.relativeContainerBody(refs.container.value, refs.candidate.value, {
                        direction: "bottom",
                        offset: 8,
                        height: define.height,
                        width: refs.container.value?.offsetWidth || 0,
                        align: "start",
                    });

                    //* 判断是否需要调整小三角位置
                    if (rect.triangle && refs.triangle.value) {
                        refs.triangle.value.style.inset = rect.triangle;
                        refs.triangle.value.style.transform = `rotate(${rect.rotate})`;
                    }
                });
            }
        },
    };

    //* 函数列表
    const methods = {
        //* Input失去焦点事件
        blur: (ev?: FocusEvent | Event) => {
            //* 当ev不存在时, 触发Input失去焦点
            if (!ev) return refs.main.value?.blur();
            else {
                //* 隐藏候选项
                refs.visible.value = false;

                //* 触发blur回调
                emit("blur", ev);

                //* 触发表单blur相关校验
                emitter?.emit(define.name || "", "blur");
            }
        },

        //* Input获取焦点事件
        focus: (ev?: FocusEvent | Event) => {
            //* 当ev不存在时, 触发Input获取焦点
            if (!ev) return refs.main.value?.blur();
            else {
                //* 显示候选项
                utils.show();

                //* 触发focus回调
                emit("focus", ev);
            }
        },

        //* 清空事件
        clear: () => {
            emit("update:modelValue", "");
            emit("clear");
            if (emitter?.emit) {
                emitter.emit(define.name || "", "change");
            }
        },

        //* Input触发input事件
        input: (ev: InputEvent | Event) => {
            //* 获取Target对象
            const target = ev.target as HTMLInputElement;

            //* 显示候选项窗口, 针对某些情况下提前隐藏候选项, 但触发input时候选项需要显示的场景
            utils.show();

            //* 触发v-model变更和input回调
            emit("update:modelValue", target.value);
            emit("input", ev as InputEvent);
        },

        //* Input触发回车事件
        enter: (ev: KeyboardEvent | Event) => {
            emit("enter", ev);
        },

        //* Input触发change事件
        change: (ev: Event) => {
            //* 触发change回调
            emit("change", ev);

            //* 触发表单change相关校验
            emitter?.emit(define.name || "", "change");
        },

        //* 候选项选择事件
        cutCandidate: (content: String, ev: Event) => {
            console.log(1212);
            emit("update:modelValue", content);
            emit("select", ev);
            emit("change", ev);
            if (emitter?.emit) {
                emitter.emit(define.name || "", "change");
            }
        },
    };

    //* 配置项
    const options = {
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

    //* 计算属性
    const computeds = {
        //* 组件样式
        style: computed(() => {
            //* 宽度处理
            if (_.isNumber(define.width)) return { width: define.width + "px" };
            else return { width: define.width };
        }),

        //* 标签响应式属性
        attrs: computed(() => {
            return {
                type: define.type,
                value: define.modelValue,
                disabled: ["disabled", "loading"].includes(options.status.value.name),
                readonly: options.status.value.name == "readonly",
                placeholder: define.placeholder,
                autocomplete: define.autocomplete,
            };
        }),

        //* 输入框回调函数
        inputOns: computed(() => {
            return {
                change: methods.change,
                focus: methods.focus,
                input: methods.input,
                blur: methods.blur,
            };
        }),

        //* 组件类名
        className: computed(() => {
            //* 初始化输出列表
            const result: string[] = [];
            //* 判断是否是禁用或只读状态
            if (options.status.value.name == "disabled") result.push("ui-disabled-status");
            else if (options.status.value.name == "readonly") result.push("ui-readonly-status");
            else if (options.status.value.name == "loading") result.push("ui-loading-status");
            //* 判断是否需要添加size类名
            if (define.size != "default") result.push(`ui-${define.size}`);
            //* 判断是否需要添加clearable类名
            if (define.clearable) result.push("ui-clearable");
            //* 判断候选项是否处于展示状态
            if (refs.visible.value && define.candidates?.length) result.push("ui-candidates-show");

            return result.join(" ");
        }),
    };

    return { refs, options, methods, computeds };
};
