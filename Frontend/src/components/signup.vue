<template>
  <div>
    <Header />
    <div class="happy1">
      <span class="title">Sign Up</span>
      <input type="text" v-model="name" placeholder="Enter username" />
      <input type="text" placeholder="Enter email" v-model="mail" />
      <input type="password" placeholder="Enter password" v-model="pass" />
      <button class="submit-btn" @click="handleSignup()">Sign Up</button>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
export default {
  name: "signupn",
  components: {
    Header
  },
  data() {
    return {
      name: "",
      mail: "",
      pass: ""
    };
  },
  methods: {
    handleSignup: async function() {
      console.log(this.name, this.mail, this.pass);
      await this.$http
        .post("http://localhost:3005/signup", {
          name: this.name,
          mail: this.mail,
          pass: this.pass
        })
        .then(resp => {
            console.log(resp.body)
          this.name = "";
          this.mail = "";
          this.pass = "";
        });
    }
  }
};
</script>

<style>
.happy1 {
  margin-left: 140px;
  margin-top: 100px;
  height: 450px;
  width: 400px;
  display: flex;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  flex-direction: column;
  border: none;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  box-shadow: 3px 6px 28px 1px grey;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 50px;
  padding-bottom: 50px;
}
.title {
  color: blue;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 20px;
}
.happy1 input {
  width: 280px;
  height: 30px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid gray;
}
.happy1 input:focus::placeholder {
  color: grey;
  /* font-size: 15px; */
}
.happy1 input:focus {
  padding-left: 10px;
  outline-width: 0;
  background-color: rgb(211, 228, 235);
  border-bottom: 1px solid rgb(163, 228, 163);
}
.submit-btn {
  background-color: blue;
  border: none;
  border-radius: 5px;
  color: white;
  height: 35px;
  width: 120px;
  font-weight: bold;
  font-size: 15px;
}

.submit-btn:hover {
  background-color: rgb(16, 16, 212);
}
</style>
