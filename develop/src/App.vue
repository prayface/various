<template>
    <main>
        <article>
            <div class="title">{{ $route.name }}</div>
            <RouterView />
        </article>
    </main>
</template>

<script setup></script>

<style lang="less">
main {
    width: 100%;
    min-width: 768px;
    max-width: 1280px;
    margin: 40px auto 60px;
    display: flex !important;
    align-items: flex-start;

    article {
        flex: 1;
        width: 0;
        margin-left: 40px;
        > .title {
            color: var(--uicolor-font-1);
            margin: 0 0 20px;
            font-size: 36px;
            line-height: 64px;
            font-weight: bold;
            border-bottom: 1px solid var(--uicolor-font-1);
        }

        > * > section {
            margin-top: 60px;
            > .title {
                color: var(--uicolor-font-1);
                margin: 0 0 8px;
                font-size: 24px;
                line-height: 48px;
                font-weight: bold;
            }

            > .content {
                margin-top: 20px;
                padding: 30px 36px;
                border: 1px solid var(--uicolor-font-4);
            }

            > .descript {
                p {
                    line-height: 22px;
                    > span {
                        background-color: var(--uicolor-font-4-02);
                        border-radius: 2px;
                        display: inline-block;
                        padding: 0 4px;
                        margin: 0 4px;
                        &.warn {
                            margin: 0 4px 0 0;
                            color: #fff;
                            background-color: var(--uicolor-error);
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
                    border-bottom: 1px solid var(--uicolor-font-4);
                }
            }
        }
    }

    p {
        margin-bottom: 8px;
        &:last-child {
            margin: 0;
        }
    }
}
</style>
