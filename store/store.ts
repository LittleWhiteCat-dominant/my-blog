import { createContext, useContext } from 'react';

export const storeContext = createContext(Object.create(null));

export const useStore = () => {
  const store = useContext(storeContext);
  if (!store) {
      // this is especially useful in TypeScript so you don't need to be checking for null all the time
      throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};