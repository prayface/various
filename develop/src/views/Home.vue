<template>
    <UiTableMerge
        :option="option"
        :data="currData"
        :spacing="0"
        :border="2"
        noData="暂无数据"
        @sort="switchSort"
        @merge="mergeCells"
        @rowClass="rowClass">
        <template #year="props"> {{ props.data.year }}年</template>
    </UiTableMerge>
</template>

<script setup>
import { ref, computed, triggerRef } from "vue";

//* 表格配置
const option = [
    { key: "name", name: "名字", align: "center" },
    { key: "year", name: "年份", align: "left", slot: "year", sort: "year", width: "200" },
    { key: "price", name: "价格", align: "center" },
    {
        key: "inventory",
        name: "库存",
        align: "center",
        children: [
            { key: "inventory1", name: "库存1", align: "center", sort: "inventory1" },
            { key: "inventory2", name: "库存2", align: "center" },
        ],
    },
    {
        key: "detail",
        name: "描述",
        align: "center",
        children: [
            { "key": "detail1", "name": "描述1", "align": "end", "max-width": "400" },
            {
                key: "detail2",
                name: "描述2",
                align: "left",
                width: "400",
            },
        ],
    },
];

const data = [
    {
        name: "黄黄杯",
        year: "2023",
        price: "100",
        inventory1: "123000",
        inventory2: "123000",
        detail1: "detail1这是一个黄黄的杯子这是一个黄黄的杯子这不是一个黄黄的杯子",
        detail2: `<ul><li>12346789</li><li>detail1这是一个黄黄的杯子这是一个黄黄的杯子这不是一个黄黄的杯子</li></ul>`,
    },
    {
        name: "红红杯",
        year: "2000",
        price: "1",
        inventory1: "999000",
        inventory2: "999000",
        detail1: "这是一个红红的杯子",
        detail2: "这是一个红红的杯子",
    },
    {
        name: "红红杯",
        year: "2001",
        price: "1",
        inventory1: "999000",
        inventory2: "999000",
        detail1: "这是一个红红的杯子",
        detail2: "这是一个红红的杯子",
    },
    {
        name: "蓝蓝杯",
        year: "2023",
        price: "100",
        inventory1: "5000000",
        inventory2: "5000000",
        detail1: "这是一个蓝蓝红的杯子",
        detail2: "这是一个蓝蓝的杯子",
    },
    {
        name: "不锈钢钢钢",
        year: "1890",
        price: "9999",
        inventory1: "10",
        inventory2: "10",
        detail1: "这是一个不锈钢钢钢杯子",
        detail2: "这是一个不锈钢钢钢杯子",
    },
    {
        name: "拉菲",
        year: "1982",
        price: "999",
        inventory1: "1",
        inventory2: "1",
        detail1: "这是一个拉菲",
        detail2: "这是一个拉菲",
    },
    {
        name: "拉菲",
        year: "1982",
        price: "999",
        inventory1: "1",
        inventory2: "1",
        detail1: "这是一个拉菲",
        detail2: "这是一个拉菲",
    },
    {
        name: "拉菲",
        year: "1982",
        price: "999",
        inventory1: "1",
        inventory2: "1",
        detail1: "这是一个拉菲",
        detail2: "这是一个拉菲",
    },
    {
        name: "拉菲",
        year: "1982",
        price: "999",
        inventory1: "1",
        inventory2: "1",
        detail1: "这是一个拉菲",
        detail2: "这是一个拉菲",
    },
];

const sortKey = ref();
const sortValue = ref();
const switchSort = (key, value) => {
    sortKey.value = key;
    sortValue.value = value;
};

const currData = computed(() => {
    if (sortKey.value && ["asc", "desc"].includes(sortValue.value)) {
        return data.sort((a, b) => {
            if (sortValue.value == "asc") {
                return b[sortKey.value] - a[sortKey.value];
            } else {
                return a[sortKey.value] - b[sortKey.value];
            }
        });
    } else {
        return data;
    }
});

//* 获取需要合并第一列的数量
const spanMethodOption = ref({});
data.map((item) => {
    if (spanMethodOption.value[item.name]) {
        spanMethodOption.value[item.name] += 1;
        item.isShow = false;
    } else {
        spanMethodOption.value[item.name] = 1;
        item.isShow = true;
    }
    return item;
});

//* 合并单元格 自定义合并规则函数
const mergeCells = ({ row, column, rowIndex, columnIndex }, callback) => {
    //* 合并规则：第一列name相同单元格合并
    if (columnIndex === 0) {
        if (row.isShow) {
            callback &&
                callback({
                    rowspan: spanMethodOption.value[currData.value[rowIndex].name], //合并的行数
                    colspan: 1, //合并的列数，设为0则直接不显示
                });
        } else {
            callback && callback({ rowspan: 0, colspan: 0 });
        }
    }
    //* 指定合并单元格
    // if (rowIndex == 1 && columnIndex === 0) {
    //     callback({ rowspan: 2, colspan: 1 });
    // } else if (rowIndex == 2 && columnIndex === 0) {
    //     callback({ rowspan: 0, colspan: 0 });
    // }
};

triggerRef(mergeCells);

//* 隔行背景色
const rowClass = ({ row, rowIndex }, callback) => {
    var arr = [];
    Object.keys(spanMethodOption.value).forEach((item, index) => {
        if (row.name == item) {
            if (index % 2 === 0) {
                arr.push("ui-table-row-even");
            } else {
                arr.push("ui-table-row-odd");
            }
        }
    });
    callback && callback(arr);
};
</script>

<style lang="less" scoped></style>
