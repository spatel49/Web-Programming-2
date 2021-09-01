<template>
  <div v-if="this.Comics.data&&this.Comics.data.results.length>0">
    <h1>Comics List</h1>
    <router-link class="prevlink" v-if="parseInt($route.params.page)>0" :to="{name: 'Comics', params: {page: parseInt($route.params.page) - parseInt(1)}}">Prev</router-link>
    <router-link :to="{name: 'Comics', params: {page: parseInt($route.params.page) + parseInt(1)}}">Next</router-link>

    <ul>
      <li v-for="img in this.Comics.data.results" :key="img">
        <router-link v-if="5>0" :to="{name: 'SingleComic', params: {id: img.id }}">{{img.title}}
        <br />
        <img class="charImage" v-if="5>0" :src="`${img.thumbnail.path}.jpg`" alt="img"  />
        </router-link>
        <br />
      </li>
    </ul>
  </div>
  <div v-else>
    <h1> 404 ERROR </h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Comics",
  data() {
    return {
      page: this.$route.params.page,
      Comics: { name: null, image: { medium: null }, summary: null },
      name: null
    };
  },
  methods: {
    getComics(page) {
      const md5 = require('blueimp-md5');
      const publickey = '45408955448ee04cf6fac893ed3d69e3';
      const privatekey = '8831a079ecca79f705ee4ad80e85b0a5a95f7244';
      const ts = new Date().getTime();
      const stringToHash = ts + privatekey + publickey;
      const hash = md5(stringToHash);
      const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
      const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + "&offset=";
      axios
        .get(url + page)
        .then(({ data }) => (this.Comics = data));
    }
  },
  created() {
    this.getComics(this.$route.params.page);
  },
  watch: {
    $route() {
      this.getComics(this.$route.params.page);
    }
  }
};
</script>


<style scoped>

div {
  padding: 50px;
}

li {
    list-style-type: none;
    padding: 50px;
}

.charImage{
  width: 300px;
	height: 300px;
}

.prevlink{
  padding-right: 40px;
}
</style>