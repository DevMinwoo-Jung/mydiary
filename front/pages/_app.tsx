import React from 'react';
import AppLayout from 'components/AppLayout/AppLayout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import Head from 'next/head'
import axios from 'axios'
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from 'reducers/user'
import wrapper from '../store/configureStore'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = null; // 쿠키 공유 방지
  if (context.req && cookie) {
    axios.defaults.headers.common.Cookie = cookie; /// 서버에 쿠키 전달!
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default wrapper.withRedux(MyApp)
