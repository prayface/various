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

        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>每一个页面的内容是完全可定制的，把你想要展示的内容放在<span>默认插槽</span>内。</p>
                <p>
                    <UiButton @click="next">next</UiButton>
                    <UiButton @click="back">back</UiButton>
                </p>
            </div>
            <div class="content">
                <UiCarousel :height="200" mode="multiple-view" style="margin: 0 -32px" ref="carousel">
                    <div style="background-color: aquamarine; width: 500px; margin: 0 32px">1</div>
                    <div style="background-color: bisque; width: 500px; margin: 0 32px">2</div>
                    <div style="background-color: brown; width: 500px; margin: 0 32px">3</div>
                    <div style="background-color: burlywood; width: 500px; margin: 0 32px">4</div>
                    <div style="background-color: cadetblue; width: 500px; margin: 0 32px">5</div>
                    <div style="background-color: violet; width: 500px; margin: 0 32px">6</div>
                    <div style="background-color: tomato; width: 500px; margin: 0 32px">7</div>
                </UiCarousel>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";

const carousel = ref();

const next = () => {
    carousel.value.next();
};

const back = () => {
    carousel.value.back();
};
</script>
