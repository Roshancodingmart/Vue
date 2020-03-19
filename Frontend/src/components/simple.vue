<template>
  <div>
    <Header/>
    <div class="title_holder">
      <span class="title_simple">Simple Calculator</span>
    </div>
    <div class="calculator">
      <div class="outline">
        <div>
          <input
            type="text"
            class="input"
            v-model="question"
            @keyup.enter="calculate()"
          />
        </div>
        <div class="keys">
          <div class="number">
            <button
              v-on:click="num($event)"
              v-for="number in numbers"
              :key="number"
              :id="number"
            >
              {{ number }}
            </button>
          </div>
          <div class="operators">
            <button id="+" @click="num($event)">+</button>
            <button id="-" @click="num($event)">-</button>
            <button id="equal" @click="calculate()">=</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// console.log("inside simple"); 
import Header from "./Header.vue";
export default {
  name: "simple",
  components:{Header},
  data() {
    return {
      output: "",
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "/", "*"],
      question: []
    };
  },
  methods: {
    num: function(event) {
      this.question = this.question + event.currentTarget.id;
      console.log(event.currentTarget.id, this.question);
    },
    calculate: function() {
      console.log("calculated", eval(this.question));
      this.question = eval(this.question);
    }
  },
  created: function() {
    console.log("created");
  },
  mounted: function() {
    console.log("mounted");
  },
  updated: function() {
    console.log("updated");
  }
};
</script>
<style>
.title_holder {
  text-align: center;
  display: flex;
  justify-content: center;
}
.title_simple {
  font: bold;
  font-family: "Courier New", Courier, monospace;
  font-size: 28px;
  margin-top: 80px;
}
.calculator {
  background: whitesmoke;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  /* padding: 30px; */
}
.outline {
  background: #212121;
  height: 500px;
  width: 400px;
  padding: 30px;
}
.input {
  font-size: 22px;
  height: 90px;
  width: 340px;
  margin-bottom: 30px;
  text-align: end;
  padding: 20px;
  background: darkgreen;
  font-family: sans-serif;
}
.number {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 250px;
  height: 320px;
  overflow: hidden;
}
.number button,
.operators button {
  width: 60px;
  height: 60px;
  margin: 10px;
}

.keys {
  display: flex;
  justify-content: space-between;
}
.operators {
  width: 90px;
}
#equal {
  height: 140px;
  margin: 10px;
  width: 60px;
}
</style>
