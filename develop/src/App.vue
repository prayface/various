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
footer {
    width: 100%;
    height: 200px;
    background: var(--uic-font-4);
    border-top: 1px solid var(--uic-font-4);
}

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
    border-bottom: 1px solid var(--uic-font-4);
}

main {
    width: 1440px;
    margin: 40px auto 60px;
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
            border: 1px solid var(--uic-font-4);
            display: block;
            padding: 8px 20px;
            border-radius: 4px;
            &:hover {
                border-color: var(--uic-main-color);
            }

            &.router-link-active {
                color: var(--uic-main-color);
                border-color: var(--uic-main-color);
                background: var(--uic-main-color-005);
            }
        }
    }

    article {
        flex: 1;
        width: 0;
        margin-left: 40px;
        > .title {
            color: var(--uic-font-1);
            margin: 0 0 20px;
            font-size: 36px;
            line-height: 64px;
            font-weight: bold;
            border-bottom: 1px solid var(--uic-font-1);
        }

        > * > section {
            margin-top: 60px;
            > .title {
                color: var(--uic-font-1);
                margin: 0 0 8px;
                font-size: 24px;
                line-height: 48px;
                font-weight: bold;
            }

            > .content {
                margin-top: 20px;
                padding: 30px 36px;
                border: 1px solid var(--uic-font-4);
            }

            > .descript {
                p {
                    line-height: 22px;
                    > span {
                        background-color: var(--uic-font-4);
                        border-radius: 2px;
                        display: inline-block;
                        padding: 0 4px;
                        margin: 0 4px;
                        &.warn {
                            margin: 0 4px 0 0;
                            color: #fff;
                            background-color: var(--uic-error);
                        }
                    }
                }
            }

            > table {
                width: 100%;
                tr td,
                tr th {
                    padding: 8px 12px;
                    text-align: center;
                    border-bottom: 1px solid var(--uic-font-4);
                }
            }
        }
    }
}
</style>
