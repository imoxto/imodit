import { Query, Resolver } from "type-graphql";

@Resolver()
export class PingResolver {
  @Query(() => String)
  ping() {
    return "pong";
  }
}

export * from "./Post";
export * from "./User";
export * from "./Comment";