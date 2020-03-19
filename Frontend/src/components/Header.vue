<template>
  <div class="header">
    <div>
      <Menu />
    </div>
    <div class="title">Calculator</div>
    <div></div>
  </div>
</template>
<script>
import Menu from "./Menu.vue";
export default {
  name: "Header",
  components: { Menu }
};
</script>
<style>
.header {
  position: fixed;
  /* margin-top:-25px ; */
  width: 100%;
  height: 60px;
  font-size: 20px;
  color: white;
  font-weight: bold;
  /* padding: 20px; */
  box-sizing: border-box;
  display: flex;

  background: blue;
  justify-content: space-between;
  box-shadow: 1px 1px 1px 1px solid grey;
}
.title{
    padding: 12px;
    font-size: 28px;
}
</style>
