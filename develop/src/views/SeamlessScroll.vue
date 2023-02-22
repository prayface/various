<template>
    <div class="seamless-scroll">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>每一个页面的内容是完全可定制的，把你想要展示的内容放在<span>默认插槽</span>内。</p>
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
