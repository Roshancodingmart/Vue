<template>
  <div>
    <Header/>
    <div class="title_holder" v-if="!age">
      <span class="title_age">{{ title }}</span>
    </div>
    <div class="main">
      <div class="form_holder_age" v-if="!age">
        <form class="form" style="color:white" @submit.prevent="calculate()">
          Name:<input
            type="text"
            v-model="user.name"
            placeholder="enter ur name"
            name="name"
            @input="handleChange($event)"
          />
          D.O.B:<input
            type="text"
            v-model="user.date"
            placeholder="mm/dd/yy"
            name="date"
            @input="handleChange($event)"
          />
          <button>Calculate</button>
        </form>
      </div>
            <div class="result_age" v-if="age">
          <div>
              <span>Your are {{age}} years old</span>
          </div>
          <button class="ok" @click="back()">ok</button>
      </div>
    </div>

  </div>
</template>

<script>
import Header from "./Header"
export default {
  name: "age",
  components:{
    Header
  },
  data() {
    return {
      title: "Age Calculator",
      user: {
        name: "",
        date: ""
      },
      age:""
    };
  },
  methods: {
    handleChange: function(event) {
      this.user[event.target.name] = event.target.value;
    },
    calculate: function() {
    var temp = this.user.date.split('/')
    var d =new Date(temp[0]+"/"+temp[1]+"/"+temp[2])
    var e= new Date()
      let date = (e-d)/3600000/24/365
      this.age=(Math.trunc(date))
      this.$http.post("http://localhost:3005/age",{name:this.user.name,age:this.age}).then(res=>{
        console.log(res.body.msg)
      })
      this.user = {
        name: "",
        date: ""
      };
    },
    back:function(){
      this.age=""
    }
  }
};
</script>

<style>
.title_holder {
  margin: 25px;
  text-align: center;
  display: flex;
  justify-content: center;
}
.title_age {
      margin-top: 80px;
  font: bold;
  font-family: "Courier New", Courier, monospace;
  font-size: 28px;
}
.main {
  display: flex;
  justify-content: center;
  /* background: grey; */
}
.form_holder_age {
  padding: 50px 30px 30px 30px;
  background-image: url("../assets/red.jpg");
  width: 400px;
  height: 300px;
  /* text-align: center; */
  align-content: center;
  justify-content: center;
}
.form_age {
  display: flex;
  flex-direction: column;
  color: white;
}
.form input {
  font-size: 14px;
  padding: 10px;
  height: 33px;
  margin-bottom: 35px;
}
.form button {
  margin: 1% 35% 0% 35%;

  width: 100px;
  height: 30px;
}
.result_age{
    margin-top: 100px;
    height: 100px;
    width: 500px;
    background-image: url("../assets/red.jpg");
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.ok{
  width: 80px;
  margin-left:42% ;
  margin-top:10px;
}
</style>
