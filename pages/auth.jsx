import React, { useRef } from 'react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import tw from 'twin.macro'
import { Button } from '@/components/'
import Cookies from 'cookies'
import { randomBytes } from 'crypto'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req, res)
  const csrf = randomBytes(100).toString('base64')
  res.setHeader('Cache-Control', 'no-cache')

  cookies.set('csrf', csrf, {
    httpOnly: false // true by default
  })

  return {
    props: {
      csrf
    }
  }
}

const AuthPage = ({ csrf }) => {
  const router = useRouter()
  const usernameInput = useRef()
  const passwordInput = useRef()
  const csrfInput = useRef()

  const handleSubmit = async (e) => {
    const username = usernameInput.current.value
    const password = passwordInput.current.value
    const csrf = csrfInput.current.value

   const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, csrf })
    })

    if (response.ok) {
      return router.push('/admin/')
    }
    if (!response.ok) {
      toast.error('Gagal Login')
    }
  }

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
        <title>Sign In</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="icon"
          href="/images/favicon.png"
          sizes="16x16 32x32"
          type="image/png"
        />
      </Head>
      <main
        className="auth_page font-public"
        tw="flex items-center justify-center h-screen "
      >
        <div tw="transform -skew-y-3 border-2 shadow-xl border-green-100 p-8 bg-green-200">
          <div tw="transform skew-y-3">
            <section
              className="login_form_area"
              tw="flex flex-col items-center justify-center border-2 py-2 px-2 border-blue-200 shadow-lg rounded-md shadow-lg bg-white"
            >
              <form
                tw="space-y-6 mx-6 my-6 flex flex-col items-center justify-center"
                onSubmit={handleSubmit}
              >
                <input
                  type="hidden"
                  name="csrf"
                  id="csrf"
                  value={csrf}
                  ref={csrfInput}
                />

                <label tw="font-bold">Username:</label>
                <input
                  tw="border-2 border-green-200"
                  type="text"
                  ref={usernameInput}
                />
                <label tw="font-bold">Password:</label>
                <input
                  tw="border-2 border-green-200"
                  type="password"
                  ref={passwordInput}
                />
                <Button isSecondary type="submits">
                  {' '}
                  Sign In{' '}
                </Button>
              </form>
            </section>
          </div>
        </div>
      </main>
      <Toaster position="top-right" />
    </>
  )
}

export default AuthPage
