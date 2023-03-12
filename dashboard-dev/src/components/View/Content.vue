<template>
  <div class="content rio" style="padding:15px">

    <transition name="fade" mode="out-in">
      <!-- your content here -->
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .15s
  }

  .fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */

  {
    opacity: 0
  }
  .content.rio{
    margin: 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 10px rgba(116, 116, 116, 0.37);
    border: 1px solid rgb(231, 231, 231);
    padding: 15px;
  }
</style>
