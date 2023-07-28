import { SetupContext, computed, inject } from "vue";
import { UiRadioEmits, UiRadioProps } from "./radio";
import { UiRadioGroupInjectionKey } from "./radio-group";

export default class {
    radioGroup;
    computeds;
    methods;

    constructor(define: UiRadioProps, emit: SetupContext<typeof UiRadioEmits>["emit"]) {
        //* 获取父组件注入函数
        this.radioGroup = inject(UiRadioGroupInjectionKey, undefined);
        this.computeds = this.#useComputeds(define);
        this.methods = this.#useMethods(define, emit);
    }

    #useMethods(define: UiRadioProps, emit: SetupContext<typeof UiRadioEmits>["emit"]) {
        return {
            trigger: (ev: Event) => {
                //* 1. 获取Input节点
                const el = ev.target as HTMLInputElement;

                //* 2. 响应事件操作
                emit("update:modelValue", el.value || "");
                emit("change", ev);

                //* 3. 响应父组件事件
                this.radioGroup && this.radioGroup.change(define.value);
            },
        };
    }

    #useComputeds(define: UiRadioProps) {
        //? 是否已被选中
        const checked = computed(() => {
            if (this.radioGroup?.define.modelValue == define.value) return true;
            else {
                return define.modelValue == define.value;
            }
        });

        //? 主体类名
        const className = computed(() => {
            //* 1. 初始化返回值
            const result: string[] = [];

            //* 3. 检测是否被激活
            if (checked.value) result.push("ui-active");

            return result.join(" ");
        });

        return {
            checked,
            className,
        };
    }
}
