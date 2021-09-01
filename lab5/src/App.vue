<template>
  <div id="app">
  <header>
    <router-link :to="{name: 'Home', params: {}}"><img src='./marvel.jpeg' class="marvellogo" alt="logo" /></router-link>
        <br />
        <br />
        <router-link class="charlink" :to="{name: 'Characters', params: {page: 0}}">Characters</router-link>
      <router-link class="comicslink" :to="{name: 'Comics', params: {page: 0}}">Comics</router-link>
      <router-link :to="{name: 'Series', params: {page: 0}}">Series</router-link>
      </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.marvellogo{
  height: 100px;
  width: 200px;
}
.charlink{
  padding-right: 30px;
}
.comicslink{
  padding-right: 30px;
}
</style>
