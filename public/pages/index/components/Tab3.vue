<template>
  <div>
    <div class="bar bar-nav">
      <a class="icon icon-me pull-right open-panel"></a>
      <h1 class="title">标题</h1>
    </div>
    <div class="content">
      <div class="content-block">
        content of tab3
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: 'Hello World!',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
