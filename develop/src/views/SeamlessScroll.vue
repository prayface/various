<template>
    <div class="seamless-scroll">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>横向滚动组件, 将内容置入<span>默认插槽</span>内, 进行横向的无缝滚动。</p>
            </div>
            <div class="content">
                <UiSeamlessScroll :height="80">
                    <div class="test" style="background: goldenrod">1</div>
                    <div class="test" style="background: darkcyan">2</div>
                    <div class="test" style="background: antiquewhite">3</div>
                    <div class="test" style="background: salmon">4</div>
                    <div class="test" style="background: wheat">5</div>
                    <div class="test" style="background: rosybrown">6</div>
                    <div class="test" style="background: thistle">7</div>
                </UiSeamlessScroll>
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
                    <td>delay</td>
                    <td>每帧切换的间隔</td>
                    <td>number</td>
                    <td>--</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>height</td>
                    <td>组件的高度</td>
                    <td>string | number</td>
                    <td>--</td>
                    <td>--</td>
                </tr>
                <tr>
                    <td>direction</td>
                    <td>无缝滚动的方向(暂未实现)</td>
                    <td>string</td>
                    <td>horizontal | vertical</td>
                    <td>horizontal</td>
                </tr>
            </table>
        </section>
    </div>
</template>

<style lang="less" scoped>
.seamless-scroll {
    .test {
        width: 200px;
        height: 80px;
        margin: 0 8px;
    }
}
</style>
