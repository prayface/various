<template>
    <div class="form">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>通过<span>size</span>属性可以<span>select</span>组件的尺寸</p>
                <p>尺寸<span>size</span>: large | middle | default | small</p>
            </div>
            <div class="content">
                <UiTable :option="option" :data="data" ratio="gene_symbol">
                    <template #operate>
                        <UiButton size="small">~~按钮~~</UiButton>
                    </template>
                </UiTable>
            </div>
        </section>

        <section>
            <div class="title">属性</div>
            <table>
                <tr>
                    <th>名称</th>
                    <th>说明</th>
                    <th>类型</th>
                    <th>可选值</th>
                    <th>默认值</th>
                </tr>
                <tr>
                    <td>data</td>
                    <td>表格数据源</td>
                    <td>any[]</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>option</td>
                    <td>表格配置项</td>
                    <td>UiTableOption</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>ratio</td>
                    <td>单选功能中的Key</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>height</td>
                    <td>表格的高度, 当表格超出高度时, 将会出现滚动条</td>
                    <td>string | number</td>
                    <td>--</td>
                    <td>auto</td>
                </tr>
                <tr>
                    <td>loading</td>
                    <td>内置Loading</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>checkbox(未开发)</td>
                    <td>是否启用多选功能</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
            </table>
        </section>

        <section>
            <div class="title">UiTableOption属性</div>
            <table>
                <tr>
                    <th>名称</th>
                    <th>说明</th>
                    <th>类型</th>
                    <th>可选值</th>
                    <th>默认值</th>
                </tr>
                <tr>
                    <td>key</td>
                    <td>数据对应的Key</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>表头显示的名称</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>slot</td>
                    <td>插槽的名称</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>sort</td>
                    <td>是否启用排序功能</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>false</td>
                </tr>
                <tr>
                    <td>width</td>
                    <td>单元格宽度, 未设置默认为平分剩余宽度</td>
                    <td>number</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>className</td>
                    <td>单元格的class名称</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>children(未开发)</td>
                    <td>表格子模块检测的Key</td>
                    <td>string</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
            </table>
        </section>

        <section>
            <div class="title">事件</div>
            <table>
                <tr>
                    <th>名称</th>
                    <th>说明</th>
                    <th>回调参数</th>
                </tr>
                <tr>
                    <td>sort</td>
                    <td>词条排序时触发的回调</td>
                    <td>(key: string, sort?: asc | desc) => void</td>
                </tr>
                <tr>
                    <td>ratio</td>
                    <td>数据单选时触发的回调, data: 选择的数据</td>
                    <td>(data: any) => void</td>
                </tr>
                <tr>
                    <td>checkbox(未开发)</td>
                    <td>数据多选时触发的回调, data: 选择的数据列表</td>
                    <td>(data: any[]) => void</td>
                </tr>
            </table>
        </section>

        <section>
            <div class="title">方法(未开发)</div>
            <table>
                <tr>
                    <th>名称</th>
                    <th>说明</th>
                    <th>回调参数</th>
                </tr>
                <tr>
                    <td>clear</td>
                    <td>状态清空事件, mode为空则清空全部, sort | ratio | select | checkbox</td>
                    <td>(mode?: string) => void</td>
                </tr>
                <tr>
                    <td>select</td>
                    <td>单选或多选的选择事件: all | keyValue | keyValue[]</td>
                    <td>(mode: string) => void</td>
                </tr>
                <tr>
                    <td>GetCheckboxStatus</td>
                    <td>获取表格多选的数据</td>
                    <td>() => any[]</td>
                </tr>
                <tr>
                    <td>GetRatioStatus</td>
                    <td>获取表格单选的数据</td>
                    <td>() => any</td>
                </tr>
                <tr>
                    <td>GetSortStatus</td>
                    <td>获取表格排序的状态</td>
                    <td>() => { key: string, sort?: asc | desc }</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script setup>
const option = {
    name: {
        name: "Gene symbol",
        key: "gene_symbol",
        width: 160,
        sort: true,
        selector: [
            { label: "选中项1", value: "value1" },
            { label: "选中项2", value: "value2" },
            { label: "选中项3", value: "value3" },
        ],
    },
    descript: { name: "Description", key: "description", sort: true },
    benign: { name: "良性突变", key: "benign", sort: true, width: 120 },
    pathogenic: { name: "致病突变", key: "pathogenic", width: 120 },
    mutation: { name: "所有突变", key: "mutation", width: 120 },
    control: { name: "Operate", key: "operate", slot: "operate", width: 160 },
};

