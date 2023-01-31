<template>
    <header></header>
    <main>
        <UiScrollbar class="aside" :width="280">
            <aside>
                <template v-for="route in $router.options.routes">
                    <RouterLink :to="route.path" exact-active-class>{{ route.name }}</RouterLink>
                </template>
            </aside>
        </UiScrollbar>
        <article>
            <div class="title">{{ $route.name }}</div>
            <RouterView />
        </article>
    </main>
</template>

<script setup></script>

<style lang="less">
header {
    top: 0;
    width: 100%;
    height: 55px;
    z-index: 1;
    position: sticky;
    font-size: 20px;
    text-align: center;
    background: #fff;
    font-weight: bold;
    line-height: 55px;
    border-bottom: 1px solid var(--uis-color-3);
}

main {
    width: 1440px;
    margin: 0 auto;
    display: flex !important;
    align-items: flex-start;
    .aside {
        margin-top: 64px;
        aside {
            overflow: hidden;
            padding-right: 40px;
        }

        a {
            width: 100%;
            margin: 8px 0 0;
            border: 1px solid var(--uis-color-4);
            display: block;
            padding: 8px 20px;
            border-radius: 4px;
            &:hover {
                border-color: var(--ui-color-7);
            }

            &.router-link-active {
                border-color: var(--ui-color-7);
                background: var(--ui-color-1);
            }
        }
    }

    article {
        flex: 1;
        margin-left: 40px;
        .title {
            margin: 0 0 20px;
            font-size: 36px;
            line-height: 64px;
            font-weight: bold;
            border-bottom: 1px solid var(--uis-color-3);
        }
    }
}
</style>
