<template>
    <header></header>
    <main>
        <aside>
            <template v-for="route in $router.options.routes">
                <RouterLink :to="route.path" exact-active-class>{{ route.name }}</RouterLink>
            </template>
        </aside>
        <article>
            <div class="title">{{ $route.name }}</div>
            <RouterView />
        </article>
    </main>
</template>

<script setup></script>

<style lang="less">
header {
    width: 100%;
    height: 55px;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    line-height: 55px;
    border-bottom: 1px solid var(--uis-color-3);
}

main {
    width: 1440px;
    margin: 0 auto;
    display: flex !important;
    align-items: flex-start;
    aside {
        width: 240px;
        margin-top: 64px;
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
        margin-left: 80px;
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
