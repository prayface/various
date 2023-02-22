<template>
    <div class="carousel">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>每一个页面的内容是完全可定制的，把你想要展示的内容放在<span>默认插槽</span>内。</p>
            </div>
            <div class="content">
                <UiCarousel :height="200">
                    <div style="background-color: aquamarine">1</div>
                    <div style="background-color: bisque">2</div>
                    <div style="background-color: brown">3</div>
                    <div style="background-color: burlywood">4</div>
                </UiCarousel>
            </div>
        </section>
    </div>
</template>
