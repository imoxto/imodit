import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit["headers"]
) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ApiError = {
  __typename?: "ApiError";
  fields?: Maybe<Array<Scalars["String"]>>;
  message?: Maybe<Scalars["String"]>;
  type: ErrorType;
};

export type Comment = {
  __typename?: "Comment";
  author: User;
  authorId: Scalars["String"];
  content: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["String"];
  post: Post;
  postId: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type CommentResponse = {
  __typename?: "CommentResponse";
  comment?: Maybe<Comment>;
  error?: Maybe<ApiError>;
};

export type CreateCommentInput = {
  content: Scalars["String"];
  postId: Scalars["String"];
};

export type CreatePostInput = {
  content: Scalars["String"];
  title: Scalars["String"];
  visibility?: InputMaybe<Visibility>;
};

export type DeleteResponse = {
  __typename?: "DeleteResponse";
  error?: Maybe<ApiError>;
  id?: Maybe<Scalars["String"]>;
};

/** Basic errors */
export enum ErrorType {
  Auth = "auth",
  Form = "form",
  Internal = "internal",
}

export type LoginInput = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createComment: CommentResponse;
  createPost: PostResponse;
  deleteComment: CommentResponse;
  deletePost: DeleteResponse;
  login: UserResponse;
  logout: Scalars["String"];
  register: UserResponse;
  updateComment: CommentResponse;
  updatePost: PostResponse;
};

export type MutationCreateCommentArgs = {
  CreateCommentInput: CreateCommentInput;
};

export type MutationCreatePostArgs = {
  CreatePostInput: CreatePostInput;
};

export type MutationDeleteCommentArgs = {
  CommentId: Scalars["String"];
};

export type MutationDeletePostArgs = {
  postId: Scalars["String"];
};

export type MutationLoginArgs = {
  LoginInput: LoginInput;
};

export type MutationRegisterArgs = {
  RegisterInput: RegisterInput;
};

export type MutationUpdateCommentArgs = {
  CommentId: Scalars["String"];
  UpdateCommentInput: UpdateCommentInput;
};

export type MutationUpdatePostArgs = {
  postId: Scalars["String"];
  UpdatePostInput: UpdatePostInput;
};

export type Post = {
  __typename?: "Post";
  author: User;
  authorId: Scalars["String"];
  comments: Array<Comment>;
  content: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["String"];
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  visibility: Visibility;
};

export type PostResponse = {
  __typename?: "PostResponse";
  error?: Maybe<ApiError>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: "Query";
  findAllComments: Array<Comment>;
  findAllPosts: Array<Post>;
  findAllUsers: Array<User>;
  findOneComment: Comment;
  findOnePost?: Maybe<Post>;
  findOneUser?: Maybe<User>;
  me: UserResponse;
  ping: Scalars["String"];
};

export type QueryFindOneCommentArgs = {
  id: Scalars["String"];
};

export type QueryFindOnePostArgs = {
  id: Scalars["String"];
};

export type QueryFindOneUserArgs = {
  id: Scalars["String"];
};

export type RegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type UpdateCommentInput = {
  content: Scalars["String"];
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  visibility?: InputMaybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  comments: Array<Comment>;
  createdAt: Scalars["DateTime"];
  email?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  posts: Array<Post>;
  updatedAt: Scalars["DateTime"];
  username: Scalars["String"];
  visibility: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  error?: Maybe<ApiError>;
  user?: Maybe<User>;
};

/** The basic visibility */
export enum Visibility {
  Private = "private",
  Public = "public",
}

export type RegularUserFragment = {
  __typename?: "User";
  id: string;
  email?: string | null;
  username: string;
  visibility: string;
  updatedAt: any;
  createdAt: any;
};

export type RegularErrorFragment = {
  __typename?: "ApiError";
  type: ErrorType;
  message?: string | null;
  fields?: Array<string> | null;
};

export type RegularCommentFragment = {
  __typename?: "Comment";
  id: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  author: { __typename?: "User"; id: string; username: string };
  post: { __typename?: "Post"; id: string; title: string; content: string; authorId: string };
};

