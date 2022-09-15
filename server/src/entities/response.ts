import { Field, ObjectType } from "type-graphql";
import { ErrorType } from "../types";

@ObjectType()
export class ApiError {
  @Field(() => ErrorType)
  type!: typeof ErrorType;

  @Field(() => String, { nullable: true })
  message!: string;

  @Field(() => [String], { nullable: true })
  fields!: string[];
}

@ObjectType()
export class Response {
  @Field(() => ApiError, { nullable: true })
  error?: ApiError;
}
