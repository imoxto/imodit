import { Visibility } from "@prisma/client";
import { ObjectType, Field } from "type-graphql";
import { Comment } from "./Comment";
import { Post } from "./Post";
import { Response } from "./response";

@ObjectType()
export class User {
  @Field()
  id!: string;

  @Field({ nullable: true })
  email!: string;

  @Field()
  username!: string;

  @Field(() => [Post])
  posts!: Post[];

  @Field()
  visibility!: Visibility;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => [Comment])
  comments!: Comment[];
}

@ObjectType()
export class UserResponse extends Response {
  @Field(() => User, { nullable: true })
  user?: User;
}
