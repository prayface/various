import { SetupContext, ref } from "vue";
import { UiTableProps, UiTableEmits, UiTableOption } from "../index";

export const useComposable = (define: UiTableProps, emit: SetupContext<typeof UiTableEmits>["emit"]) => {
    //* 响应式变量
    const refs = {
        //* 排序配置
        sortKey: ref<string>(),
        sortValue: ref<string>(),

        //* 单选配置
        ratioValue: ref<string>(),

        //* 嵌套表格开启列表
        childrens: ref<string[]>([]),
    };

    //* 函数列表
    const methods = {
        //* 切换排序
        changeSort: (data: UiTableOption) => {
            //* 切换已排序字段时的处理, 其余都为切换未排序字段
            if (refs.sortKey.value == data.key) {
                //* 排序为升序时, 切换为降序, 其余都为取消排序
                if (refs.sortValue.value == "asc") {
                    refs.sortValue.value = "desc";
                } else {
                    refs.sortKey.value = undefined;
                    refs.sortValue.value = undefined;
                }
            } else {
                refs.sortKey.value = data.key;
                refs.sortValue.value = "asc";
            }

            //* 响应排序事件
            emit("sort", refs.sortKey.value, refs.sortValue.value);
        },

        //* 切换单选
        changeRatio: (data: any) => {
            if (define.ratio && define.ratioIndex && refs.ratioValue.value != data[define.ratioIndex]) {
                //* 变量修改
                refs.ratioValue.value = data[define.ratioIndex];

                //* 响应单选事件
                emit("ratio", data);
            }
        },

        //* 获取排序状态
        receiveSort: (data: UiTableOption, value: string) => {
            if (refs.sortKey.value == data.key && refs.sortValue.value == value) {
                return "ui-active";
            } else {
                return "";
            }
        },

        //* 获取单选状态
        receiveRatio: (data: any) => {
            if (define.ratio && define.ratioIndex && refs.ratioValue.value == data[define.ratioIndex]) {
                return "ui-active";
            } else {
                return "";
            }
        },

        //* 获取嵌套表格状态
        receiveChildren: (data: any) => {
            if (define.children && define.childrenIndex && refs.childrens.value.includes(data[define.childrenIndex])) {
                return true;
            } else {
                return false;
            }
        },

        //* 获取嵌套表格图标显示状态
        receiveChildrenIcon: (data: any) => {
            if (define.children && define.childrenIndex && data.key == define.childrenIndex) {
                return true;
            } else {
                return false;
            }
        },

        //* 获取嵌套表格图标名称
        receiveChildrenIconName: (data: any) => {
            if (define.children && define.childrenIndex && refs.childrens.value.includes(data[define.childrenIndex])) {
                return "close-solid-border";
            } else {
                return "open-solid-border";
            }
        },
    };

    return { refs, methods };
};
