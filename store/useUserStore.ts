import { create } from "zustand";

type User = {
  id: string;
  email: string;
};

type State = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUser = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
