<template>
    <p>Hello! This is {{moduleName}}.</p>
</template>

<script>
module.exports = {
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