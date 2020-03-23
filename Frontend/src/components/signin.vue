<template>
  <div>
    <Header />
    <div class="happy">
      <span class="title">Sign In</span>
      <input type="text" placeholder="Enter Email" v-model="mail" />
      <input type="password" placeholder="Enter Password" v-model="pass" />
      <button class="submit-btn" @click="handleSignin()">Sign In</button>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
export default {
  name: "signin",
  components: {
    Header
  },
  data() {
    return {
      mail: "",
      pass: ""
    };
  },
  methods: {
    handleSignin: async function() {
      console.log(this.mail, this.pass);
      await this.$http
        .post("http://localhost:3005/signin", {
          mail: this.mail,
          pass: this.pass
        })
        .then(resp => {
            localStorage.setItem("user",resp.body.name)
            localStorage.setItem("mail",resp.body.mail)
          console.log(resp.body.msg=="Signin Complete");
          if(resp.body.msg=="Signin Complete"){
              this.$router.push("movie")
          }

          this.mail = "";
          this.pass = "";
        });
    }
  }
};
</script>

<style>
.happy {
  margin-left: 700px;
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
.happy input {
  width: 280px;
  height: 30px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid gray;
}
.happy input:focus::placeholder {
  color: grey;
  /* font-size: 15px; */
}
.happy input:focus {
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
