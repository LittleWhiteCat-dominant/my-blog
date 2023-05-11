import { AppProps } from 'next/app'
import { storeContext } from '../store/store';
import globalStore from '../store/global';

import '../styles/index.css'
import '../styles/markdown.css';
import '../styles/editor.css';
import '../styles/toolbar.css';


const store = {
  globalStore
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <storeContext.Provider value={store}>
      <Component {...pageProps} />
    </storeContext.Provider>
  );
}
