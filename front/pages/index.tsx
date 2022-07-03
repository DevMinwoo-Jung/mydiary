import { Layout } from 'antd'
import AppLayout from 'components/AppLayout'
import Header from 'components/Header'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'

export default function Home() {
  const ex:string = '1'

  const Root = styled.div`

  `
  console.log(ex)
  return (
    <>
      <Head>
        <title>Health Diary</title>
        <meta name="description" content="운동한 것을 기록하세요!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <AppLayout/>
      </Layout>
    </>
  )
}
