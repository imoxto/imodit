import create from "zustand";
import { RegularUserFragment, User } from "./generates";

export const useUserStore = create<{
  user: RegularUserFragment | null;
  setUser: (user: RegularUserFragment | null) => void;
}>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
