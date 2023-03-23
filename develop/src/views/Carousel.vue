<template>
    <div class="carousel">
        <section>
            <div class="title">基本用法</div>
            <div class="descript">
                <p>每一个页面的内容是完全可定制的，把你想要展示的内容放在<span>默认插槽</span>内。</p>
                <p>组件<span>UiCarousel</span>会将<span>默认插槽</span>中的最顶级节点添加<span>width: 100%</span></p>
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
            <div class="title">多窗口模式</div>
            <div class="descript">
                <p>当<span>mode="multiple-view"</span>时开启该模式, 在该模式下允许每个窗口尺寸不等</p>
                <p><span class="warn">注</span>在该模式下以下功能将失效: <span>底部的指示器</span>、<span>自动轮播</span>、<span>无限轮播</span></p>
            </div>
            <div class="content">
                <UiCarousel :height="200" mode="multiple-view" ref="carousel">
                    <div style="background-color: aquamarine; width: 500px; margin: 0 32px 0 0">1</div>
                    <div style="background-color: bisque; width: 320px; margin: 0 32px">2</div>
                    <div style="background-color: bisque; width: 320px; margin: 0 32px">2</div>
                    <div style="background-color: bisque; width: 320px; margin: 0 32px">2</div>
                    <div style="background-color: brown; width: 1400px; margin: 0 32px">3</div>
                    <div style="background-color: burlywood; width: 200px; margin: 0 32px">4</div>
                    <div style="background-color: cadetblue; width: 500px; margin: 0 32px">5</div>
                    <div style="background-color: violet; width: 100px; margin: 0 32px">6</div>
                    <div style="background-color: tomato; width: 500px; margin: 0 0 0 32px">7</div>
                </UiCarousel>
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
                    <td>mode</td>
                    <td>轮播图的模式</td>
                    <td>string</td>
                    <td>default | multiple-view</td>
                    <td>default</td>
                </tr>
                <tr>
                    <td>arrow</td>
                    <td>切换箭头显示时期</td>
                    <td>string</td>
                    <td>always | hover | never</td>
                    <td>hover</td>
                </tr>
                <tr>
                    <td>delay</td>
                    <td>自动切换的间隔</td>
                    <td>number</td>
                    <td>--</td>
                    <td>3000</td>
                </tr>
                <tr>
                    <td>transitionDelay</td>
                    <td>过渡的间隔</td>
                    <td>number</td>
                    <td>--</td>
                    <td>500</td>
                </tr>
                <tr>
                    <td>width</td>
                    <td>轮播图的宽度</td>
                    <td>number | string</td>
                    <td>--</td>
                    <td>100%</td>
                </tr>
                <tr>
                    <td>height</td>
                    <td>轮播图的高度</td>
                    <td>number | string</td>
                    <td>--</td>
                    <td>100%</td>
                </tr>
                <tr>
                    <td>direction</td>
                    <td>展示的方向(暂未实现)</td>
                    <td>string</td>
                    <td>horizontal | vertical</td>
                    <td>horizontal</td>
                </tr>
                <tr>
                    <td>loop</td>
                    <td>是否开启无限循环</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>true</td>
                </tr>
                <tr>
                    <td>autoplay</td>
                    <td>是否开启自动切换</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>true</td>
                </tr>
                <tr>
                    <td>pagination</td>
                    <td>是否开启底部分页器</td>
                    <td>boolean</td>
                    <td>--</td>
                    <td>true</td>
                </tr>
            </table>
        </section>

        <section>
            <div class="title">方法</div>
            <table>
                <tr>
                    <th>名称</th>
                    <th>说明</th>
                    <th>回调参数</th>
                </tr>
                <tr>
                    <td>cutCarousel</td>
                    <td>当前轮播切换到指定位置</td>
                    <td>(number?: number) => void</td>
                </tr>
                <tr>
                    <td>triggerNext</td>
                    <td>切换到下一屏轮播</td>
                    <td>() => void</td>
                </tr>
                <tr>
                    <td>triggerBack</td>
                    <td>切换到上一屏轮播</td>
                    <td>() => void</td>
                </tr>
            </table>
        </section>
    </div>
</template>
