//* 按需导入插件
import { SetupContext, nextTick, computed, inject, ref, reactive } from "vue";
//* 组件属性
import { UiInputProps, UiInputEmits } from "../index";
//* 公共属性
import { UiTypes, UiFormEmitterKey } from "@various/constants";
//* 公共函数
import { node, utility, dispose, animations } from "@various/utils";

export const useComposable = (define: UiInputProps, emits: SetupContext<typeof UiInputEmits>["emit"]) => {
    //* 初始化mitt
    const emitter = inject(UiFormEmitterKey, undefined);

    //* 响应式变量
    const refs = {
        visible: ref<boolean>(false),
    };

    //* 节点
    const nodes = {
        main: ref<HTMLElement>(),
        body: ref<HTMLElement>(),
        container: ref<HTMLElement>(),
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
                    if (!nodes.container.value || !nodes.body.value) return;
                    //* 将内容添加到视图容器中
                    node.append(document.body, nodes.body.value);
                    //* 根据配置计算当前窗口位置
                    dispose.boundary.relativeContainerBody(
                        { container: nodes.container.value, view: nodes.body.value },
                        {
                            direction: "bottom",
                            offset: 8,
                            height: define.height,
                            width: nodes.container.value?.offsetWidth || 0,
                            align: "start",
                        }
                    );
                });
            }
        },
    };

    //* 函数列表
    const methods = {
        //* Input失去焦点事件
        blur: (ev?: FocusEvent | Event) => {
            //* 当ev不存在时, 触发Input失去焦点
            if (!ev) return nodes.main.value?.blur();
            else {
                //* 隐藏候选项
                refs.visible.value = false;

                //* 触发blur回调
                emits("blur", ev);
                //* 触发表单blur相关校验
                emitter?.emit(define.name || "", "blur");
            }
        },

        //* Input获取焦点事件
        focus: (ev?: FocusEvent | Event) => {
            //* 当ev不存在时, 触发Input获取焦点
            if (!ev) return nodes.main.value?.blur();
            else {
                //* 显示候选项
                utils.show();

                //* 触发focus回调
                emits("focus", ev);
            }
        },

        //* 清空事件
        clear: () => {
            emits("update:modelValue", "");
            emits("clear");
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

            console.log(define.modelValue, target.value);

            //* 触发v-model变更和input回调
            emits("update:modelValue", target.value);
            emits("input", ev as InputEvent);
        },

        //* Input触发回车事件
        enter: (ev: KeyboardEvent | Event) => {
            emits("enter", ev);
        },

        //* Input触发change事件
        change: (ev: Event) => {
            //* 触发change回调
            emits("change", ev);
            //* 触发表单change相关校验
            emitter?.emit(define.name || "", "change");
        },
    };

    //* 计算属性
    const computeds = {
        //* 禁用状态
        disabled: computed(() => define.loading || define.disabled),

        //* 组件类
        className: computed(() => {
            //* 初始化数据
            const className: string[] = [];
            //* 判断是否需要添加size类名
            if (define.size != "default") className.push(`ui-${define.size}`);
            //* 判断是否需要添加clearable类名
            if (define.clearable) className.push("ui-clearable");
            //* 判断候选项是否处于展示状态
            if (refs.visible.value && define.candidates?.length) className.push("ui-candidates-show");
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
        main: {
            type: define.type,
            disabled: computeds.disabled,
            readonly: define.readonly,
            maxlength: define.maxlength,
            placeholder: define.placeholder,
            autocomplete: define.autocomplete,
        },

        //* 候选项容器
        body: {
            class: define.classExtraName || "",
            style: {
                zIndex: define.zIndex,
            },
        },

        //* 容器
        container: {
            class: computeds.className,
            style: {
                width: utility.isNumber(define.width) ? define.width + "px" : define.width,
            },
        },

        //* 候选项列表
        candidates: {
            style: {
                maxHeight: define.height + "px",
            },
        },
    });

    //* 响应事件
    const ons = {
        //* 主体
        main: {
            change: methods.change,
            focus: methods.focus,
            input: methods.input,
            blur: methods.blur,
        },

        //* 候选项
        candidate: (option: UiTypes.candidate) => {
            return {
                mousedown: (ev: Event) => {
                    emits("update:modelValue", option.value);
                    emits("select", ev, option);
                    emits("change", ev);
                    if (emitter?.emit) {
                        emitter.emit(define.name || "", "change");
                    }
                },
            };
        },

        //* 动画函数
        animation: animations.selector(define.animation, {
            beforeEnter: () => emits("before-enter"),
            beforeLeave: () => emits("before-leave"),
            afterEnter: () => emits("after-enter"),
            afterLeave: () => emits("after-leave"),
        }),
    };

    return { ons, refs, binds, nodes, methods, computeds, animations };
};
