<template>
  <div class="ticket1_holder">
    <div class="ticket1">
      <a></a>
      <div class="bill_title">
          <span>{{data.theater | cut}}</span>
      </div>
      <div>
        <span style="fontSize:15px">{{data.movie}}({{data.lan}})</span>
      </div>
      <div style="marginTop:10px" class="nope">
          <div><span>{{data.show}}</span></div>
          <div>
              <span>{{data.time}} {{data.time | noon}}</span>
          </div>
      </div>
      <div style="marginTop:10px">
          <span>{{data.seat | classType}}</span>
      </div>
      <div style="marginTop:10px">
          Seat no(s): <span :key="y" v-for="y in data.seat">{{y}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
    data(){
        return{
            data:this.$route.params.props
            
        }
    },methods:{

    },
    filters:{
        cut:function(value){
            return value.slice(0,-2)
        },
        noon:function(value){
            console.log(value.slice(-2,-1))
            if(value.slice(-2,-1)=="A"){
                return("Morning")
            }
            else if(value.slice(-2,-1)=="P"){
                return("Afternoon")
            }
        },
        classType:function(value){
            if(value[0]<=45){
                return("First Class")
            }
            else{
                return("Second Class")
            }
        }
    },
    created:function(){
        console.log(this.data)
        // console.log(this.tickets)
    }
};
</script>

<style>
.nope{
    display: flex;
    justify-content: space-between;
}
.bill_title{width: auto;
    font-size: 20px;
    text-align: center;
    font-family: sans-serif;
    /* background: grey;
    color: white; */
    margin-bottom:10px ;
}
.ticket1_holder {
  display: flex;
  justify-content: center;
  padding: 50px;
}
.ticket1 {
  height: 200px;
  width: 550px;
  font-family: Arial;
  font-size: 12px;
  font-weight: bold;
  position: relative !important;
  background: rgb(196, 238, 223);
  float: left;
  padding: 10px 75px 10px 75px;
}
.ticket1:after {
  content: "";
  position: absolute !important;
  z-index: 100;
  top: 0;
  left: 0;
  border-right: #fff 25px solid;
  border-bottom: #fff 25px solid;
  -moz-border-radius: 0 0 25px 0;
  -webkit-border-radius: 0 0 25px 0;
  border-radius: 0 0 25px 0;
  background-color: white;
}

.ticket1:before {
  content: "";
  position: absolute !important;
  z-index: 100;
  top: 0;
  right: 0;
  border-left: #fff 25px solid;
  border-bottom: #fff 25px solid;
  -moz-border-radius: 0 0 0 20px;
  -webkit-border-radius: 0 0 0 20px;
  border-radius: 0 0 0 25px;
}
.ticket1 a {
  padding: 35px 35px 35px 20px;
  text-decoration: none;
  color: #fff;
  white-space: nowrap;
}

.ticket1 a:hover {
  color: rgba(0, 0, 0, 0.5);
}

.ticket1 a:after {
  content: "";
  position: absolute !important;
  z-index: 100;
  bottom: 0;
  left: 0;
  border-right: #fff 25px solid;
  border-top: #fff 25px solid;
  -moz-border-radius: 0 25px 0 0;
  -webkit-border-radius: 0 25px 0 0;
  border-radius: 0 25px 0 0;
}

.ticket1 a:before {
  content: "";
  position: absolute !important;
  z-index: 1000;
  bottom: 0;
  right: 0;
  border-left: #fff 25px solid;
  border-top: #fff 25px solid;
  -moz-border-radius: 25px 0 0 0;
  -webkit-border-radius: 25px 0 0 0;
  border-radius: 25px 0 0 0;
}
</style>
