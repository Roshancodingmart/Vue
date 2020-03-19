<template>
  <div>
    <Header/>
    <div class="title_holder" v-if="!output"><span class="title_bmi">{{ title }}</span></div>
    <div class="main">
      <div class="form_holder" v-if="!output">
        <form @submit.prevent="calculate()" class="form">
          Name:<input
            v-model="user.name"
            type="text"
            @input="handleChange($event)"
            name="name"
          />
          Height:<input
            v-model="user.height"
            type="number"
            step="0.01"
            @input="handleChange($event)"
            name="height"
          />
          Weight:<input
            v-model="user.weight"
            type="number"
            step="0.01"
            @input="handleChange($event)"
            name="weight"
          />
          <button>Calculate</button>
        </form>
      </div>
      <div class="result" v-if="output">
          <div>
              <span>Your are {{bmi}}</span>
          </div>
          <button class="ok" @click="back()">ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header"
export default {
  name: "bmi",
  components:{
    Header
  },
  data() {
    return {
      title: "BMI Calculator",
      user: { name: "", height: "", weight: "" },
      output: "",
      bmi: ""
    };
  },
  methods: {
    calculate: function() {
      this.output = this.user.weight / (this.user.height * this.user.height);
      if (this.output > 0 && this.output < 18.4) {
        this.bmi = "Under Weight";
      } else if (this.output > 18.5 && this.output < 24.9) {
        this.bmi = "Normal";
      } else if (this.output > 25 && this.output < 29.9) {
        this.bmi = "Over Weight";
      } else {
        this.bmi = "Obese";
      }
      this.$http.post("http://localhost:3005/bmi",{name:this.user.name,bmi:this.bmi}).then(res=>{
        console.log(res.body.msg)
      })
      this.user = {
        name: "",
        height: "",
        weight: ""
      };
    },
    handleChange: function(event) {
      this.user[event.target.name] = event.target.value;
    },
    back:function(){
      this.output=""
    }
  }
};
</script>

<style>
.title_holder{
    margin: 25px;
    text-align: center;
    display: flex;
    justify-content: center;
}
.title_bmi{
    font: bold;
    font-family: 'Courier New', Courier, monospace;
    font-size: 28px;
    margin-top: 80px;
}
.main {
  display: flex;
  justify-content: center;
  /* background: grey; */
}
.form_holder {
    padding: 50px 30px 30px 30px;
  background-image: url("../assets/images.jpeg");
  width: 400px;
  height: 400px;
  /* text-align: center; */
  align-content: center;
  justify-content: center;
}
.form {
  display: flex;
  flex-direction: column;
  color: midnightblue;
}
.form input{
    /* margin-top:10px ; */
    height: 33px;
    margin-bottom: 35px;
}
.form button{
    margin: 1% 35% 0% 35%;

    width: 100px;
    height: 30px;
}
.result{
    margin-top: 100px;
    height: 100px;
    width: 500px;
    background-image: url("../assets/images.jpeg");
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
