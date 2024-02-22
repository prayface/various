<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>基本用法展示</p>
                <p>测试：<span>排序功能</span>与<span>数据更新</span></p>
            </div>
            <div class="content">
                <UiTable2 :option="option" :data="result" :height="400" @sort="onsort">
                    <template #children> 嵌套表格 </template>
                    <template #organ="{ data }">
                        <div class="organs">
                            <img v-for="value in data.organ" class="organ" :src="value" />
                        </div>
                    </template>
                </UiTable2>
            </div>
        </section>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";

const sort = reactive({ key: "", value: "" });
const data = ref([
    {
        name: "许丽",
        date: "2014-03-27",
        value: 1765.62,
        inventory: 7,
        descript: "wgqhdscrphwgddnbxxjwphvtcvvxmhrcxmrbjgqqtkyccwqidt",
        mobile: "13592811053",
        email: "q.ayuovt@krmjwc.gov.cn",
        organ: [
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
        ],
    },
    {
        name: "姜霞",
        date: "2004-03-28",
        value: 1714.68,
        inventory: 4,
        descript: "dduhxjbvksbwnvqqmgswwjzulpjpypqufbmrdpjmmursgkwtuggubwfjlxxuqmfgxumlvwxepokbsrmmijvmterhyyvsttveklzr",
        mobile: "13550655821",
        email: "d.btuewquh@yyxmrfglu.sn",
        organ: [
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
        ],
    },
    {
        name: "吕涛",
        date: "1989-12-09",
        value: 9007.08,
        inventory: 7,
        descript: "isoayyknpkqqictxbpumsduheblac",
        mobile: "18926182514",
        email: "s.ioylewvbig@pwoaptk.by",
        organ: [
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
        ],
    },
    {
        name: "郭平",
        date: "1981-03-31",
        value: 8479.27,
        inventory: 3,
        descript: "撒旦哈萨克大家哈健康杀手肯定会撒旦哈萨克大家哈健康杀手肯定会撒旦哈萨克大家哈健康杀手肯定会撒旦哈萨克大家哈健康杀手肯定会",
        mobile: "13558153662",
        email: "k.dvfiymly@tyeksxgk.hk",
        organ: [
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
        ],
    },
    {
        name: "陈桂英",
        date: "2013-04-24",
        value: 8483.27,
        inventory: 1,
        descript: "grkzju vuefqdfszqe vrvfvn vjtbbc nmfvdvegmlmx tzecdprromrgmn fmxaqo",
        mobile: "13536152821",
        email: "v.ckinmlmjw@njmsxpsj.aw",
        organ: [
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
        ],
    },
    {
        name: "袁娟",
        date: "2020-10-26",
        value: 6885.23,
        inventory: 3,
        descript: "srgqumcqtbgbdcmiyiytoufyiy",
        mobile: "13212491985",
        email: "j.sjwsjzkb@vuej.ir",
        organ: [
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
        ],
    },
    {
        name: "曹霞",
        date: "1977-07-27",
        value: 7074.44,
        inventory: 3,
        descript: "qhmgrvydaxrvfgreehsfokxckhpikrfjpvrla",
        mobile: "13222652042",
        email: "v.jpqbuntgo@pyqiq.az",
        organ: [
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
        ],
    },
    {
        name: "邱勇",
        date: "2003-07-21",
        value: 7714.28,
        inventory: 10,
        descript: "buvzfnswhnpyvseztahijjyvuxdplcrkclhzujvhakbvqqxbjbbim",
        mobile: "13223176454",
        email: "w.mvdvqdss@zwk.hk",
        organ: [
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
        ],
    },
    {
        name: "余敏",
        date: "2019-02-15",
        value: 2544.83,
        inventory: 9,
        descript: "hxhahicvkzwxiyibhfddnrzeidbxpigypeawporbolwxgqcbsqxpiqfswbwajdfmfocgpgwbkljqbekkybqmwxcxkrdd",
        mobile: "13508774706",
        email: "g.dgvooqpj@wnydsj.ma",
        organ: [
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
        ],
    },
    {
        name: "钱秀英",
        date: "1994-11-17",
        value: 9770.64,
        inventory: 9,
        descript: "kszvvsuetqppjenobloairybymtcjyanulm",
        mobile: "13572164015",
        email: "v.mdxrcgnime@txklkbjbh.fj",
        organ: [
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
            "https://rdgta.cdn.cyagen.com/rddc/images/gene/compare1.png",
        ],
    },
]);

const option = [
    { key: "name", name: "名字", align: "singularity", sort: true },
    { key: "date", name: "日期", align: "center", extra: true },
    { key: "email", name: "邮箱", align: "singularity", explain: "测试文案" },
    { key: "value", name: "存款", align: "singularity", sort: true, explain: "测试文案" },
    { key: "mobile", name: "手机号码", align: "center", extra: true, explain: "测试文案" },
    { key: "descript", name: "描述", align: "singularity", sort: true, extra: true },
    { key: "inventory", name: "库存", align: "singularity", sort: true, extra: true, explain: "测试文案" },
];

const onsort = (result) => {
    sort.value = result.value;
    sort.key = result.key;
};

const result = computed(() => {
    return [...data.value].sort((a, b) => {
        if (!sort.key || !sort.value) return;
        if (sort.value == "asc") return a[sort.key] - b[sort.key];
        else {
            return b[sort.key] - a[sort.key];
        }
    });
});
</script>
