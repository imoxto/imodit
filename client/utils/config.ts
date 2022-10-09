import { GraphQLClient } from "graphql-request";
import create from "zustand";
import { RegularUserFragment } from "./generates";

export const client = new GraphQLClient(process.env.NEXT_PUBLIC_SERVER_URL!, { credentials: "include" });

export const useUserStore = create<{
  user: RegularUserFragment | null;
  setUser: (user: RegularUserFragment | null) => void;
}>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
