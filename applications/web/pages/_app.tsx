import "animate.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
