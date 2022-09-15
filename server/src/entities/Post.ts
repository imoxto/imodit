import { Visibility } from "@prisma/client";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Post {
  @Field()
  id!: number;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field()
  visibility!: Visibility;

  @Field(() => User)
  author!: User;

  @Field()
  authorId!: number;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
