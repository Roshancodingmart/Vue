<template>
  <div>
    <div class="loader" v-if="!movie"></div>
    <div class="info" v-if="movie">
      <div class="pic">
        <img
          :src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path"
          alt="picture"
        />
      </div>
      <div class="info_details">
        <span class="info_name" v-if="movie"
          >{{ movie.title }}<span class="year">&nbsp;(2018)</span></span
        >
        <span class="line" v-if="movie">&nbsp;{{ movie.tagline }}</span>
        <div class="get" v-if="movie">
          <span class="rating"
            >Rating:&nbsp;{{ movie.vote_average }}/10 &nbsp;</span
          >
          <span class="time"
            >Runtime:&nbsp;{{ (movie.runtime / 60).toFixed(2) }}hrs</span
          >
          <span class="time"
            >Language:&nbsp;{{ movie.spoken_languages[0].name }}</span
          >
        </div>
        <span class="over">Overview</span>
        <span class="view" v-if="movie">{{ movie.overview }}</span>
        <div class="tag" v-if="movie">
          <button :key="tag.name" v-for="tag in movie.genres" class="tags">
            {{ tag.name }}
          </button>
        </div>
        <div class="money">
          <router-link :to="{ name: 'ticket', params: { id: movie.id } }"
            ><button class="book" @click="book(movie.id)">
              Book Tickets
            </button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      movie: "",
      show: false,
      fav: false,
      watched_bol: false,
      video: "",
      visible: false,
      temp: {
        money: 100
      },
      ticket: false
    };
  },
  methods: {
    book: function() {
      this.ticket = true;
    }
  },
  mounted: async function() {
    console.log(this.id);
    let url =
      "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/movie/" +
      this.id +
      "?api_key=1b0dcc7cd2473b7e4881375867e68063&language=en-US";
    let res = await fetch(url);
    let data2 = await res.json();
    console.log(data2);
    this.movie = data2;
  }
};
</script>

<style>
/* .info_header {
  background-color: #75c74e;
  position: fixed;
  height: 50px;
  width: 100%;
  margin-top: 0;
} */
.info {
  margin: 20px;
  display: flex;
  flex-direction: row;
  background-color: black;
  padding: 30px;
  height: auto;
}
.pic {
  background-color: black;
  width: auto;
  height: 100%;
}
.info_details {
  margin-left: 5%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  /* background-color: black; */
}
.line {
  color: white;
  /* font-weight: bold; */
  font-family: sans-serif;
  font-size: 12px;
  color: rgb(185, 181, 181);
}
.info_name {
  line-height: 50px;
  font-weight: bold;
  font-size: 40px;
  font-family: monospace;
  color: white;
}
.trailer {
  text-decoration: none;
  color: white;
  font-family: sans-serif;
}
.trailer:hover {
  opacity: 0.5;
}

.get {
  display: flex;
  margin: 20px;
}
.rating {
  color: #75c74e;
}
.time {
  color: #75c74e;
  margin-left: 50px;
}
.watchlist {
  height: 35px;
  border: none;
  border-radius: 50px;
  background: transparent;
  outline-width: 0;
  margin-right: 20px;
}
.watchlist:hover {
  background-color: #75c74e;
  color: black;
}
.material-icons {
  color: white;
}
/* .material-icons:hover{
    color: black;
} */
.tag {
  display: inline-flex;
  flex-direction: row;
}
.tags {
  display: inline;

  outline-width: 0;
}
.over {
  font-size: 20px;
  font-family: monospace;
  font-weight: bold;
  color: white;
}
.view {
  margin-top: 20px;
  font-family: sans-serif;
  color: white;
  display: flex;
  text-align: justify;
  line-height: 20px;
  font-size: medium;
}
.tags {
  height: 30px;
  padding-right: 10px;
  padding-left: 10px;
  display: inline;
  color: white;
  background-color: black;
  border: 2px solid #75c74e;
  border-radius: 50px;
  margin: 25px 0px 0px 5px;
}
.tags:hover {
  color: rgb(240, 99, 165);
  border: 2px solid rgb(240, 99, 165);
}
.year {
  color: gray;
  font-size: 30px;
  font-family: "Times New Roman", Times, serif;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 90px;
  height: 90px;
  margin: 100px 0px 0px 45%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.play_list {
  position: relative;
  height: 40px;
  width: auto;
  /* background-color: red; */
}
.info_dropdown {
  position: relative;
  display: inline-block;
}

.info_dropdown-content {
  width: 100px;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: 50px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}
.info_dropdown-content span {
  cursor: pointer;
}
.info_dropdown:hover .dropdown-content {
  display: flex;
  flex-direction: column;
}
.money {
  margin-top: 30px;
}
.book {
  margin-right: 10px;
  height: 30px;
  width: 220px;
  border: 1px solid #f54290;
  background: none;
  color: #f54290;
  font-weight: bolder;
  outline-width: 0;
  cursor: pointer;
}
.buy {
  margin-left: 10px;
  height: 30px;
  width: 180px;
  background: #f54290;
  border: 1px solid #f54290;
  font-weight: bolder;
  outline-width: 0;
  cursor: pointer;
}
.own {
  margin-top: 50px;
  background: transparent;
  color: #f54290;
  font-weight: bold;
}
.own button {
  outline-width: 0;
  margin-left: 30px;
  height: 30px;
  width: 13 0px;
  background: #f54290;
  color: white;
  font-weight: bold;
}
</style>
