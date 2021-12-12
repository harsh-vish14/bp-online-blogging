import { gql } from "apollo-boost";

export const GET_BLOGS_BY_TITLE = gql`
  query allBlogs($title: String) {
    allBlogs(title: $title) {
      success
      blogs {
        id
        isPrivate
        title
        coverPhoto
        updatedAt
        likes
        creator {
          username
          id
        }
      }
    }
  }
`;

export const CREATOR_BLOGS = gql`
  query GetUserBlogs(
    $username: String!
    $title: String
    $showPrivate: Boolean
  ) {
    getUserBlogs(
      username: $username
      title: $title
      showPrivate: $showPrivate
    ) {
      blogs {
        creator {
          username
          id
        }
        isPrivate
        title
        likes
        coverPhoto
        updatedAt
        id
      }
    }
  }
`;

export const ADD_BLOG = gql`
  mutation addBlog(
    $creator: ID!
    $coverPhoto: String
    $title: String!
    $content: String!
    $isPrivate: Boolean
  ) {
    addBlog(
      creator: $creator
      coverPhoto: $coverPhoto
      title: $title
      content: $content
      isPrivate: $isPrivate
    ) {
      success
      message
      blog {
        creator {
          id
          username
        }
        isPrivate
        title
        likes
        coverPhoto
        updatedAt
        id
      }
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation updateBlog(
    $updateBlogId: ID!
    $coverPhoto: String
    $isPrivate: Boolean
    $title: String!
    $content: String!
  ) {
    updateBlog(
      id: $updateBlogId
      coverPhoto: $coverPhoto
      isPrivate: $isPrivate
      title: $title
      content: $content
    ) {
      success
    }
  }
`;

export const DELETE_BLOG_BY_ID = gql`
  mutation DeleteBlog($deleteBlogId: ID!) {
    deleteBlog(id: $deleteBlogId) {
      success
      message
    }
  }
`;
