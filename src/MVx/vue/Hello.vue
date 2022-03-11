<template>
  <p class="color-red">{{ greeting }} {{ message }}!</p>
</template>

<script>
export default {
  data: function () {
    return {
      greeting: 'Hello',
      message: 'sushi',
    };
  },
};
</script>

<style lang="sass" scoped>
.color-red{
  color: gray;
}
</style>
