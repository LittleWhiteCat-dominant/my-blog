import { create } from "zustand";
import Navbar from "../interfaces/navbar";
import Post from '../interfaces/post';

const store = (set) => ({
  // Sound
  soundLevel: 1,
  updateSoundLevel: (newValue: number) => set(() => ({ soundLevel: newValue })),
  soundControlIsVisible: false,
  toggleSoundControlVisibility: () =>
    set((state) => ({ soundControlIsVisible: !state.soundControlIsVisible })),

  // Active nav btn
  activeNav: "",
  updateActiveNav: (newValue: string) => set(() => ({ activeNav: newValue })),
  navList: [],
  updateNavList: (newValue: Navbar[]) => set(() => ({ navList: newValue })),

  // post
  posts: [],
  setPosts: (newValue: Post[]) => set({
    posts: newValue
  })
});

export const useStore = create(store);
