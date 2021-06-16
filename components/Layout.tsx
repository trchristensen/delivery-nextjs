import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Footer from './Footer'
import Navbar from './Navbar'
import { Container } from '@chakra-ui/layout'


type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <Navbar />
    </header>
    <Container px={0} py={0}  maxW="container.xl"> {children} </Container>

    <Footer />
  </div>
);

export default Layout
