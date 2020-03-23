<template>
  <div>
    <Header />
<div style="textAlign:center;fontSize:32px;marginTop:80px">Previously Booked Movies</div>
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
      input: []
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
            console.log(j);
            let movie = await this.getMovieName(this.datas[j].movie);
            console.log(movie);
            user = {
              movie: movie,
              theater: this.datas[j].theater,
              show: this.datas[j].show,
              date: this.datas[j].date,
              ticket: this.output[i]
            };
            // console.log(user)
            break;
          }
        }
        this.input.push(user);
      }
      console.log(this.input);
      // this.merge()
    },
    merge: function() {
      for (let i = 0; i < this.array.length; i++) {
        this.output[i].push(this.input[i]);
      }
      console.log(this.output);
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
</style>
