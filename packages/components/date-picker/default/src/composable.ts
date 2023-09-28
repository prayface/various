//* 插件
import { ref, inject, computed, nextTick, SetupContext } from "vue";
import { gsap } from "gsap";

//* 公共属性
import { UiFormEmitterKey } from "@various/constants";

//* 工具函数
import { node, utility, dispose } from "@various/utils";

//* 组件属性
import { UiDatePickerProps, UiDatePickerEmits } from "../index";
import type { ModuleUpdateData } from "./types";

//* 组件引入
import PickerDate from "../components/date/index.vue";
import PickerMonth from "../components/month/index.vue";

type ComponentNodeType = InstanceType<typeof PickerDate> | InstanceType<typeof PickerMonth>;

export const useComposable = (define: UiDatePickerProps, emits: SetupContext<typeof UiDatePickerEmits>["emit"]) => {
    //* 初始化mitt
    const emitter = inject(UiFormEmitterKey, undefined);

    //* 响应式变量
    const refs = {
        date: ref<Date>(), //* 临时的日期对象
        mode: ref<string>(define.mode), //* 临时的窗口类型
        visible: ref<boolean>(false), //* 控制变量
    };

    //* 响应式节点变量
    const nodes = {
        componentNode: ref<ComponentNodeType>(), //* 候选项组件节点
        candidateNode: ref<HTMLElement>(), //* 候选项容器节点
        containerNode: ref<HTMLElement>(), //* 时间选择器节点
    };

    //* 计算属性
    const computeds = {
        //* 输入框动态属性
        attrs: computed(() => {
            return {
                value: define.modelValue,
                placeholder: define.placeholder,
            };
        }),

        //* 组件容器样式
        style: computed(() => {
            //* 宽度处理
            if (utility.isNumber(define.width)) return { width: define.width + "px" };
            else if (define.width) {
                return { width: define.width };
            } else {
                return {};
            }
        }),

        //* 组件容器类名
        className: computed(() => {
            //* 初始化输出列表
            const result: string[] = [];

            //* 判断是否需要添加size类名
            if (define.size != "default") result.push(`ui-${define.size}`);
            //* 判断是否需要添加clearable类名
            if (define.modelValue) result.push(`ui-clearable`);
            //* 判断是否需要添加ui-active类名
            if (refs.visible.value) result.push("ui-active");

            return result.join(" ");
        }),

        //* 候选窗口动态属性
        candidateAttrs: computed(() => {
            return {
                class: define.classExtraName,
                style: {
                    zIndex: define.zIndex,
                },
            };
        }),
    };

    //* 解析数据
    const analyzes = {
        //* 输入框的日期解析
        analyzeDate: computed(() => {
            const date = new Date(refs.date.value || define.modelValue || "");
            if (date.toString() == "Invalid Date") {
                return new Date();
            } else {
                return date;
            }
        }),

        //* 解析当前组件
        analyzeComponent: computed(() => {
            const mode = refs.mode.value || define.mode;
            if (mode == "month") return PickerMonth;
            else {
                return PickerDate;
            }
        }),
    };

    //* 函数列表
    const methods = {
        //* 显示函数
        show: () => {
            //* 检测窗口是否已开启
            if (refs.visible.value) return methods.hidden();

            //* 更新控制变量
            refs.visible.value = true;
            //* 下一帧进行候选项组件初始化
            nextTick(() => {
                console.log(define);
                //* 组件内容初始化
                nodes.componentNode.value?.init(analyzes.analyzeDate.value, new Date(define.modelValue || ""), { start: define.disabledDateStart, end: define.disabledDateEnd });
                //* 下一帧进行候选窗口的定位与时间挂载
                nextTick(() => {
                    //* 检测是否满足运行条件
                    if (!nodes.containerNode.value || !nodes.candidateNode.value) return;

                    //* 将内容添加到视图容器中
                    node.append(document.body, nodes.candidateNode.value);
                    //* 根据配置计算当前窗口位置
                    dispose.boundary.relativeContainerBody(nodes.containerNode.value, nodes.candidateNode.value, {
                        direction: "bottom",
                        offset: 8,
                        align: "center",
                    });

                    //* 隐藏事件
                    window.addEventListener("click", methods.hidden, true);
                });
            });
        },

        //* 清空函数
        clear: () => {
            //* 更新input value
            emits("update:modelValue", "");
            //* 响应input清空事件
            emits("clear");

            //* 响应表单事件
            if (emitter?.emit) {
                emitter.emit(define.name || "", "change");
            }

            //* 关闭候选窗口
            methods.hidden();
        },

        //* 隐藏函数
        hidden: (ev?: Event) => {
            //* 检测是否满足运行条件
            if (!nodes.containerNode.value || !nodes.candidateNode.value) return;

            //* 初始化数据
            const target = ev?.target as HTMLElement;

            //* 检测是否需要进行关闭候选菜单
            if (target && (node.includes(target, nodes.containerNode.value) || node.includes(target, nodes.candidateNode.value))) return;
            else {
                refs.visible.value = false;
                window.removeEventListener("click", methods.hidden);
            }
        },

        //* 响应候选窗口更新事件
        update: (mode: string, data: ModuleUpdateData) => {
            //* 更新日期
            utility.isNumber(data.day) && analyzes.analyzeDate.value.setDate(data.day);
            utility.isNumber(data.year) && analyzes.analyzeDate.value.setFullYear(data.year);
            utility.isNumber(data.month) && analyzes.analyzeDate.value.setMonth(data.month);

            //* 更新候选组件模式
            refs.mode.value = mode;
            //* 下一帧初始化组件
            nextTick(() => {
                nodes.componentNode.value?.init(analyzes.analyzeDate.value, new Date(define.modelValue || ""), { start: define.disabledDateStart, end: define.disabledDateEnd });
                //* 下一帧进行候选窗口的定位与时间挂载
                nextTick(() => {
                    //* 检测是否满足运行条件
                    if (!nodes.containerNode.value || !nodes.candidateNode.value) return;

                    //* 将内容添加到视图容器中
                    node.append(document.body, nodes.candidateNode.value);
                    //* 根据配置计算当前窗口位置
                    dispose.boundary.relativeContainerBody(nodes.containerNode.value, nodes.candidateNode.value, {
                        direction: "bottom",
                        offset: 8,
                        align: "center",
                    });
                });
            });
        },

        //* 响应候选窗口选择事件
        change: (data: ModuleUpdateData) => {
            //* 更新日期
            utility.isNumber(data.day) && analyzes.analyzeDate.value.setDate(data.day);
            utility.isNumber(data.year) && analyzes.analyzeDate.value.setFullYear(data.year);
            utility.isNumber(data.month) && analyzes.analyzeDate.value.setMonth(data.month);

            //* 检测是否选择完成
            if (define.mode == refs.mode.value) {
                //* 初始化时间数据
                const cYear = analyzes.analyzeDate.value.getFullYear();
                const cDate = analyzes.analyzeDate.value.getDate().toString().padStart(2, "0");
                const cMonth = (analyzes.analyzeDate.value.getMonth() + 1).toString().padStart(2, "0");

                //* 更新input value
                if (define.mode == "month") emits("update:modelValue", `${cYear}-${cMonth}`);
                else {
                    emits("update:modelValue", `${cYear}-${cMonth}-${cDate}`);
                }

                //* 响应时间选择事件
                emits("change");

                //* 响应表单事件
                if (emitter?.emit) {
                    emitter.emit(define.name || "", "change");
                }

                //* 关闭候选窗口
                methods.hidden();
            } else {
                methods.update(define.mode, {});
            }
        },
    };

    //* 动画函数
    const animations = {
        //* 入场前函数
        enterBefore: (node: Element) => {
            gsap.set(node, { opacity: 0, scaleY: 0.5 });
        },

        //* 入场函数
        enter: (node: Element, next: () => void) => {
            gsap.to(node, { duration: 0.2, opacity: 1, scaleY: 1, onComplete: () => next() });
        },

        //* 离场函数
        leave: (node: Element, next: () => void) => {
            gsap.to(node, { duration: 0.2, opacity: 0, scaleY: 0.8, onComplete: () => next() });
        },
    };

    return { refs, nodes, methods, computeds, analyzes, animations };
};