const data = [
    {
        gene_id: "GlBzMm",
        gene_symbol: "FANCA",
        description: "FA Complementation Group A",
        evidence:
            "Molecular basis known(Online Mendelian Inheritance in Man®);Pathogenic(ClinVar);Causative germline mutation(Orphanet);Causative variation(UniProtKB/Swiss-Prot);Genetic Tests(Genetic Testing Registry);Likely pathogenic(ClinVar);DISEASES inferred(The University of Copenhagen DISEASES);Novoseek inferred(Novoseek)",
        is_cancer_census_gene: true,
        is_elite_gene: true,
        score: 1736.36,
        mutation: 2358,
        pathogenic: 337,
        likely_pathogenic: 189,
        benign: 199,
        likely_benign: 704,
        uncertain: 842,
        conflicting: 87,
        deletion: 157,
        duplication: null,
        indel: 12,
        insertion: 81,
        clnsig_other: null,
        clnvc_other: 3,
        single_nucleotide_variant: 2064,
    },
    {
        gene_id: "2Zqjwm",
        gene_symbol: "FANCC",
        description: "FA Complementation Group C",
        evidence:
            "Pathogenic(ClinVar);Causative germline mutation(Orphanet);Likely pathogenic(ClinVar);DISEASES inferred(The University of Copenhagen DISEASES);Novoseek inferred(Novoseek)",
        is_cancer_census_gene: true,
        is_elite_gene: true,
        score: 811.3,
        mutation: 1026,
        pathogenic: 65,
        likely_pathogenic: 92,
        benign: 42,
        likely_benign: 311,
        uncertain: 459,
        conflicting: 57,
        deletion: 69,
        duplication: null,
        indel: 10,
        insertion: 32,
        clnsig_other: null,
        clnvc_other: null,
        single_nucleotide_variant: 898,
    },
    {
        gene_id: "xwgA0x",
        gene_symbol: "FANCG",
        description: "FA Complementation Group G",
        evidence:
            "Pathogenic(ClinVar);Causative germline mutation(Orphanet);Likely pathogenic(ClinVar);DISEASES inferred(The University of Copenhagen DISEASES);Novoseek inferred(Novoseek)",
        is_cancer_census_gene: true,
        is_elite_gene: true,
        score: 810.65,
        mutation: 399,
        pathogenic: 61,
        likely_pathogenic: 19,
        benign: 13,
        likely_benign: 145,
        uncertain: 144,
        conflicting: 17,
        deletion: 25,
        duplication: null,
        indel: 3,
        insertion: 15,
        clnsig_other: null,
        clnvc_other: null,
        single_nucleotide_variant: 354,
    },
    {
        gene_id: "GbnvJG",
        gene_symbol: "FANCD2",
        description: "FA Complementation Group D2",
        evidence:
            "Pathogenic(ClinVar);Causative germline mutation(Orphanet);Likely pathogenic(ClinVar);DISEASES inferred(The University of Copenhagen DISEASES);Novoseek inferred(Novoseek)",
        is_cancer_census_gene: true,
        is_elite_gene: true,
        score: 802.58,
        mutation: 666,
        pathogenic: 51,
        likely_pathogenic: 26,
        benign: 135,
        likely_benign: 142,
        uncertain: 279,
        conflicting: 33,
        deletion: 51,
        duplication: null,
        indel: 2,
        insertion: 23,
        clnsig_other: null,
        clnvc_other: null,
        single_nucleotide_variant: 580,
    },
    {
        gene_id: "2jRqo2",
        gene_symbol: "FANCF",
        description: "FA Complementation Group F",
        evidence:
            "Pathogenic(ClinVar);Causative germline mutation(Orphanet);Likely pathogenic(ClinVar);DISEASES inferred(The University of Copenhagen DISEASES);Novoseek inferred(Novoseek)",
        is_cancer_census_gene: true,
        is_elite_gene: true,
        score: 799.4,
        mutation: 219,
        pathogenic: 14,
        likely_pathogenic: 4,
        benign: 14,
        likely_benign: 42,
        uncertain: 134,
        conflicting: 11,
        deletion: 11,
        duplication: null,
        indel: 1,
        insertion: 7,
        clnsig_other: null,
        clnvc_other: null,
        single_nucleotide_variant: 198,
    },
    {
        gene_id: "G6Vp9G",
        gene_symbol: "FANCM",
        description: "FA Complementation Group M",
        evidence:
            "Pathogenic(ClinVar);Causative germline mutation(Orphanet);Likely pathogenic(ClinVar);DISEASES inferred(The University of Copenhagen DISEASES);Novoseek inferred(Novoseek)",
        is_cancer_census_gene: true,
        is_elite_gene: false,
        score: 798.95,
        mutation: 1156,
        pathogenic: 49,
        likely_pathogenic: 19,
        benign: 47,
        likely_benign: 288,
        uncertain: 719,
        conflicting: 34,
        deletion: 44,
        duplication: null,
        indel: 4,
        insertion: 17,
        clnsig_other: null,
        clnvc_other: null,
        single_nucleotide_variant: 1064,
    },
    {
        gene_id: "GXgJk2",
        gene_symbol: "FANCB",
        description: "FA Complementation Group B",
        evidence:
            "Pathogenic(ClinVar);Causative germline mutation(Orphanet);Likely pathogenic(ClinVar);DISEASES inferred(The University of Copenhagen DISEASES);Novoseek inferred(Novoseek)",
        is_cancer_census_gene: true,
        is_elite_gene: false,
        score: 798.79,
        mutation: 238,
        pathogenic: 18,
        likely_pathogenic: 3,
        benign: 42,
        likely_benign: 58,
        uncertain: 101,
        conflicting: 16,
        deletion: 6,
        duplication: null,
        indel: 1,
        insertion: 8,
        clnsig_other: null,
        clnvc_other: null,
        single_nucleotide_variant: 216,
    },
    {
        gene_id: "xpdyox",
        gene_symbol: "FANCL",
        description: "FA Complementation Group L",
        evidence:
            "Pathogenic(ClinVar);Causative germline mutation(Orphanet);Likely pathogenic(ClinVar);DISEASES inferred(The University of Copenhagen DISEASES);Novoseek inferred(Novoseek)",
        is_cancer_census_gene: true,
        is_elite_gene: false,
        score: 798.25,
        mutation: 242,
        pathogenic: 16,
        likely_pathogenic: 13,
        benign: 36,
        likely_benign: 49,
        uncertain: 118,
        conflicting: 10,
        deletion: 16,
        duplication: null,
        indel: 1,
        insertion: 15,
        clnsig_other: null,
        clnvc_other: null,
        single_nucleotide_variant: 201,
    },
    {
        gene_id: "2KOQy2",
        gene_symbol: "FANCI",
        description: "FA Complementation Group I",
        evidence:
            "Pathogenic(ClinVar);Causative germline mutation(Orphanet);Likely pathogenic(ClinVar);DISEASES inferred(The University of Copenhagen DISEASES)",
        is_cancer_census_gene: true,
        is_elite_gene: false,
        score: 789.52,
        mutation: 762,
        pathogenic: 39,
        likely_pathogenic: 17,
        benign: 106,
        likely_benign: 173,
        uncertain: 386,
        conflicting: 41,
        deletion: 40,
        duplication: null,
        indel: 3,
        insertion: 28,
        clnsig_other: null,
        clnvc_other: 1,
        single_nucleotide_variant: 683,
    },
    {
        gene_id: "xp6Yd2",
        gene_symbol: "SLX4",
        description: "SLX4 Structure-Specific Endonuclease Subunit",
        evidence:
            "Pathogenic(ClinVar);Causative germline mutation(Orphanet);Likely pathogenic(ClinVar);DISEASES inferred(The University of Copenhagen DISEASES)",
        is_cancer_census_gene: true,
        is_elite_gene: false,
        score: 783.63,
        mutation: 1069,
        pathogenic: 32,
        likely_pathogenic: 12,
        benign: 75,
        likely_benign: 281,
        uncertain: 624,
        conflicting: 45,
        deletion: 30,
        duplication: null,
        indel: 7,
        insertion: 10,
        clnsig_other: null,
        clnvc_other: null,
        single_nucleotide_variant: 1014,
    },
];
</script>
