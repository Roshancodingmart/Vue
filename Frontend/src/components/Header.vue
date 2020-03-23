<template>
  <div class="header">
    <div>
      <Menu />
    </div>
    <div class="title"></div>
    <div>
      <router-link to="/signup"><button class="sign_btns" v-if="!check()">SIGN UP</button></router-link>
      <router-link to="/signin"><button class="sign_btns" v-if="!check()">SIGN IN</button></router-link>
      <button class="sign_btns" v-if="check()" @click="signOut()">LOGOUT</button>
    </div>
  </div>
</template>
<script>
import Menu from "./Menu.vue";
export default {
  name: "Header",
  components: { Menu },
  methods:{
    check:function(){
      if(localStorage.getItem("user")){
        return 1
      }
      else return 0
    },
    signOut:function(){
      localStorage.removeItem("user")
      this.$router.push("signin")
    }
  }
};

</script>
<style>
.sign_btns{
  height: 80%;
background: blue;
color: white;
border: none;
margin:6px 20px 6px 6px;
font-family: sans-serif;
font-size: 18px;
}
.sign_btns:hover{
  background: rgb(11, 11, 187);
}
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
