//* Vue
import { SetupContext, nextTick, reactive, computed, inject, ref } from "vue";
//* 组件属性
import type { UiRegionSelectorProps, UiRegionSelectorEmits, UiRegionSelectorOption } from "./index";
import { options } from "./options";
//* 公共属性
import { UiFormEmitterKey } from "@various/constants";
//* 公共函数
import { node, utility, dispose, animations } from "@various/utils";

export const useComposable = (define: UiRegionSelectorProps, emits: SetupContext<typeof UiRegionSelectorEmits>["emit"]) => {
    //* 初始化mitt
    const emitter = inject(UiFormEmitterKey, undefined);

    //* 响应式变量
    const refs = {
        visible: ref<boolean>(false),
        result: ref<string[]>([]),
        data: ref<UiRegionSelectorOption[]>([]),
    };

    const nodes = {
        body: ref<HTMLElement>(),
        container: ref<HTMLElement>(),
    };

    //* 函数列表
    const methods = {
        //* 候选菜单选择事件
        select: (region: UiRegionSelectorOption) => {
            refs.result.value.push(region.name);
            emits("update:modelValue", refs.result.value);
            if (!region.children?.length) {
                emits("change");
                emitter?.emit(define.name || "", "change");
                if (refs.visible.value) {
                    refs.visible.value = false;
                }
            } else {
                //* 数据更新
                refs.data.value = region.children.map((value) => value);
                //* 回到顶部
                nodes.body.value?.querySelector(".ui-form-candidate-content")?.scrollTo({ top: 0 });
            }
        },

        //* 候选框隐藏事件
        hidden: (ev?: Event) => {
            if (!nodes.container.value || !nodes.body.value) return;
            else {
                //* 检测点击点是否在选择器内, 若在选择器内则无需关闭选择器并重新注册一次性点击事件
                const target = ev?.target as HTMLElement | undefined;
                if (target && (node.includes(target, nodes.container.value) || node.includes(target, nodes.body.value))) {
                    addEventListener("click", methods.hidden, { capture: true, once: true });
                } else {
                    refs.visible.value = false;
                }
            }
        },

        //* 候选框显示事件
        show: (region?: string) => {
            //* 判断选择框是否处于异常状态
            if (define.readonly || define.disabled || define.loading) return;
            //* 显示or隐藏候选菜单
            if (region) refs.visible.value = true;
            else {
                refs.visible.value = !refs.visible.value;
            }

            //* 判断候选项是否已被激活
            if (refs.visible.value) {
                //* 区域初始化
                const index = region ? computeds.regions.value.findIndex((value) => value.name == region) : computeds.regions.value.length;
                const regions = computeds.regions.value.filter((value, key) => {
                    return key < index && value.children?.length;
                });

                //* 候选项更新
                refs.data.value = regions.slice(-1)[0]?.children || options.regions;
                refs.result.value = regions.map((value) => value.name);

                //* 显示候选项
                nextTick(() => {
                    if (!nodes.container.value || !nodes.body.value) return;
                    else {
                        //* 回到顶部
                        nodes.body.value?.querySelector(".ui-form-candidate-content")?.scrollTo({ top: 0 });
                        //* 将内容添加到视图容器中
                        node.append(document.body, nodes.body.value);
                        //* 根据配置计算当前窗口位置
                        dispose.boundary.relativeContainerBody(
                            { container: nodes.container.value, view: nodes.body.value },
                            {
                                direction: "bottom",
                                height: define.height,
                                offset: 4,
                                width: nodes.container.value?.offsetWidth || 0,
                                align: "start",
                            }
                        );

                        //* 隐藏事件
                        addEventListener("click", methods.hidden, { capture: true, once: true });
                    }
                });
            }
        },
    };

    //* 计算属性
    const computeds = {
        //* 组件值
        regions: computed(() => {
            //* 数据初始化
            const result: UiRegionSelectorOption[] = [];

            //* 获取一级省市区
            const region_lv1 = options.regions.find((value) => value.name == define.modelValue?.[0]);
            if (region_lv1) result.push({ name: region_lv1.name, children: region_lv1.children });
            else {
                return [{ name: "请选择省/直辖市" }];
            }

            //* 获取二级省市区
            const region_lv2 = region_lv1.children.find((value) => value.name == define.modelValue?.[1]);
            if (region_lv2) {
                result.push({ name: region_lv2.name, children: region_lv2.children });
                if (!region_lv2.children.length) {
                    return result;
                }
            } else {
                return [...result, { name: "请选择市/区" }];
            }

            //* 获取三级区/县/街道
            const region_lv3 = region_lv2.children.find((value) => value.name == define.modelValue?.[2]);
            if (region_lv3) result.push({ name: region_lv3.name, children: [] });
            else {
                return [...result, { name: "请选择区/县/街道" }];
            }

            return result;
        }),

        //* 禁用状态
        disabled: computed(() => define.loading || define.disabled),

        //* 组件类
        className: computed(() => {
            //* 初始化数据
            const className: string[] = [];
            //* 判断候选项是否处于展示状态
            if (refs.visible.value) className.push("ui-form-selector");
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
    };

    return { ons, refs, nodes, binds, methods, computeds };
};
