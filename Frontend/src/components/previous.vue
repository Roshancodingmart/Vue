<template>
  <div>
    <Header />
<div style="textAlign:center;fontSize:32px;marginTop:80px">Previously Booked Movies</div>
<span v-if="cups.length>0" class="pre_movie_sub_title">Upcoming Movies</span>
<div class="pmholder">
  <div v-for="cup in cups" :key="cup" style="height:200px" class="previous_ticket">
          <div style="textAlign:center">
            <span>{{ cup.theater | cut }}</span>
          </div>
          <div class="pre_movie_title">{{ cup.movie }}</div>
          <div
            style="display:flex;justifyContent:space-between;fontSize:12px;marginTop:10px"
          >
            <div>{{ cup.date }}</div>
            {{ cup.show }}
          </div>
          <div style="fontSize:12px;marginTop:10px">
            seat no(s)<span :key="seat" v-for="seat in cup.ticket">{{
              seat | comma(cup.ticket)
            }}</span>
          </div>
          <div style="textAlign:center;marginTop:20px"><button class="pre-cancel" @click="cancel(cup)">cancel</button></div>
        </div>
</div>
<span v-if="input.length>0" class="pre_movie_sub_title">Finished Movies</span>
    <div v-if="array.length > 0" class="pmholder">
      
      <div v-for="inp in input" :key="inp" class="previous_ticket">
        <div style="textAlign:center">
          <span>{{ inp.theater | cut }}</span>
        </div>
        <div class="pre_movie_title">{{ inp.movie }}</div>
        <div
          style="display:flex;justifyContent:space-between;fontSize:12px;marginTop:10px"
        >
          <div>{{ inp.date }}</div>
          {{ inp.show }}
        </div>
        <div style="fontSize:12px;marginTop:10px">
          seat no(s)<span :key="seat" v-for="seat in inp.ticket">{{
            seat | comma(inp.ticket)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      datas: "",
      array: [],
      output: [],
      input: [],
      cups:[]
    };
  },
  methods: {
    getMovieName: async function(id) {
      let url =
        "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=1b0dcc7cd2473b7e4881375867e68063&language=en-US";
      let response = await fetch(url);
      let data = await response.json();
      console.log(data.title);
      return data.title;
    },
    get: async function() {
      await this.$http
        .post("http://localhost:3005/previousTicket", {
          mail: localStorage.getItem("mail")
        })
        .then(data => {
          this.datas = data.body;
          this.order();
        });
    },
    order: function() {
      // console.log(this.datas)
      for (let i = 0; i < this.datas.length; i++) {
        if (this.array.length == 0) {
          this.array.push(this.datas[i].id);
        } else {
          let v = 0;
          for (let j = 0; j < this.array.length; j++) {
            if (this.array[j] != this.datas[i].id) {
              v = v + 1;
            }
          }
          if (v == this.array.length) {
            this.array.push(this.datas[i].id);
          }
        }
      }
    },
    set: async function() {
      let user;
      for (let i = 0; i < this.array.length; i++) {
        for (let j = 0; j < this.datas.length; j++) {
          if (this.array[i] == this.datas[j].id) {
            let seat = [];
            let container = [];
            for (let x = 0; x < this.array.length; x++) {
              seat = [];
              for (let y = 0; y < this.datas.length; y++) {
                if (this.array[x] == this.datas[y].id) {
                  // console.log("seat no:",this.datas[y].seat)
                  seat.push(this.datas[y].seat);
                }
              }
              container.push(seat);
              this.output = container;
            }
            // console.log(j);
            let movie = await this.getMovieName(this.datas[j].movie);
            // console.log(movie);
            user = {
              movie: movie,
              theater: this.datas[j].theater,
              show: this.datas[j].show,
              date: this.datas[j].date,
              ticket: this.output[i]
            };
            break;
          }
        }
        let a = user.date.split(" ")
        let months=["Jan","Feb","Mar","Apr","May"]
        let month = [0,1,2,3,4,5,6,7,8,9,10,11]
        // console.log(a)
        // console.log(parseInt(a[3]),month[months.indexOf(a[1])],parseInt(a[2]))
        // console.log(user.date,user.show)
        let f,g;
        if(user.show=="10:30 PM"){
          f=10
          g=30
        }
        else if(user.show=="2:30 PM"){
          f=2
          g=30
        }
        else if(user.show=="6:30 PM"){
          f=6
          g=30
        }
        console.log(parseInt(a[3]),month[months.indexOf(a[1])],parseInt(a[2]),f,g,0)
        let d=new Date();
        let e = new Date(parseInt(a[3]),month[months.indexOf(a[1])],parseInt(a[2]))
        console.log(d,e)
        if(e<d)
        this.input.push(user);
        else
        this.cups.push(user)
      }
      // console.log(this.input);
      console.log(this.cup)
    },
    merge: function() {
      for (let i = 0; i < this.array.length; i++) {
        this.output[i].push(this.input[i]);
      }
    },
    cancel:async function(cup){
      if(confirm("Are you sure! Do you really want to cancel your ticket?")){
        let pre_movie =await this.getMovieId(cup.movie)
        for(let i=0;i<cup.ticket.length;i++){
          this.cancel_ticket(cup.ticket[i],pre_movie,cup)
        }
      }
    },
    getMovieId:async function(movie){
      let url="https://cors-anywhere.herokuapp.com/https://www.themoviedb.org/search/trending?language=en-US&query=" +
        movie;
      let response = await fetch(url);
      let data = await response.json();
      return data.results[0].id
    },
    cancel_ticket:async function(seat,movie,cup){
      console.log(seat,movie,cup)
      this.$http.post("http://localhost:3005/cancelTicket",{seat:seat,movie:movie,theater:cup.theater,show:cup.show,date:cup.date,user:localStorage.getItem("mail")}).then(data=>{
        if(data.body=="Cancellation Successful"){
        window.location.reload(false)
        }
      })
    }
  },
  filters: {
    cut: function(value) {
      return value.slice(0, -2);
    },
    comma: function(value, array) {
      if (value == array[0]) {
        return ":"+value;
      }

      if (value != array[-1]) {
        return "," + value;
      }

      
    }
  },
  created: async function() {
    await this.get();
    await this.set();
  }
};
</script>

<style>
.previous_ticket {
  /* margin: 30px; */
  height: 150px;
  width: 300px;
  background: rgb(165, 247, 247);
  margin: 20px 40px 20px 40px;
  border-radius: 10px;
  padding: 20px;
}
.pre_movie_title {
  font-size: 13px;
  margin-top: 10px;
  font-family: sans-serif;
}
.pmholder {

  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
}
.pre-cancel{
  height: 25px;
  width: 80px;
  background: red;
  color: white;
  border:none;
  border-radius: 2px;
  font-size: 12px;
  font-weight: bolder;
  outline-width: 0;
}
.pre-cancel:hover{
background: rgb(219, 3, 3);
outline-width: 0;
}
.pre_movie_sub_title{
  font-size: 18px;
  font-weight: bolder;
  margin: 50px;
}
</style>
