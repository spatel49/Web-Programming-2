<template>
  <div v-if="this.Characters.data">
    <ul>
      <li v-for="img in this.Characters.data.results" :key="img">
        <h1>{{img.name}}</h1>
        <br />
        <img class="charImage" v-if="5>0" :src="`${img.thumbnail.path}.jpg`" alt="img"  />
        <br />
        <h2> Description: {{img.description}}</h2>
                <br />
        <h2> Characters Link: {{img.urls[0].url}} </h2>
                <br />
        <br />        
      </li>
    <h3> Series Involved In:  </h3>
    <li v-for="img in this.Characters.data.results[0].series.items" :key="img">
        <p> {{img.name}} </p>
    </li>
    <br />
    <h3> Comics Involved In:  </h3>
    <li v-for="img in this.Characters.data.results[0].comics.items" :key="img">
        <p> {{img.name}} </p>
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
  name: "Characters",
  data() {
    return {
      id: this.$route.params.id,
      Characters: { name: null, image: { medium: null }, summary: null },
      name: null
    };
  },
  methods: {
    getCharacters(id) {
        const md5 = require('blueimp-md5');
        const publickey = '45408955448ee04cf6fac893ed3d69e3';
        const privatekey = '8831a079ecca79f705ee4ad80e85b0a5a95f7244';
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
        const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + "&id="; 
      axios
        .get(url + id)
        .then(({ data }) => (this.Characters = data));
    }
  },
  created() {
    this.getCharacters(this.$route.params.id);
  },
  watch: {
    $route() {
      this.getCharacters(this.$route.params.id);
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