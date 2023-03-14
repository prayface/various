import { Emitter } from "mitt";
import { computed, Ref } from "vue";
import { UiEmitFn } from "@various/constants";
import { UiTextareaProps, UiTextareaEmits } from "./textarea";

//! 导出函数
export default class Composable {
    static refs: { [name: string]: any };
    static main: Ref<HTMLElement>;
    static control: Ref<HTMLTextAreaElement>;

    constructor(args: { [name: string]: any }) {
        Composable.refs = args.refs;
        Composable.main = args.main;
        Composable.control = args.control;
    }

    static init() {
        // 判断是否允许向下执行
        if (!this.main.value || !this.control.value) return;
        if (this.control.value.scrollHeight > this.main.value.clientHeight) {
            this.refs.ratio = (this.main.value.clientHeight - 2) / this.control.value.scrollHeight;
            this.refs.size = this.refs.ratio * (this.main.value.clientHeight - 2);
            this.refs.offset = this.control.value.scrollTop * this.refs.ratio;
        } else {
            this.refs.size = 0;
        }
    }

    //* 主体响应事件声明
    static useOnHanlder(define: UiTextareaProps, emits: UiEmitFn<typeof UiTextareaEmits>, emitter?: Emitter<any>) {
        return {
            click: (ev: PointerEvent | Event) => emits("click", ev),
            focus: (ev: FocusEvent | Event) => emits("focus", ev),
            change: (ev: Event) => {
                emits("change", ev);
                emitter?.emit(define.name || "", "change");
            },
            input: (ev: InputEvent) => {
                const target = ev.target as HTMLInputElement;
                emits("update:modelValue", target.value);
                emits("input", ev);
                this.init();
            },
            blur: (ev: FocusEvent | Event) => {
                emits("blur", ev);
                emitter?.emit(define.name || "", "blur");
            },
            wheel: (ev: WheelEvent) => {
                const node = ev.target as HTMLTextAreaElement;
                node.scrollTo({ top: node.scrollTop + ev.deltaY });
                this.refs.offset = this.control.value.scrollTop * this.refs.ratio;
            },
        };
    }

    //* 静态属性声明
    static useComputeds(define: UiTextareaProps) {
        return {
            //* 标签响应式属性
            attrs: computed(() => {
                // 初始化样式列表
                const style: { [name: string]: any } = {};
                // 数据返回
                if (define.height) style.height = define.height + "px";
                return {
                    rows: define.rows,
                    style: style,
                    value: define.modelValue,
                    disabled: define.disabled,
                    readonly: define.readonly,
                    placeholder: define.placeholder,
                };
            }),

            //* 类名
            className: computed(() => {
                // 初始化输出
                const result: string[] = [];
                // 判断是否是禁用或只读状态
                if (define.disabled) result.push("ui-disabled-status");
                else if (define.readonly) result.push("ui-readonly-status");
                // 判断是否需要添加size类名
                if (define.size != "default") result.push(`ui-${define.size}`);
                // 判断是否需要添加clearable类名
                if (define.clearable) result.push("ui-clearable");

                return result.join(" ");
            }),

            //* 样式
            styles: computed(() => {
                if (define.width) return { width: define.width + "px" };
                else return {};
            }),
        };
    }

    //* 事件声明
    static useMethods(define: UiTextareaProps, emits: UiEmitFn<typeof UiTextareaEmits>, emitter?: Emitter<any>) {
        return {
            init: () => this.init(),
            clear: () => {
                emits("update:modelValue", "");
                emits("clear", "clear");
                emitter?.emit(define.name || "", "change");
            },
            onMousedown: (ev: MouseEvent) => {
                const offset = this.refs.offset;
                const size = ev.y;
                document.onselectstart = () => false;
                document.onmousemove = (ev: MouseEvent) => {
                    this.refs.offset = offset + ev.y - size;
                    if (this.refs.offset < 0) this.refs.offset = 0;
                    else if (this.refs.offset > this.main.value.clientHeight - this.refs.size - 2) {
                        this.refs.offset = this.main.value.clientHeight - this.refs.size - 2;
                    }

                    this.control.value.scrollTo({ top: this.refs.offset / this.refs.ratio });
                };

                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
        };
    }
}
