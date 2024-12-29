import { AppProps } from 'next/app'
import localFont from "next/font/local";

import "../styles/index.css";
import Navbar from "../components/overlay/navbar";

const alpino = localFont({
  src: "../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={alpino.variable}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}
