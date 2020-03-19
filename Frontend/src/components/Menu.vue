<template>
  <div class="dropdown">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <button class="dropbtn">
      <i class="material-icons">
        menu
      </i>
    </button>
    <div class="dropdown-content">
      <hr />
  <router-link to="/simple">SIMPLE CALCULATOR </router-link>

      <hr />
      <router-link to="/scifi">SCI-FI CALCULATOR</router-link>
  
      <hr />
      <router-link to="/age">AGE CALCULATOR</router-link>

      <hr />
      <router-link to="/bmi">BMI CALCULATOR</router-link>

      <hr />
      <router-link to="/movie">Movie API</router-link>
      <hr/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu"
};
</script>

<style>
.dropbtn {
  background-color: blue;
  color: white;
  padding: 16px 20px 12px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
  outline-width: 0;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  padding: 30px 10px 10px 10px;
  font-size: 13px;
  display: none;
  position: absolute;
  background-color: rgb(206, 221, 236);
  min-width: 200px;
  height: 880%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-family: sans-serif;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
  font-family: sans-serif;
  text-decoration: none;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: rgb(7, 7, 185);
}
</style>
