import { Emitter } from "mitt";
import { computed } from "vue";
import { UiEmitFn } from "@various/constants";
import { dispose } from "@various/utils";
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
                // 禁用状态取消页面默认滚动
                if (["loading", "disabled"].includes(this.computeds.status.value.name)) {
                    ev.preventDefault();
                }
            },
            scroll: (ev: WheelEvent) => {
                // 判断是否存在容器或者处于禁用状态
                if (!this.refs.main || !this.refs.container) return;
                if (this.refs.container.scrollHeight > this.refs.container.clientHeight) {
                    // 判断是否存在滚动条
                    const node = ev.target as HTMLTextAreaElement;
                    this.refs.offset = node.scrollTop * this.refs.ratio;
                    this.refs.isMousedown = false;
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
                //* 初始化输出
                const result: string[] = [];
                //* 判断是否是禁用或只读状态
                if (status.value.name == "disabled") result.push("ui-disabled-status");
                else if (status.value.name == "readonly") result.push("ui-readonly-status");
                else if (status.value.name == "loading") result.push("ui-loading-status");
                //* 判断是否需要添加size类名
                if (define.size != "default") result.push(`ui-${define.size}`);

                return result.join(" ");
            }),

            //* 滚动条滑块样式
            scrollbarStyle: computed(() => {
                return {
                    height: this.refs.scrollsize + "px",
                    transform: `translateY(${this.refs.offset}px)`,
                    transition: `all ${this.refs.isMousedown ? 0 : 0.1}s`,
                };
            }),
        };
    }

    //* 事件声明
    #useMethods(define: UiTextareaProps, emit: UiEmitFn<typeof UiTextareaEmits>, emitter?: Emitter<any>) {
        return {
            init: () => {
                // 判断是否允许向下执行
                if (!this.refs.main || !this.refs.container) return;
                // 判断是否需要显示滚动条, 并计算滚动比例
                if (this.refs.container.scrollHeight > this.refs.container.clientHeight) {
                    // 内容滚动距离转滚动条滑块滚动距离的转换比例
                    this.refs.ratio = (this.refs.main.clientHeight - 2) / this.refs.container.scrollHeight;
                    // 滚动条滑块位置计算
                    this.refs.offset = this.refs.container.scrollTop * this.refs.ratio;
                    // 滚动条滑块尺寸计算
                    this.refs.scrollsize = this.refs.ratio * this.refs.container.clientHeight;
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
                    if (!this.refs.main || !this.refs.container) return;
                    this.refs.offset = dispose.elementOptionBoundary(offset + ev.y - size, this.refs.scrollsize, 0, this.refs.main.clientHeight - 2);
                    this.refs.isMousedown = true;
                    this.refs.container.scrollTo({ top: this.refs.offset / this.refs.ratio });
                };

                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
        };
    }
}
