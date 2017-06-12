<template>
    <div module="module2">
        <span node-type="title">This is {{moduleName}}!</span>
    </div>
</template>

<script>
module.exports = {
    type: 'vue',
    data: function () {
        return {
            moduleName: 'module2'
        };
    }
};
</script>

<style scoped>
p {
    font-size: 2em;
    text-align: center;
}
</style>
