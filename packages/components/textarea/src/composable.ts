import { Emitter } from "mitt";
import { computed } from "vue";
import { UiEmitFn } from "@various/constants";
import { UiTextareaProps, UiTextareaEmits } from "./textarea";

export type UiTextareaConstructorRefs = {
    main?: HTMLElement;
    container?: HTMLElement;
    scrollsize: number;
    ratio: number;
    offset: number;
    isMousedown: boolean;
};

export default class {
    timer?: NodeJS.Timer;
    refs;
    handles;
    methods;
    computeds;

    constructor(refs: UiTextareaConstructorRefs, define: UiTextareaProps, emit: UiEmitFn<typeof UiTextareaEmits>, emitter?: Emitter<any>) {
        this.refs = refs;
        this.handles = this.#useOnHandles(define, emit, emitter);
        this.methods = this.#useMethods(define, emit, emitter);
        this.computeds = this.#useComputeds(define);
    }

    //* 主体响应事件声明
    #useOnHandles(define: UiTextareaProps, emit: UiEmitFn<typeof UiTextareaEmits>, emitter?: Emitter<any>) {
        return {
            click: (ev: PointerEvent | Event) => emit("click", ev),
            focus: (ev: FocusEvent | Event) => emit("focus", ev),
            change: (ev: Event) => {
                emit("change", ev);
                emitter?.emit(define.name || "", "change");
            },
            input: (ev: InputEvent) => {
                const target = ev.target as HTMLInputElement;
                emit("update:modelValue", target.value);
                emit("input", ev);
                this.methods.init();
            },
            blur: (ev: FocusEvent | Event) => {
                emit("blur", ev);
                emitter?.emit(define.name || "", "blur");
            },
            wheel: (ev: WheelEvent) => {
                this.timer && clearTimeout(this.timer);
                if (define.disabled || define.loading) return
                if (!this.refs.main || !this.refs.container) return;
                if (this.refs.container.scrollHeight > this.refs.main.clientHeight) {
                    const node = ev.target as HTMLTextAreaElement;
                    node.scrollTo({ top: node.scrollTop + ev.deltaY / 4, behavior: "smooth" });
                    this.timer = setTimeout(() => {
                        if (!this.refs.container) return
                        this.refs.offset = this.refs.container?.scrollTop * this.refs.ratio;
                    }, 80);
                    this.refs.isMousedown = false;
                    ev.preventDefault();
                }
            },
        };
    }

    //* 静态属性声明
    #useComputeds(define: UiTextareaProps) {
        //* 当前组件状态
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
        return {
            status: status,
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

            //* 样式
            style: computed(() => {
                if (define.width) return { width: define.width + "px" };
                else return {};
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

                return result.join(" ");
            }),

            //* 滚动条滑块样式
            scrollbarStyle: computed(() => {
                return {
                    height: this.refs.scrollsize + "px",
                    transform: `translateY(${this.refs.offset}px)`,
                    transition: `all ${this.refs.isMousedown ? 0 : 0.2}s`
                };
            }),
        };
    }

    //* 事件声明
    #useMethods(define: UiTextareaProps, emit: UiEmitFn<typeof UiTextareaEmits>, emitter?: Emitter<any>) {
        return {
            init: () => {
                // 判断是否允许向下执行
                if (define.disabled || define.loading) return
                if (!this.refs.main || !this.refs.container) return;
                if (this.refs.container.scrollHeight > this.refs.main.clientHeight) {

                    this.refs.ratio = (this.refs.main.clientHeight - 2) / (this.refs.container.scrollHeight + (this.refs.main.clientHeight - this.refs.container.clientHeight));
                    // this.refs.ratio = (this.refs.main.clientHeight - 2) / (this.refs.container.scrollHeight);
                    this.refs.scrollsize = this.refs.ratio * (this.refs.main.clientHeight - 2);
                    this.refs.offset = this.refs.container.scrollTop * this.refs.ratio;
                } else {
                    this.refs.scrollsize = 0;
                }
            },

            clear: () => {
                emit("update:modelValue", "");
                emit("clear", "clear");
                emitter?.emit(define.name || "", "change");
            },

            onMousedown: (ev: MouseEvent) => {
                const offset = this.refs.offset;
                const size = ev.y;
                document.onselectstart = () => false;
                document.onmousemove = (ev: MouseEvent) => {
                    this.refs.isMousedown = true;
                    this.refs.offset = offset + ev.y - size;
                    if (this.refs.offset < 0) this.refs.offset = 0;
                    else if (this.refs.main && this.refs.offset > this.refs.main.clientHeight - this.refs.scrollsize - 2) {
                        this.refs.offset = this.refs.main.clientHeight - this.refs.scrollsize - 2;
                    }

                    this.refs.container?.scrollTo({ top: this.refs.offset / this.refs.ratio });
                };

                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
        };
    }
}
