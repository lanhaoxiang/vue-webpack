
<template>
  <div class="page">
    <router-view class="view" keep-alive></router-view>
    <nav class="bar bar-tab">
      <a class="tab-item external" v-link="{path:'/tab1',replace:true}">
        <span class="icon icon-home"></span>
        <span class="tab-label">首页</span>
      </a>
      <a class="tab-item external" v-link="{path:'/tab2',replace:true}">
        <span class="icon icon-star"></span>
        <span class="tab-label">收藏</span>
      </a>
      <a class="tab-item external" v-link="{path:'/tab3',replace:true}">
        <span class="icon icon-settings"></span>
        <span class="tab-label">设置</span>
      </a>
    </nav>
  </div>
</template>
<script>
  import store from './vuex/store';
  export default{
    store
  }
</script>

<style>
  [v-cloak] {
    display: none;
  }
</style>
