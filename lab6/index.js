const { ApolloServer, gql } = require('apollo-server');
const lodash = require('lodash');
const uuid = require('uuid');
const axios = require('axios');
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const baseUrl = 'https://api.unsplash.com/photos?client_id=';
const url2 = baseUrl + 'yhRVyMgDr3tkMX51MpBVJMmbbbD2qbIKwrbjt2B8hv8';

const typeDefs = gql`
  type Query {
    unsplashImages(pageNum: Int): [ImagePost]
    binnedImages: [ImagePost]
    userPostedImages: [ImagePost]
  }

  type ImagePost {
    id: ID!
    url: String!
    posterName: String!
    description: String
    userPosted: Boolean!
    binned: Boolean!
  }

  type Mutation {
    uploadImage(url: String!, description: String, posterName: String): ImagePost
    updateImage(id: ID!, url: String, posterName: String, description: String, userPosted: Boolean, binned: Boolean): ImagePost
    deleteImage(id: ID!): ImagePost
  }
`;


const resolvers = {
  Query: {
    async unsplashImages(_, args) {
      let [id, url, posterName, description, binned] = ["N/A", "N/A", "N/A", "N/A", false];
      let imagedata = await axios.get(url2);
      if (args.pagenum){
        imagedata = await axios.get(url2 + '&page=' + args.pageNum);
      }
      const next_image = await imagedata && imagedata.data.map(async (image) =>{
        if (image.id){
          id = image.id
          binned = await client.sismemberAsync("bin", image.id);
        }
        if (image.urls.small){
          url = image.urls.small;
        }
        if (image.user.username){
          posterName = image.user.username;
        }
        if (image.description){
          description = image.description;
        }
        return {
          id: id,
          url: url,
          posterName: posterName,
          description: description,
          userPosted: false,
          binned: binned
        };
      });
      return next_image;
    },
    async binnedImages() {
      const members = await client.smembersAsync("bin");
      let binned_images = [];
      for (const mem of members){
            const val = await client.getAsync(mem);
            if (JSON.parse(val).binned) {
                binned_images.push(JSON.parse(val));
            }
      }
      return binned_images;
    },
    async userPostedImages() {
      const keys = await client.keysAsync('*');
      let user_images = [];
      for (const key of keys){
          if (key != "bin") {
            const val = await client.getAsync(key);
            if (JSON.parse(val).userPosted) {
                user_images.push(JSON.parse(val));
            }
          }
      }
      return user_images;
    }
  },
  Mutation: {
    async uploadImage(_, args) {
      let [url, description, posterName] = ["N/A", "N/A", "N/A"];
      if (args.url){
        url = args.url;
      }
      if (args.description) {
        description = args.description;
      }
      if (args.posterName) {
        posterName = args.posterName;
      }
      const user_image = {
          id: uuid.v4(),
          url: url,
          posterName: posterName,
          description: description,
          userPosted: true,
          binned: false
      };
      const upload_img = await client.setAsync(user_image.id, JSON.stringify(user_image));
      return user_image;
  },
  async updateImage(_, args) {
    let main_img = {};
    const get_img = await client.getAsync(args.id);
    if (get_img) {
        main_img = JSON.parse(get_img);
    }
    if (args.url) {
      main_img.url = args.url;
    }
    if (args.description) {
      main_img.description = args.description;
    }
    if (args.posterName) {
      main_img.posterName = args.posterName;
    }
    if (args.userPosted) {
      main_img.userPosted = args.userPosted;
    }
    if (args.binned !== null) {
      main_img.binned = args.binned;
    }
    const updated_image = main_img;
    if (!main_img.binned && !main_img.userPosted){
      const delKey = await client.delAsync(updated_image.id);
      const remImg = await client.srem("bin", updated_image.id);
    } else {
      const setKey = await client.setAsync(updated_image.id, JSON.stringify(updated_image));
    }
    if (main_img.binned) {
        const addImg = await client.saddAsync("bin", updated_image.id);
    } else if (main_img.userPosted){
        const remImg = await client.srem("bin", updated_image.id);
    }
    return updated_image;
  },
  async deleteImage(_, args) {
    const getImg = await client.getAsync(args.id);
    const del = await client.delAsync(args.id);
    const rem = await client.srem("bin", args.id);
    if (getImg) {
        return JSON.parse(getImg);
    } else {
        return "Could not delete image";
    }
  }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});
