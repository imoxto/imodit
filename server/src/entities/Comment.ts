import { ObjectType, Field } from "type-graphql";
import { Post } from "./Post";
import { Response } from "./response";
import { User } from "./User";

@ObjectType()
export class Comment {
  @Field()
  id!: string;

  @Field()
  content!: string;

  @Field(() => User)
  author!: User;

  @Field()
  authorId!: string;

  @Field(() => Post)
  post!: Post;

  @Field()
  postId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@ObjectType()
export class CommentResponse extends Response {
  @Field(() => Comment, { nullable: true })
  comment?: Comment;
}
