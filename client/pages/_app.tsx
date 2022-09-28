import '../styles/globals.css';
import { AppProps } from 'next/app';
import { useSelector, wrapper } from '../store';
import Header from "../components/Header";

const app = ({ Component, pageProps }: AppProps) => {
  
  // const user = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
};

export default wrapper.withRedux(app);
