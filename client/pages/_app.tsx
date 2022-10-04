import '../styles/globals.css';
import App, { AppProps, AppInitialProps, AppContext } from 'next/app';
import { useSelector, wrapper } from '../store';
import Header from "../components/Header";
import GlobalStyle from '../styles/GlobalStyle';
import axios from 'axios';

const app = ({ Component, pageProps }: AppProps) => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  axios.defaults.withCredentials = true;

  
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

app.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  console.log(context.ctx.req?.headers.cookie);
  return { ...appInitialProps }
}

export default wrapper.withRedux(app);
