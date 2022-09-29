import '../styles/globals.css';
import { AppProps } from 'next/app';
import { useSelector, wrapper } from '../store';
import Header from "../components/Header";
import GlobalStyle from '../styles/GlobalStyle';
import axios from 'axios';

const app = ({ Component, pageProps }: AppProps) => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  
  const user = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  )
};

export default wrapper.withRedux(app);
