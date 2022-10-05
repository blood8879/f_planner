import '../styles/globals.css';
import App, { AppProps, AppInitialProps, AppContext } from 'next/app';
import { useSelector, wrapper } from '../store';
import Header from "../components/Header";
import GlobalStyle from '../styles/GlobalStyle';
import axios from 'axios';
import { cookieStringToObject } from '../lib/utils';
import { meAPI } from '../lib/api/auth';
import { userActions } from '../store/user';

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
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  const { store } = context.ctx;
  const { isLogged } = store.getState().user;
  
  try {
    if(!isLogged && cookieObject.token) {
      axios.defaults.headers.common.cookie = cookieObject.token;

      const { data } = await meAPI();
      // console.log("me data===",data);
      store.dispatch(userActions.setLoggedUser(data));
    }
  } catch(e) {
    console.log(e);
  }
  // console.log(context.ctx.req?.headers.cookie);
  return { ...appInitialProps };
};

export default wrapper.withRedux(app);
