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

export const ADD_USER = gql`
  mutation AddUser(
    $name: String!
    $username: String!
    $bio: String!
    $email: String!
    $password: String!
    $profileImage: String
  ) {
    addUser(
      name: $name
      username: $username
      bio: $bio
      email: $email
      password: $password
      profileImage: $profileImage
    ) {
      success
      message
    }
  }
`;

export const GET_COMMENTS_BY_BLOG_ID = gql`
  query CommentsByBlogId($blogId: String!) {
    commentsByBlogId(blogId: $blogId) {
      success
      comments {
        commentedBy {
          username
          name
          profileImage
          id
        }
        id
        message
        updatedAt
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT_IN_BLOG_BY_ID = gql`
  mutation AddCommentToBlog($blogId: String!, $message: String!) {
    addCommentToBlog(blogId: $blogId, message: $message) {
      success
      message
      comments {
        commentedBy {
          name
          id
          username
          profileImage
        }
        id
        message
        createdAt
        updatedAt
      }
    }
  }
`;

export const DELETE_COMMENT_BY_ID = gql`
  mutation DeleteComment($commentId: String!) {
    deleteComment(commentId: $commentId) {
      success
      message
    }
  }
`;
