import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { withIronSession } from 'next-iron-session'
import Router from 'next/router'
import tw from 'twin.macro'
import { Button, Table } from '@/components/'

const AdminPage = ({ user }) => {
  const handleLogout = () => {
    fetch('/api/sessions', { method: 'DELETE' })
    Router.push('/auth')
  }

    const [quote, setQuote] = useState([])

  useEffect(async () => {
    const fetchData = await fetch('/api/admin')
    const quote_data = await fetchData.json()
    await setQuote(quote_data.data)

    console.log(quote)
  }, [])
  return (
    <>
      <Head>
        <title>Ngobr Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="icon"
          href="/images/favicon.png"
          sizes="16x16 32x32"
          type="image/png"
        />
      </Head>
      <main tw="items-center justify-center">
        <nav tw="flex flex-row space-x-8 my-4 items-center justify-center">
          <p>Ngobr Admins Dashboard</p>
          <Button isSecondary onClick={handleLogout}>
            Logout
          </Button>
        </nav>
        <section tw="items-center justify-center">
          <Table tw="items-center justify-center" quote={quote} />
        </section>
      </main>
    </>
  )
}

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    try {
      const user = req.session.get('user')
      if (!user) throw new Error('unauthorized')

      return {
        props: {
          user
        }
      }
    } catch (err) {
      alert(err)
      return {
        redirect: {
          permanent: false,
          destination: '/auth'
        }
      }
    }
  },
  {
    cookieName: 'AUTH_COOKIE',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
)

export default AdminPage
