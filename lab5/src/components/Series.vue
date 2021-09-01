<template>
  <div v-if="this.Series.data&&this.Series.data.results.length>0">
    <h1>Series List</h1>
    <router-link class="prevlink" v-if="parseInt($route.params.page)>0" :to="{name: 'Series', params: {page: parseInt($route.params.page) - parseInt(1)}}">Prev</router-link>
    <router-link :to="{name: 'Series', params: {page: parseInt($route.params.page) + parseInt(1)}}">Next</router-link>

    <ul>
      <li v-for="img in this.Series.data.results" :key="img">
        <router-link v-if="5>0" :to="{name: 'SingleSeries', params: {id: img.id }}">{{img.title}}
        <br />
        <img class="charImage" v-if="5>0" :src="`${img.thumbnail.path}.jpg`" alt="img" />
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
  name: "Series",
  data() {
    return {
      page: this.$route.params.page,
      Series: { name: null, image: { medium: null }, summary: null },
      name: null
    };
  },
  methods: {
    getSeries(page) {
      const md5 = require('blueimp-md5');
      const publickey = '45408955448ee04cf6fac893ed3d69e3';
      const privatekey = '8831a079ecca79f705ee4ad80e85b0a5a95f7244';
      const ts = new Date().getTime();
      const stringToHash = ts + privatekey + publickey;
      const hash = md5(stringToHash);
      const baseUrl = 'https://gateway.marvel.com:443/v1/public/series';
      const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + "&offset=";
      axios
        .get(url + page)
        .then(({ data }) => (this.Series = data));
    }
  },
  created() {
    this.getSeries(this.$route.params.page);
  },
  watch: {
    $route() {
      this.getSeries(this.$route.params.page);
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