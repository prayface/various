import { ref, computed } from "vue";
import { data1, option1 } from "./data.json";

export const useConposable = () => {
    //* 响应式变量
    const refs = {
        sortKey: ref(""),
        sortValue: ref(""),
    };

    //* 函数列表
    const methods = {
        sort: (key, value) => {
            refs.sortKey.value = key;
            refs.sortValue.value = value;
        },
    };

    //* 计算属性
    const computeds = {
        data: computed(() => {
            return data1.sort((a, b) => {
                if (refs.sortKey.value) {
                    if (refs.sortValue.value == "asc") {
                        return b[refs.sortKey.value] - a[refs.sortKey.value];
                    }

                    if (refs.sortValue.value == "desc") {
                        return a[refs.sortKey.value] - b[refs.sortKey.value];
                    }
                }
            });
        }),
    };

    return { refs, methods, computeds };
};