export type RegularPostFragment = {
  __typename?: "Post";
  id: string;
  title: string;
  content: string;
  visibility: Visibility;
  createdAt: any;
  updatedAt: any;
  author: { __typename?: "User"; id: string; username: string };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: string };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "UserResponse";
    error?: { __typename?: "ApiError"; type: ErrorType; message?: string | null; fields?: Array<string> | null } | null;
    user?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      username: string;
      visibility: string;
      updatedAt: any;
      createdAt: any;
    } | null;
  };
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    error?: { __typename?: "ApiError"; type: ErrorType; message?: string | null; fields?: Array<string> | null } | null;
    user?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      username: string;
      visibility: string;
      updatedAt: any;
      createdAt: any;
    } | null;
  };
};

export type CreateCommentMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type CreateCommentMutation = {
  __typename?: "Mutation";
  createComment: {
    __typename?: "CommentResponse";
    error?: { __typename?: "ApiError"; type: ErrorType; message?: string | null; fields?: Array<string> | null } | null;
    comment?: {
      __typename?: "Comment";
      id: string;
      content: string;
      createdAt: any;
      updatedAt: any;
      author: { __typename?: "User"; id: string; username: string };
      post: { __typename?: "Post"; id: string; title: string; content: string; authorId: string };
    } | null;
  };
};

export type UpdateCommentMutationVariables = Exact<{
  commentId: Scalars["String"];
  updateCommentInput: UpdateCommentInput;
}>;


export type UpdateCommentMutation = {
  __typename?: "Mutation";
  updateComment: {
    __typename?: "CommentResponse";
    error?: { __typename?: "ApiError"; type: ErrorType; message?: string | null; fields?: Array<string> | null } | null;
    comment?: {
      __typename?: "Comment";
      id: string;
      content: string;
      createdAt: any;
      updatedAt: any;
      author: { __typename?: "User"; id: string; username: string };
      post: { __typename?: "Post"; id: string; title: string; content: string; authorId: string };
    } | null;
  };
};

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars["String"];
}>;


export type DeleteCommentMutation = {
  __typename?: "Mutation";
  deleteComment: {
    __typename?: "CommentResponse";
    error?: { __typename?: "ApiError"; type: ErrorType; message?: string | null; fields?: Array<string> | null } | null;
  };
};

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars["String"];
  updatePostInput: UpdatePostInput;
}>;


export type UpdatePostMutation = {
  __typename?: "Mutation";
  updatePost: {
    __typename?: "PostResponse";
    error?: { __typename?: "ApiError"; type: ErrorType; message?: string | null; fields?: Array<string> | null } | null;
    post?: {
      __typename?: "Post";
      id: string;
      title: string;
      content: string;
      visibility: Visibility;
      createdAt: any;
      updatedAt: any;
      author: { __typename?: "User"; id: string; username: string };
    } | null;
  };
};

export type CreatePostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;

export type CreatePostMutation = {
  __typename?: "Mutation";
  createPost: {
    __typename?: "PostResponse";
    error?: { __typename?: "ApiError"; type: ErrorType; message?: string | null; fields?: Array<string> | null } | null;
    post?: {
      __typename?: "Post";
      id: string;
      title: string;
      content: string;
      visibility: Visibility;
      createdAt: any;
      updatedAt: any;
      author: { __typename?: "User"; id: string; username: string };
    } | null;
  };
};

export type DeletePostMutationVariables = Exact<{
  postId: Scalars["String"];
}>;

export type DeletePostMutation = {
  __typename?: "Mutation";
  deletePost: {
    __typename?: "DeleteResponse";
    error?: { __typename?: "ApiError"; type: ErrorType; message?: string | null; fields?: Array<string> | null } | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "UserResponse";
    error?: { __typename?: "ApiError"; type: ErrorType; message?: string | null; fields?: Array<string> | null } | null;
    user?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      username: string;
      visibility: string;
      updatedAt: any;
      createdAt: any;
    } | null;
  };
};

