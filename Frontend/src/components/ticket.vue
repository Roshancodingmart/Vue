<template>
<div>
  <Header/>
    <div style="marginTop:60px">
      <div class="heading" v-if="!visible">
        <div>
          <h2 class="movie_title">{{ data.title }}</h2>
        </div>
        <div class="ticket_body">
          <div>
            <button class="certificate">U</button>
            <span class="vote">{{ data.vote_average }}/10</span>
            <button
              :key="tag.name"
              v-for="tag in data.genres"
              class="ticket_tags"
            >
              {{ tag.name | cap }}
            </button>
            <span class="release_date">{{ data.release_date }}</span>
            <span class="ticket_runtime">{{ data.runtime | runTime }}</span>
          </div>
        </div>
      </div>
      <div v-if="!visible">
        <div class="ticket_date_holder">
          <div style="background:#333545; padding:0px 14px 14px 14px;">
            <img
              :src="'https://image.tmdb.org/t/p/w300/' + data.poster_path"
              alt=""
            />
          </div>
          <div>
            <div style="display:flex; padding: 20px 0px 0px 50px;">
              <div
                class="ticket_date"
                :id="date.id"
                :key="date.top"
                v-for="date in dates"
                @click="setDate(date)"
              >
                <div>{{ date.top }}</div>
                <div>{{ date.bottom }}</div>
              </div>
            </div>
            <div class="theater_list">
              <div :key="theater" v-for="theater in theaters" id="theater">
                {{ theater }}
                <button v-if="check('10:15:00')" class="show_time" @click="show(theater, '10:30 AM')">10:30 AM</button>
                <button v-if="check('14:15:00')" class="show_time" @click="show(theater, '2:30 PM')">2:30 PM</button>
                <button v-if="check('18:15:00')" class="show_time" @click="show(theater, '6:30 PM')">6:30 PM</button>
              </div>
            </div>
            <div style="margin:20px 0px 0px 210px; fontSize:12px">
              <span>Select number of tickets</span>
            </div>
            <div style="margin:20px 0px 0px 80px">
              <button
                :key="tick"
                :id="tick"
                v-for="tick in 10"
                class="no-of-tickets"
                @click="ticketNo(tick)"
              >
                {{ tick }}
              </button>
            </div>
            <div style="margin:20px 0px 0px 230px;">
              <button class="book-ticket" @click="Book()">Book</button>
            </div>
          </div>
        </div>
      </div>
      <div style="textAlign:center;fontWeight:bold;fontSize:24px;marginTop:50px" v-if="visible" ><span>{{ theater }}{{ time }}</span></div>
      <div style="textAlign:center" v-if="visible">
         <button class="big"><span>Ticket 1-45</span><br><span>Rs:120</span></button>
         <button class="big"><span>Ticket 46-100</span><br><span>Rs:100</span></button>
      </div>
      <div class="ticket_main" v-if="visible">
        <div class="seats">
          <button
            :key="seat"
            v-for="seat in 100"
            :id="seat"
            @click="book(seat)"
            style="background:black; color:white ; outline:none"
          >
            {{ seat }}
          </button>
        </div>
        <button
          v-if="tick_total >= tick_no"
          style="
        width: 200px;
        margin-left: 42%;
    "
          @click="confirm()"
        >
          Pay Rs:{{ total }}
        </button>
      </div>
      <div class="model-holder" v-if="show_bill">
        <div class="model">
          <span>{{ theater | cut }}</span>
          <table class="bill_table">
            <thead>
              <tr>
                <th>Ticket(s)</th>
                <th>No.of.tickets</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="tic">
                  <span v-for="ticket in tickets" :key="ticket">{{
                    ticket | comma
                  }}</span>
                </td>
                <td class="tic">
                  <span>{{ tick_total }}</span>
                </td>
                <td class="tic">
                  <span>Rs:{{ total }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <hr style="borderTop:1px dashed grey" />
          <table>
            <tbody>
              <tr>
                <th style="width:100px;"></th>
                <th style="width:200px;">
                  <span>SGST</span>
                </th>
                <td style="width:150px;" class="tic2">{{ tick_total }}x9</td>
              </tr>
              <tr>
                <th style="width:180px"></th>
                <th>
                  <span>CGST</span>
                </th>
                <td style="width:100px" class="tic2">{{ tick_total }}x9</td>
              </tr>
            </tbody>
          </table>
          <hr style="borderTop:1px dashed grey" />
          <table>
            <tbody>
              <tr>
                <th style="width:180px;"></th>
                <th style="width:200px;">
                  <span>Total</span>
                </th>
                <td style="width:150px;" class="tic2">
                  Rs:{{ total | final_bill(tick_total) }}
                </td>
              </tr>
            </tbody>
          </table>
          <hr style="borderTop:1px dashed grey"/>
          
          <button class="final_pay" @click="pay_bill">
            Pay Rs.{{ total | final_bill(tick_total) }}
          </button>
          
        </div>
      </div>
    </div>
    
</div>
</template>

<script>
import Header from "./Header";
export default {
  components:{
    Header
  },
  data() {
    return {
      id: this.$route.params.id,
      total: 0,
      dates: [],
      theaters: [
        "Karpagam Theatres  : ",
        "KG Cinemas :",
        "Murugan Cinemas A/C :"
      ],
      times: ["10:30 AM", "2:30 PM", "6:30 PM"],
      show_date: "",
      show_date1:"",
      theater: "",
      time: "",
      visible: false,
      data: "",
      tick_no: 1,
      tick_total: 0,
      bill: false,
      show_bill: false,
      tickets: []
    };
  },
  methods: {
    book: function(seat) {
      if (document.getElementById(seat).style.background === "lightgreen") {
        document.getElementById(seat).style.background = "black";
        document.getElementById(seat).style.color = "white";
        this.tick_total = this.tick_total - 1;
        let index = this.tickets.indexOf(seat);
        this.tickets.splice(index, 1);
        console.log(this.tickets);
        if (seat <= 45) {
          this.total = this.total - 120;
        } else {
          this.total = this.total - 100;
        }
      } else if (
        document.getElementById(seat).style.background === "lightgreen" ||
        document.getElementById(seat).style.background != "lightblue"
      ) {
        if (this.tick_no > this.tick_total) {
          if (this.tickets.length > 0) {
            this.tickets.push(",");
          }
          this.tickets.push(seat);
          console.log(this.tickets);
          document.getElementById(seat).style.background = "lightgreen";
          document.getElementById(seat).style.color = "black";
          this.tick_total = this.tick_total + 1;
          if (seat <= 45) {
            this.total = this.total + 120;
          } else {
            this.total = this.total + 100;
          }
        }
      }
    },
    Day: function() {
      let d = new Date();
      let e = new Date(new Date().getTime() + 3600000 * 24);
      let f = new Date(new Date().getTime() + 3600000 * 48);


      for (let i = this.show_date; i < this.show_date + 3; i++) {
        if (i.toString() == d.toString().slice(8, 10)) {
          this.show_date = d.toString().slice(0, 15);

        }
        if (i.toString() == e.toString().slice(8, 10)) {
          this.show_date = e.toString().slice(0, 15);

        }
        if (i.toString() == f.toString().slice(8, 10)) {
          this.show_date = f.toString().slice(0, 15);
 
        }
      }

    },
    pay_bill: function() {
      this.show_bill=false
      this.bill = true;
      this.Day();
      var otpGenerator = require("otp-generator");
          let unique_id = otpGenerator.generate(12);
      for (let i = 1; i <= 100; i++) {
        if (document.getElementById(i).style.background === "lightgreen") {
          // var otpGenerator = require("otp-generator");
          let key = otpGenerator.generate(12);
          console.log(i, this.id, this.theater, this.time, this.show_date, key);
          this.$http
            .post("http://localhost:3005/ticket", {
              seat_no: i,
              movie_id: this.id,
              theater: this.theater,
              time: this.time,
              date: this.show_date,
              key: key,
              id:unique_id,
              mail:localStorage.getItem("mail")
            })
            .then(data => {
              console.log(data);
              // document.getElementById(i).style.background = "lightblue";
              // document.getElementById(i).style.color = "black";
              let bill={
                id:this.id,
                movie:this.data.title,
                lan:this.data.original_language,
                theater:this.theater,
                time:this.time,
                show:this.show_date,
                seat:this.tickets
              }
              this.$router.push({name:'bill',params:{props:bill}})
            });
        }
      }
      console.log(this.total);
      this.total = 0;
    },
    confirm: function() {
      this.show_bill = true;
    },
    show: function(id, time) {
      this.theater = id;
      this.time = time;
      // this.visible = true;
      console.log(this.theater, this.time);
    },
    setDate: function(date) {
      this.show_date = date.top;
      // console.log(date.id)
      for (let i = 101; i < 104; i++) {
        // console.log(i==date.id)
        if (i == date.id) {
          // console.log("blue")
          document.getElementById(i).style.background = "pink";
        } else {
          document.getElementById(i).style.background = "#90dcdf";
        }
      }
    },
    Date: function() {
      let today = new Date();
      let date = today.getDate();
      this.show_date = date;

      this.dates = [
        { top: date, bottom: "TODAY", id: 101 },
        { top: date + 1, bottom: "TOM", id: 102 },
        { top: date + 2, bottom: "SUN", id: 103 }
      ];
    },
    verify: async function() {
      this.Day();
      console.log(this.id, this.theater, this.time, this.show_date);
      await this.$http
        .post("http://localhost:3005/getTicket", {
          movie_id: this.id,
          theater: this.theater,
          show: this.time,
          date: this.show_date
        })
        .then(resp => {
          // console.log(resp.body!="not found")
          if (resp.body != "not found") {
            for (let i = 0; i < resp.body.length; i++) {
              document.getElementById(resp.body[i].seat).style.background =
                "lightblue";
              document.getElementById(resp.body[i].seat).style.color = "black";
            }
          }
        });
    },
    Title: async function() {
      let url =
        "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/movie/" +
        this.id +
        "?api_key=1b0dcc7cd2473b7e4881375867e68063&language=en-US";
      let resp = await fetch(url);
      this.data = await resp.json();
      console.log(this.data);
    },
    ticketNo: function(id) {
      this.tick_no = id;
      for (let i = 1; i <= 10; i++) {
        if (i == id) {
          document.getElementById(i).style.background = "#2ec492";
          document.getElementById(i).style.border = "#2ec492";
        } else {
          document.getElementById(i).style.background = "white";
          document.getElementById(i).style.border = "1px solid grey";
        }
      }
    },
    Book: function() {
      this.visible = true;
      this.verify();
      // console.log(this.show_date, this.theater, this.time, this.tick_no);
    },
    check:function(time){
      this.Day();
      
      let a=new Date()
      // console.log(a.toString().slice())
      if((this.show_date==a.toString().slice(0,15))){
        console.log(a.toString().slice(16,24),time,a.toString().slice(16,24)==time)
        if((a.toString().slice(16,24)<time)){
          return 1
        }
        return 0
      }
      else return 1

    }
  },
  filters: {
    cap: function(value) {
      return value.toUpperCase();
    },
    runTime: function(value) {
      var num = value;
      var hours = num / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + " hrs " + rminutes + " mins";
    },
    cut: function(value) {
      console.log(value.slice(0, -2));
      return value.slice(0, -2);
    },
    comma: function(value) {
      return value;
    },
    final_bill: function(value, total) {
      return value + 18 * total;
    },
    measure:function(value,time,show){
      let a = new Date()
      let b=a.toString().slice(16,23)
      console.log(show,a.toString().slice(0,15),show==a.toString().slice(0,15))
      if(b>time.slice(0,-3)+":00" && (show==a.toString().slice(0,15))){
        // return value
        console.log(value)
      }
      else{
        return value
      }
    }
  },
  created: function() {
    this.Date();
    this.Title();
    this.Day();
  },
  mounted: function() {
    document.getElementById("101").style.background = "pink";
    document.getElementById("1").style.background = "#2ec492";
    document.getElementById("1").style.border = "#2ec492";
  }
};
</script>

<style>
.big{
  width: 100px;
    border: 1px solid turquoise;
    background: none;
    margin: 10px;
    font-size: 12px;
    font-family: sans-serif;
    padding: 6px;
    color: grey;
}
.heading {
  padding: 10px;
  height: 115px;
  width: 100%;
  background: #333545;
  color: white;
  display: flex;
  flex-direction: column;
}
.no-of-tickets {
  color: black;
  background: white;
  border: 1px solid grey;
  height: 30px;
  width: 30px;
  margin: 5px;
  text-align: center;
}
.alt {
  color: white;
  background: #2ec492;
  border: 1px solid #2ec492;
}
.no-of-tickets:hover {
  background: #2ec492;
  color: black;
  border: 1px solid #2ec492;
}
.movie_title {
  margin: 20px 0px 0px 12px;
  font-size: 25px;
  font-family: monospace;
}
.movie_title:hover {
  text-decoration: underline;
  cursor: pointer;
}
.certificate {
  background: none;
  border-radius: 17px;
  color: white;
  border: 1px solid white;
  width: 20px;
  margin-right: 10px;
  font-size: 10px;
  padding: 2px;
  margin-left: 10px;
  cursor: progress;
  outline-width: 0;
}
.vote {
  font-size: 12px;
}
.ticket_tags {
  border: 1px solid white;
  background: none;
  color: white;
  font-size: 8px;
  margin: 0px 0px 0px 10px;
  border-radius: 50px;
  cursor: text;
}
.release_date {
  margin: 0px 0px 0px 10px;
  font-size: 12px;
}
.ticket_runtime {
  font-size: 12px;
  margin-left: 10px;
}
.ticket_main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: lemonchiffon;

  /* width: 500px; */
  text-align: center;
  padding: 50px;
}
.ticket_body {
  display: flex;
}
.seats {
  margin-left: 28%;
  width: 530px;
  /* background: red; */
}
.seats button {
  width: 30px;
  height: 30px;
  margin: 2.5px;
  font-size: 12px;
  text-align: center;
  border: none;
  outline-width: 0;
  border-radius: 3px;
}
.ticket_date_holder {
  display: flex;
  /* margin: 50px 0px 20px 50px; */
}
.ticket_date {
  display: flex;
  background: #90dcdf;
  border-radius: 5px;
  margin: 10px;
  padding: 7px;
  height: 50px;
  width: 60px;
  text-align: center;
  color: black;
  font-family: sans-serif;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.ticket_date:hover {
  color: blue;
}
.theater_list {
  margin-left: 50px;
  padding: 10px;
}
.show_time {
  background: none;
  border: 1px solid lightgreen;
  margin: 10px;
}
.book-ticket {
  background: blue;
  border: none;
  color: white;
  border-radius: 3px;
  height: 30px;
  width: 100px;
  margin-top: 20px;
}
.model-holder {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
}
.model {
  width: 35vw;
  height: 65vh;
  background-color: white;
  border-radius: 10px;
  color: grey;
  text-align: center;
  padding: 40px 30px 30px 30px;
}
.bill_table {
  margin-top: 20px;
  width: 100%;
}
.bill_table thead {
  color: gray;
  font-size: 15px;
}
.tic {
  margin-top: 100px;
  padding-top: 20px;
  font-size: 13px;
}
.tic2 {
  /* padding-top: 20px; */
  font-size: 13px;
}
.final_pay {
  font-size: 13px;
  /* padding: 5px; */
  /* color: #2ec492; */
}
</style>
