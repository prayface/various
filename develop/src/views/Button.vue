<template>
    <div class="button">
        <section>
            <UiButton @click="click" size="large">按钮</UiButton>
            <UiButton @click="click" size="large" mode="pierced">按钮</UiButton>
            <UiButton @click="click" size="large" :disabled="true">按钮</UiButton>
            <UiButton @click="click" size="large" mode="pierced" :disabled="true">按钮</UiButton>
            <UiButton @click="click" size="large" :loading="true">按钮</UiButton>
            <UiButton @click="click" size="large" mode="pierced" :loading="true">按钮</UiButton>
        </section>
        <section>
            <UiButton @click="click" size="middle">按钮</UiButton>
            <UiButton @click="click" size="middle" mode="pierced">按钮</UiButton>
            <UiButton @click="click" size="middle" :disabled="true">按钮</UiButton>
            <UiButton @click="click" size="middle" mode="pierced" :disabled="true">按钮</UiButton>
            <UiButton @click="click" size="middle" :loading="true">按钮</UiButton>
            <UiButton @click="click" size="middle" mode="pierced" :loading="true">按钮</UiButton>
        </section>
        <section>
            <UiButton @click="click">按钮</UiButton>
            <UiButton @click="click" mode="pierced">按钮</UiButton>
            <UiButton @click="click" :disabled="true">按钮</UiButton>
            <UiButton @click="click" mode="pierced" :disabled="true">按钮</UiButton>
            <UiButton @click="click" :loading="true">按钮</UiButton>
            <UiButton @click="click" mode="pierced" :loading="true">按钮</UiButton>
        </section>
        <section>
            <UiButton @click="click" size="small">按钮</UiButton>
            <UiButton @click="click" size="small" mode="pierced">按钮</UiButton>
            <UiButton @click="click" size="small" :disabled="true">按钮</UiButton>
            <UiButton @click="click" size="small" mode="pierced" :disabled="true">按钮</UiButton>
            <UiButton @click="click" size="small" :loading="true">按钮</UiButton>
            <UiButton @click="click" size="small" mode="pierced" :loading="true">按钮</UiButton>
        </section>
    </div>
</template>

<script setup>
const click = () => {
    console.log("I am Button");
};
</script>

<style lang="less">
.button {
    section {
        margin-bottom: 20px;
        .ui-button {
            margin-right: 8px;
        }
    }
}
</style>
