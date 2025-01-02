import { createWithEqualityFn } from 'zustand/traditional';
import Post from '../interfaces/post';

const store = (set) => ({
  // Sound
  soundLevel: 1,
  updateSoundLevel: (newValue: number) => set(() => ({ soundLevel: newValue })),
  soundControlIsVisible: false,
  toggleSoundControlVisibility: () =>
    set((state) => ({ soundControlIsVisible: !state.soundControlIsVisible })),

  // post
  posts: [],
  setPosts: (newValue: Post[]) => set({
    posts: newValue
  })
});

export const useStore = createWithEqualityFn(store);
