import { Visibility } from "@prisma/client";
import { ObjectType, Field } from "type-graphql";
import { Comment } from "./Comment";
import { Response } from "./response";
import { User } from "./User";

@ObjectType()
export class Post {
  @Field()
  id!: string;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(() => Visibility)
  visibility!: Visibility;

  @Field(() => User)
  author!: User;

  @Field()
  authorId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => [Comment])
  comments!: Comment[];
}

@ObjectType()
export class PostResponse extends Response {
  @Field(() => Post, { nullable: true })
  post?: Post;
}