export type FindAllPostsQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllPostsQuery = {
  __typename?: "Query";
  findAllPosts: Array<{
    __typename?: "Post";
    id: string;
    title: string;
    content: string;
    visibility: Visibility;
    createdAt: any;
    updatedAt: any;
    author: { __typename?: "User"; id: string; username: string };
  }>;
};

export type FindOnePostQueryVariables = Exact<{
  postId: Scalars["String"];
}>;

export type FindOnePostQuery = {
  __typename?: "Query";
  findOnePost?: {
    __typename?: "Post";
    id: string;
    title: string;
    content: string;
    visibility: Visibility;
    createdAt: any;
    updatedAt: any;
    author: { __typename?: "User"; id: string; username: string };
  } | null;
};

export type FindOneUserQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type FindOneUserQuery = {
  __typename?: "Query";
  findOneUser?: {
    __typename?: "User";
    id: string;
    email?: string | null;
    username: string;
    visibility: string;
    updatedAt: any;
    createdAt: any;
  } | null;
};

export const RegularUserFragmentDoc = `
    fragment regularUser on User {
  id
  email
  username
  visibility
  updatedAt
  createdAt
}
    `;
export const RegularErrorFragmentDoc = `
    fragment regularError on ApiError {
  type
  message
  fields
}
    `;
export const RegularCommentFragmentDoc = `
    fragment regularComment on Comment {
  id
  content
  author {
    id
    username
  }
  post {
    id
    title
    content
    authorId
  }
  createdAt
  updatedAt
}
    `;
export const RegularPostFragmentDoc = `
    fragment regularPost on Post {
  id
  title
  content
  visibility
  author {
    id
    username
  }
  createdAt
  updatedAt
}
    `;
export const LogoutDocument = `
    mutation Logout {
  logout
}
    `;
export const useLogoutMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>,
  headers?: RequestInit["headers"]
) =>
  useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
    ["Logout"],
    (variables?: LogoutMutationVariables) =>
      fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers)(),
    options
  );
export const RegisterDocument = `
    mutation Register($registerInput: RegisterInput!) {
  register(RegisterInput: $registerInput) {
    error {
      ...regularError
    }
    user {
      ...regularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const useRegisterMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>,
  headers?: RequestInit["headers"]
) =>
  useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
    ["Register"],
    (variables?: RegisterMutationVariables) =>
      fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables, headers)(),
    options
  );
export const LoginDocument = `
    mutation Login($loginInput: LoginInput!) {
  login(LoginInput: $loginInput) {
    error {
      ...regularError
    }
    user {
      ...regularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const useLoginMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
  headers?: RequestInit["headers"]
) =>
  useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
    ["Login"],
    (variables?: LoginMutationVariables) =>
      fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
    options
  );
export const CreateCommentDocument = `
    mutation CreateComment($createCommentInput: CreateCommentInput!) {
  createComment(CreateCommentInput: $createCommentInput) {
    error {
      ...regularError
    }
    comment {
      ...regularComment
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularCommentFragmentDoc}`;
export const useCreateCommentMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>,
  headers?: RequestInit["headers"]
) =>
  useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
    ["CreateComment"],
    (variables?: CreateCommentMutationVariables) =>
      fetcher<CreateCommentMutation, CreateCommentMutationVariables>(
        client,
        CreateCommentDocument,
        variables,
        headers
      )(),
    options
  );
export const UpdateCommentDocument = `
    mutation UpdateComment($commentId: String!, $updateCommentInput: UpdateCommentInput!) {
  updateComment(CommentId: $commentId, UpdateCommentInput: $updateCommentInput) {
    error {
      ...regularError
    }
    comment {
      ...regularComment
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularCommentFragmentDoc}`;
export const useUpdateCommentMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<UpdateCommentMutation, TError, UpdateCommentMutationVariables, TContext>,
  headers?: RequestInit["headers"]
) =>
  useMutation<UpdateCommentMutation, TError, UpdateCommentMutationVariables, TContext>(
    ["UpdateComment"],
    (variables?: UpdateCommentMutationVariables) =>
      fetcher<UpdateCommentMutation, UpdateCommentMutationVariables>(
        client,
        UpdateCommentDocument,
        variables,
        headers
      )(),
    options
  );
