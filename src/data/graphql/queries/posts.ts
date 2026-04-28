import { gql } from 'graphql-request';

export const GET_POSTS = gql`
  query GetPosts($limit: Int, $offset: Int, $tag: String) {
    posts(limit: $limit, offset: $offset, tag: $tag) {
      items {
        id
        title
        excerpt
        body
        createdAt
        author {
          id
          name
          avatar
        }
        tags
      }
      total
      hasMore
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      excerpt
      body
      createdAt
      author {
        id
        name
        avatar
      }
      tags
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      excerpt
      body
      createdAt
      author {
        id
        name
      }
      tags
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
