import { UiEmitFn } from "@various/constants";
import { computed, inject } from "vue";
import { UiCheckboxEmits, UiCheckboxProps } from "./checkbox";
import { UiCheckboxGroupInjectionKey } from "./checkbox-group";

export default class {
    checkboxGroup;
    computeds;
    methods;

    constructor(define: UiCheckboxProps, emit: UiEmitFn<typeof UiCheckboxEmits>) {
        //* 获取父组件注入函数
        this.checkboxGroup = inject(UiCheckboxGroupInjectionKey, undefined);
        this.computeds = this.#useComputeds(define);
        this.methods = this.#useMethods(define, emit);
    }

    #useMethods(define: UiCheckboxProps, emit: UiEmitFn<typeof UiCheckboxEmits>) {
        return {
            trigger: (ev: Event) => {
                //* 1. 获取Input节点
                const el = ev.target as HTMLInputElement;

                //* 2. 响应事件操作
                emit("update:modelValue", el.checked || false);
                emit("change", ev);

                //* 3. 响应父组件事件
                this.checkboxGroup && this.checkboxGroup.change(define.value);
            },
        };
    }

    #useComputeds(define: UiCheckboxProps) {
        //? 是否已被选中
        const checked = computed(() => {
            if (this.checkboxGroup?.define.modelValue.includes(define.value)) return true;
            else return define.modelValue;
        });

        //? 是否禁用
        const disabled = computed(() => {
            if (define.disabled) return true;
            if (this.checkboxGroup) {
                //* 判断该多选框是否为已选中状态
                if (this.checkboxGroup.define.modelValue.includes(define.value)) {
                    //* 当已选中的数量达到最小数量时, 禁用已选中多选框取消
                    if (this.checkboxGroup.define.min && this.checkboxGroup.define.modelValue.length <= this.checkboxGroup.define.min) {
                        return true;
                    }
                } else {
                    //* 当已选中的数量达到最小数量时, 禁用未选中多选框选中
                    if (this.checkboxGroup.define.max && this.checkboxGroup.define.modelValue.length >= this.checkboxGroup.define.max) {
                        return true;
                    }
                }
            }
        });

        //? 主体类名
        const className = computed(() => {
            //* 1. 初始化返回值
            const result = [];

            //* 2. 检测是否被禁用
            if (disabled.value) result.push("ui-disabled-status");
            //* 3. 检测是否被激活
            if (checked.value) result.push("ui-active");

            return result.join(" ");
        });

        return {
            checked,
            disabled,
            className,
        };
    }
}
