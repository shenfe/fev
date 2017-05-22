<template>
    <p>Hello! This is {{greeting}}</p>
</template>

<script>
module.exports = {
    data: function () {
        return {
            greeting: 'module2'
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