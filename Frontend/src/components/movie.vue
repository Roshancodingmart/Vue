<template>
<div class="movie_main">
     <div class="top_heading">
        <h1>MOVIES</h1>
    </div>
    <div>
        <span>Movie</span>
    </div>
    <div class="loader" v-if="!movies"></div>
    <div class="movie_holder">
        <div :key="movie.id" v-for="movie in movies" class="details">
               <router-link :to="{name:'info',params:{id:movie.id}}"> <img :src="'https://image.tmdb.org/t/p/w300/'+movie.poster_path" alt="photo"></router-link>
        </div>
    </div>
</div>

</template>

<script>
// import router from "../router/index"
export default {
  name: "movie",
  data() {
    return {
        title:"Movie",
        movies:""
    };
  },
  methods:{
      getMovie: async function(){
          let proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let targetUrl =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=1b0dcc7cd2473b7e4881375867e68063&language=en-US&page=1";
    let url = proxyUrl + targetUrl;
    let res = await fetch(url);
    this.movies = await res.json();
    this.movies= this.movies.results
    console.log(this.movies);
      }
  },
  created:function(){
          this.getMovie();
      }
};
</script>

<style>
.top_heading{
    /* z-index: 10; */
    height: 40px;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 50px;
}
.top_heading h1{
    color: white;
    font-family: sans-serif;
    font-weight: bold;
}
.movie_main{
    /* position: relative; */
    background: url("../assets/background.jpg");
    /* filter: grayscale(200%); */
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.movie_holder{
    margin-top: 55px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    cursor: pointer;
}
.details{
    height: 350px;
    width: 270px;
    background: yellowgreen;
    margin: 15px;
    /* padding: 20px; */
    overflow: hidden;
    box-shadow: 2px 2px 14px 3px black;
}
.details img{
    width: 270px;
    height: 350px;
}
.movie_photo{
    height: 200px;
    background: orange;
    overflow: hidden;
}
.movie_photo img{
    height: 200px;
}
</style>
