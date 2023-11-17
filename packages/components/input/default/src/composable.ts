//* 按需导入插件
import { SetupContext, nextTick, computed, inject, ref } from "vue";
import { gsap } from "gsap";
//* 组件属性
import { UiInputProps, UiInputEmits } from "../index";
//* 公共属性
import { UiTypes, UiFormEmitterKey } from "@various/constants";
//* 公共函数
import { node, utility, dispose } from "@various/utils";

export const useComposable = (define: UiInputProps, emits: SetupContext<typeof UiInputEmits>["emit"]) => {
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
                    dispose.boundary.relativeContainerBody(
                        { container: refs.container.value, triangle: refs.triangle.value, view: refs.candidate.value },
                        {
                            direction: "bottom",
                            offset: 8,
                            height: define.height,
                            width: refs.container.value?.offsetWidth || 0,
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
            if (!ev) return refs.main.value?.blur();
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
            if (!ev) return refs.main.value?.blur();
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

        //* 候选项选择事件
        switchCandidate: (data: UiTypes.candidate, ev: Event) => {
            emits("update:modelValue", data.value);
            emits("select", ev, data);
            emits("change", ev);
            if (emitter?.emit) {
                emitter.emit(define.name || "", "change");
            }
        },
    };

    //* 计算属性
    const computeds = {
        //* 输入框当前状态
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

    //* 属性列表
    const attrs = {
        //* 输入框容器属性
        attrContainer: computed(() => {
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

        //* 输入框本体属性
        attrMain: computed(() => {
            const result: any = {
                type: define.type,
                value: define.modelValue,
                disabled: ["disabled", "loading"].includes(computeds.status.value.name),
                readonly: computeds.status.value.name == "readonly",
                placeholder: define.placeholder,
                autocomplete: define.autocomplete,
            };

            if (define.maxlength) result.maxlength = define.maxlength;

            return result;
        }),

        //* 候选项外层窗口属性
        attrCandidates: computed(() => {
            return {
                class: define.classExtraName || "",
                style: {
                    zIndex: define.zIndex,
                },
            };
        }),

        //* 候选项容器属性
        attrCandidatesContent: computed(() => {
            return {
                style: {
                    maxHeight: define.height + "px",
                },
            };
        }),
    };

    //* 事件列表
    const events = {
        //* 输入框主体事件
        eventMain: {
            change: methods.change,
            focus: methods.focus,
            input: methods.input,
            blur: methods.blur,
        },
    };

    //* 动态计算列表
    const dynamics = {
        //* 动态计算候选项类名
        useCandidateName: (value: string) => {
            if (define.modelValue == value) return "ui-active";
            else {
                return "";
            }
        },
    };

    //* 动画函数列表
    const animations = {
        aniEnterBefore: (el: Element) => define.animation && gsap.set(el, { height: 0, opacity: 0 }),
        aniEnter: (el: Element, callBack: () => void) => {
            if (define.animation) {
                gsap.to(el, { height: "auto", opacity: 1, duration: 0.2, onComplete: () => callBack && callBack() });
            } else {
                callBack && callBack();
            }
        },
        aniLeave: (el: Element, callBack: () => void) => {
            if (define.animation) {
                gsap.to(el, { height: 0, opacity: 0, duration: 0.2, onComplete: () => callBack && callBack() });
            } else {
                callBack && callBack();
            }
        },
    };

    return { refs, attrs, events, methods, dynamics, computeds, animations };
};
