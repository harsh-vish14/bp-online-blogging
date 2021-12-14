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

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $updateUserId: ID!
    $name: String!
    $bio: String!
    $email: String!
    $profileImage: String
  ) {
    updateUser(
      id: $updateUserId
      name: $name
      bio: $bio
      email: $email
      profileImage: $profileImage
    ) {
      success
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword {
    resetPassword {
      success
      message
    }
  }
`;

export const RESET_PASSWORD_WITH_TOKEN = gql`
  mutation ResetPasswordWithToken(
    $token: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    resetPasswordWithToken(
      token: $token
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      success
      message
    }
  }
`;

export const FORGET_PASSWORD = gql`
  mutation forgetPassword($email: String!) {
    forgetPassword(email: $email) {
      success
      message
    }
  }
`;

export const FORGET_PASSWORD_WITH_TOKEN = gql`
  mutation forgetPasswordWithToken(
    $token: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    forgetPasswordWithToken(
      token: $token
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      success
      message
    }
  }
`;
