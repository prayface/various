import { ref, Ref } from "vue";
import { UiTypes } from "@various/constants";
import { UiFormItemProps, UiFormRule, UiFormVerifyResult } from "../form";

export default (define: UiFormItemProps, rules: { [name: string]: UiFormRule[] }, data: { [name: string]: any }, status: Ref<UiTypes.type>) => {
    //* 定时器初始化
    const timer = ref<NodeJS.Timer | undefined>();
    const visible = ref<boolean>(false);
    const content = ref<string>("");

    //* 校验提示显示函数
    const show = (value: string, type?: UiTypes.type) => {
        status.value = type || "info";
        visible.value = true;
        content.value = value;
    };

    //* 校验提示隐藏函数
    const hidden = () => {
        visible.value = false;
        status.value = "info";
    };

    //* 校验提示触发函数
    const trigger = (value: string, type?: UiTypes.type) => {
        //* 1. 未触发校验提示则直接显示
        if (!visible.value) show(value, type);
        //* 2. 当前为触发校验提示状态时, 先隐藏旧的校验提示后在触发新的校验提示
        hidden();
        timer.value && clearTimeout(timer.value);
        timer.value = setTimeout(() => {
            timer.value = undefined;
            status.value = type || "info";
            visible.value = true;
            content.value = value;
        }, 200);
    };

    //* 校验函数
    const verify = async (type: string) => {
        //* 1. 数据初始化
        const verifys: (Promise<UiFormVerifyResult> | UiFormVerifyResult)[] = []; // 校验列表
        const rule = rules[define.prop as string].filter((value) => value.trigger == type || type == "all"); // 筛选校验规则
        //* 2. 检测是否存在校验规则
        if (!rule.length) return;
        //* 3. 遍历生成校验列表
        rule.forEach((value) => verifys.push(value.verify(data)));
        //* 4. 获取校验结果
        const result = await Promise.all(verifys);
        //* 5. 获取校验失败列表
        const error = result.filter((value) => !value.verify);
        //* 6. 根据是否存在校验失败选择触发提示or隐藏提示
        if (error.length) {
            trigger(error[0].message || "", error[0].type || "error");
        } else {
            hidden();
        }
    };

    return { timer, visible, content, verify, hidden, trigger };
};
