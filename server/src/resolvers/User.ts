import { Resolver, Query, Ctx, Arg, Mutation, InputType, Field } from "type-graphql";

import {
  addResCookie,
  alreadyExistsErr,
  authenticate,
  hashPassword,
  notAuthenticatedErr,
  removeResCookie,
  verifyPasswordWithHash,
} from "../utils";
import { Context } from "../types";
import { User, UserResponse } from "../entities";

@InputType()
class RegisterInput {
  @Field()
  username!: string;

  @Field()
  password!: string;

  @Field()
  email!: string;
}

@InputType()
class LoginInput {
  @Field()
  username!: string;

  @Field()
  password!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  findAllUsers(@Ctx() { prisma }: Context) {
    return prisma.user.findMany({ where: { visibility: "public" } });
  }

  @Query(() => User)
  findOneUser(@Ctx() { prisma }: Context, @Arg("id") id: string) {
    return prisma.user.findFirst({ where: { id, visibility: "public" } });
  }

  @Query(() => UserResponse)
  async me(@Ctx() context: Context) {
    try {
      const user = await authenticate(context);
      return { user };
    } catch (err) {
      return notAuthenticatedErr(context.res);
    }
  }

  @Mutation(() => UserResponse)
  async register(@Ctx() { prisma, res }: Context, @Arg("RegisterInput") input: RegisterInput) {
    try {
      const hashedPassword = await hashPassword(input.password);

      const user = await prisma.user.create({
        data: {
          username: input.username,
          email: input.email,
          hash: hashedPassword,
        },
        include: { posts: true },
      });

      addResCookie(res, user);

      return { user };
    } catch (err: any) {
      return alreadyExistsErr(res, "User");
    }
  }

  @Mutation(() => UserResponse)
  async login(@Ctx() { prisma, res }: Context, @Arg("LoginInput") input: LoginInput) {
    try {
      const user = await prisma.user.findUnique({
        where: { username: input.username },
        include: { posts: true },
      });

      if (!user?.hash) {
        throw new Error("Incorrect credentials");
      }
      await verifyPasswordWithHash(input.password, user.hash);

      addResCookie(res, user);

      return { user };
    } catch (err: any) {
      return notAuthenticatedErr(res, "Incorrect credentials");
    }
  }

  @Mutation()
  logout(@Ctx() { res }: Context): "success" | "error" {
    try {
      removeResCookie(res);
      return "success";
    } catch (err) {
      res.status(500)
      return "error";
    }
  }
}
