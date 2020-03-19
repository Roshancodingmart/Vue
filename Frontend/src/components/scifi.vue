<template>
<div>
    <Header/>
      <div class="sci_cal">
          
        <div class="title_holder">
          <span class="title_bmi">{{ title }}</span>
        </div>
        <div class="none">
            <div class="sci_main">
              <div class="sci_input">
                <input v-model="que" type="text" name="" id="" class="question" />
                <input v-model="ans" type="text" name="" id="" class="answer" />
              </div>
              <div class="sci_keys">
                <div class="top-row">
                  <button
                    :key="key"
                    v-for="key in keys"
                    class="cal_btn"
                    style="outline:none"
                    @click="handleChange(key)"
                  >
                    {{ key }}
                  </button>
                </div>
                <div style="display:flex">
                  <div class="trigno">
                    <button
                      :key="trig"
                      v-for="trig in trigs"
                      class="cal_btn"
                      style="outline:none"
                      @click="handleChange(trig)"
                    >
                      {{ trig }}
                    </button>
                  </div>
                  <div class="digits">
                    <button
                      :key="number"
                      v-for="number in numbers"
                      class="cal_num"
                      style="outline:none"
                      @click="handleChange(number)"
                    >
                      {{ number }}
                    </button>
                    <button class="blue cal_btn" @click="calculate()">=</button>
                  </div>
                  <div class="operator">
                    <button
                      :key="operator"
                      v-for="operator in operators"
                      class="cal_btn"
                      @click="handleChange(operator)"
                    >
                      {{ operator }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
</div>
</template>
<script>
// console.log("inside scifi");
import Header from "./Header"
export default {
  name: "scify",
  components:{
      Header
  },
  data() {
    return {
      title: "Scientific Calculator",
      question: "",
      que: "",
      ans: 0,
      keys: ["Rad", "Deg", "x!", "(", ")", "%", "AC"],
      trigs: [
        "Inv",
        "sin",
        "In",
        "pi",
        "cos",
        "log",
        "e",
        "tan",
        "_/",
        "Ans",
        "EXP",
        "x^y"
      ],
      numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."],
      operators: ["/", "*", "-", "+"]
    };
  },
  methods: {
    handleChange: function(event) {
      //   console.log(event == "AC");
      if (event == "AC") {
        this.question = "";
        this.ans = 0;
        this.que = "";
        stop;
      } else if (event == "Ans") {
        this.que = "";
        this.ans = this.answer;
        this.question = this.answer;
      } else if (event == "%") {
        this.answer = this.ans / 100;
        this.ans = this.answer;
        this.question = this.answer;
        //   this.que=this.answer
      }
      // console.log(event)
      else {
        this.question = this.question + event;
        this.ans = this.question;
      }
    },
    calculate: function() {
      this.que = this.ans;
      this.ans = eval(this.question);
      this.answer = this.ans;
      this.question = this.answer;
      //   console.log(eval(this.question));
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
    /* background: #f1eeee; */
}
.title_bmi{
    font: bold;
    font-family: 'Courier New', Courier, monospace;
    font-size: 28px;
    margin-top: 80px;
}
.sci_cal {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.none{
    display: flex;
    justify-content: center;
    background: white;
    height: 400px;
    padding: 20px;
}
.sci_main {
  /* margin-top: 100px; */
  height: 345px;
  width: 696px;
  background: whitesmoke;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 20px;
}
.sci_input {
  height: 80px;
  width: 652px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.sci_input:hover {
  border: 1px solid rgb(168, 166, 166);
}

.sci_input input {
  border: none;
  outline-width: 0;
  pointer-events: none;
  padding-right: 5px;
}
.question {
  font-size: 12px;
  color: grey;
  text-align: end;
  /* padding-right:10px ; */
}
.answer {
  font-size: 28px;
  font-weight: 300;
  text-align: end;
}
.sci_keys {
  /* border:1px solid #d9d9d9; */
  height: 75%;
  border-radius: 5px;
  /* padding: 20px; */
  width: 653px;
}
.cal_btn {
  height: 35px;
  width: 83px;
  border: none;
  background: #dfe1e5;
  margin: 5px;
  outline-width: 0;
  outline: none;
  border-radius: 5px;
}
.cal_btn:hover {
  background: #d3d5d8;
}
.trigno {
  width: 280px;
  /* background: red; */
  box-sizing: border-box;
}
.cal_num {
  height: 35px;
  width: 83px;
  border: none;
  background: #e7eff3;
  margin: 5px;
  outline-width: 0;
  outline: none;
  border-radius: 5px;
}
.cal_num:hover {
  background: #d9dee2;
}
.digits {
  width: 280px;
  /* background: green; */
}
.blue {
  background: rgb(91, 91, 235);
  color: white;
  font-weight: bold;
}
.blue:hover {
  background: rgb(122, 122, 243);
}
.operator {
  width: 88px;
  /* background: darkblue; */
}
</style>
