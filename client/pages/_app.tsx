import '../styles/globals.css';
import { AppProps } from 'next/app';
import { useSelector, wrapper } from '../store';
import Header from "../components/Header";
import GlobalStyle from '../styles/GlobalStyle';

const app = ({ Component, pageProps }: AppProps) => {
  
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
