import { gql } from '@apollo/client';

const UPDATE_IMAGE = gql`
  mutation updateImage(
    $id: ID!
    $url: String
    $posterName: String
    $description: String
    $userPosted: Boolean
    $binned: Boolean
  ) {
    updateImage(
      id: $id
      url: $url
      posterName: $posterName
      description: $description
      userPosted: $userPosted
      binned: $binned
    ) {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const GET_IMAGES = gql`
  query unsplashImages($pageNum: Int) {
    unsplashImages(pageNum: $pageNum) {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const GET_IMAGES_B = gql`
  query binnedImages {
    binnedImages {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const UPLOAD_IMAGE = gql`
  mutation AddImage(
    $url: String!
    $description: String
    $posterName: String
  ) {
    uploadImage(url: $url, description: $description, posterName: $posterName) {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const GET_IMAGES_UP = gql`
  query userPostedImages {
    userPostedImages {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;


export default {
  UPDATE_IMAGE,
  GET_IMAGES,
  GET_IMAGES_B,
  GET_IMAGES_UP,
  UPLOAD_IMAGE
};