export const DeleteCommentDocument = `
    mutation DeleteComment($commentId: String!) {
  deleteComment(CommentId: $commentId) {
    error {
      ...regularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export const useDeleteCommentMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>,
  headers?: RequestInit["headers"]
) =>
  useMutation<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>(
    ["DeleteComment"],
    (variables?: DeleteCommentMutationVariables) =>
      fetcher<DeleteCommentMutation, DeleteCommentMutationVariables>(
        client,
        DeleteCommentDocument,
        variables,
        headers
      )(),
    options
  );
export const UpdatePostDocument = `
    mutation UpdatePost($postId: String!, $updatePostInput: UpdatePostInput!) {
  updatePost(postId: $postId, UpdatePostInput: $updatePostInput) {
    error {
      ...regularError
    }
    post {
      ...regularPost
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularPostFragmentDoc}`;
export const useUpdatePostMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>,
  headers?: RequestInit["headers"]
) =>
  useMutation<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>(
    ["UpdatePost"],
    (variables?: UpdatePostMutationVariables) =>
      fetcher<UpdatePostMutation, UpdatePostMutationVariables>(client, UpdatePostDocument, variables, headers)(),
    options
  );
export const CreatePostDocument = `
    mutation CreatePost($createPostInput: CreatePostInput!) {
  createPost(CreatePostInput: $createPostInput) {
    error {
      ...regularError
    }
    post {
      ...regularPost
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularPostFragmentDoc}`;
export const useCreatePostMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>,
  headers?: RequestInit["headers"]
) =>
  useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
    ["CreatePost"],
    (variables?: CreatePostMutationVariables) =>
      fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers)(),
    options
  );
export const DeletePostDocument = `
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId) {
    error {
      ...regularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export const useDeletePostMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>,
  headers?: RequestInit["headers"]
) =>
  useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
    ["DeletePost"],
    (variables?: DeletePostMutationVariables) =>
      fetcher<DeletePostMutation, DeletePostMutationVariables>(client, DeletePostDocument, variables, headers)(),
    options
  );
export const MeDocument = `
    query Me {
  me {
    error {
      ...regularError
    }
    user {
      ...regularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me'] : ['Me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );
export const FindAllPostsDocument = `
    query FindAllPosts {
  findAllPosts {
    ...regularPost
  }
}
    ${RegularPostFragmentDoc}`;
export const useFindAllPostsQuery = <
      TData = FindAllPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FindAllPostsQueryVariables,
      options?: UseQueryOptions<FindAllPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindAllPostsQuery, TError, TData>(
      variables === undefined ? ['FindAllPosts'] : ['FindAllPosts', variables],
      fetcher<FindAllPostsQuery, FindAllPostsQueryVariables>(client, FindAllPostsDocument, variables, headers),
      options
    );
export const FindOnePostDocument = `
    query FindOnePost($postId: String!) {
  findOnePost(id: $postId) {
    ...regularPost
  }
}
    ${RegularPostFragmentDoc}`;
export const useFindOnePostQuery = <TData = FindOnePostQuery, TError = unknown>(
  client: GraphQLClient,
  variables: FindOnePostQueryVariables,
  options?: UseQueryOptions<FindOnePostQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<FindOnePostQuery, TError, TData>(
    ["FindOnePost", variables],
    fetcher<FindOnePostQuery, FindOnePostQueryVariables>(client, FindOnePostDocument, variables, headers),
    options
  );
export const FindOneUserDocument = `
    query FindOneUser($userId: String!) {
  findOneUser(id: $userId) {
    ...regularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const useFindOneUserQuery = <TData = FindOneUserQuery, TError = unknown>(
  client: GraphQLClient,
  variables: FindOneUserQueryVariables,
  options?: UseQueryOptions<FindOneUserQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<FindOneUserQuery, TError, TData>(
    ["FindOneUser", variables],
    fetcher<FindOneUserQuery, FindOneUserQueryVariables>(client, FindOneUserDocument, variables, headers),
    options
  );